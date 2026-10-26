package dev.rat.filesync;

import android.content.Context;
import android.net.Uri;
import android.os.Build;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.List;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

// shared localsend v2 sender client used by both the manual send (FileSyncPlugin)
// and the background auto-sync (SyncService). see PROTOCOL.md. all methods block
// on the network, so call them off the main thread.
public class LocalSend {

    private static final String API = "/api/localsend/v2";
    private static final int BUF = 64 * 1024;

    // a file to upload: the content uri plus the metadata prepare-upload needs.
    public static class FileSpec {
        public final String name, mime;
        public final long size; // -1 if unknown (streamed chunked)
        public final Uri uri;
        public FileSpec(String name, String mime, long size, Uri uri) {
            this.name = name; this.mime = mime; this.size = size; this.uri = uri;
        }
    }

    public interface Progress {
        void onProgress(int index, int count, String name, long fileSent, long fileTotal, long sent, long total);
    }

    // carries an http-ish code so callers can distinguish pin (401) / decline (403).
    public static class SendException extends Exception {
        public final int code;
        public SendException(int code, String message) { super(message); this.code = code; }
    }

    // prepare-upload then stream each file body. returns the number of files sent.
    // when fingerprint is non-empty and protocol is https, the server's tls cert is
    // pinned to that sha256 (self-signed but verified); empty = trust-all (v0 fallback
    // for a manually typed target with no known fingerprint).
    public static int send(Context ctx, String protocol, String host, int port, String pin,
                           String fingerprint, JSONObject info, List<FileSpec> files, Progress cb) throws Exception {
        String base = protocol + "://" + host + ":" + port;

        long total = 0;
        for (FileSpec f : files) if (f.size > 0) total += f.size;

        JSONObject filesObj = new JSONObject();
        for (int i = 0; i < files.size(); i++) {
            FileSpec f = files.get(i);
            JSONObject meta = new JSONObject();
            meta.put("id", String.valueOf(i));
            meta.put("fileName", f.name);
            meta.put("size", f.size < 0 ? 0 : f.size);
            meta.put("fileType", f.mime == null ? "application/octet-stream" : f.mime);
            filesObj.put(String.valueOf(i), meta);
        }
        JSONObject prepare = new JSONObject();
        prepare.put("info", info);
        prepare.put("files", filesObj);

        String prepareUrl = base + API + "/prepare-upload";
        if (pin != null && !pin.isEmpty()) prepareUrl += "?pin=" + enc(pin);
        HttpURLConnection pc = open(prepareUrl, "POST", "application/json", fingerprint);
        // the receiver may ask its user first (localsend does, unless quick save is on):
        // the answer to prepare-upload can take as long as that tap
        pc.setReadTimeout(5 * 60 * 1000);
        writeBytes(pc, prepare.toString().getBytes("UTF-8"));
        int pcode = pc.getResponseCode();
        String prespBody = readBody(pc);
        pc.disconnect();
        if (pcode == 401) throw new SendException(401, "pin");
        if (pcode == 403 || pcode == 204) throw new SendException(403, "declined");
        if (pcode != 200) throw new SendException(pcode, "prepare-upload failed (" + pcode + ")");

        JSONObject presp = new JSONObject(prespBody);
        String sessionId = presp.getString("sessionId");
        JSONObject tokens = presp.getJSONObject("files");

        long sentTotal = 0;
        for (int i = 0; i < files.size(); i++) {
            String id = String.valueOf(i);
            if (!tokens.has(id)) continue; // receiver skipped this file
            String token = tokens.getString(id);
            FileSpec f = files.get(i);

            String q = "?sessionId=" + enc(sessionId) + "&fileId=" + enc(id) + "&token=" + enc(token);
            HttpURLConnection uc = open(base + API + "/upload" + q, "POST", "application/octet-stream", fingerprint);
            if (f.size >= 0) uc.setFixedLengthStreamingMode(f.size);
            else uc.setChunkedStreamingMode(0);

            try (InputStream in = ctx.getContentResolver().openInputStream(f.uri);
                 OutputStream out = uc.getOutputStream()) {
                if (in == null) throw new SendException(0, "cannot read file: " + f.name);
                byte[] buf = new byte[BUF];
                long fileSent = 0;
                int n;
                while ((n = in.read(buf)) != -1) {
                    out.write(buf, 0, n);
                    fileSent += n;
                    sentTotal += n;
                    if (cb != null) cb.onProgress(i, files.size(), f.name, fileSent, f.size, sentTotal, total);
                }
                out.flush();
            }
            int ucode = uc.getResponseCode();
            uc.disconnect();
            if (ucode != 200) throw new SendException(ucode, "upload failed for " + f.name + " (" + ucode + ")");
        }
        return files.size();
    }

