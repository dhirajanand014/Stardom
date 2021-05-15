package com.stardom.api;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.WallpaperManager;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.webkit.MimeTypeMap;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.stardom.constants.Constants;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.content.FileProvider;

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
     * @param inTempFilePath
     */
    @ReactMethod
    public void setPostAsWallPaper(String inCategoryTitle, String inPostImage) {
        try {
            new AsyncSetImage(reactContext).execute(inCategoryTitle, inPostImage);
        } catch (Exception exception) {
            Toast.makeText(reactContext, "Cannot set image " + inCategoryTitle +
                    " as wallpaper or the lockScreen", Toast.LENGTH_SHORT).show();
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

        @Override
        protected String doInBackground(String... inParameters) {
            try {
                mPostTitle = inParameters[Constants.INT_ZERO];
                Bitmap bitmapImage = getBitmapFromURL(inParameters[Constants.INT_ONE]);
                WallpaperManager wallpaperManager = WallpaperManager.getInstance(mContext);
                wallpaperManager.setBitmap(bitmapImage, null, true,
                        WallpaperManager.FLAG_LOCK | WallpaperManager.FLAG_SYSTEM);
                return Constants.POST_WALLPAPER_SET;
            } catch (IOException exception) {
                Toast.makeText(reactContext, "Cannot set image " + mPostTitle +
                        " as wallpaper or the lockScreen", Toast.LENGTH_SHORT).show();
            }
            return Constants.EMPTY;
        }

        @Override
        protected void onPostExecute(String inResult) {
            if (Constants.POST_WALLPAPER_SET.equals(inResult)) {
                Toast.makeText(mContext, "Wallpaper set for " + mPostTitle + "!", Toast.LENGTH_SHORT).show();
            }
        }
    }
}
