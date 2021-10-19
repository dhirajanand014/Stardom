package com.stardomapp.api;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.stardomapp.constants.Constants;

import androidx.annotation.NonNull;

/**
 *
 */
public class WallPaperChangeService {

    Context context;

    public WallPaperChangeService(@NonNull Context context) {
        this.context = context;
    }

    /**
     * Start the wallpaper change events.
     */
    public void setAlarmManager() {
        try {
            Intent alarmIntent = new Intent(context, WallPaperChangeReceiver.class);
            PendingIntent sender = PendingIntent.getBroadcast(context, Constants.INT_TWO, alarmIntent, Constants.INT_ZERO);
            AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            if (null != alarmManager) {
                alarmManager.setRepeating(AlarmManager.RTC, Constants.INT_ZERO, 60000, sender);
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Could not start the Alarm Activity", exception);
        }
    }

    /**
     * Stop and cancel the wallpaper change events.
     */
    public void cancelAlarmManager() {
        try {
            Intent alarmIntent = new Intent(context, WallPaperChangeReceiver.class);
            PendingIntent sender = PendingIntent.getBroadcast(context, Constants.INT_TWO, alarmIntent, Constants.INT_ZERO);
            AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            if (null != alarmManager) {
                alarmManager.cancel(sender);
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Could not cancel the Alarm Activity", exception);
        }
    }
}