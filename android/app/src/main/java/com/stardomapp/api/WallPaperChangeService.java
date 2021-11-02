package com.stardomapp.api;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.stardomapp.constants.Constants;
import com.stardomapp.utils.StardomUtils;

import java.text.DateFormat;
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
            PendingIntent sender = PendingIntent.getBroadcast(context, Constants.ALARM_MANAGER_REQUEST_CODE, alarmIntent, PendingIntent.FLAG_CANCEL_CURRENT);
            AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            if (null != alarmManager) {
                Calendar calendar = StardomUtils.getCalenderFromMilliSeconds(inCondition, inLongMilliSeconds);
                alarmManager.setInexactRepeating(AlarmManager.RTC, calendar.getTimeInMillis(), Constants.TRIGGER_INTERVALS.equals(inCondition) ? inLongMilliSeconds :
                        AlarmManager.INTERVAL_DAY, sender);
                if (Constants.TRIGGER_INTERVALS.equals(inCondition)) {
                    Toast.makeText(context, "Scheduled Wallpaper Changer for interval of " + StardomUtils.formatTimeFromMillis(inLongMilliSeconds)
                            + " Starting schedule at: " + DateFormat.getTimeInstance(DateFormat.MEDIUM).format(calendar.getTime()), Toast.LENGTH_LONG).show();
                } else if (Constants.TRIGGER_SPECIFIC_TIME.equals(inCondition)) {
                    Toast.makeText(context, "Scheduled Wallpaper Changer at " + DateFormat.getTimeInstance(DateFormat.MEDIUM).format(calendar.getTime()),
                            Toast.LENGTH_LONG).show();
                }
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
            PendingIntent sender = PendingIntent.getBroadcast(context, Constants.ALARM_MANAGER_REQUEST_CODE, alarmIntent, PendingIntent.FLAG_CANCEL_CURRENT);
            AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            if (null != alarmManager && null != sender) {
                alarmManager.cancel(sender);
                sender.cancel();
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Could not cancel the Alarm Activity", exception);
        }
    }

}