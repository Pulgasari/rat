// @rat/app :: native/android/NativeHttpPlugin.java
//
// http with any method and no cors, for the capacitor wrappers: the js side is
// request() of an app (dev/apps/.shared/http.js), reached as Capacitor.Plugins.NativeHttp.
// capacitor's own http plugin cannot carry webdav (its HttpURLConnection refuses
// PROPFIND, MKCOL, MOVE and COPY), RawHttp.java next to this one can.
//
// bodies cross the bridge as base64 both ways, the bridge carries strings only.
// copied into every capacitor build and registered by
// packages/cli/android.js.

package dev.rat.nativehttp;

import android.util.Base64;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

@CapacitorPlugin(name = "NativeHttp")
public class NativeHttpPlugin extends Plugin {

    @PluginMethod
    public void request (PluginCall call) {
        final String url = call.getString("url");
        if (url == null || url.isEmpty()) { call.reject("url is required"); return; }

        final String method   = call.getString("method", "GET");
        final String body     = call.getString("body");
        final int timeout     = call.getInt("timeout", 30000);
        final JSObject given  = call.getObject("headers", new JSObject());

        // the network must not run on the main thread
        new Thread(() -> {
            try {
                Map<String, String> headers = new LinkedHashMap<>();
                for (Iterator<String> keys = given.keys(); keys.hasNext();) {
                    String name = keys.next();
                    headers.put(name, given.getString(name));
                }

                byte[] payload = body == null ? null : Base64.decode(body, Base64.NO_WRAP);
                RawHttp.Result result = RawHttp.request(url, method, headers, payload, timeout);

                JSObject received = new JSObject();
                for (Map.Entry<String, String> header : result.headers.entrySet()) received.put(header.getKey(), header.getValue());

                JSObject response = new JSObject();
                response.put("data", Base64.encodeToString(result.body, Base64.NO_WRAP));
                response.put("headers", received);
                response.put("status", result.status);
                response.put("statusText", result.reason);
                call.resolve(response);
            } catch (Exception error) {
                call.reject(error.getMessage() == null ? "request failed" : error.getMessage());
            }
        }, "native-http").start();
    }
}
