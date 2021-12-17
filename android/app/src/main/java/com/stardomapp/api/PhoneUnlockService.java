package com.stardomapp.api;

import android.app.Service;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.IBinder;

import java.util.Timer;

/**
 * Service to change the Home Scree Wallpaper when user unlocks the device.
 */
public class PhoneUnlockService extends Service {
    public static boolean isServiceRunning;
    public static boolean isStopServiceExplicit;
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
        isServiceRunning = false;

        //stopForeground(true);

        //Stop the service by itself on destroy of the application.
        stopSelf();
        // unregister receiver
        unregisterReceiver(screenLockReceiver);

        // cancel the timer
        if (null != timer) {
            timer.cancel();
        }

        // Do execute the below code when the Wallpaper changer service is stopped on button click.
        if (!isStopServiceExplicit) {
            // call WallpaperReceiver which will restart this service
            Intent broadcastIntent = new Intent(this, PhoneUnlockWorkerReceiver.class);
            sendBroadcast(broadcastIntent);
        }
        isStopServiceExplicit = false;
        super.onDestroy();
    }

    /**
     * Called when the app is removed from the recent apps section.
     *
     * @param rootIntent
     */
    @Override
    public void onTaskRemoved(Intent rootIntent) {
        super.onTaskRemoved(rootIntent);
        if (isServiceRunning) {
            // call WallpaperReceiver which will restart this service
            Intent broadcastIntent = new Intent(this, PhoneUnlockWorkerReceiver.class);
            sendBroadcast(broadcastIntent);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}