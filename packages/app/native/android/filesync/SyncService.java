package dev.rat.filesync;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.database.Cursor;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.net.Uri;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.IBinder;
import android.provider.DocumentsContract;

import androidx.core.app.NotificationCompat;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

// foreground service for auto-sync: when connected to wi-fi (optionally gated to
// a trusted ssid) it scans a chosen folder (a SAF tree uri) for files newer than
// the last sync and uploads them to the stored desktop target via LocalSend.
// config lives in the shared "filesync" prefs (written by FileSyncPlugin).
public class SyncService extends Service {

    public static final String PREFS = "filesync";
    public static final String K_ENABLED = "as_enabled";
    public static final String K_TREE = "as_tree";
    public static final String K_HOST = "as_host";
    public static final String K_PORT = "as_port";
    public static final String K_PROTO = "as_proto";
    public static final String K_PIN = "as_pin";
    public static final String K_FP = "as_fp";
    public static final String K_SSID = "as_ssid";
    public static final String K_LAST = "as_last";
    public static final String ACTION_RUN_NOW = "dev.rat.filesync.RUN_NOW";

    private static final int NOTIF_ID = 4711;
    private static final String CHANNEL = "filesync_sync";

    private final ExecutorService pool = Executors.newSingleThreadExecutor();
    private final AtomicBoolean passRunning = new AtomicBoolean(false);
    private ConnectivityManager cm;
    private ConnectivityManager.NetworkCallback netCallback;

    @Override
    public void onCreate() {
        super.onCreate();
        createChannel();
        cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startForegroundSafe(statusText("on"));
        registerWifiCallback();
        // try a pass right away (e.g. on enable, or on a "sync now" action)
        maybeRunPass();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        if (cm != null && netCallback != null) {
            try { cm.unregisterNetworkCallback(netCallback); } catch (Exception ignored) {}
        }
        pool.shutdownNow();
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) { return null; }

    // ---- wifi trigger ----

    private void registerWifiCallback() {
        if (cm == null || netCallback != null) return;
        NetworkRequest req = new NetworkRequest.Builder()
            .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
            .build();
        netCallback = new ConnectivityManager.NetworkCallback() {
            @Override public void onAvailable(Network network) { maybeRunPass(); }
        };
        try { cm.registerNetworkCallback(req, netCallback); } catch (Exception ignored) {}
    }

