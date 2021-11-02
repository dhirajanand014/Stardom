package com.stardomapp.utils;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.preference.PreferenceManager;
import android.util.Log;
import android.widget.Toast;

import com.stardomapp.constants.Constants;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.concurrent.TimeUnit;

public class StardomUtils {
    /**
     * @param inJsonString
     * @return
     * @throws JSONException
     */
    public static JSONArray parseJSONArray(String inJsonString) throws JSONException {
        return new JSONArray(inJsonString);
    }

    /**
     * @param inJsonString
     * @return
     * @throws JSONException
     */
    public static JSONObject parseJSONObject(String inJsonString) throws JSONException {
        return new JSONObject(inJsonString);
    }

    /**
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
     * @param inContext
     * @return
     */
    public static String getSavedWallPaperChangeList(Context inContext) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(inContext);
        return preferences.getString(Constants.WALLPAPER_CHANGE_LIST, Constants.EMPTY);
    }

    /**
     * @param inWallPaperJSONArray
     * @param inSelectedPost
     * @return
     * @throws JSONException
     */
    public static boolean removePostFromWallPaperChangeList(JSONArray
                                                                    inWallPaperJSONArray, JSONObject inSelectedPost)
            throws JSONException {
        for (int index = Constants.INT_ZERO; index < inWallPaperJSONArray.length(); index++) {
            JSONObject jsonObject = inWallPaperJSONArray.getJSONObject(index);
            if (jsonObject.has(Constants.POST_ID) && jsonObject.get(Constants.POST_ID)
                    .equals(inSelectedPost.get(Constants.POST_ID))) {
                inWallPaperJSONArray.remove(index);
                return true;
            }
        }
        return false;
    }


    /**
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
                default:
                    return true;
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Could not open auto start settings", exception);
            Toast.makeText(inContext, "Failed to open auto start settings", Toast.LENGTH_SHORT).show();
        }
        return false;
    }

    /**
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
