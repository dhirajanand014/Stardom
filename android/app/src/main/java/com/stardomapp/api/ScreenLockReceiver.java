package com.stardomapp.api;

import android.app.WallpaperManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.os.Build;
import android.util.Log;

import com.stardomapp.constants.Constants;
import com.stardomapp.utils.StardomUtils;

import org.json.JSONObject;

import java.io.IOException;

import androidx.annotation.RequiresApi;

/**
 * Broadcast receiver called when phone device unlocks everytime.
 */
public class ScreenLockReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        // This method is called when the BroadcastReceiver is receiving an Intent broadcast.
        if (Intent.ACTION_USER_PRESENT.equals(intent.getAction())) {
            try {
                JSONObject wallPaper = StardomUtils.wallPaperActions(context, Constants.RETRIEVE_WALLPAPER);
                if (null != wallPaper && wallPaper.has(Constants.POST_WALLPAPER_URL)) {
                    String postURL = wallPaper.get(Constants.POST_WALLPAPER_URL).toString();
                    new ScreenLockReceiver.AsyncSetWallPaper(context).execute(postURL);
                }
            } catch (Exception exception) {
                Log.e(Constants.TAG, "Cannot process wallpaper change", exception);
            }
        }
    }

    /**
     * Async method to set the wallpaper in the device home screen by fetching the wallpaper image by the post wallpaper url.
     * This method returns the increment function called when wallpaper is set to the device home screen.
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

        @RequiresApi(api = Build.VERSION_CODES.N)
        @Override
        protected String doInBackground(String... inParameters) {
            try {
                Bitmap bitmapImage = StardomUtils.getBitmapFromURL(inParameters[Constants.INT_ZERO]);
                if (null != bitmapImage) {
                    WallpaperManager wallpaperManager = WallpaperManager.getInstance(context);
                    wallpaperManager.setBitmap(bitmapImage, null, true,
                            WallpaperManager.FLAG_SYSTEM);
                    return Constants.POST_WALLPAPER_SET;
                }
            } catch (IOException exception) {
                Log.e(Constants.TAG, "Cannot set wallpaper on change", exception);
            }
            return Constants.EMPTY;
        }

        @Override
        protected void onPostExecute(String inResult) {
            try {
                if (!inResult.isEmpty()) {
                    StardomUtils.wallPaperActions(context, Constants.INCREMENT_CURRENT_INDEX);
                }
            } catch (Exception exception) {
                Log.e(Constants.TAG, "Cannot increment wallpaper index", exception);
            }
        }
    }
}