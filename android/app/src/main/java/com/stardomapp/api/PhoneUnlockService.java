package com.stardomapp.api;

import android.app.Service;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.IBinder;
import android.widget.Toast;

import java.util.Timer;

public class PhoneUnlockService extends Service {
    public static boolean isServiceRunning;
    private ScreenLockReceiver screenLockReceiver;
    private Timer timer;

    public PhoneUnlockService() {
        isServiceRunning = false;
        screenLockReceiver = new ScreenLockReceiver();
        timer = new Timer();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        isServiceRunning = true;
        // register receiver to listen for screen on events
        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_USER_PRESENT);
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        registerReceiver(screenLockReceiver, filter);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        super.onStartCommand(intent, flags, startId);
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        Toast.makeText(getApplicationContext(), "Ondestroy called", Toast.LENGTH_LONG).show();
        isServiceRunning = false;
        stopForeground(true);
        // unregister receiver
        unregisterReceiver(screenLockReceiver);

        // cancel the timer
        if (null != timer) {
            timer.cancel();
        }

        // call WallpaperReceiver which will restart this service
        Intent broadcastIntent = new Intent(this, PhoneUnlockWorkerReceiver.class);
        sendBroadcast(broadcastIntent);

        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}