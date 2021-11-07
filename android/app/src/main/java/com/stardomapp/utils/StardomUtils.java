package com.stardomapp.utils;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.preference.PreferenceManager;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import com.stardomapp.constants.Constants;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.concurrent.TimeUnit;

/**
 * Startdom Utility class.
 */
public class StardomUtils {

    /**
     * Parse JSON String value to JSON Object instance. Returns the parsed JSON Object.
     *
     * @param inJsonString
     * @return
     * @throws JSONException
     */
    public static JSONObject parseJSONObject(String inJsonString) throws JSONException {
        return new JSONObject(inJsonString);
    }

    /**
     * Create initial JSON array with preliminary wallpaper post JSON Object. Returns the created JSON Object
     *
     * @param inPostId
     * @param inURL
     * @return
     * @throws JSONException
     */
    public static JSONObject createNewJSONArray(Integer inPostId, String inURL, String inPostTile, Context inContext) throws JSONException {
        JSONObject mainJsonObject = new JSONObject();
        mainJsonObject.put(Constants.WALLPAPER_INDEX, Constants.INT_ZERO);

        JSONArray wallpaperJSONArray = prepareWallPaperJSONArrayFromJSONObject(inPostId, inURL);
        mainJsonObject.put(Constants.WALLPAPERS, wallpaperJSONArray);

        mainJsonObject.put(Constants.WALLPAPER_INDEX, Constants.INT_ZERO);
        Toast.makeText(inContext, "Added Post " + inPostTile + " to wallpaper change list", Toast.LENGTH_SHORT).show();
        return mainJsonObject;
    }

    /**
     * Create the Wallpaper Changer JSON object with Post ID and Post URL. Returns created JSON Object.
     *
     * @param inPostId
     * @param inURL
     * @return
     * @throws JSONException
     */
    private static JSONObject createWallPaperJSONObject(Integer inPostId, String inURL) throws JSONException {
        JSONObject wallpaperJSON = new JSONObject();
        wallpaperJSON.put(Constants.POST_ID, inPostId);
        wallpaperJSON.put(Constants.POST_WALLPAPER_URL, inURL);
        return wallpaperJSON;
    }

    /**
     * Prepare JSON Array for the Wallpaper Changer with Post ID and Post URL.Returns the prepared JSON Array.
     *
     * @param inPostId
     * @param inURL
     * @return
     * @throws JSONException
     */
    public static JSONArray prepareWallPaperJSONArrayFromJSONObject(Integer inPostId, String inURL) throws JSONException {
        JSONObject jsonObject = createWallPaperJSONObject(inPostId, inURL);
        return new JSONArray().put(jsonObject);
    }

    /**
     * Parse the existing Wallpaper Changer JSON Array and adds new item. Returns the updated JSON Object.
     *
     * @param inWallPaperObject
     * @param inPostId
     * @param inURL
     * @return
     * @throws JSONException
     */
    public static JSONObject parseAndAddNewJSONObject(String inWallPaperObject, Integer inPostId, String inURL, Context inContext, String inPostTile) throws JSONException {
        JSONObject wallPaperJSONObject = StardomUtils.parseJSONObject(inWallPaperObject);
        JSONArray wallPaperJSONArray = wallPaperJSONObject.getJSONArray(Constants.WALLPAPERS);
        JSONObject newJSONObject = StardomUtils.createWallPaperJSONObject(inPostId, inURL);
        wallPaperJSONArray.put(newJSONObject);
        Toast.makeText(inContext, "Added Post " + inPostTile + " to wallpaper change list", Toast.LENGTH_SHORT).show();
        return wallPaperJSONObject;
    }

