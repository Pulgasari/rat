// @rat/app :: native/android/SafPlugin.java
//
// folder access through android's storage access framework, for the capacitor
// wrappers. @capacitor/filesystem works on app paths and rejects content:// tree
// uris ("'readdir' not supported for content:// URIs"), which is all a picked
// folder ever is. this talks to DocumentsContract directly.
//
// copied into every capacitor build and registered in MainActivity by
// packages/cli/android.js (rat build --target android). the js side is the handle
// shim drivers/_saf.js of @rat/app, reached as Capacitor.Plugins.Saf.
//
// a uri is either the tree a folder was picked as (content://…/tree/<id>) or a
// document inside it (content://…/tree/<id>/document/<id>). everything returned
// is of the second kind, so it carries the tree and its grant along.

package dev.rat.saf;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.UriPermission;
import android.database.Cursor;
import android.net.Uri;
import android.provider.DocumentsContract;
import android.provider.DocumentsContract.Document;
import android.util.Base64;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Arrays;

@CapacitorPlugin(name = "Saf")
public class SafPlugin extends Plugin {

    private static final String[] COLUMNS = {
        Document.COLUMN_DOCUMENT_ID,
        Document.COLUMN_DISPLAY_NAME,
        Document.COLUMN_MIME_TYPE,
        Document.COLUMN_SIZE,
        Document.COLUMN_LAST_MODIFIED,
    };

    private static final int READ_WRITE = Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION;

    private ContentResolver resolver () {
        return getContext().getContentResolver();
    }

    // :::::: URIS

    private Uri parse (PluginCall call, String key) {
        String value = call.getString(key);
        if (value == null || value.isEmpty()) throw new IllegalArgumentException("'" + key + "' is required");
        return Uri.parse(value);
    }

    // the document a uri points at: the tree's root for a bare tree uri
    private String docId (Uri uri) {
        return DocumentsContract.isDocumentUri(getContext(), uri)
            ? DocumentsContract.getDocumentId(uri)
            : DocumentsContract.getTreeDocumentId(uri);
    }

    private Uri docUri (Uri uri) {
        return DocumentsContract.buildDocumentUriUsingTree(uri, docId(uri));
    }

    // the tree a uri belongs to, which is what a persisted grant is keyed on
    private Uri treeUri (Uri uri) {
        return DocumentsContract.buildTreeDocumentUri(uri.getAuthority(), DocumentsContract.getTreeDocumentId(uri));
    }

    // one row of COLUMNS -> { name, type, mime, size, mtime, uri }
    private JSObject entry (Cursor row, Uri tree) {
        String mime = row.getString(2);
        JSObject out = new JSObject();
        out.put("uri", DocumentsContract.buildDocumentUriUsingTree(tree, row.getString(0)).toString());
        out.put("name", row.getString(1));
        out.put("type", Document.MIME_TYPE_DIR.equals(mime) ? "directory" : "file");
        out.put("mime", mime == null ? "" : mime);
        out.put("size", row.isNull(3) ? 0 : row.getLong(3));
        out.put("mtime", row.isNull(4) ? 0 : row.getLong(4));
        return out;
    }

    // :::::: PICK

    /** opens the system folder picker and keeps the grant across restarts */
    @PluginMethod
    public void pickTree (PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        intent.addFlags(READ_WRITE | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION | Intent.FLAG_GRANT_PREFIX_URI_PERMISSION);
        startActivityForResult(call, intent, "pickTreeResult");
    }

    @ActivityCallback
    private void pickTreeResult (PluginCall call, ActivityResult result) {
        if (call == null) return;

        Intent data = result.getData();
        Uri tree = data == null ? null : data.getData();
        if (result.getResultCode() != Activity.RESULT_OK || tree == null) {
            call.reject("canceled", "CANCELED");
            return;
        }

        // without this the grant ends with the process: the folder is unreadable
        // after the next restart. write is asked for first, a read-only provider
        // refuses it and gets read alone
        try {
            resolver().takePersistableUriPermission(tree, READ_WRITE);
        } catch (SecurityException writeRefused) {
            try {
                resolver().takePersistableUriPermission(tree, Intent.FLAG_GRANT_READ_URI_PERMISSION);
            } catch (SecurityException readRefused) {
                call.reject("the folder grant could not be persisted: " + readRefused.getMessage());
                return;
            }
        }

        try (Cursor row = resolver().query(docUri(tree), COLUMNS, null, null, null)) {
            JSObject out = row != null && row.moveToFirst() ? entry(row, tree) : new JSObject();
            out.put("uri", tree.toString());
            call.resolve(out);
        } catch (Exception e) {
            call.reject(e.getMessage(), e);
        }
    }

    /** whether the tree a uri belongs to still holds a persisted read grant */
    @PluginMethod
    public void hasAccess (PluginCall call) {
        try {
            Uri tree = treeUri(parse(call, "uri"));
            boolean granted = false;
            for (UriPermission perm : resolver().getPersistedUriPermissions()) {
                if (perm.isReadPermission() && perm.getUri().equals(tree)) { granted = true; break; }
            }
            JSObject out = new JSObject();
            out.put("granted", granted);
            call.resolve(out);
        } catch (Exception e) {
            call.reject(e.getMessage(), e);
        }
    }

    // :::::: READ

