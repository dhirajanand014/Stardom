package com.stardomapp.api;

import android.app.WallpaperManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Build;
import android.preference.PreferenceManager;
import android.util.Log;
import android.widget.Toast;

import com.stardomapp.constants.Constants;
import com.stardomapp.utils.StardomUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import androidx.annotation.RequiresApi;

public class WallPaperChangeReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        try {
            JSONObject wallPaper = wallPaperActions(context, Constants.RETRIEVE_WALLPAPER);
            if (null != wallPaper && wallPaper.has(Constants.POST_WALLPAPER_URL)) {
                String postURL = wallPaper.get(Constants.POST_WALLPAPER_URL).toString();
                new AsyncSetWallPaper(context).execute(postURL);
            }
            Toast.makeText(context, "Receiver called", Toast.LENGTH_SHORT).show();
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot process wallpaper change", exception);
        }

    }

    /**
     * @param inContext
     * @param inAction
     * @return
     * @throws JSONException
     */
    private JSONObject wallPaperActions(Context inContext, String inAction) throws JSONException {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(inContext);
        String wallPaperJSONObject = preferences.getString(Constants.WALLPAPER_CHANGE_LIST, Constants.EMPTY);
        JSONObject jsonObject = StardomUtils.parseJSONObject(wallPaperJSONObject);
        if (!wallPaperJSONObject.isEmpty()) {
            int currentIndex = (int) jsonObject.get(Constants.WALLPAPER_INDEX);
            JSONArray wallPaperArray = jsonObject.getJSONArray(Constants.WALLPAPERS);
            switch (inAction) {
                case Constants.RETRIEVE_WALLPAPER:
                    if (currentIndex < wallPaperArray.length() || currentIndex == wallPaperArray.length() - Constants.INT_ONE) {
                        return wallPaperArray.getJSONObject(currentIndex);
                    } else if (currentIndex > wallPaperArray.length() && wallPaperArray.length() > Constants.INT_ONE) {
                        setWallPaperIndex(preferences, jsonObject, Constants.INT_ZERO);
                        return wallPaperArray.getJSONObject(Constants.INT_ZERO);
                    } else {
                        setWallPaperIndex(preferences, jsonObject, Constants.INT_ZERO);
                    }
                    break;
                case Constants.INCREMENT_CURRENT_INDEX:
                    if (currentIndex < wallPaperArray.length() - Constants.INT_ONE) {
                        setWallPaperIndex(preferences, jsonObject, currentIndex + Constants.INT_ONE);
                    } else {
                        setWallPaperIndex(preferences, jsonObject, Constants.INT_ZERO);
                    }
                    break;
                default:
                    Log.i(Constants.TAG, "No Wallpaper Actions matched: " + inAction);
                    break;
            }
        }
        return null;
    }

    /**
     * @param preferences
     * @param jsonObject
     * @throws JSONException
     */
    private void setWallPaperIndex(SharedPreferences preferences, JSONObject jsonObject, int inValue) throws JSONException {
        jsonObject.put(Constants.WALLPAPER_INDEX, inValue);
        SharedPreferences.Editor preferencesEditor = preferences.edit();
        preferencesEditor.putString(Constants.WALLPAPER_CHANGE_LIST, jsonObject.toString());
        preferencesEditor.apply();
    }

    /**
     *
     */
    private class AsyncSetWallPaper extends AsyncTask<String, Integer, String> {

        Context context;

        public AsyncSetWallPaper(Context context) {
            this.context = context;
        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            super.onProgressUpdate(values);
        }

        /**
         * Get the bitmap image by parsing the json that is stored in the async storage.
         *
         * @param inSrc
         * @return
         */
        private Bitmap getBitmapFromURL(String inSrc) throws IOException {
            HttpURLConnection connection = (HttpURLConnection) new URL(inSrc).openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            return BitmapFactory.decodeStream(input);
        }

        @RequiresApi(api = Build.VERSION_CODES.N)
        @Override
        protected String doInBackground(String... inParameters) {
            try {
                Bitmap bitmapImage = getBitmapFromURL(inParameters[Constants.INT_ZERO]);
                WallpaperManager wallpaperManager = WallpaperManager.getInstance(context);
                wallpaperManager.setBitmap(bitmapImage, null, true,
                        WallpaperManager.FLAG_SYSTEM);
                Toast.makeText(context, "Changed wallpaper", Toast.LENGTH_SHORT).show();
                return Constants.POST_WALLPAPER_SET;
            } catch (IOException exception) {
                Log.e(Constants.TAG, "Cannot set wallpaper on change", exception);
            }
            return Constants.EMPTY;
        }

        @Override
        protected void onPostExecute(String inResult) {
            try {
                if (!inResult.isEmpty()) {
                    wallPaperActions(context, Constants.INCREMENT_CURRENT_INDEX);
                }
            } catch (Exception exception) {
                Log.e(Constants.TAG, "Cannot increment wallpaper index", exception);
            }
        }
    }
}