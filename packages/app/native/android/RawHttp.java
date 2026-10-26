// @rat/app :: native/android/RawHttp.java
//
// a small http/1.1 client on a plain socket, for NativeHttpPlugin. android's
// HttpURLConnection (and capacitor's http plugin on top of it) refuses every
// method outside GET, POST, PUT, DELETE, HEAD, OPTIONS, TRACE and PATCH, so
// webdav (PROPFIND, MKCOL, MOVE, COPY) cannot go through it. this sends any
// method. one request per connection (Connection: close), no redirects, a
// response body by content-length, chunked or until the server closes.
//
// https checks the certificate against the system's trust store and the host
// name like any other client: a self-signed server needs a real certificate or
// a plain http address on the local network.
//
// pure java, no android or capacitor classes: it compiles and runs on a desktop
// jvm too, which is how it is tested.

package dev.rat.nativehttp;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;

public final class RawHttp {

    public static final class Result {
        public final int status;
        public final String reason;
        public final Map<String, String> headers;
        public final byte[] body;

        Result (int status, String reason, Map<String, String> headers, byte[] body) {
            this.status  = status;
            this.reason  = reason;
            this.headers = headers;
            this.body    = body;
        }
    }

    private RawHttp () {}

    public static Result request (String url, String method, Map<String, String> headers, byte[] body, int timeoutMs) throws IOException {
        URI uri = URI.create(url);
        boolean secure = "https".equalsIgnoreCase(uri.getScheme());
        String host = uri.getHost();
        int port = uri.getPort() > 0 ? uri.getPort() : (secure ? 443 : 80);
        String path = uri.getRawPath() == null || uri.getRawPath().isEmpty() ? "/" : uri.getRawPath();
        if (uri.getRawQuery() != null) path += "?" + uri.getRawQuery();

        Socket socket = new Socket();
        socket.connect(new InetSocketAddress(host, port), timeoutMs);
        socket.setSoTimeout(timeoutMs);

        if (secure) {
            SSLSocket tls = (SSLSocket) ((SSLSocketFactory) SSLSocketFactory.getDefault()).createSocket(socket, host, port, true);
            tls.startHandshake();
            HostnameVerifier verifier = HttpsURLConnection.getDefaultHostnameVerifier();
            if (!verifier.verify(host, tls.getSession())) { tls.close(); throw new IOException("the certificate is not for " + host); }
            socket = tls;
        }

        try {
            byte[] payload = body == null ? new byte[0] : body;
            StringBuilder head = new StringBuilder();
            head.append(method.toUpperCase(Locale.ROOT)).append(' ').append(path).append(" HTTP/1.1\r\n");
            head.append("Host: ").append(host).append(uri.getPort() > 0 ? ":" + port : "").append("\r\n");
            head.append("Connection: close\r\n");
            head.append("Content-Length: ").append(payload.length).append("\r\n");
            if (headers != null) {
                for (Map.Entry<String, String> header : headers.entrySet()) {
                    String name = header.getKey();
                    if (name.equalsIgnoreCase("host") || name.equalsIgnoreCase("connection") || name.equalsIgnoreCase("content-length")) continue;
                    head.append(name).append(": ").append(header.getValue()).append("\r\n");
                }
            }
            head.append("\r\n");

            OutputStream out = socket.getOutputStream();
            out.write(head.toString().getBytes(StandardCharsets.ISO_8859_1));
            out.write(payload);
            out.flush();

            return readResponse(new BufferedInputStream(socket.getInputStream()), method);
        } finally {
            socket.close();
        }
    }

    // :::::: RESPONSE ::::::::::::::::::::::::::::::::::::::::::::

    private static Result readResponse (InputStream in, String method) throws IOException {
        String statusLine = readLine(in);
        if (statusLine == null || !statusLine.startsWith("HTTP/")) throw new IOException("no http response");

        String[] parts = statusLine.split(" ", 3);
        int status = Integer.parseInt(parts[1]);
        String reason = parts.length > 2 ? parts[2] : "";

        // a 100 continue comes before the real answer
        if (status == 100) { while (!readLine(in).isEmpty()) {} return readResponse(in, method); }

        Map<String, String> headers = new LinkedHashMap<>();
        for (String line = readLine(in); line != null && !line.isEmpty(); line = readLine(in)) {
            int colon = line.indexOf(':');
            if (colon > 0) headers.put(line.substring(0, colon).trim().toLowerCase(Locale.ROOT), line.substring(colon + 1).trim());
        }

        byte[] body;
        if (method.equalsIgnoreCase("HEAD") || status == 204 || status == 304) body = new byte[0];
        else if ("chunked".equalsIgnoreCase(headers.get("transfer-encoding"))) body = readChunked(in);
        else if (headers.containsKey("content-length")) body = readExactly(in, Long.parseLong(headers.get("content-length")));
        else body = readAll(in);

        return new Result(status, reason, headers, body);
    }

    private static String readLine (InputStream in) throws IOException {
        ByteArrayOutputStream line = new ByteArrayOutputStream();
        int previous = -1;
        for (int current = in.read(); current != -1; current = in.read()) {
            if (previous == '\r' && current == '\n') {
                byte[] bytes = line.toByteArray();
                return new String(bytes, 0, bytes.length - 1, StandardCharsets.ISO_8859_1);
            }
            line.write(current);
            previous = current;
        }
        return line.size() == 0 ? null : line.toString(StandardCharsets.ISO_8859_1.name());
    }

    private static byte[] readExactly (InputStream in, long length) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream((int) Math.min(length, 1 << 20));
        byte[] buffer = new byte[8192];
        long left = length;
        while (left > 0) {
            int read = in.read(buffer, 0, (int) Math.min(buffer.length, left));
            if (read == -1) throw new IOException("the response ended early");
            out.write(buffer, 0, read);
            left -= read;
        }
        return out.toByteArray();
    }

    private static byte[] readChunked (InputStream in) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        while (true) {
            String sizeLine = readLine(in);
            if (sizeLine == null) throw new IOException("the response ended early");
            int semicolon = sizeLine.indexOf(';');
            long size = Long.parseLong((semicolon >= 0 ? sizeLine.substring(0, semicolon) : sizeLine).trim(), 16);
            if (size == 0) { while (true) { String trailer = readLine(in); if (trailer == null || trailer.isEmpty()) break; } break; }
            out.write(readExactly(in, size));
            readLine(in);
        }
        return out.toByteArray();
    }

    private static byte[] readAll (InputStream in) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buffer = new byte[8192];
        for (int read = in.read(buffer); read != -1; read = in.read(buffer)) out.write(buffer, 0, read);
        return out.toByteArray();
    }
}
