package com.stardomapp.api;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.WallpaperManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Build;
import android.preference.PreferenceManager;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.stardomapp.constants.Constants;
import com.stardomapp.utils.StardomUtils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

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
     * Check of the post already exists in Wallpaper Changer JSON list and invoke the React callback with the required response.
     *
     * @param inPostId
     * @param callback
     */
    @ReactMethod
    public void checkPostInWallPaperList(Integer inPostId, Callback callback) {
        try {
            String wallPaperList = StardomUtils.getSavedWallPaperChangeList(reactContext.getApplicationContext());
            if (!wallPaperList.isEmpty()) {
                JSONObject wallPaperJSONObject = StardomUtils.parseJSONObject(wallPaperList);
                JSONArray wallPaperJSONArray = wallPaperJSONObject.getJSONArray(Constants.WALLPAPERS);
                callback.invoke(StardomUtils.checkIfPostExists(wallPaperJSONArray, inPostId));
            } else {
                callback.invoke(false);
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot parse wallPaper list", exception);
            Toast.makeText(reactContext, "Cannot fetch wallPaper list", Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * Adds or Removes the post selected from the Stardom application to the Wallpaper Changer List.
     * Wallpaper changer list is first created and saved in the Shared Preferences when first post is added.
     * Consecutive additions and deletion update the Wallpaper changer list and is updated to the Shared preferences.
     *
     * @param inAction
     * @param inPostId
     * @param inPostTitle
     * @param inURL
     */
    @ReactMethod
    public void addRemoveWallPaperAsyncStorage(String inAction, Integer inPostId, String inPostTitle, String inURL) {
        try {
            SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(reactContext.getApplicationContext());
            String wallPaperJSONObject = preferences.getString(Constants.WALLPAPER_CHANGE_LIST, Constants.EMPTY);
            switch (inAction) {
                case Constants.ADD_WALLPAPER:
                    JSONObject wallPaperObjectJSON;
                    if (wallPaperJSONObject.isEmpty()) {
                        wallPaperObjectJSON = StardomUtils.createNewJSONArray(inPostId, inURL, inPostTitle,
                                reactContext.getApplicationContext());
                    } else {
                        wallPaperObjectJSON = StardomUtils.parseAndAddNewJSONObject(wallPaperJSONObject, inPostId, inURL,
                                reactContext.getApplicationContext(), inPostTitle);
                    }
                    SharedPreferences.Editor preferencesEditor = preferences.edit();
                    preferencesEditor.putString(Constants.WALLPAPER_CHANGE_LIST, wallPaperObjectJSON.toString());
                    preferencesEditor.apply();
                    break;
                case Constants.REMOVE_WALLPAPER:
                    if (!wallPaperJSONObject.isEmpty()) {
                        JSONObject parsedJSONObject = StardomUtils.parseJSONObject(wallPaperJSONObject);
                        JSONArray wallPaperArray = parsedJSONObject.getJSONArray(Constants.WALLPAPERS);
                        boolean isRemoved = StardomUtils.removeFromWallPaperChangeList(wallPaperArray, inPostId);
                        if (isRemoved) {
                            Toast.makeText(reactContext.getApplicationContext(), "Removed post " + inPostTitle + " from the wallpaper change list",
                                    Toast.LENGTH_SHORT).show();
                            SharedPreferences.Editor removePreferencesEditor = preferences.edit();
                            removePreferencesEditor.putString(Constants.WALLPAPER_CHANGE_LIST, parsedJSONObject.toString());
                            removePreferencesEditor.apply();
                        } else {
                            Toast.makeText(reactContext.getApplicationContext(), "Could not remove post " + inPostTitle + " from the wallpaper change list",
                                    Toast.LENGTH_SHORT).show();
                        }
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

    /**
     * Gets the Wallpaper Changer list containing the looper count and post wallpapers.
     *
     * @param callback
     */
    @ReactMethod
    public void getWallPaperChangeList(Callback callback) {
        try {
            String wallPaperList = StardomUtils.getSavedWallPaperChangeList(reactContext.getApplicationContext());
            callback.invoke(wallPaperList);
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot retrieve wallpaper change list", exception);
        }
    }

    /**
     * Handler to manage the Set/Start/Stop of the Wallpaper changer list.
     * Starts/Stops the Alarm Manager based on the condition of interval or specific time.
     * Starts/Stops the Screen Unlock service when the Wallpaper Changer toggle is active and inactive.
     */
    @ReactMethod
    public void wallPaperChangeActionService(String inAction, String inCondition, String inLongMilliSeconds) {
        try {
            WallPaperChangeService wallPaperChangeService = new WallPaperChangeService(reactContext.getApplicationContext());
            switch (inAction) {
                case Constants.SET_WALLPAPER_CHANGE_ON_UNLOCK:
                    stopServiceWorker();
                    startServiceViaWorker();
                    break;
                case Constants.STOP_UNLOCK_WALLPAPER_SERVICE:
                    stopServiceWorker();
                    break;
                case Constants.SET_ALARM_MANAGER:
                    wallPaperChangeService.cancelAlarmManager();
                    wallPaperChangeService.setAlarmManager(inCondition, Long.valueOf(inLongMilliSeconds));
                    break;
                case Constants.CANCEL_ALARM_MANAGER:
                    wallPaperChangeService.cancelAlarmManager();
                    break;
                default:
                    Toast.makeText(reactContext, "No Action Matched", Toast.LENGTH_SHORT).show();
                    break;
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot start wallpaper change service", exception);
            Toast.makeText(reactContext, "Cannot start wallpaper change service", Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * Updates the Wallpaper Changer posts when user deletes the post from the Stardom application.
     * This method is used to remove the posts from the Wallpaper Changer list when user does not want the particular post
     * in the Wallpaper Changer list to be looped.
     *
     * @param inWallPaperPost
     */
    @ReactMethod
    public void updateWallPaperChangerPosts(String inWallPaperPost, Callback callback) {
        try {
            if (!inWallPaperPost.isEmpty()) {
                JSONObject selectedPost = StardomUtils.parseJSONObject(inWallPaperPost);
                String wallPaperList = StardomUtils.getSavedWallPaperChangeList(reactContext.getApplicationContext());
                if (!wallPaperList.isEmpty()) {
                    JSONObject parsedJSONObject = StardomUtils.parseJSONObject(wallPaperList);
                    JSONArray wallPaperArray = parsedJSONObject.getJSONArray(Constants.WALLPAPERS);
                    boolean isRemoved = StardomUtils.removeFromWallPaperChangeList(wallPaperArray, selectedPost.getInt(Constants.POST_ID));
                    if (isRemoved) {
                        callback.invoke(true);
                        Toast.makeText(reactContext, "Selected post removed from wallpaper change list", Toast.LENGTH_SHORT).show();
                        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(reactContext.getApplicationContext());
                        SharedPreferences.Editor removePreferencesEditor = preferences.edit();
                        removePreferencesEditor.putString(Constants.WALLPAPER_CHANGE_LIST, parsedJSONObject.toString());
                        removePreferencesEditor.apply();
                    } else {
                        Toast.makeText(reactContext, "Selected post not removed from wallpaper change list", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot remove post from wallpaper changer list", exception);
            Toast.makeText(reactContext, "Cannot remove post from wallpaper changer list", Toast.LENGTH_SHORT).show();
            callback.invoke(false);
        }
    }

    /**
     * Stop the Phone Unlock Service worker and cancel the Wallpaper Changer on Phone Unlock.
     */
    private void stopServiceWorker() {
        try {
            if (PhoneUnlockService.isServiceRunning) {
                Intent serviceIntent = new Intent(reactContext.getApplicationContext(), PhoneUnlockService.class);
                PhoneUnlockService.isStopServiceExplicit = true;
                reactContext.getApplicationContext().stopService(serviceIntent);
                WorkManager workManager = WorkManager.getInstance(reactContext.getApplicationContext());
                workManager.cancelAllWork();
            }
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot stop unlock work manager for " + Constants.UNIQUE_WORK_NAME, exception);
        }
    }

    /**
     * Perform the Autostart permission check and starts the activity in the same Stardom application to enablement.
     *
     * @param callback
     */
    @ReactMethod
    public void redirectAutoStartPermission(Callback callback) {
        try {
            boolean isAutoStartEnabled = StardomUtils.openAutoStartPermission(reactContext.getApplicationContext());
            callback.invoke(isAutoStartEnabled);
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot start auto start permissions", exception);
            Toast.makeText(reactContext, "Cannot start auto start permissions", Toast.LENGTH_SHORT).show();
            callback.invoke(false);
        }
    }

    /**
     * Check if wallpaper changer alarm is active.
     *
     * @param callback
     */
    @ReactMethod
    public void checkAlarmActive(Callback callback) {
        try {
            Intent alarmIntent = new Intent(reactContext.getApplicationContext(), WallPaperChangeReceiver.class);
            PendingIntent checkPendingIntent = PendingIntent.getBroadcast(reactContext.getApplicationContext(), Constants.ALARM_MANAGER_REQUEST_CODE,
                    alarmIntent, PendingIntent.FLAG_NO_CREATE);
            callback.invoke(null != checkPendingIntent);
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot check alarm active", exception);
            callback.invoke(false);
        }
    }

    /**
     * Checks if the current device matches one of the particular device listed. This is needed for the UI to display the Enable Modal
     * to allow the device to enable the option of Auto Start.
     *
     * @return
     */
    @ReactMethod
    public void isOneOfPhoneBrand(Callback callback) {
        callback.invoke(Constants.BRAND_ASUS.equals(Build.BRAND.toLowerCase()) || Constants.BRAND_XIAOMI.equals(Build.BRAND.toLowerCase()) || Constants.BRAND_LETV.equals(Build.BRAND.toLowerCase())
                || Constants.BRAND_HONOR.equals(Build.BRAND.toLowerCase()) || Constants.BRAND_OPPO.equals(Build.BRAND.toLowerCase()) || Constants.BRAND_VIVO.equals(Build.BRAND.toLowerCase())
                || Constants.BRAND_NOKIA.equals(Build.BRAND.toLowerCase()) || Constants.BRAND_ONE_PLUS.equals(Build.BRAND.toLowerCase()));
    }

    /**
     * Starts the periodic work manager and enqueues to the existing work manager list to enable the Wallpaper Changer on Phone unlock.
     */
    public void startServiceViaWorker() {
        try {
            WorkManager workManager = WorkManager.getInstance(reactContext.getApplicationContext());

            // As per Documentation: The minimum repeat interval that can be defined is 15 minutes (
            // same as the JobScheduler API), but in practice 15 doesn't work. Using 16 here
            PeriodicWorkRequest request = new PeriodicWorkRequest.Builder(PhoneUnlockWorker.class, Constants.INT_SIXTEEN, TimeUnit.MINUTES)
                    .build();
            // below method will schedule a new work, each time app is opened
            //workManager.enqueue(request);

            // to schedule a unique work, no matter how many times app is opened i.e. startServiceViaWorker gets called
            // https://developer.android.com/topic/libraries/architecture/workmanager/how-to/unique-work
            // do check for AutoStart permission
            workManager.enqueueUniquePeriodicWork(Constants.UNIQUE_WORK_NAME, ExistingPeriodicWorkPolicy.REPLACE, request);
        } catch (Exception exception) {
            Log.e(Constants.TAG, "Cannot start unlock work manager for " + Constants.UNIQUE_WORK_NAME, exception);
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