    @PluginMethod
    public void list (PluginCall call) {
        try {
            Uri uri = parse(call, "uri");
            Uri children = DocumentsContract.buildChildDocumentsUriUsingTree(uri, docId(uri));
            JSArray entries = new JSArray();

            try (Cursor row = resolver().query(children, COLUMNS, null, null, null)) {
                while (row != null && row.moveToNext()) entries.put(entry(row, uri));
            }

            JSObject out = new JSObject();
            out.put("entries", entries);
            call.resolve(out);
        } catch (Exception e) {
            call.reject(e.getMessage(), e);
        }
    }

    @PluginMethod
    public void stat (PluginCall call) {
        try {
            Uri uri = parse(call, "uri");
            try (Cursor row = resolver().query(docUri(uri), COLUMNS, null, null, null)) {
                if (row == null || !row.moveToFirst()) { call.reject("not found", "NOT_FOUND"); return; }
                call.resolve(entry(row, uri));
            }
        } catch (Exception e) {
            call.reject(e.getMessage(), e);
        }
    }

    /** the file as base64, whole or `length` bytes from `offset` (a head for tags: not the whole file over the bridge) */
    @PluginMethod
    public void read (PluginCall call) {
        long offset = call.getData().optLong("offset", 0L);
        long length = call.getData().optLong("length", -1L);
        try (InputStream in = resolver().openInputStream(docUri(parse(call, "uri")))) {
            if (in == null) { call.reject("could not open the file"); return; }

            for (long skipped; offset > 0 && (skipped = in.skip(offset)) > 0; ) offset -= skipped;

            ByteArrayOutputStream buf = new ByteArrayOutputStream();
            byte[] chunk = new byte[64 * 1024];
            long left = length < 0 ? Long.MAX_VALUE : length;
            for (int n; left > 0 && (n = in.read(chunk, 0, (int) Math.min(chunk.length, left))) != -1; left -= n) buf.write(chunk, 0, n);

            JSObject out = new JSObject();
            out.put("data", Base64.encodeToString(buf.toByteArray(), Base64.NO_WRAP));
            call.resolve(out);
        } catch (Exception e) {
            call.reject(e.getMessage(), e);
        }
    }

    // :::::: STREAM

    private static final int STREAMED = 3;   // copies kept in the cache, the newest

    /**
     * a copy of the file in the cache, for the webview to stream (Capacitor.convertFileSrc of `path`):
     * an <audio> reads it in ranges, nothing crosses the bridge. `key` names the copy (the js side
     * gives uri, size and date): one with the same key is used again
     */
    @PluginMethod
    public void cache (PluginCall call) {
        File dir  = new File(getContext().getCacheDir(), "rat-stream");
        File file = new File(dir, call.getString("key", "file"));
        try {
            if (!dir.isDirectory() && !dir.mkdirs()) { call.reject("could not make the cache folder"); return; }
            if (!file.isFile()) {
                File part = new File(dir, file.getName() + ".part");
                try (InputStream in = resolver().openInputStream(docUri(parse(call, "uri"))); OutputStream out = new FileOutputStream(part)) {
                    if (in == null) { call.reject("could not open the file"); return; }
                    byte[] chunk = new byte[256 * 1024];
                    for (int n; (n = in.read(chunk)) != -1; ) out.write(chunk, 0, n);
                }
                if (!part.renameTo(file)) { call.reject("could not keep the copy"); return; }
            }
            file.setLastModified(System.currentTimeMillis());

            // the older copies go
            File[] copies = dir.listFiles();
            if (copies != null && copies.length > STREAMED) {
                Arrays.sort(copies, (a, b) -> Long.compare(b.lastModified(), a.lastModified()));
                for (int i = STREAMED; i < copies.length; i++) copies[i].delete();
            }

            JSObject out = new JSObject();
            out.put("path", file.getAbsolutePath());
            call.resolve(out);
        } catch (Exception e) {
            call.reject(e.getMessage(), e);
        }
    }

    // :::::: WRITE

    /** replaces the file's content ("wt" truncates) with the base64 `data` */
    @PluginMethod
    public void write (PluginCall call) {
        try (OutputStream out = resolver().openOutputStream(docUri(parse(call, "uri")), "wt")) {
            if (out == null) { call.reject("could not open the file for writing"); return; }
            String data = call.getString("data", "");
            out.write(Base64.decode(data, Base64.DEFAULT));
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage(), e);
        }
    }

    /** a new file or folder `name` inside the folder `uri`, resolving to its uri */
    @PluginMethod
    public void create (PluginCall call) {
        try {
            Uri parent = parse(call, "uri");
            String name = call.getString("name");
            if (name == null || name.isEmpty()) throw new IllegalArgumentException("'name' is required");

            String mime = call.getBoolean("directory", false)
                ? Document.MIME_TYPE_DIR
                : call.getString("mime", "application/octet-stream");

            Uri created = DocumentsContract.createDocument(resolver(), docUri(parent), mime, name);
            if (created == null) { call.reject("the provider refused to create '" + name + "'"); return; }

            JSObject out = new JSObject();
            out.put("uri", created.toString());
            call.resolve(out);
        } catch (Exception e) {
            call.reject(e.getMessage(), e);
        }
    }

    /** removes a file, or a folder with everything in it */
    @PluginMethod
    public void delete (PluginCall call) {
        try {
            boolean deleted = DocumentsContract.deleteDocument(resolver(), docUri(parse(call, "uri")));
            if (!deleted) { call.reject("the provider refused the delete"); return; }
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage(), e);
        }
    }
}