    /**
     * Check if the post to be added to the Wallpaper Changer list already exists.
     *
     * @param inJSONArray
     * @param inPostId
     * @return
     * @throws JSONException
     */
    public static boolean checkIfPostExists(JSONArray inJSONArray, Integer inPostId) throws JSONException {
        for (int index = Constants.INT_ZERO; index < inJSONArray.length(); index++) {
            JSONObject jsonObject = inJSONArray.getJSONObject(index);
            if (jsonObject.has(Constants.POST_ID) && jsonObject.get(Constants.POST_ID).equals(inPostId)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Remove the Wallpaper Changer Post item from the Wallpaper Changer list based on the Post iD.
     *
     * @param wallPaperArray
     * @param inPostId
     * @return
     * @throws JSONException
     */
    public static boolean removeFromWallPaperChangeList(JSONArray wallPaperArray, Integer inPostId) throws JSONException {
        for (int removeIndex = Constants.INT_ZERO; removeIndex < wallPaperArray.length(); removeIndex++) {
            JSONObject postObject = wallPaperArray.getJSONObject(removeIndex);
            if (postObject.has(Constants.POST_ID) && postObject.get(Constants.POST_ID).equals(inPostId)) {
                wallPaperArray.remove(removeIndex);
                return true;
            }
        }
        return false;
    }

    /**
     * Get the Wallpaper Changer list stored in as Shared Preferences. Returns the JSON String.
     *
     * @param inContext
     * @return
     */
    public static String getSavedWallPaperChangeList(Context inContext) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(inContext);
        return preferences.getString(Constants.WALLPAPER_CHANGE_LIST, Constants.EMPTY);
    }

    /**
     * Prepares the calender instance with the input of time in milliseconds to the required time in milliseconds to trigger the
     * Wallpaper Changer Service based on the condition in intervals or specific time.
     *
     * @param inCondition
     * @param inLongMilliSeconds
     * @return
     */
    public static Calendar getCalenderFromMilliSeconds(String inCondition, Long
            inLongMilliSeconds) {
        Calendar millisCalendar = Calendar.getInstance();
        if (Constants.TRIGGER_INTERVALS.equals(inCondition)) {
            // convert it to millisecond and plus it to current time;
            long remainValue = getRemainingMillis(millisCalendar);
            millisCalendar.setTimeInMillis(remainValue);
        } else if (Constants.TRIGGER_SPECIFIC_TIME.equals(inCondition)) {
            millisCalendar.setTimeInMillis(inLongMilliSeconds);
            Calendar newCalendar = Calendar.getInstance();
            if (millisCalendar.get(Calendar.HOUR_OF_DAY) <= Calendar.getInstance().get(Calendar.HOUR_OF_DAY)) {
                newCalendar.add(Calendar.DAY_OF_YEAR, Constants.INT_ONE); // add, not set!
            }
            newCalendar.set(Calendar.HOUR_OF_DAY, millisCalendar.get(Calendar.HOUR_OF_DAY));
            newCalendar.set(Calendar.MINUTE, millisCalendar.get(Calendar.MINUTE));
            newCalendar.set(Calendar.SECOND, Constants.INT_ZERO);
            return newCalendar; // return for TRIGGER_SPECIFIC_TIME
        }
        return millisCalendar; // return for TRIGGER_INTERVALS
    }

    /**
     * For the time in intervals, get and start from the next available quarter minutes of the hour.
     * Returns the nearest 15th minute in milliseconds.
     *
     * @param inMillisCalendar
     * @return
     */
    private static long getRemainingMillis(Calendar inMillisCalendar) {
        int minute = inMillisCalendar.get(Calendar.MINUTE);
        long startMillis = System.currentTimeMillis();
        long remainValue;
        if (minute < Constants.INT_ZERO) {
            remainValue = Constants.INT_FIFTEEN - minute;
        } else if (minute < Constants.INT_THIRTY) {
            remainValue = Constants.INT_THIRTY - minute;
        } else if (minute < Constants.INT_FORTY_FIVE) {
            remainValue = Constants.INT_FORTY_FIVE - minute;
        } else {
            remainValue = Constants.INT_SIXTY - minute;
        }
        return startMillis + remainValue * Constants.INT_SIXTY * Constants.INT_ONE_THOUSAND;
    }

    /**
     * Open the auto start permission. This permission allows the Unlock Wallpaper Changer service to be called even after the
     * Stardom app is killed or cleared from the recent apps.
     *
     * @param inContext
     * @return
     */
    public static boolean openAutoStartPermission(Context inContext) {
        String buildInfo = Build.BRAND.toLowerCase();
        try {
            switch (buildInfo) {
                case Constants.BRAND_ASUS:
                    startIntent(inContext, Constants.PACKAGE_ASUS_MAIN, Constants.PACKAGE_ASUS_COMPONENT);
                    return true;
                case Constants.BRAND_XIAOMI:
                    startIntent(inContext, Constants.PACKAGE_XIAOMI_MAIN, Constants.PACKAGE_XIAOMI_COMPONENT);
                    return true;
                case Constants.BRAND_LETV:
                    startIntent(inContext, Constants.PACKAGE_LETV_MAIN, Constants.PACKAGE_LETV_COMPONENT);
                    return true;
                case Constants.BRAND_HONOR:
                    startIntent(inContext, Constants.PACKAGE_HONOR_MAIN, Constants.PACKAGE_HONOR_COMPONENT);
                    return true;
                case Constants.BRAND_OPPO:
                    autoStartOppo(inContext);
                    return true;
                case Constants.BRAND_VIVO:
                    autoStartVivo(inContext);
                    return true;
                case Constants.BRAND_NOKIA:
                    startIntent(inContext, Constants.PACKAGE_NOKIA_MAIN, Constants.PACKAGE_NOKIA_COMPONENT);
                    return true;
                case Constants.BRAND_ONE_PLUS:
                    autoStartOnePlus(inContext);
                    return true;
                default:
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        PowerManager pm = (PowerManager) inContext.getSystemService(Context.POWER_SERVICE);
                        if (!pm.isIgnoringBatteryOptimizations(inContext.getPackageName())) {
                            Intent intent = new Intent();
                            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                            intent.setAction(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS);
                            inContext.startActivity(intent);
                            return true;
                        }
                    }
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Could not open auto start settings", exception);
            Toast.makeText(inContext, "Failed to open auto start settings", Toast.LENGTH_SHORT).show();
        }
        return false;
    }

    /**
     * @param inContext
     */
    private static void autoStartOnePlus(Context inContext) {
        Intent intent = new Intent();
        intent.setData(Uri.parse("package:" + inContext.getPackageName()));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(Constants.PACKAGE_ONE_PLUS_ACTION);
        inContext.startActivity(intent);
    }

    /**
     * Start the Auto start permission as an activity within the Startom Application.
     *
     * @param inContext
     * @param inPackageName
     * @param inComponentName
     * @throws Exception
     */
    private static void startIntent(Context inContext, String inPackageName, String
            inComponentName) throws Exception {
        try {
            Intent intent = new Intent();
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            intent.setComponent(new ComponentName(inPackageName, inComponentName));
            inContext.startActivity(intent);
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Could not autoStart intent", exception);
            throw exception;
        }
    }

    /**
     * Auto start permission for Oppo devices with fallback autostart components.
     *
     * @param inContext
     */
    private static void autoStartOppo(Context inContext) {
        try {
            startIntent(inContext, Constants.PACKAGE_OPPO_MAIN, Constants.PACKAGE_OPPO_COMPONENT);
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Could not autoStart OPPO main intent", exception);
            try {
                startIntent(inContext, Constants.PACKAGE_OPPO_FALLBACK, Constants.PACKAGE_OPPO_COMPONENT_FALLBACK);
            } catch (Exception fallbackException) {
                Log.e(Constants.TAG, "Could not autoStart OPPO fallback intent", fallbackException);
                try {
                    startIntent(inContext, Constants.PACKAGE_OPPO_MAIN, Constants.PACKAGE_OPPO_COMPONENT_FALLBACK_A);
                } catch (Exception mainFallbackException) {
                    Log.e(Constants.TAG, "Could not autoStart OPPO main fallback intent", mainFallbackException);
                }
            }
        }
    }

    /**
     * Auto start permission for Vivo devices with fallback autostart components.
     *
     * @param inContext
     */
    private static void autoStartVivo(Context inContext) {
        try {
            startIntent(inContext, Constants.PACKAGE_VIVO_MAIN, Constants.PACKAGE_VIVO_COMPONENT);
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Could not autoStart VIVO main intent", exception);
            try {
                startIntent(inContext, Constants.PACKAGE_VIVO_FALLBACK, Constants.PACKAGE_VIVO_COMPONENT_FALLBACK);
            } catch (Exception fallbackException) {
                Log.e(Constants.TAG, "Could not autoStart VIVO fallback intent", fallbackException);
                try {
                    startIntent(inContext, Constants.PACKAGE_VIVO_MAIN, Constants.PACKAGE_VIVO_COMPONENT_FALLBACK_A);
                } catch (Exception mainFallbackException) {
                    Log.e(Constants.TAG, "Could not autoStart VIVO main fallback intent", mainFallbackException);
                }
            }
        }
    }

    /**
     * Get time from milliseconds to minute or hour to display in the toast message.
     *
     * @param inMillis
     * @return
     */
    public static String formatTimeFromMillis(Long inMillis) {
        long time = TimeUnit.MILLISECONDS.toMinutes(inMillis);
        if (time >= Constants.INT_SIXTY) {
            return String.valueOf(TimeUnit.MINUTES.toHours(time)).concat(" hours.");
        }
        return String.valueOf(time).concat(" minutes.");
    }
}
