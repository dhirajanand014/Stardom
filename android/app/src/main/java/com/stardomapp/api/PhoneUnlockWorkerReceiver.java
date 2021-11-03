package com.stardomapp.api;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;

/**
 * Main receiver called when initiating the start of the wallpaper changer server on phone unlock.
 */
public class PhoneUnlockWorkerReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        // We are starting PhoneUnlockWorker via a worker and not directly because since Android 7
        // (but officially since Lollipop!), any process called by a BroadcastReceiver
        // (only manifest-declared receiver) is run at low priority and hence eventually
        // killed by Android. Docs: https://developer.android.com/guide/components/broadcasts#effects-process-state
        WorkManager workManager = WorkManager.getInstance(context);
        OneTimeWorkRequest startServiceRequest = new OneTimeWorkRequest.Builder(PhoneUnlockWorker.class).build();
        workManager.enqueue(startServiceRequest);
    }
}