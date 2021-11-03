package com.stardomapp.constants;

public class Constants {

    public static final Integer INT_ZERO = 0;
    public static final Integer INT_ONE = 1;
    public static final Integer INT_TWO = 2;
    public static final Integer INT_FIFTEEN = 15;
    public static final Integer INT_SIXTEEN = 16;
    public static final Integer INT_THIRTY = 30;
    public static final Integer INT_FORTY_FIVE = 45;
    public static final Integer INT_SIXTY = 60;
    public static final Integer INT_ONE_THOUSAND = 1000;
    public static final Integer ALARM_MANAGER_REQUEST_CODE = 1001;

    public static final String EMPTY = "";
    public static final String POST_ID = "postId";
    public static final String WALLPAPER_INDEX = "wallPaperIndex";
    public static final String WALLPAPERS = "wallPapers";
    public static final String POST_WALLPAPER_URL = "postWallPaperURL";
    public static final String POST_WALLPAPER_SET = "postWallPaper";
    public static final String WALLPAPER_HOME_SCREEN = "homeScreen";
    public static final String WALLPAPER_LOCK_SCREEN = "lockScreen";
    public static final String WALLPAPER_CHANGE_LIST = "wallPaperChangeList";
    public static final String ADD_WALLPAPER = "addWallPaper";
    public static final String REMOVE_WALLPAPER = "removeWallPaper";
    public static final String TAG = "MainActivity";

    public static final String CANCEL_ALARM_MANAGER = "cancelAlarmManager";
    public static final String SET_WALLPAPER_CHANGE_ON_UNLOCK = "startUnLockWallPaperService";
    public static final String SET_ALARM_MANAGER = "setAlarmManager";
    public static final String RETRIEVE_WALLPAPER = "retrieveWallPaper";
    public static final String INCREMENT_CURRENT_INDEX = "incrementCurrentIndex";
    public static final String TRIGGER_INTERVALS = "timeInterval";
    public static final String TRIGGER_SPECIFIC_TIME = "timeSpecific";
    public static final String STOP_UNLOCK_WALLPAPER_SERVICE = "stopUnLockWallPaperService";
    public static final String UNIQUE_WORK_NAME = "StartPhoneUnlockServiceViaWorker";

    //Xiaomi
    public static final String BRAND_XIAOMI = "xiaomi";
    public static final String PACKAGE_XIAOMI_MAIN = "com.miui.securitycenter";
    public static final String PACKAGE_XIAOMI_COMPONENT = "com.miui.permcenter.autostart.AutoStartManagementActivity";

    //Letv
    public static final String BRAND_LETV = "letv";
    public static final String PACKAGE_LETV_MAIN = "com.letv.android.letvsafe";
    public static final String PACKAGE_LETV_COMPONENT = "com.letv.android.letvsafe.AutobootManageActivity";

    //ASUS ROG
    public static final String BRAND_ASUS = "asus";
    public static final String PACKAGE_ASUS_MAIN = "com.asus.mobilemanager";
    public static final String PACKAGE_ASUS_COMPONENT = "com.asus.mobilemanager.powersaver.PowerSaverSettings";

    //Honor
    public static final String BRAND_HONOR = "honor";
    public static final String PACKAGE_HONOR_MAIN = "com.huawei.systemmanager";
    public static final String PACKAGE_HONOR_COMPONENT = "com.huawei.systemmanager.optimize.process.ProtectActivity";

    //Oppo
    public static final String BRAND_OPPO = "oppo";
    public static final String PACKAGE_OPPO_MAIN = "com.coloros.safecenter";
    public static final String PACKAGE_OPPO_FALLBACK = "com.oppo.safe";
    public static final String PACKAGE_OPPO_COMPONENT = "com.coloros.safecenter.permission.startup.StartupAppListActivity";
    public static final String PACKAGE_OPPO_COMPONENT_FALLBACK = "com.oppo.safe.permission.startup.StartupAppListActivity";
    public static final String PACKAGE_OPPO_COMPONENT_FALLBACK_A = "com.coloros.safecenter.startupapp.StartupAppListActivity";

    //Vivo
    public static final String BRAND_VIVO = "vivo";
    public static final String PACKAGE_VIVO_MAIN = "com.iqoo.secure";
    public static final String PACKAGE_VIVO_FALLBACK = "com.vivo.perm;issionmanager";
    public static final String PACKAGE_VIVO_COMPONENT = "com.iqoo.secure.ui.phoneoptimize.AddWhiteListActivity";
    public static final String PACKAGE_VIVO_COMPONENT_FALLBACK = "com.vivo.permissionmanager.activity.BgStartUpManagerActivity";
    public static final String PACKAGE_VIVO_COMPONENT_FALLBACK_A = "com.iqoo.secure.ui.phoneoptimize.BgStartUpManager";

    //Nokia
    public static final String BRAND_NOKIA = "nokia";
    public static final String PACKAGE_NOKIA_MAIN = "com.evenwell.powersaving.g3";
    public static final String PACKAGE_NOKIA_COMPONENT = "com.evenwell.powersaving.g3.exception.PowerSaverExceptionActivity";

    //Samsung
    public static final String BRAND_SAMSUNG = "samsung";
    public static final String PACKAGE_SAMSUNG_MAIN = "com.samsung.android.lool";
    public static final String PACKAGE_SAMSUNG_COMPONENT = "com.samsung.android.sm.ui.battery.BatteryActivity";
    public static final String PACKAGE_SAMSUNG_COMPONENT_2 = "com.samsung.android.sm.battery.ui.usage.CheckableAppListActivity";
    public static final String PACKAGE_SAMSUNG_COMPONENT_3 = "com.samsung.android.sm.battery.ui.BatteryActivity";

    //One plus
    public static final String BRAND_ONE_PLUS = "oneplus";
    public static final String PACKAGE_ONE_PLUS_MAIN = "com.oneplus.security";
    public static final String PACKAGE_ONE_PLUS_COMPONENT = "com.oneplus.security.chainlaunch.view.ChainLaunchAppListActivity";
    public static final String PACKAGE_ONE_PLUS_ACTION = "com.android.settings.action.BACKGROUND_OPTIMIZE";
}
