package com.stardomapp.api;

import android.app.NotificationManager;
import android.app.WallpaperManager;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Build;
import android.preference.PreferenceManager;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.stardomapp.constants.Constants;
import com.stardomapp.utils.StardomUtils;

import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

public class StardomApiModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public StardomApiModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }


    @NonNull
    @Override
    public String getName() {
        return "StartomApi";
    }

    /**
     * Set the Wallpaper and the lock screen Image when the user clicks of
     * the Ok button of the wallpaper setting modal panel.
     *
     * @param inCategoryTitle
     * @param inPostImage
     * @param inOption
     */
    @ReactMethod
    public void setPostAsWallPaper(String inCategoryTitle, String inPostImage, String inOption) {
        try {
            new AsyncSetImage(reactContext).execute(inCategoryTitle, inPostImage, inOption);
        } catch (Exception exception) {
            Toast.makeText(reactContext, "Cannot set image " + inCategoryTitle +
                    " as wallpaper or the lockScreen", Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * @param inAction
     * @param inPostId
     * @param inURL
     */
    @ReactMethod
    public void addRemoveWallPaperAsyncStorage(String inAction, Integer inPostId, String inPostTitle, String inURL) {
        try {
            SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(reactContext.getApplicationContext());
            String wallPaperJSONObject = preferences.getString(Constants.WALLPAPER_CHANGE_LIST, Constants.EMPTY);
            JSONObject wallPaperObjectJSON;
            switch (inAction) {
                case Constants.ADD_WALLPAPER:
                    if (wallPaperJSONObject.isEmpty()) {
                        wallPaperObjectJSON = StardomUtils.createNewJSONArray(inPostId, inURL, inPostTitle, reactContext.getApplicationContext());
                    } else {
                        wallPaperObjectJSON = StardomUtils.parseAndAddNewJSONObject(wallPaperJSONObject, inPostId, inURL);
                    }
                    SharedPreferences.Editor preferencesEditor = preferences.edit();
                    preferencesEditor.putString(Constants.WALLPAPER_CHANGE_LIST, wallPaperObjectJSON.toString());
                    preferencesEditor.apply();
                    break;
                case Constants.REMOVE_WALLPAPER:
                    if (!wallPaperJSONObject.isEmpty()) {
                        wallPaperObjectJSON = StardomUtils.removeFromWallPaperChangeList(wallPaperJSONObject, inPostId);
                        SharedPreferences.Editor removePreferencesEditor = preferences.edit();
                        removePreferencesEditor.putString(Constants.WALLPAPER_CHANGE_LIST, wallPaperObjectJSON.toString());
                        removePreferencesEditor.apply();
                    }
                    break;
                default:
                    Log.i(Constants.TAG, "No Wallpaper Actions for Async storage matched: " + inAction);
                    break;
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot add post " + inPostTitle + " to the wallPaper list", exception);
            Toast.makeText(reactContext, "Cannot add post " + inPostTitle + " to the wallPaper list", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void getWallPaperChangeList() {
        try {
            StardomUtils.getSavedWallPaperChangeList(reactContext.getApplicationContext());
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot retrieve wallpaper change list", exception);
        }
    }

    /**
     *
     */
    @ReactMethod
    public void wallPaperChangeActionService(String inAction) {
        try {
            WallPaperChangeService wallPaperChangeService = new WallPaperChangeService(reactContext.getApplicationContext());
            switch (inAction){
                case Constants.SET_ALARM_MANAGER:
                    wallPaperChangeService.cancelAlarmManager();
                    wallPaperChangeService.setAlarmManager();
                    break;
                case Constants.CANCEL_ALARM_MANAGER:
                    wallPaperChangeService.cancelAlarmManager();
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot start wallpaper change service", exception);
            Toast.makeText(reactContext, "Cannot start wallpaper change service", Toast.LENGTH_SHORT).show();
        }
    }


    /**
     * Get the URL and the Post category title to set the wallpaper or the lock Screen image.
     */
    private static class AsyncSetImage extends AsyncTask<String, Integer, String> {

        private ReactApplicationContext mContext;
        private String mPostTitle;
        private NotificationManager notificationManager;
        private NotificationCompat.Builder notificationBuilder;

        private AsyncSetImage(ReactApplicationContext reactApplicationContext) {
            this.mContext = reactApplicationContext;
        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            super.onProgressUpdate(values);
        }

        /**
         * Get the bitmap image from the URL passed by the UI component.
         *
         * @param src
         * @return
         */
        private static Bitmap getBitmapFromURL(String src) throws IOException {
            HttpURLConnection connection = (HttpURLConnection) new URL(src).openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            return BitmapFactory.decodeStream(input);
        }

        @RequiresApi(api = Build.VERSION_CODES.N)
        @Override
        protected String doInBackground(String... inParameters) {
            try {
                mPostTitle = inParameters[Constants.INT_ZERO];
                String option = inParameters[Constants.INT_TWO];
                Bitmap bitmapImage = getBitmapFromURL(inParameters[Constants.INT_ONE]);
                WallpaperManager wallpaperManager = WallpaperManager.getInstance(mContext);
                wallpaperManager.setBitmap(bitmapImage, null, true,
                        getWallPaperSetFlag(option));
                return Constants.POST_WALLPAPER_SET;
            } catch (IOException exception) {
                Toast.makeText(reactContext, "Cannot set image " + mPostTitle +
                        " as wallpaper or the lockScreen", Toast.LENGTH_SHORT).show();
            }
            return Constants.EMPTY;
        }

        /**
         * Sets the wallpaper flag option based on the option selected from the UI.
         *
         * @param option
         * @return
         */
        @RequiresApi(api = Build.VERSION_CODES.N)
        private int getWallPaperSetFlag(String option) {
            switch (option) {
                case Constants.WALLPAPER_HOME_SCREEN:
                    return WallpaperManager.FLAG_SYSTEM;
                case Constants.WALLPAPER_LOCK_SCREEN:
                    return WallpaperManager.FLAG_LOCK;
                default:
                    return WallpaperManager.FLAG_LOCK | WallpaperManager.FLAG_SYSTEM;
            }
        }

        @Override
        protected void onPostExecute(String inResult) {
            if (Constants.POST_WALLPAPER_SET.equals(inResult)) {
                Toast.makeText(mContext, "Wallpaper set for " + mPostTitle, Toast.LENGTH_SHORT).show();
            }
        }
    }
}
