package dev.rat.filesync;

import android.content.Context;
import android.net.wifi.WifiManager;

import org.json.JSONObject;

import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.nio.charset.StandardCharsets;

// localsend v2 discovery on the phone: udp multicast on 224.0.0.167:53317. we
// announce ourselves and listen for other devices' announcements, learning their
// ip from the datagram source (so no manual typing). matches desktop/discovery.js.
// best-effort: needs a multicast lock; failures are surfaced to the caller.
public class Discovery {

    public interface Listener {
        void onDevice(JSONObject info, String ip);
    }

    private static final String GROUP = "224.0.0.167";
    private static final int PORT = 53317;

    private final Context ctx;
    private final JSONObject self;          // our announce info (without the announce flag)
    private final String selfFingerprint;
    private final Listener listener;

    private volatile boolean running;
    private MulticastSocket socket;
    private WifiManager.MulticastLock lock;
    private Thread rxThread;

    public Discovery(Context ctx, JSONObject self, String fingerprint, Listener listener) {
        this.ctx = ctx.getApplicationContext();
        this.self = self;
        this.selfFingerprint = fingerprint;
        this.listener = listener;
    }

    public void start() throws Exception {
        if (running) return;
        WifiManager wm = (WifiManager) ctx.getSystemService(Context.WIFI_SERVICE);
        if (wm != null) {
            lock = wm.createMulticastLock("filesync-discovery");
            lock.setReferenceCounted(true);
            lock.acquire();
        }
        socket = new MulticastSocket(PORT);
        socket.setReuseAddress(true);
        try {
            socket.joinGroup(InetAddress.getByName(GROUP));
        } catch (Exception e) {
            // some networks block multicast; we can still receive unicast replies
        }
        running = true;
        rxThread = new Thread(this::rxLoop, "filesync-discovery");
        rxThread.start();
        announce();
    }

    public void announce() {
        if (socket == null) return;
        try {
            JSONObject msg = new JSONObject(self.toString());
            msg.put("announce", true);
            byte[] b = msg.toString().getBytes(StandardCharsets.UTF_8);
            socket.send(new DatagramPacket(b, b.length, InetAddress.getByName(GROUP), PORT));
        } catch (Exception ignored) {}
    }

    private void rxLoop() {
        byte[] buf = new byte[8192];
        while (running) {
            try {
                DatagramPacket p = new DatagramPacket(buf, buf.length);
                socket.receive(p);
                String s = new String(p.getData(), p.getOffset(), p.getLength(), StandardCharsets.UTF_8);
                JSONObject info = new JSONObject(s);
                String fp = info.optString("fingerprint", "");
                if (fp.isEmpty() || fp.equals(selfFingerprint)) continue;
                listener.onDevice(info, p.getAddress().getHostAddress());
                // reply to an announcement so the peer learns us too
                if (info.optBoolean("announce", false)) {
                    JSONObject reply = new JSONObject(self.toString());
                    reply.put("announce", false);
                    byte[] rb = reply.toString().getBytes(StandardCharsets.UTF_8);
                    socket.send(new DatagramPacket(rb, rb.length, p.getAddress(), p.getPort()));
                }
            } catch (Exception e) {
                if (!running) break; // socket closed by stop()
            }
        }
    }

    public void stop() {
        running = false;
        try { if (socket != null) socket.leaveGroup(InetAddress.getByName(GROUP)); } catch (Exception ignored) {}
        try { if (socket != null) socket.close(); } catch (Exception ignored) {}
        try { if (lock != null && lock.isHeld()) lock.release(); } catch (Exception ignored) {}
        socket = null;
    }
}
