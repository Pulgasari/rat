package dev.rat.filesync;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.IBinder;

import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

// short-lived foreground service that keeps the app process alive during a manual
// send. the upload itself runs on the plugin's worker thread (same process); this
// service only raises the process to foreground priority so android does not kill
// it mid-transfer when the user backgrounds the app. started before the send
// thread and stopped when it finishes (see FileSyncPlugin.send). the separate
// SyncService handles the recurring auto-sync; this one is for one-off sends.
public class TransferService extends Service {

    public static final String EXTRA_TEXT = "text";
    private static final int NOTIF_ID = 4712;
    private static final String CHANNEL = "filesync_transfer";

    public static void start(Context ctx, String text) {
        Intent i = new Intent(ctx, TransferService.class);
        i.putExtra(EXTRA_TEXT, text);
        ContextCompat.startForegroundService(ctx, i);
    }

    public static void stop(Context ctx) {
        ctx.stopService(new Intent(ctx, TransferService.class));
    }

    @Override
    public void onCreate() {
        super.onCreate();
        createChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String text = intent != null ? intent.getStringExtra(EXTRA_TEXT) : null;
        Notification n = buildNotification(text == null || text.isEmpty() ? "Sending files…" : text);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(NOTIF_ID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC);
        } else {
            startForeground(NOTIF_ID, n);
        }
        // the plugin stops us when the transfer completes; no reason to restart.
        return START_NOT_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) { return null; }

    private void createChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, "File transfer", NotificationManager.IMPORTANCE_LOW);
            ch.setDescription("a file transfer in progress");
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
}
