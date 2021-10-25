package com.stardomapp.utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.widget.Toast;

import com.stardomapp.constants.Constants;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;

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
     * @param inWallPaperJSONObject
     * @param inPostId
     * @return
     * @throws JSONException
     */
    public static JSONObject removeFromWallPaperChangeList(String inWallPaperJSONObject, Integer inPostId, Context inContext, String inPostTitle) throws JSONException {
        JSONObject parsedJSONObject = parseJSONObject(inWallPaperJSONObject);
        JSONArray wallPaperArray = parsedJSONObject.getJSONArray(Constants.WALLPAPERS);
        for (int removeIndex = Constants.INT_ZERO; removeIndex < wallPaperArray.length(); removeIndex++) {
            JSONObject postObject = wallPaperArray.getJSONObject(removeIndex);
            if (postObject.has(Constants.POST_ID) && postObject.get(Constants.POST_ID).equals(inPostId)) {
                wallPaperArray.remove(removeIndex);
                Toast.makeText(inContext, "Removed post " + inPostTitle + " from the wallpaper change list", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(inContext, "Could not remove post " + inPostTitle + " from the wallpaper change list", Toast.LENGTH_SHORT).show();
            }
        }
        return parsedJSONObject;
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
     * @param inCondition
     * @param inLongMilliSeconds
     * @return
     */
    public static Calendar getCalenderFromMilliSeconds(String inCondition, Long inLongMilliSeconds) {
        Calendar millisCalendar = Calendar.getInstance();
        if (Constants.TRIGGER_SPECIFIC_TIME.equals(inCondition)) {
            millisCalendar.setTimeInMillis(inLongMilliSeconds);

            Calendar newCalendar = Calendar.getInstance();
            if (Calendar.getInstance().get(Calendar.HOUR_OF_DAY) >= millisCalendar.get(Calendar.HOUR_OF_DAY)) {
                newCalendar.add(Calendar.DAY_OF_YEAR, Constants.INT_ONE); // add, not set!
            }
            newCalendar.set(Calendar.HOUR_OF_DAY, millisCalendar.get(Calendar.HOUR_OF_DAY));
            newCalendar.set(Calendar.MINUTE, millisCalendar.get(Calendar.MINUTE));
            newCalendar.set(Calendar.SECOND, Constants.INT_ZERO);
            return newCalendar; // return for TRIGGER_SPECIFIC_TIME
        }
        return millisCalendar; // return for TRIGGER_INTERVALS
    }
}
