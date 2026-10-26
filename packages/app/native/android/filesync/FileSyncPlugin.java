package dev.rat.filesync;

import android.Manifest;
import android.content.ClipData;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.provider.DocumentsContract;
import android.provider.OpenableColumns;

import androidx.activity.result.ActivityResult;
import androidx.core.content.ContextCompat;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

// sender side of the localsend v2 flow (see PROTOCOL.md next to this file). jobs:
//  - pickFiles(): SAF multi-select, returns {uri,name,size,mime} per file
//  - send(): hand the picked files to the shared LocalSend client, emitting
//    "progress" events
//  - startDiscovery()/stopDiscovery(): multicast device discovery
// the actual http(s) upload lives in LocalSend.java (shared with SyncService).
@CapacitorPlugin(
    name = "FileSync",
    permissions = {
        @Permission(alias = "notifications", strings = { Manifest.permission.POST_NOTIFICATIONS }),
        @Permission(alias = "location", strings = { Manifest.permission.ACCESS_FINE_LOCATION })
    }
)
public class FileSyncPlugin extends Plugin {

    private static final String PREFS = "filesync";

    private Discovery discovery;

    // ---- identity (stable per install) ----

    @PluginMethod
    public void getIdentity(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("alias", deviceAlias());
        ret.put("fingerprint", fingerprint());
        call.resolve(ret);
    }

    private String deviceAlias() {
        String m = Build.MODEL;
        return (m == null || m.isEmpty()) ? "Android" : m;
    }

    private String fingerprint() {
        SharedPreferences sp = getContext().getSharedPreferences("filesync", 0);
        String fp = sp.getString("fingerprint", null);
        if (fp == null) {
            fp = UUID.randomUUID().toString().replace("-", "");
            sp.edit().putString("fingerprint", fp).apply();
        }
        return fp;
    }

    // our announce/info dto for discovery (the phone has no server, so port/
    // protocol are placeholders that let a desktop reach back if it wants to).
    private JSONObject announceInfo() {
        try {
            JSONObject o = new JSONObject();
            o.put("alias", deviceAlias());
            o.put("version", "2.1");
            o.put("deviceModel", Build.MODEL);
            o.put("deviceType", "mobile");
            o.put("fingerprint", fingerprint());
            o.put("port", 53317);
            o.put("protocol", "http");
            return o;
        } catch (Exception e) {
            return new JSONObject();
        }
    }

    // ---- discovery ----

