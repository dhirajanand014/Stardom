package com.stardomapp.api;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.WallpaperManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import com.stardomapp.constants.Constants;
import com.stardomapp.utils.StardomUtils;

import org.json.JSONObject;

import java.text.DateFormat;
import java.util.Calendar;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

/**
 * WallPaper changer service that is responsible to start/cancel the Alarm Manager. The Alarm Manager is set periodically to auto
 * change the wallpaper based on the time in milliseconds.
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
                alarmManager.setRepeating(AlarmManager.RTC, calendar.getTimeInMillis(), Constants.TRIGGER_INTERVALS.equals(inCondition) ? inLongMilliSeconds :
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

    /**
     * Calls a delayed service to set the wallpaper immediately when Auto Wallpaper Changer options is enabled everytime.
     */
    public void callDelaySetWallpaper() {
        try {
            new Handler().postDelayed(this::handleImmediateWallpaperChange, Constants.INT_TWO_THOUSAND);
        } catch (Exception exception) {
            Toast.makeText(context, "Could not handle delay of the wallpaper immediately!", Toast.LENGTH_SHORT).show();
            Log.e(Constants.TAG, "Could not handle delay of the wallpaper immediately on Alarm Set!", exception);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    private void handleImmediateWallpaperChange() {
        try {
            JSONObject wallPaper = StardomUtils.wallPaperActions(context, Constants.RETRIEVE_WALLPAPER);
            if (null != wallPaper && wallPaper.has(Constants.POST_WALLPAPER_URL)) {
                String postURL = wallPaper.get(Constants.POST_WALLPAPER_URL).toString();
                Bitmap bitmapImage = StardomUtils.getBitmapFromURL(postURL);
                if (null != bitmapImage) {
                    WallpaperManager wallpaperManager = WallpaperManager.getInstance(context);
                    wallpaperManager.setBitmap(bitmapImage, null, true,
                            WallpaperManager.FLAG_SYSTEM);
                    Toast.makeText(context, "Changed wallpaper", Toast.LENGTH_SHORT).show();
                    StardomUtils.wallPaperActions(context, Constants.INCREMENT_CURRENT_INDEX);
                }
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Could not set the wallpaper immediately on Alarm Set!", exception);
        }
    }

}