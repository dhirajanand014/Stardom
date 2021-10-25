package com.stardomapp.api;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.stardomapp.constants.Constants;
import com.stardomapp.utils.StardomUtils;

import java.util.Calendar;

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
     *
     * @param inCondition
     * @param inLongMilliSeconds
     */
    public void setAlarmManager(String inCondition, Long inLongMilliSeconds) {
        try {
            Intent alarmIntent = new Intent(context, WallPaperChangeReceiver.class);
            PendingIntent sender = PendingIntent.getBroadcast(context, Constants.INT_TWO, alarmIntent, PendingIntent.FLAG_CANCEL_CURRENT);
            AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            if (null != alarmManager) {
                Calendar calendar = StardomUtils.getCalenderFromMilliSeconds(inCondition, inLongMilliSeconds);
                alarmManager.setRepeating(AlarmManager.RTC, calendar.getTimeInMillis(), Constants.TRIGGER_INTERVALS.equals(inCondition) ? inLongMilliSeconds :
                        AlarmManager.INTERVAL_DAY, sender);
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