    @PluginMethod
    public void startDiscovery(PluginCall call) {
        try {
            if (discovery == null) {
                discovery = new Discovery(getContext(), announceInfo(), fingerprint(), (info, ip) -> {
                    JSObject o = new JSObject();
                    o.put("alias", info.optString("alias", "unknown"));
                    o.put("ip", ip);
                    o.put("port", info.optInt("port", 53317));
                    o.put("protocol", info.optString("protocol", "http"));
                    o.put("fingerprint", info.optString("fingerprint", ""));
                    o.put("deviceType", info.optString("deviceType", ""));
                    notifyListeners("device", o);
                });
            }
            discovery.start();
            discovery.announce(); // re-announce so a "rescan" from the ui refreshes the list
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage() == null ? "discovery failed" : e.getMessage());
        }
    }

    @PluginMethod
    public void stopDiscovery(PluginCall call) {
        if (discovery != null) discovery.stop();
        call.resolve();
    }

    @Override
    protected void handleOnDestroy() {
        if (discovery != null) discovery.stop();
        super.handleOnDestroy();
    }

    // ---- auto-sync (background foreground-service) ----

    @PluginMethod
    public void pickFolder(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
        startActivityForResult(call, intent, "pickFolderResult");
    }

    @ActivityCallback
    private void pickFolderResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        Intent data = result.getData();
        if (result.getResultCode() != android.app.Activity.RESULT_OK || data == null || data.getData() == null) {
            call.resolve(new JSObject().put("uri", (String) null));
            return;
        }
        Uri tree = data.getData();
        try {
            getContext().getContentResolver().takePersistableUriPermission(tree, Intent.FLAG_GRANT_READ_URI_PERMISSION);
        } catch (Exception ignored) {}
        JSObject ret = new JSObject();
        ret.put("uri", tree.toString());
        ret.put("name", treeName(tree));
        call.resolve(ret);
    }

    private String treeName(Uri tree) {
        try {
            String docId = DocumentsContract.getTreeDocumentId(tree); // e.g. "primary:Pictures/Cam"
            int cut = Math.max(docId.lastIndexOf('/'), docId.lastIndexOf(':'));
            return cut >= 0 && cut < docId.length() - 1 ? docId.substring(cut + 1) : docId;
        } catch (Exception e) {
            return "folder";
        }
    }

    @PluginMethod
    public void startAutoSync(PluginCall call) {
        SharedPreferences sp = getContext().getSharedPreferences(PREFS, 0);
        sp.edit()
            .putBoolean(SyncService.K_ENABLED, true)
            .putString(SyncService.K_TREE, call.getString("tree", sp.getString(SyncService.K_TREE, "")))
            .putString(SyncService.K_HOST, call.getString("host", ""))
            .putInt(SyncService.K_PORT, call.getInt("port", 53317))
            .putString(SyncService.K_PROTO, call.getString("protocol", "https"))
            .putString(SyncService.K_PIN, call.getString("pin", ""))
            .putString(SyncService.K_FP, call.getString("fingerprint", ""))
            .putString(SyncService.K_SSID, call.getString("ssid", ""))
            .apply();

        // notifications (33+) so the foreground notice shows; location only if an
        // ssid gate is set (reading the current ssid needs it).
        List<String> aliases = new ArrayList<>();
        if (getPermissionState("notifications") != PermissionState.GRANTED) aliases.add("notifications");
        String ssid = call.getString("ssid", "");
        if (ssid != null && !ssid.isEmpty() && getPermissionState("location") != PermissionState.GRANTED) aliases.add("location");
        if (aliases.isEmpty()) { launchService(null); call.resolve(); }
        else requestPermissionForAliases(aliases.toArray(new String[0]), call, "afterAutoSyncPerms");
    }

    @PermissionCallback
    private void afterAutoSyncPerms(PluginCall call) {
        launchService(null);
        call.resolve();
    }

    private void launchService(String action) {
        Intent i = new Intent(getContext(), SyncService.class);
        if (action != null) i.setAction(action);
        ContextCompat.startForegroundService(getContext(), i);
    }

    @PluginMethod
    public void stopAutoSync(PluginCall call) {
        getContext().getSharedPreferences(PREFS, 0).edit().putBoolean(SyncService.K_ENABLED, false).apply();
        getContext().stopService(new Intent(getContext(), SyncService.class));
        call.resolve();
    }

    @PluginMethod
    public void syncNow(PluginCall call) {
        launchService(SyncService.ACTION_RUN_NOW);
        call.resolve();
    }

    @PluginMethod
    public void getAutoSyncState(PluginCall call) {
        SharedPreferences sp = getContext().getSharedPreferences(PREFS, 0);
        JSObject o = new JSObject();
        o.put("enabled", sp.getBoolean(SyncService.K_ENABLED, false));
        o.put("tree", sp.getString(SyncService.K_TREE, ""));
        o.put("host", sp.getString(SyncService.K_HOST, ""));
        o.put("port", sp.getInt(SyncService.K_PORT, 53317));
        o.put("protocol", sp.getString(SyncService.K_PROTO, "https"));
        o.put("ssid", sp.getString(SyncService.K_SSID, ""));
        o.put("lastSync", sp.getLong(SyncService.K_LAST, 0));
        call.resolve(o);
    }

    // ---- file picking ----

    @PluginMethod
    public void pickFiles(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("*/*");
        intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
        startActivityForResult(call, intent, "pickFilesResult");
    }

    @ActivityCallback
    private void pickFilesResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        Intent data = result.getData();
        if (result.getResultCode() != android.app.Activity.RESULT_OK || data == null) {
            call.resolve(new JSObject().put("files", new JSArray()));
            return;
        }
        List<Uri> uris = new ArrayList<>();
        ClipData clip = data.getClipData();
        if (clip != null) {
            for (int i = 0; i < clip.getItemCount(); i++) uris.add(clip.getItemAt(i).getUri());
        } else if (data.getData() != null) {
            uris.add(data.getData());
        }
        JSArray files = new JSArray();
        for (Uri uri : uris) {
            try {
                getContext().getContentResolver().takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
            } catch (Exception ignored) { /* not all providers grant persistable */ }
            files.put(describe(uri));
        }
        call.resolve(new JSObject().put("files", files));
    }

    private JSObject describe(Uri uri) {
        String name = null;
        long size = -1;
        try (Cursor c = getContext().getContentResolver().query(uri, null, null, null, null)) {
            if (c != null && c.moveToFirst()) {
                int ni = c.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                int si = c.getColumnIndex(OpenableColumns.SIZE);
                if (ni >= 0) name = c.getString(ni);
                if (si >= 0 && !c.isNull(si)) size = c.getLong(si);
            }
        } catch (Exception ignored) {}
        String mime = getContext().getContentResolver().getType(uri);
        JSObject o = new JSObject();
        o.put("uri", uri.toString());
        o.put("name", name == null ? "file" : name);
        o.put("size", size);
        o.put("mime", mime == null ? "application/octet-stream" : mime);
        return o;
    }

    // ---- sending ----

    @PluginMethod
    public void send(final PluginCall call) {
        final String host = call.getString("host");
        final int port = call.getInt("port", 53317);
        final String protocol = call.getString("protocol", "http");
        final String pin = call.getString("pin", "");
        final String fingerprint = call.getString("fingerprint", "");
        final JSArray files = call.getArray("files");
        if (host == null || host.isEmpty() || files == null || files.length() == 0) {
            call.reject("host and files are required");
            return;
        }
        // keep the process alive for the duration: a foreground service raises the
        // priority so android does not kill the app (and this upload) if the user
        // backgrounds it mid-transfer. the upload still runs on the worker thread.
        TransferService.start(getContext(), "Sending files…");
        // network must not run on the main thread
        new Thread(() -> {
            try {
                doSend(call, protocol, host, port, pin, fingerprint, files);
            } catch (Exception e) {
                call.reject(e.getMessage() == null ? "send failed" : e.getMessage());
            } finally {
                TransferService.stop(getContext());
            }
        }, "filesync-send").start();
    }

    private void doSend(PluginCall call, String protocol, String host, int port, String pin, String fingerprint, JSArray files) throws Exception {
        // build file specs from what the ui gave us, then hand off to the shared client
        List<LocalSend.FileSpec> specs = new ArrayList<>();
        for (int i = 0; i < files.length(); i++) {
            JSObject f = JSObject.fromJSONObject(files.getJSONObject(i));
            specs.add(new LocalSend.FileSpec(
                f.getString("name", "file"),
                f.getString("mime", "application/octet-stream"),
                f.getLong("size"),
                Uri.parse(f.getString("uri"))));
        }
        JSONObject info = LocalSend.mobileInfo(deviceAlias(), fingerprint(), port, protocol);
        try {
            int sent = LocalSend.send(getContext(), protocol, host, port, pin, fingerprint, info, specs, this::emitProgress);
            JSObject ret = new JSObject();
            ret.put("sent", sent);
            call.resolve(ret);
        } catch (LocalSend.SendException e) {
            // 401 = the receiver wants a (correct) pin; surface it so the ui can prompt.
            if (e.code == 401) { call.reject("pin", "PIN_REQUIRED"); return; }
            if (e.code == 403) { call.reject("the receiver declined"); return; }
            call.reject(e.getMessage() == null ? "sending failed" : e.getMessage());
        }
    }

    private void emitProgress(int index, int count, String name, long fileSent, long fileTotal, long sent, long total) {
        JSObject p = new JSObject();
        p.put("index", index);
        p.put("count", count);
        p.put("name", name);
        p.put("fileSent", fileSent);
        p.put("fileTotal", fileTotal);
        p.put("sent", sent);
        p.put("total", total);
        notifyListeners("progress", p);
    }
}
