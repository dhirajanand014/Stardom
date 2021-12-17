package com.stardomapp.api;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.stardomapp.constants.Constants;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

/**
 * Worker service called when starting the wallpaper changer on device unlock.
 */
public class PhoneUnlockWorker extends Worker {

    private final Context context;

    public PhoneUnlockWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
        this.context = context;
    }

    @NonNull
    @Override
    public Result doWork() {
        Log.d(Constants.TAG, "doWork called for: " + this.getId());
        Log.d(Constants.TAG, "Service Running: " + PhoneUnlockService.isServiceRunning);
        if (!PhoneUnlockService.isServiceRunning) {
            Log.d(Constants.TAG, "starting service from doWork");
            Intent intent = new Intent(this.context, PhoneUnlockService.class);

            /*
             * startForegroundService is similar to startService but with an implicit promise
             * that the service will call startForeground once it begins running.
             * The service is given an amount of time comparable to the ANR interval to do this,
             * otherwise the system will automatically stop the service and declare the app ANR.
             */
            //ContextCompat.startForegroundService(context, intent);
            this.context.startService(intent);
        }
        return Result.success();
    }

    @Override
    public void onStopped() {
        Log.d(Constants.TAG, "onStopped called for: " + this.getId());
        super.onStopped();
    }
}