    // info dto for a mobile sender.
    public static JSONObject mobileInfo(String alias, String fingerprint, int port, String protocol) throws Exception {
        JSONObject info = new JSONObject();
        info.put("alias", alias);
        info.put("version", "2.1");
        info.put("deviceModel", Build.MODEL);
        info.put("deviceType", "mobile");
        info.put("fingerprint", fingerprint);
        info.put("port", port);
        info.put("protocol", protocol);
        return info;
    }

    // ---- http helpers ----

    private static HttpURLConnection open(String urlStr, String method, String contentType, String fingerprint) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        if (conn instanceof HttpsURLConnection) {
            // desktop cert is self-signed. if we know its fingerprint, pin it (verified);
            // otherwise fall back to trust-all on the lan (v0). the cn is "filesync",
            // not the ip, so the hostname verifier stays permissive either way -- the
            // pinned fingerprint is what establishes identity.
            HttpsURLConnection https = (HttpsURLConnection) conn;
            boolean pin = fingerprint != null && !fingerprint.isEmpty();
            https.setSSLSocketFactory(pin ? pinningFactory(fingerprint) : trustAllFactory());
            https.setHostnameVerifier(ALLOW_ALL);
        }
        conn.setRequestMethod(method);
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(60000);
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", contentType);
        return conn;
    }

    private static void writeBytes(HttpURLConnection conn, byte[] body) throws Exception {
        conn.setFixedLengthStreamingMode(body.length);
        try (OutputStream os = conn.getOutputStream()) { os.write(body); }
    }

    private static String readBody(HttpURLConnection conn) throws Exception {
        InputStream is = conn.getResponseCode() >= 400 ? conn.getErrorStream() : conn.getInputStream();
        if (is == null) return "";
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[4096];
        int n;
        while ((n = is.read(buf)) != -1) bos.write(buf, 0, n);
        is.close();
        return bos.toString("UTF-8");
    }

    static String enc(String s) throws Exception {
        return URLEncoder.encode(s, "UTF-8");
    }

    private static final HostnameVerifier ALLOW_ALL = (hostname, session) -> true;

    // pin the server's leaf cert to an expected sha256 (lowercase hex of the DER).
    private static SSLSocketFactory pinningFactory(String expectedHex) throws Exception {
        TrustManager[] tm = new TrustManager[]{
            new X509TrustManager() {
                public void checkClientTrusted(X509Certificate[] c, String a) {}
                public void checkServerTrusted(X509Certificate[] chain, String a) throws CertificateException {
                    if (chain == null || chain.length == 0) throw new CertificateException("no server certificate");
                    if (!sha256Hex(chain[0]).equalsIgnoreCase(expectedHex)) {
                        throw new CertificateException("certificate fingerprint mismatch");
                    }
                }
                public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
            }
        };
        SSLContext ctx = SSLContext.getInstance("TLS");
        ctx.init(null, tm, new SecureRandom());
        return ctx.getSocketFactory();
    }

    private static String sha256Hex(X509Certificate cert) throws CertificateException {
        try {
            byte[] d = MessageDigest.getInstance("SHA-256").digest(cert.getEncoded());
            StringBuilder sb = new StringBuilder(d.length * 2);
            for (byte b : d) {
                sb.append(Character.forDigit((b >> 4) & 0xf, 16));
                sb.append(Character.forDigit(b & 0xf, 16));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new CertificateException(e);
        }
    }

    private static SSLSocketFactory trustAllFactory() throws Exception {
        TrustManager[] trustAll = new TrustManager[]{
            new X509TrustManager() {
                public void checkClientTrusted(X509Certificate[] c, String a) {}
                public void checkServerTrusted(X509Certificate[] c, String a) {}
                public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
            }
        };
        SSLContext ctx = SSLContext.getInstance("TLS");
        ctx.init(null, trustAll, new SecureRandom());
        return ctx.getSocketFactory();
    }
}