    private boolean onWifi() {
        if (cm == null) return false;
        Network n = cm.getActiveNetwork();
        if (n == null) return false;
        NetworkCapabilities caps = cm.getNetworkCapabilities(n);
        return caps != null && caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI);
    }

    // returns true if the ssid gate passes (no trusted ssid set = any wifi ok).
    private boolean ssidOk(SharedPreferences sp) {
        String trusted = sp.getString(K_SSID, "");
        if (trusted == null || trusted.isEmpty()) return true;
        try {
            WifiManager wm = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            if (wm == null) return false;
            String ssid = wm.getConnectionInfo().getSSID(); // quoted, e.g. "MyWifi"
            if (ssid == null) return false;
            if (ssid.startsWith("\"") && ssid.endsWith("\"") && ssid.length() >= 2) {
                ssid = ssid.substring(1, ssid.length() - 1);
            }
            return trusted.equals(ssid);
        } catch (Exception e) {
            return false; // cannot verify (e.g. no location permission) -> honor the gate
        }
    }

    // ---- sync pass ----

    private void maybeRunPass() {
        final SharedPreferences sp = getSharedPreferences(PREFS, MODE_PRIVATE);
        if (!sp.getBoolean(K_ENABLED, false)) { stopSelf(); return; }
        if (!onWifi() || !ssidOk(sp)) { updateNotification(statusText("waiting for wi-fi")); return; }
        if (!passRunning.compareAndSet(false, true)) return; // one pass at a time
        pool.execute(() -> {
            try { runPass(sp); }
            catch (Exception e) { updateNotification(statusText("error: " + e.getMessage())); }
            finally { passRunning.set(false); }
        });
    }

    private void runPass(SharedPreferences sp) throws Exception {
        String treeStr = sp.getString(K_TREE, "");
        String host = sp.getString(K_HOST, "");
        if (treeStr.isEmpty() || host.isEmpty()) return;
        int port = sp.getInt(K_PORT, 53317);
        String proto = sp.getString(K_PROTO, "https");
        String pin = sp.getString(K_PIN, "");
        String fp = sp.getString(K_FP, "");
        long last = sp.getLong(K_LAST, 0);

        Uri tree = Uri.parse(treeStr);
        List<LocalSend.FileSpec> specs = new ArrayList<>();

        // the whole tree, subfolders included: every file changed since the last sync
        long[] newest = { last };
        collect(tree, DocumentsContract.getTreeDocumentId(tree), last, specs, newest, 0);

        if (specs.isEmpty()) { updateNotification(statusText("up to date")); return; }

        updateNotification(statusText("sending " + specs.size() + " file(s)…"));
        JSONObject info = LocalSend.mobileInfo(deviceAlias(), fingerprint(sp), 53317, "http");
        LocalSend.send(getApplicationContext(), proto, host, port, pin, fp, info, specs, null);

        sp.edit().putLong(K_LAST, newest[0]).apply();
        updateNotification(statusText(specs.size() + " file(s) sent"));
    }

    // depth-first through the tree. MAX_DEPTH keeps a link cycle or a giant tree
    // from running forever, dot folders (.thumbnails, .trash) are skipped
    private static final int MAX_DEPTH = 16;

    private void collect(Uri tree, String parentId, long last, List<LocalSend.FileSpec> specs, long[] newest, int depth) {
        if (depth > MAX_DEPTH) return;
        Uri children = DocumentsContract.buildChildDocumentsUriUsingTree(tree, parentId);
        String[] cols = {
            DocumentsContract.Document.COLUMN_DOCUMENT_ID,
            DocumentsContract.Document.COLUMN_DISPLAY_NAME,
            DocumentsContract.Document.COLUMN_SIZE,
            DocumentsContract.Document.COLUMN_LAST_MODIFIED,
            DocumentsContract.Document.COLUMN_MIME_TYPE,
        };
        List<String> folders = new ArrayList<>();
        try (Cursor c = getContentResolver().query(children, cols, null, null, null)) {
            while (c != null && c.moveToNext()) {
                String docId = c.getString(0);
                String name  = c.getString(1);
                String mime  = c.getString(4);
                if (name != null && name.startsWith(".")) continue;
                if (DocumentsContract.Document.MIME_TYPE_DIR.equals(mime)) { folders.add(docId); continue; }
                long mod = c.isNull(3) ? 0 : c.getLong(3);
                if (mod <= last) continue; // only files new since the last sync
                long size = c.isNull(2) ? -1 : c.getLong(2);
                Uri fileUri = DocumentsContract.buildDocumentUriUsingTree(tree, docId);
                specs.add(new LocalSend.FileSpec(name == null ? "file" : name, mime, size, fileUri));
                if (mod > newest[0]) newest[0] = mod;
            }
        }
        for (String folder : folders) collect(tree, folder, last, specs, newest, depth + 1);
    }

    private String deviceAlias() {
        return (Build.MODEL == null || Build.MODEL.isEmpty()) ? "Android" : Build.MODEL;
    }

    private String fingerprint(SharedPreferences sp) {
        String fp = sp.getString("fingerprint", null);
        if (fp == null) {
            fp = UUID.randomUUID().toString().replace("-", "");
            sp.edit().putString("fingerprint", fp).apply();
        }
        return fp;
    }

    // ---- notification ----

    private String statusText(String s) { return "auto sync: " + s; }

    private void createChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, "Auto sync", NotificationManager.IMPORTANCE_LOW);
            ch.setDescription("sends new files in the background on wi-fi");
            NotificationManager nm = getSystemService(NotificationManager.class);
            if (nm != null) nm.createNotificationChannel(ch);
        }
    }

    private Notification buildNotification(String text) {
        return new NotificationCompat.Builder(this, CHANNEL)
            .setContentTitle("Files")
            .setContentText(text)
            .setSmallIcon(android.R.drawable.stat_sys_upload)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build();
    }

    private void startForegroundSafe(String text) {
        Notification n = buildNotification(text);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(NOTIF_ID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC);
        } else {
            startForeground(NOTIF_ID, n);
        }
    }

    private void updateNotification(String text) {
        NotificationManager nm = getSystemService(NotificationManager.class);
        if (nm != null) nm.notify(NOTIF_ID, buildNotification(text));
    }
}
