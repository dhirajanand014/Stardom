import { CardStyleInterpolators } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import {
    AdenCompat, _1977Compat, BrannanCompat, BrooklynCompat, ClarendonCompat, EarlybirdCompat, GinghamCompat,
    HudsonCompat, InkwellCompat, KelvinCompat, LarkCompat, LofiCompat, MavenCompat, MayfairCompat, MoonCompat,
    NashvilleCompat, PerpetuaCompat, ReyesCompat, RiseCompat, SlumberCompat, StinsonCompat, ToasterCompat, ValenciaCompat,
    WaldenCompat, WillowCompat, Xpro2Compat, Normal
} from 'react-native-image-filter-kit';
import { isValidURL } from "../helper/Helper";

export const isIOS = Platform.OS === `ios`;
export const isAndroid = Platform.OS === `android`;

export const { width, height } = Dimensions.get(`screen`);

export const RESEND_OTP_TIME_LIMIT = 20; // 30 secs
export const AUTO_SUBMIT_OTP_TIME_LIMIT = 1;
export const OTP_INPUTS = 6;
export const BASE_DOMAIN = `https://stardom.wallpiper.app`;
const BASE_URI = `${BASE_DOMAIN}/api`;


export const screenOptions = {
    gestureEnabled: true, gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

export const tabBarOptions = {
    showLabel: false,
    scrollEnabled: true,
    style: { height: 0 }
}

export const headerLessStackOptions = {
    animation: true,
    headerShown: false,
}

export const profileScreenOptions = {
    animationEnabled: true,
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
}

export const screens = {
    SPLASH_SCREEN: `Splash Screen`,
    INTRO: `Intro`,
    CATEGORY: `Category`,
    LOGIN: `Login`,
    ADD_POST_DETAILS: `Add Post Details`,
    EDIT_POST_DETAILS: `Edit Post Details`,
    REGISTER: `Register`,
    SELECT_POST_CATEGORIES: `Select Post Categories`,
    REGISTRATION_DETAILS: `Registration Details`,
    REGISTRATION_CONFIRMATION: `Confirm Registration`,
    GLANCE: `Glance`,
    NON_MODAL: `NonModal`,
    PROFILE: `Profile`,
    EDIT_USER_PROFILE: `Edit user profile`,
    FOLLOWER_FOLLOWING_PROFILE: `Follower Following profile`,
    AUTO_WALLPAPER_CHANGER_SETTINGS: `Auto Wallpaper Changer Settings`,
    WALLPAPER_POSTS: `Wallpaper Posts`,
    VIEW_USER_POSTS: `View user posts`,
    EULA_ACCEPTANCE: `EULA Acceptance`,
    CAMERA: `Camera`,
    POSTS: `Posts`,
    MENU: `Menu`,
    OTP_VERIFICATION: `OTP Verification`,
    ABOUT_STARDOM: `About Stardom`,
    USER_FOLLOWERS_FOLLOWING: `User Follow Following`,
    POSTS_USERS_SEARCH: `Posts Users Search`,
    IMAGE_PREVIEW_FILTERS: `Image Preview Filters`,
    POSTS_TAB: `posts`,
    USERS_TAB: `users`
}

export const headerStrings = {
    SELECT_CATEGORY: `Select Categories`,
}

export const urlConstants = {
    fetchCategories: `${BASE_URI}/category`,
    fetchAllPosts: `${BASE_URI}/post`,
    userSaveAction: `${BASE_URI}/user`,
    setPostReach: `${BASE_URI}/post/reach/count`,
    fetchReportAbuses: `${BASE_URI}/reportabuses`,
    setReportAbuseIdWithPostId: `${BASE_URI}/post/reach/reportabuse`,
    validateUser: `${BASE_URI}/user/validate`,
    fetchProfilePostsCounts: `${BASE_URI}/profile/count`,
    login: `${BASE_URI}/auth/login`,
    logout: `${BASE_URI}/auth/logout`,
    getUserProfile: `${BASE_URI}/auth/userprofile`,
    getUserIdByPhoneNumber: `${BASE_URI}/userid`,
    fetchPostsByUserId: `${BASE_URI}/post/user`,
    triggerSmsOtp: `${BASE_URI}/requestotp`,
    resetSecret: `${BASE_URI}/reset`,
    fetchUserPosts: `${BASE_URI}/userpost`,
    checkUserRegistered: `${BASE_URI}/checkuser`,
    registerUser: `${BASE_URI}/auth/register`,
    userFollow: `${BASE_URI}/post/follow`,
    userUnFollow: `${BASE_URI}/post/unfollow`,
    removeFollower: `${BASE_URI}/post/removefollower`,
    updateFollowNotificaton: `${BASE_URI}/post/updatefollownotification`,
    fetchAllProfiles: `${BASE_URI}/profile`,
    addPost: `${BASE_URI}/post/details/add`,
    updatePost: `${BASE_URI}/post/details/update`,
    deletePost: `${BASE_URI}/post/delete`,
    deleteProfileImage: `${BASE_URI}/auth/deleteprofileimage`,
    fetchUsersFollowers: `${BASE_URI}/user/followers/fetch`,
    fetchUsersFollowings: `${BASE_URI}/user/following/fetch`,
    fetchAllUsers: `${BASE_URI}/user/allusers/fetch`,
    updateDeviceToken: `${BASE_URI}/auth/updatedeviceid`,
    likesCount: `${BASE_URI}/likescount`,
    profileStorageUrl: `https://stardom.wallpiper.app/main/public/storage/profile/`,
    stardomUriSchema: `stardom://`,
    sharedPostUrl: `/post/sharedpost/`,
    sharedProfileUrl: `/profile/sharedprofile/`,
    stardomDomain: `stardom://`,
    glanceShare: `post/:action/:postIdFromNotification`,
    profileShare: `profile/:action/:profileIdFromShare`
}

export const fieldControllerName = {
    PHONE_NUMBER: `phoneNumber`,
    USER_ID: `userId`,
    EMAIL: `email`,
    SECRET: `secret`,
    CONFIRM_SECRET: `confirmSecret`,
    OTP_INPUT: `otpInput`,
    NAME: `name`,
    DOB: `dob`,
    GENDER: `gender`,
    PROFILE: `profile`,
    CHANGE_WALLPAPER_CONDITION: `changeWallPaperCondition`,
    CHANGE_WALLPAPER_INTERVALS: `changeWallPaperIntervals`,
    CHANGE_WALLPAPER_SPECIFIC_TIME: `changeWallPaperSpecificTime`,
    POST_PROFILE: `postProfile`,
    POST_CATEGORIES: `postCategories`,
    LOCATION: `location`,
    GENDER_MALE: `male`,
    POST_TYPE_PRIVATE: `private`,
    POST_TYPE_PUBLIC: `public`,
    GENDER_FEMALE: `female`,
    POST_TYPE: `postType`,
    RATHER_NOT_SAY: `ratherNotSay`,
    INTERESTS: `interests`,
    CATEGORIES: `categories`,
    POST_TITLE: `postTitle`,
    POST_LINK: `postLink`,
    POST_DESCRIPTION: `postDescription`,
    FOLLOWER_ID: `follower_id`,
    FOLLOWING_ID: `following_id`,
    VERIFY_USER: `verifyUserDetails`,
    ADD_USER_BIO: `bio`,
    SEARCH_USERS: `searchUsers`,
    SEARCH_POSTS: `searchPosts`,
    SEARCH_FOLLOWERS: `searchFollowers`,
    SEARCH_FOLLOWINGS: `searchFollowings`,
    FACEBOOK_LINK: `facebookLink`,
    INSTAGRAM_LINK: `instagramLink`
}

export const keyBoardTypeConst = {
    DEFAULT: `default`,
    ANDROID_NUMERIC: `numeric`,
    IOS_NUMERIC: `number-pad`,
    TELPHONETYPE: `telephoneNumber`,
    EMAIL: `email-address`,
    TITLE: `jobTitle`,
    IOS_URL: `url`,
    URL: `URL`,
    USERNAME: `username`,
    NONE: `none`,
    NEW_PASSWORD: `newPassword`,
    ONETIMECODE: `oneTimeCode`,
    NAME: `name`,
    PASSWORD: `password`
}

export const textContentType = {
    EMAIL: `emailAddress`,
}

export const actionButtonTextConstants = {
    LOGIN: `Login`,
    LOGOUT: `Logout`,
    REGISTER: `Register`,
    SUBMIT: `Submit`,
    SURE: `Sure`,
    NEXT: `Next`,
    SAVE: `Save`,
    ALERT_CANCEL_STYLE: `cancel`,
    CANCEL: `Cancel`,
    ADD_POST: `Add Post`,
    UPDATE: `Update`,
    UPDATE_NOTIFICATION: `Update Notification`,
    YES: `Yes`,
    ABOUT_STARDOM: `About Stardom`,
    DELETE_POST: `Delete Post`,
    CANCEL_POST: `Cancel`,
    NO: `No`,
    NOT_NOW: `Not now`,
    PROCEED: `Proceed`,
    UPLOAD_IMAGE_GALLERY: `Upload from Gallery`,
    CLOSE_IMAGE_GALLERY: `Close Gallery`,
    VERIFY: `Verify`,
    FORGOT_PASSWORD: `Forgot Password`,
    CHECK_AVAILABILITY: `Check Availability`,
    OK: `OK`,
    ENABLE: `Enable`,
    DATE: `Date`,
    FEEDBACK: `Feedback`,
    SHARE: `Share`,
    REQUEST_DONERS: `Request Doners`,
    SKIP_BUTTON: `skipButton`,
    SAVE_BUTTON: `saveButton`,
    SKIP_BUTTON_TEXT: `SKIP >>`,
    WALLPAPER_HOME_SCREEN: `Home Screen`,
    WALLPAPER_LOCK_SCREEN: `Lock Screen`,
    WALLPAPER_BOTH_SCREENS: `Both`,
    WALLPAPER_CHANGE_POSTS: `WallPaper Change Posts`,
    WALLPAPER_CHANGE_SETTINGS: `WallPaper Change Settings`,
    ADD_BIO: `Add bio`,
    VERIFY_USER: `Verify User`,
    FOLLOW: `Follow`,
    UNFOLLOW: `Unfollow`,
    PRIVATE_FOLLOW: `Private Follow`,
    APPROVE: `Approve`,
    REJECT: `Reject`,
    PUBLIC_FOLLOW: `Public Follow`,
    REMOVE: `Remove`,
    ADD: `Add`,
    SETTINGS: `Settings`,
    SCHEDULE_WALLPAPER_CHANGE: `Schedule Wallpaper Change`,
    CLEAR_ALL: `Clear All`
}

export const formRequiredRules = {
    mobileInputFormRule: {
        required: {
            value: true,
            message: `Please enter mobile number`
        },
        minLength: {
            value: 10,
            message: `Number not 10 digits`
        },
        maxLength: {
            value: 10,
            message: `Please enter only 10 digits`
        },
        pattern: {
            value: `/^([0-9]{1,100})+$/`,
            message: `Please enter only digits`
        }
    },
    passwordFormRule: {
        required: {
            value: true,
            message: `Please enter the password`
        },
        minLength: {
            value: 6,
            message: `Please enter atleast 6 characters`
        }
    },
    otpFormRule: {
        required: {
            value: true,
            message: `Please enter 6 digit OTP received`
        }
    },
    confirmPasswordRule: {
        type: `mismatch`,
        message: `Passwords do not match`
    },
    nameFormRule: {
        required: {
            value: true,
            message: `Please enter a name`
        }
    },
    usedIdFormRule: {
        required: {
            value: true,
            message: `Please enter a user id`
        },
        validate: value => /\s/g.test(value) && `User ID must not have space` || true
    },
    emailRule: {
        required: {
            value: true,
            message: `Please enter email address`
        },
        pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
            message: `Entered value does not match email format`
        }
    },
    forgotPasswordRule: {
        type: "mismatch",
        message: "Phone Number does not exist"
    },
    dobRule: {
        required: {
            value: true,
            message: `Please select a date of birth`
        }
    },
    datePickerFormRule: {
        required: {
            value: true,
            message: `Please select a date`
        }
    },
    timePickerFormRule: {
        required: {
            value: true,
            message: `Please select a time`
        }
    },
    addPostTitleRule: {
        required: {
            value: true,
            message: `Please enter a title`
        },
        maxLength: {
            value: 25,
            message: `Enter only 25 characters`
        }
    },
    addPostLinkRule: {
        validate: value => !value || isValidURL(value) && true || `Please enter a valid URL`
    },
    addPostDescription: {
        maxLength: {
            value: 200,
            message: `Maximum 200 characters only allowed`
        }
    },
    categoryRule: {
        required: {
            value: true,
            message: `Please select atleast one category`
        }
    },
    genderRule: {
        name: fieldControllerName.GENDER,
        required: {
            value: true,
            message: `Please select a gender`
        },
        validate: value => value === 0 && `Please select a value` || true
    },
    postTypeRule: {
        name: fieldControllerName.POST_TYPE,
        required: {
            value: true,
            message: `Please select a Post Type`
        },
        validate: value => value === 0 && `Please select a value` || true
    },
    profileRule: {
        required: {
            value: true,
            message: `Please select your profile`
        }
    },
    changeWallPaperConditionRule: {
        required: {
            value: true,
            message: `Please select an change condition`
        },
        validate: value => value == numericConstants.MINUS_ONE && `Please select an change condition` ||
            true
    },
    changeWallPaperIntervalsRule: {
        required: {
            value: true,
            message: `Please select an interval`
        },
        validate: value => value == numericConstants.MINUS_ONE && `Please select an interval` ||
            true
    },
    postCategoryRule: {
        name: fieldControllerName.CATEGORIES,
        required: {
            value: true,
            message: `Please select atleast one category`
        },
        validate: value => !value.length && `Please select atlease one category` ||
            true
    },
    userIdAvailability: {
        type: `mismatch`,
        message: `User ID already in use! Please try another ID`
    },
    userIdInvalidSpace: {
        type: `invalid`,
        message: `User ID must not have space`
    },
    verifyUserInputRule: {
        required: {
            value: true,
            message: `Please enter details`
        },
        maxLength: {
            value: 200,
            message: `Maximum 200 characters only allowed`
        }
    }
};

export const savePostCountKeys = {
    SELECTED_POST_LIKES: `selectedPostIdLikesCount`
}

export const componentErrorConsts = {
    ERROR_BOUNDARY: 1,
    CATEGORY_WITHOUT_POST: 2,
    POSTS_WITHOUT_PROFILE: 3
}

export const jsonConstants = {
    EMPTY: []
}

export const postCountTypes = {
    POST_LIKE_KEY: `postLikes`,
    POST_DOWNLOADS_KEY: `postDownloads`,
    POST_WALLPAPERS_KEY: `postWallpapers`,
    POST_LIKES: `likes`,
    POST_DOWNLOADS: `downloads`,
    POST_WALLPAPERS: `wallpapers`,
}

export const permissionsButtons = {
    OK: `OK`,
    CANCEL: `Cancel`,
    ASK_ME_LATER: `Ask Me Later`,
    NONE: `none`,
    AUTO: `auto`
}

export const permissionMessages = {
    READ_WRITE_EXTERNAL_STORAGE_TITLE: `Requesting Permission to access your external storage`,
    READ_WRITE_EXTERNAL_STORAGE_MESSAGE: `WallPiper requires access to write to your External Storage`
}

export const stringConstants = {
    NODE: {},
    EMPTY: ``,
    REPLACE_REGEX: /[- #*;,.<>\{\}\[\]\\\/]/gi,
    STARDOM_URL_REPLACE_REGEX: /.*?:\/\/stardom\.wallpiper\.app\//g,
    STARDOM_SCHEMA_REPLACE_REGEX: /.*?:\/\//g,
    URL_ID_VALUE_REGEX: /\/([^\/]+)\/?$/,
    COMMA: `,`,
    UNDERSCORE: `_`,
    PLUS: `+`,
    SPACE: ` `,
    SEMI_COLON: `:`,
    PIPELINE_JOIN: ` | `,
    SLASH: `/`,
    OTP_SPLIT_CHARS: `. `
}

export const modalTextConstants = {
    REPORT_ABUSE_TITLE: `Report this post`,
    ADD_WALLPAPER_DETAILS: `Add Wallpaper details`,
    CANCEL_BUTTON: `Cancel`,
    CLOSE_BUTTON: `Close`,
    MANAGE_WALLPAPER: `Manage WallPaper`,
    REGISTER_TITLE_HEADER: `Create New`,
    REGISTER_TITLE_TEXT: `Account`,
    LOGIN_TITLE_HEADER: `Welcome Back`,
    LOGIN_TITLE_TEXT: `Please login to continue`,
    CONFIRM_REGISTRATION: `Confirm Registration`,
    OTP_VERIFICATION: `OTP Verification`,
    VIEW_FOLLOWER_FOLLOWING_PROFILE: `View follower following profile`,
    ACCOUNT_DETAILS: `Account Details`,
    EDIT_PROFILE: `Edit Profile`,
    VIEW_PROFILE: `View Profile`,
    LOGIN_TO_CONTINUE: `Login to continue`,
    SUBMIT_BUTTON: `Submit`,
    UPLOAD_PHOTO: `Upload Photo`,
    CHOOSE_BELOW_OPTIONS: `Choose below options`,
    TAKE_PHOTO: `Take Photo`,
    CHOOSE_FROM_LIBRARY: `Choose from library`
}
export const placeHolderText = {
    PHONE_NUMBER: `Enter 10 digit Number`,
    FULL_NAME: `Enter Full Name`,
    USER_ID: `Enter User ID`,
    EMAIL: `Enter Email Address`,
    AMPERSAND: `@`,
    NAME: `Enter Name`,
    DOB: `Enter date of birth`,
    SECRET: `Enter atleast 6 Character Password`,
    CONFIRM_PASSWORD: `Confirm Password`,
    REGISTER_DESCRIPTION: `We will send you a verification code to your phone`,
    SEARCH_POSTS: `Search Posts`,
    SELECT_A_CATEGORY: `Select a category`,
    SELECT_A_GENDER: `Select a gender`,
    SELECT_A_PROFILE: `Select a profile`,
    SELECT_CATEGORIES: 'Select Categories',
    SEARCH_FOLLOWERS: `Search Followers`,
    SEARCH_FOLLOWINGS: `Search Followings`,
    WALLPAPER_CHANGER_CONDITION: `Select a change condition`,
    WALLPAPER_CHANGER_INTERVALS: `Select a interval`,
    WALLPAPER_CHANGER_SPECIFIC_TIME: `Select a specfic time`,
    ADD_TITLE: `Title`,
    ADD_URL: `URL`,
    POSTS: `Posts`,
    USERS: `Users`,
    ADD_DESCRIPTION: `Enter Description`,
    VERIFY_USER_DETAILS: `Enter your social media contact details`,
    SELECT_GENDER: `Select a gender`,
    SEARCH_USERS: `Search Users`,
    FACEBOOK_LINK: `Enter your Facebook Profile link`,
    INSTAGRAM_LINK: `Enter your Instagram Profile link`
}

export const numericConstants = {
    TWELVE_PCNT: `12%`,
    HUNDRED_PCNT: `100%`,
    STRING_ZERO: `0`,
    MINUS_ONE: -1,
    TWOPTONEEIGHT: 2.18,
    ZEROPTFIVE: 0.5,
    ZEROPTSEVEN: 0.7,
    ZEROPTNINETY: 0.90,
    ONEPTONE: 1.1,
    ZERO: 0,
    ONE: 1,
    ONE_PT_NINE: 1.9,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    ELEVEN: 11,
    TWELVE: 12,
    THIRTEEN: 13,
    FIFTEEN: 15,
    SIXTEEN: 16,
    EIGHTEEN: 18,
    NINETEEN: 19,
    TWENTY: 20,
    TWENTY_ONE: 21,
    TWENTY_TWO: 22,
    TWENTY_FOUR: 24,
    TWENTY_FIVE: 25,
    TWENTY_SIX: 26,
    TWENTY_EIGHT: 28,
    THIRTY: 30,
    THIRTY_THREE: 33,
    THIRTY_EIGHT: 38,
    FORTY: 40,
    FORTY_TWO: 42,
    FORTY_FIVE: 45,
    FORTY_EIGHT: 48,
    FIFTY: 50,
    FIFTY_FIVE: 55,
    SIXTY: 60,
    SEVENTY: 70,
    EIGHTY: 80,
    EIGHTY_FIVE: 85,
    NINETY: 90,
    ONE_HUNDRED: 100,
    ONE_HUNDRED_TWENTY: 120,
    ONE_HUNDRED_THIRTY: 130,
    ONE_HUNDRED_FIFTY: 150,
    ONE_HUNDER_EIGHTY: 180,
    TWO_HUNDRED: 200,
    TWO_TWENTY_FIVE: 225,
    TWO_HUNDRED_FIFTY: 250,
    TWO_HUNDRED_NINETY: 290,
    THREE_HUNDRED: 300,
    THREE_HUNDRED_THIRTY: 330,
    THREE_HUNDRED_FIFTY: 350,
    FOUR_HUNDRED_ONE: 401,
    FIVE_HUNDRED: 500,
    THOUSAND: 1000,
    MAX_RESOLUTION_WIDTH: 1080,
    THOUSAND_EIGHT_FIFTY: 1850,
    MAX_RESOLUTION_HEIGHT: 1920,
    TWO_THOUSAND: 2000,
    FIVE_THOUSAND: 5000
}

export const alertTextMessages = {
    CONFIRM_TITLE: `Set Wallpaper`,
    POST_WALLPAPER_TEXT: `Do you want to set the current image as Home Screen and Lock Screen?`,
    POST_REPORT_ABUSED: `You have already submitted the report!`,
    WALLPAPER_SET_SUCESS: `Success`,
    SENT_SMS_SUCCESSFULLY: `Successfully sent message!`,
    WALLPAPER_SET_SUCCESS_TEXT: `Image successfully set as wallpaper`,
    SKIP_SAVE_CATEGORIES: `Skip or save categories to view posts!`,
    USER_DETAILS_ADDED_SUCCESSFULLY: `User details added successfully`,
    GO_BACK_TO_POST: `Go back to posts Anytime !!`,
    REMOVING_FOLLOWER: `Removing follower`,
    SUCCESSFULLY_REGISTERED: `Successfully Registered!`,
    SUCCESSFULLY_UPDATED_PASSWORD: `Successfully Updated Password`,
    UPDATE_NOTIFICATION_TRUE: `Successfully updated notification status to true`,
    UPDATE_NOTIFICATION_FALSE: `Successfully updated notification status to false`,
    ONLY_THREE_CATEGORIES: `Select only upto 3 categories`,
    POST_LIKED: `You have liked the post : `,
    POST_DISLIKED: `You have disliked the post : `,
    POST_DOWNLOADED: `You have downloaded the post : `,
    SUCCESSFULLY_LOGGED_IN: `Login successful`,
    PLEASE_LOGIN_TO_VIEW_USERS: `Please login to view users`,
    DOWNLOAD_COMPLETE: `Download Complete`,
    DOWNLOADING_IMAGE: `Downloading image`,
    NO_USERS_AVAILABLE: `No Users available`,
    WHAT_ARE_YOUR_INTERESTS: `What are your INTERESTS?`,
    FETCHING_USER_PROFILE_DETAILS: `Fetching user profile details`,
    FOLLOWING_USER: `Following user`,
    PRIVATE_FOLLOWING_USER: `Private following user`,
    PRIVATE_UNFOLLOWING_USER: `Private unfollowing user`,
    UNFOLLOWING_USER: `Unfollowing user`,
    APPROVING_VERIFICATION_REQUEST: `Approving verification request`,
    REJECTING_VERIFICATION_REQUEST: `Rejecting verification request`,
    USER: `User`,
    REQUESTED_PRIVATE_ACCESS: `has requested for private access`,
    SUCCESSFULLY_LOGGED_OUT: `Logout successful`,
    MAX_THREE_CATEGORIES_1: `You can add your wallpaper to `,
    MAX_THREE_CATEGORIES_2: `maximum`,
    MAX_THREE_CATEGORIES_3: ` of 3 categories`,
    POST_ADDED_SUCCESSFULLY: `Added Successfully`,
    POST_UPDATED_SUCCESSFULLY: `Updated Successfully`,
    LOADING_USER_DETAILS: `Loading user details`,
    CROPPING_IMAGE: `Cropping image`,
    PARSING_IMAGE: `Parsing image to crop`,
    LOADING_IMAGE: `Please wait. Loading image`,
    POST_DELETED_SUCCESSFULLY: `Deleted successfully`,
    SUCCESS_FOLLOW: `You are now following`,
    SUCCESS_UNFOLLOW: `You have unfollowing this user`,
    YOU_ARE_ALREADY_FOLLOWING_THIS_USER: `You are already following this user`,
    YOU_ARE_ALREADY_UNFOLLOWING_THIS_USER: `You are already unfollowing this user`,
    SUCCESS_PRIVATE_FOLLOW: `You have successfully requested for private access for this user`,
    SUCCESS_PRIVATE_UNFOLLOW: `You have successfully unfollowed for private access from this user`,
    SUCCESS_UPDATED_NOTIFICATION_TRUE: `You will now receive notifications from this user`,
    SUCCESS_UPDATED_NOTIFICATION_FALSE: `You will not receive notification from this user anymore`,
    SUCCESSFUL_BIO_UPDATE: `Details successfully updated`,
    SUBMITTED_FOR_VERIFICATION: `You have successfully submitted the details for verification`,
    YOU_HAVE_SUCCESSFULLY_APPROVED: `You have successfuly approved private access to this user`,
    YOU_HAVE_SUCCESSFULLY_REJECTED: `You have successfuly rejected private access to this user`,
    DELETE_USER_POST_IMAGE: `Are you sure you want to delete the post?`,
    DELETE_USER_PROFILE_IMAGE: `Are you sure you want to delete your profile image?`,
    CONFIRM_LOGOUT: `Are you sure you want to logout of Stardom?`,
    YOU_HAVE_NO_FOLLOWERS: `You have no followers.`,
    NO_POSTS: `No Posts`,
    NO_ONE_FOLLOWING: `Looks like no one is following you. Please post images to increase reach.`,
    UPDATING_DETAILS: `Updating Details`,
    SECRET_UPDATED_SUCCESSFULLY: `Secret Updated Successfully`,
    DETAILS_UPDATED_SUCCESSFULLY: `Details updated successfully`,
    ADDING_NEW_POST: `Please wait. Adding new post`,
    UPDATING_POST_DETAILS: `Please wait. Updating post details`,
    DELETING_POST: `Deleting post`,
    DELETING_WALLPAPER_CHANGER_POST: `Are you sure you want to remove the post from wallpaper changer list?`,
    LOADING_CATEGORIES: `Please wait. Loading categories`,
    DO_YOU_WANT_TO_ADD: `Do you want to add`,
    DO_YOU_WANT_TO_REMOVE: `Do you want to remove`,
    TO_WALLPAPER_LIST: `to the wallpaper list`,
    FROM_WALLPAPER_LIST: `from wallpaper list`,
    AUTO_WALLPAPER_NOT_ENABLED: `Auto Wallpaper Changer is not enabled. Select from the below options in the drop down to Activiate.`,
    ENABLE_AUTOSTART_OPTION: `Enable Auto Start option to change wallpaper on device unlock`,
    AUTO_WALLPAPER_ENABLED: `Auto Wallpaper Changer is running. You can change the settings or disable settings here.`
}

export const errorMessages = {
    ERROR_BOUNDARY: `The App ran into a problem and could not continue. We apologise for any inconvenience this has caused! Press the button below to restart the app and sign back in.`,
    SELECT_OTHER_CATEGORIES: `No Posts Available! Either the categories selected have no posts or no posts have reached atleast 100 likes! Please select other categories by clicking below.`,
    NO_USER_PROFILE_FOR_POST: `No User Profile is available for the post!`,
    CONTACT_US_1: `Please contact us at `,
    BLOCKED_BY_ADMIN: `User is blocked access to stardom by admin. Please contact at info@stardom.app`,
    CONTACT_US_MAIL: `error@stardom.app`,
    COULD_NOT_SET_COLORS: `Could not set colors`,
    COULD_NOT_FETCH_PHOTOS_FROM_GALLERY: `Could not fetch photos from gallery`,
    CONTACT_US_2: `, if this issue persists`,
    COULD_NOT_PERFORM_ACTION: `Could not perform action`,
    COULD_NOT_RENDER_MENUS: `Could not render menus in useEffect`,
    CANNOT_REQUEST_PERMISSION_TO_USER: `Could not provide permission to user`,
    COULD_NOT_UPDATE_DEVICE_ID: `Could not update device id for`,
    USER_DENIED_NOTIFICATION: `Permission denied by user`,
    FAILED_TO_UPDATE_REGISTRATION_DETAILS: `Failed to update Registration Details`,
    CANNOT_REGISITER_USER: `Could not register user`,
    CANNOT_VIEW_CLOSED_APP_FROM_SHARE: `Cannot view shared post from closed application`,
    COULD_NOT_PERFORM_SCROLL_POST: `Could not perform post scroll`,
    OTP_MESSAGE_READ_ERROR: `RnotpVerification - read message error`,
    COULD_NOT_HANDLE_NOTIFICATION_ACTION: `Could not handle notification action`,
    COULD_NOT_REQUEST_FORGOT_PASSWORD: `Could not request for forgot password`,
    COULD_NOT_FETCH_USER_ID_BY_PHONE_NUMBER: `Could not fetch user id by phone number`,
    PRIVATE_IMAGE_NOT_APPEAR_ON_PUBLIC_FEED: `Private wallpaper will not appear on public posts`,
    COULD_NOT_FETCH_USERS_POSTS: `Could not fetch users posts`,
    COULD_NOT_REGISTER_USER: `Could not register user`,
    NUMBER_ALREADY_REGISTERED_LOGIN: `User has been aleady registered.Please login`,
    COULD_NOT_SHARE_IMAGE: `Cannot share image`,
    REQUEST_OTP_FAILED: `Cannot request OTP for number`,
    COULD_NOT_RESET_KEYCHAIN_VALUES: `Could not reset keychain values`,
    COULD_NOT_FETCH_ALL_POSTS: `Could not fetch all posts`,
    COULD_NOT_FETCH_ALL_USERS: `Could not fetch all users`,
    CANNOT_VIEW_SHARED_CONTENT: `Cannot view shared content`,
    CANNOT_FETCH_SAVE_BUTTON_TYPE: `Cannot fetch the save button type from the storage`,
    COULD_NOT_UPLOAD_POST: `Could not upload post`,
    COULD_NOT_UPDATE_POST: `Could not update post`,
    CANNOT_SAVE_REPORT_ABUSE: 'Cannot save selected report abuse',
    COULD_NOT_DELETE_POST: `Could not delete post`,
    COULD_NOT_DELETE_PROFILE_IMAGE: `Could not delete profile image`,
    COULD_NOT_FOllOW_USER: `Could not follow user`,
    COULD_NOT_CROP_IMAGE: `Could not crop image`,
    COULD_NOT_SET_WALLPAPER: "Cannot set current image as wallpaper",
    COULD_NOT_SETUP_WALLPAPER_CHANGE: `Could not setup wallpaper change`,
    COULD_NOT_CHECK_WALLPAPER_LIST: `Could not check wallpaper list`,
    COULD_NOT_ADD_WALLPAPER_TO_CHANGE_LIST: `Could not add post to wallpaper change list`,
    COULD_NOT_AUTO_START_PERMISSION: `Could not enable auto start permission`,
    COULD_NOT_FETCH_WALLPAPER_CHANGE_LIST: `Could not fetch wallpaper change list`,
    COULD_NOT_UNFOllOW_USER: `Could not unfollow user`,
    CANNOT_SAVE_EULA: `Cannot save EULA terms`,
    COULD_NOT_VALIDATE_PHONE_NUMBER: `Could not validate phone number`,
    COULD_NOT_VALIDATE_USER_ID: `Could not validate user id`,
    COULD_NOT_DOWNLOAD_IMAGE: "Cannot download the current image",
    COULD_NOT_PARSE_RESPONSE: `Could not parse response`,
    CANNOT_SAVE_ACCOUNT_STATUS: `Cannot save account status`,
    COULD_NOT_SHOW_SELECTED_IMAGE: `Could not show selected image`,
    COULD_NOT_GET_WALLPAPER_CHANGE_UNLOCK_SETTING: `Could not get wallpaper change unlock setting`,
    COULD_NOT_FETCH_CATEGORIES: `Could not fetch categories`,
    COULD_NOT_SAVE_CATEGORY_DETAILS_TO_KEYCHAIN: `Could not save category details to Key Chain`,
    COULD_NOT_FETCH_PROFILES: `Could not fetch all profiles`,
    INCORRECT_OTP_ENTERED: `Incorrect OTP entered`,
    COULD_NOT_SAVE_TO_KEYCHAIN: `Could not save data to Keychain`,
    COULD_NOT_FETCH_DETAILS_FROM_KEYCHAIN: `Could not fetch details from keychain`,
    COULD_NOT_FETCH_UPDATED_USER_PROFILE: `Could not fetch updated user profile`,
    COULD_NOT_FETCH_LOGIN_DETAILS_FROM_API: `Could not fetch login details from API`,
    COULD_NOT_FETCH_LOGIN_DETAILS_FROM_KEYCHAIN: `Could not fetch login details from keychain`,
    COULD_NOT_PARSE_LOGIN_TOKEN: `Could not parse login token`,
    COULD_NOT_LOGIN_USER: `Error logging in user`,
    COULD_NOT_REDIRECT_TO_GLANCE: `Could not redirect to glance`,
    PLEASE_LOGIN_TO_CONTINUE: `Please login to continue, Click here to login`,
    PLEASE_LOGIN_TO_CONTINUE_TOKEN_EXPIRED: `Please login to continue as token is expired, Click here to login`,
    ALREADY_FOLLOWING_USER: `User already following`,
    COULD_NOT_FETCH_USER_PROFILE_POST: `Could not fetch user profile posts`,
    FAILED_TO_LIST_FOLLOWERS: `Failed to show followers`,
    FAILED_TO_LIST_FOLLOWING: `Failed to show followings`,
    EXTERNAL_STORAGE_DENIED: `External Storage Permission Denied`,
    COULD_NOT_LOGOUT: `Could not logout`,
    YOUR_SESSION_IS_EXPIRED_PLEASE_LOGIN: `Your session has been expired.Click here to login`,
    CANNOT_FETCH_SAVED_EULA: `Cannot fetch saved EULA terms`,
    COULD_NOT_UPDATE_USER_BIO: `Could not update user bio`,
    COULD_NOT_SUBMIT_VERIFICATION: `Could not submit your request for verification.`,
    CANNOT_FETCH_CATEGORIES_FROM_STORAGE: 'Cannot fetch the categoryIds from the storage',
    CANNOT_FETCH_POST_ID_VALUE: 'Cannot fetch post id value',
    CANNOT_SET_INCREASED_COUNT_TO_DATABASE: `Cannot set the increased count to the database`,
    COULD_NOT_FILTER_OUT_PRIVATE_POST_FOR_LOGGED_IN_USER: `Could not filter posts for logged in user in Glance screen`,
    CANNOT_FETCH_REPORT_ABUSES: `Cannot fetch report abuses`,
    CANNOT_SET_SELECTED_REPORT_ABUSES: 'Cannot set selected report abuse to the storage',
    CANNOT_FETCH_SELECTED_SAVED_REPORT_ABUSE: 'Cannot fetch selected saved report abuses from storage',
    USER_DID_NOT_SHARE: `User did not share`,
    USER_CANCELLED_SHARE: `You cancelled sharing the image`,
    COULD_NOT_FETCH_WALLPAPER_CHANGE_SETTINGS_FROM_KEY_CHAIN: `Could not fetch wallpaper change settings from key chain`,
    COULD_NOT_FETCH_ALARM_STATUS: `Could not fetch alarm status`,
    COULD_NOT_RESET_WALLPAPER_SETTINGS: `Could not reset keychain wallpaper settings`,
    COULD_NOT_UPDATE_WALLPAPER_CHANGER_POSTS: `Could not update wallpaper changer posts`
}

export const responseStringData = {
    SUCCESS: `Success`,
    ERROR: `Error`,
    UNSUCCESSFUL: `Unsuccessful`,
    ERROR: `Error`,
    BAD_REQUEST: `Bad Request`,
    RESPONSE_MESSAGE: `Response Message: `,
    USER_SUCCESSFULLY_REGISTER: `Registration Successful`,
    TOKEN_INVALID: `Token is Invalid`,
    TOKEN_EXPIRED: `Token is Expired`,
    REDIRECT_USER_LOGIN: `Redirect user login`,
    SUCCESS_LOGOUT: `User successfully signed out`,
    SUCCESSFULLY_UPDATED: `Successfully Updated`,
    NOT_LOGGED_IN: `Not logged in `,
    STARDOM_PATH: `/ Stardom`,
    DOWNLOAD_IMAGE_EXTENTION: `.png`
}

export const postitionStringConstants = {
    UP: `up`, RIGHT: `right`, DOWN: `down`, LEFT: `left`
}

export const colorConstants = {
    TRANSPARENT_BUTTON: `rgba(0, 0, 0, 0.0)`,
    GREY: `#999`,
    YELLOW: `#fcc200`,
    BLUE: '#3543bf',
    ORANGE: '#fe7d32',
    GREEN: '#30a960',
    WHITE: `#ffffff`,
    INPUT_GRAY: `#fafafa`,
    BLACK: `#3d3d3d`
}

export const backHandlerConstants = {
    HARDWAREBACKPRESS: `hardwareBackPress`
}

export const countryCodesConstants = {
    INDIA: `+ 91`
}

export const miscMessage = {
    NONE: `none`,
    AUTO: `auto`,
    DONT_HAVE_ACCOUNT: `Dont have an account ? `,
    CLICK_TO_ADD_IMAGE: `Click + to add or select image`,
    DOB_DATE_FORMAT: `DD / MM / YYYY`,
    DATE: `date`,
    TIME: `time`,
    RESET: `Reset`,
    INFINITE: `infinite`,
    SUCCESSFUL: `Successful`,
    ACCEPTED_EULA: `acceptedEULA`,
    SINGLE_SELECT: `Single select`,
    SELECT_ALL: `Select All`,
    SHAREDPOST: `sharedpost`,
    SHAREDPROFILE: `sharedprofile`,
    USER_VERIFY: `User Verification`,
    BY_TEXT: `by`,
    UNSELECT_ALL: `Unselect All`,
    FROM_ON_NOTIFICATION: `fromOnNotification`,
    REPORT_ABUSE_TEXT: `REPORT\nABUSE`,
    MAKE_IN_INDIA: `Make in India`,
    CREATE: `create`,
    UPDATE: `update`,
    BULLET: `\u2022`,
    CREATE: `create`,
    VIEW: `View`,
    SHARE_FILE_TYPE: `.png`,
    ACCEPTED: `accepted`,
    HEY: `Hey`,
    WORDS: 'words',
    TOP: `top`,
    RELOAD: `Reload`,
    SELECT_CATEGORIES: `Select other categories`,
    DISCLAIMER_PRIVACY_POLICY: `Disclaimer and Privacy policy`,
    ABOUT_STARDOM: `About Stardom`,
    SIGN_UP: `Sign Up`,
    PHOTOS: `Photos`,
    MONTHS: `months`,
    NOT_AVAILABLE: `Not Available`,
    ALWAYS: `always`,
    CENTER: `center`,
    DEVICE_TOKEN: `device_id`,
    ATTEMPT_REMAINING: `Attempts remaining`,
    SMALL: `small`,
    WALLPAPER_TIME_INTERVAL: `timeInterval`,
    WALLPAPER_TIME_SPECIFIC: `timeSpecific`,
    INITIATIVE: `Initiative`,
    STARDOM_POST_SHARE: `Stardom post`,
    STARDOM_PROFILE_SHARE: `Stardom profile`,
    SHARING_IMAGE: `Sharing image`,
    RECTANGLE: `rectangle`,
    CIRCLE: `circle`,
    MESSAGE: `message`,
    DUPLICATE: `Duplicate`,
    FORGOT_PASSWORD: `Forgot Password`,
    DATE_PICKER_FORMAT: `DD/MM/YYYY`,
    POST_DESCRIPTION_DATE_FORMAT: `h[.]mm A DD MMMM YYYY`,
    POST_DESCRIPTION_MODAL_NAME: `descriptionModal`,
    POST_REPORT_ABUSE_MODAL_NAME: `reportAbuseModal`,
    POST_ADD_WALLPAPER_MODAL_NAME: `postAddWallPaperListModal`,
    POST_REMOVE_WALLPAPER_MODAL_NAME: `postRemoveWallPaperListModal`,
    POST_WALLPAPER_MODAL: `wallpaperModal`,
    WALLPAPER_POSTS_COUNT: `Wallpaper posts count`,
    USER_ID: `userid`,
    RIGHT: `right`,
    TRANSPARENT: `transparent`,
    UP: `up`,
    BACKSPACE: `Backspace`,
    BASE64: `base64`,
    BASE64_BLOB: `data:image/png;base64,`,
    PHONE_NUMBER: `phoneNumber`,
    TOKEN: `token`,
    USER_DETAILS: `details`,
    WINDOW: `window`,
    SCREEN: `screen`,
    EXCLUDE_TYPE: `com.apple.reminders.sharingextension`,
    LARGE: `large`,
    SUCCESS: `success`,
    INFO: `info`,
    DOWNLOADING: `Downloading`,
    DANGER: `danger`,
    COVER: `cover`,
    VERIFIED: `Verified`,
    LOADING: `Loading`,
    REGISTERED: `Registered`,
    INCORRECT_OTP: `Incorrect OTP`,
    MALE_TEXT: `Male`,
    FEMALE_TEXT: `Female`,
    USER_CANCELLED_CROP_CODE: `E_PICKER_CANCELLED`,
    POST_TYPE_PUBLIC_TEXT: `Public`,
    POST_TYPE_PRIVATE_TEXT: `Private`,
    RATHER_NOT_SAY_TEXT: `I'd rather not say`,
    CAMERA: `camera`,
    MAX_LENGTH: `maxLength`,
    RESEND_OTP: `Resend OTP`,
    GALLERY: `gallery`,
    SET: `set`,
    INACTIVE: `inactive`,
    IMAGE_TYPE: `image/*`,
    ADD_WALLPAPER: `addWallPaper`,
    REMOVE_WALLPAPER: `removeWallPaper`,
    DETAILS: `details`,
    STARDOM_LOGO_TEXT: `2021 Stardom`,
    CONFIRM_SECRET: `OTP Confirmed`,
    CHECK_CONNECTION_DETAILS: `Please check your internet connection and try again.`,
    CATEGORY_BACK: `Go back to posts Anytime !!`,
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: `Authorization`,
    BEARER: `Bearer`,
    APPLICATION_JSON: `application/json`,
    MULTIPART_FORM: `multipart/form-data`,
    ADD_POST: `Add Post`,
    FOLLOWERS_TEXT: `Followers`,
    FOLLOWING_TEXT: `Following`,
    AUTHOR: `Author`,
    VERIFIED_AUTHOR: `Verified Author`,
    AUTHOR_UNAPPROVED: `Author Unapproved`,
    FOLLOWERS: `FOLLOWERS`,
    FOLLOWING: `FOLLOWING`,
    WALLS: `WALLS`,
    UPLOADS: `UPLOADS`,
    DOWNLOADS: `DOWNLOADS`,
    REQUEST_FOR_PRIVATE_ACCESS: `Request to access private wallpaper`,
    PRIVATE_POST: `Private post`,
    SET_WALLPAPER_CHANGE_ON_UNLOCK: `startUnLockWallPaperService`,
    SET_ALARM_MANAGER: `setAlarmManager`,
    CANCEL_ALARM_MANAGER: `cancelAlarmManager`,
    STOP_UNLOCK_WALLPAPER_SERVICE: `stopUnLockWallPaperService`,
    SUCCESSFULLY_ADDED_FOLLOWER: `Successfully Added Follower`,
    SUCCESSFULLY_ADDED_PRIVATE_FOLLOWER: `Successfully Requested Private Access`,
    SUCCESSFULLY_UNFOLLOWED: `Successfully unfollowed`,
    SUCCESSFULLY_UNFOLLOWED_PRIVATE_ACCESS: `Successfully unfollowed private access`,
    GET_VERIFIED: `Get verified`,
    PRIVATE_REQUEST_ACCESS: `Private request access`,
    TYPE: `type`,
    FLASH_MODE: `flashMode`,
    CHANGE_WALLPAPER_AUTOMATICALLY_TEXT: `Automatically Change Wallpaper`
}

export const requestConstants = {
    ID: `id`,
    APPROVAL_ACTION: `approval`,
    PHONE_NUMBER: `phone_number`,
    SECRET: `password`,
    NAME: `name`,
    EMAIL_ID: 'email',
    DOB: `dob`,
    GENDER: `gender`,
    USER_TYPE: `user_type`,
    USER_ID: `user_id`,
    PROFILE_ID: `profile_id`,
    POST_LINK: `post_link`,
    PHONE_NUMBER: `phone_number`,
    SECRET: `password`,
    POST_TITLE: `post_title`,
    POST_DESCRIPTION: `post_description`,
    POST_CATEGORIES: `post_categories`,
    POST_TYPE: `post_type`,
    PROFILE: `profile`,
    POST_IMAGE: `post_image`,
    FOLLOWER_ID: `follower_id`,
    FOLLOWING_ID: `following_id`,
    UPDATE_NOTIFICATION: `update_notification`,
    PVT_ACCESS_TEXT: `pvtaccess`,
    FOLLOWERS_COUNT: `followersCount`,
    FOLLOWING_COUNT: `followingCount`,
    WALLPAPERS_COUNT: `wallsCount`,
    UPLOAD_COUNT: `uploadCount`,
    USER_VERIFY: `verify`,
    PROFILE_PICTURE: `profile_picture`,
    USER_BIO: `bio`,
    TYPE: `type`,
    DOWNLOAD_COUNT: `downloadCount`,
    POST_ID: `id`,
    EDIT: `edit`,
    GET: `GET`,
    PRIVATE_ACCESS_ACTION: `privateaccess`,
    POST: `post`,
    SDOM_DATA_STATE: `sdomDatastate`,
    SET_SDOM_DATA_STATE: `setSdomDatastate`,
    POST_ID_KEY: `postId`,
    POST_DISLIKED: `postDisliked`,
    REACH_TYPE: `reachType`,
    REPORT_ID: `report_id`,
    WALLPAPER_HOME_SCREEN: `homeScreen`,
    WALLPAPER_LOCK_SCREEN: `lockScreen`,
    WALLPAPER_BOTH_SCREENS: `Both`,
    POST_REPORT_ABUSE_ID: `postReportAbuseId`,
    POST_REPORT_ABUSE_SUBMITTED: `reportAbuseSubmitted`
};

export const keyChainConstansts = {
    LOGGED_IN_USER: `loggedInUser`,
    ACCOUNT_STATUS: `accountStatus`,
    POST_ID_KEY: `postIdKey`,
    SAVE_CATEGORY_ID: `save_category_id`,
    SAVE_CATEGORY_BUTTON_TYPE: `save_category_button_type`,
    SAVE_POST_COUNTS: `save_post_counts`,
    SAVE_SELECTED_REPORT: `save_selected_report`,
    POST_ID: `postId`,
    WALLPAPER_CHANGE_SETTINGS: `wallPaperChangeSettings`,
    AUTO_START_WALLPAPER_CHANGE_UNLOCK: `autoStartWallPaperChangeUnlock`
}

export const defaultPickerValue = {
    label: `Select a category`,
    value: 0,
    untouchable: true,
    textStyle: {
        fontFamily: `stardom_roboto_medium`,
    }
}

export const defaultProfilesValue = {
    label: `Select a profile`,
    value: 0,
    untouchable: true,
    textStyle: {
        color: `#fafafa`,
        fontFamily: `stardom_roboto_regular`,
    }
}

export const wallpaperChangerConditions = [
    {
        label: `Select a condition`,
        value: -1,
        untouchable: true,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `At time intervals`,
        value: `timeInterval`,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `At specific time`,
        value: `timeSpecific`,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }
]

export const wallpaperChangerIntervals = [
    {
        label: `Select an interval`,
        value: -1,
        untouchable: true,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `15 Minutes`,
        value: 900000,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `30 Minutes`,
        value: 1800000,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `45 Minutes`,
        value: 2700000,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `1 Hour`,
        value: 3600000,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `2 Hours`,
        value: 7200000,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `5 Hours`,
        value: 18000000,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `12 Hours (Half day)`,
        value: 43200000,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }, {
        label: `Every day`,
        value: 86400000,
        textStyle: {
            color: `#fafafa`,
            fontFamily: `stardom_roboto_regular`,
        }
    }
]

export const PRIVATE_FOLLOW_UNFOLLOW = {
    NOT_REQUESTED: numericConstants.ZERO,
    REQUESTED: numericConstants.ONE,
    APPROVED: numericConstants.TWO,
    REJECTED: numericConstants.THREE
}

export const SDMenuOptions = [
    {
        label: modalTextConstants.MANAGE_WALLPAPER,
        key: screens.POSTS,
        loggedIn: true,
        icon: require(`../assets/menu/add_wallpaper_icon.png`),
        actionIcon: require(`../assets/menu/add_wallpaper_action_icon.png`)
    }, {
        label: miscMessage.FOLLOWERS_TEXT,
        key: screens.USER_FOLLOWERS_FOLLOWING,
        loggedIn: true,
        icon: require(`../assets/menu/followers_icon.png`)
    }, {
        label: miscMessage.FOLLOWING_TEXT,
        key: screens.USER_FOLLOWERS_FOLLOWING,
        loggedIn: true,
        icon: require(`../assets/menu/following_icon.png`)
    }, {
        label: screens.CATEGORY,
        key: screens.CATEGORY,
        icon: require(`../assets/menu/categories_icon.png`)
    }, {
        label: actionButtonTextConstants.LOGOUT,
        key: actionButtonTextConstants.LOGOUT,
        loggedIn: true,
        icon: require(`../assets/menu/logout_icon.png`)
    }, {
        label: actionButtonTextConstants.WALLPAPER_CHANGE_POSTS,
        key: actionButtonTextConstants.WALLPAPER_CHANGE_POSTS
    }, {
        label: actionButtonTextConstants.ABOUT_STARDOM,
        key: actionButtonTextConstants.ABOUT_STARDOM,
        icon: require(`../assets/menu/about_stardom_icon.png`)
    },
];

export const cameraConstants = {
    AUDIO_PERMISSIONS: {
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
    },
    CAMERA_PERMISSIONS: {
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
    }
}

export const userSearchColors = [`#fa9c92`, `#73d9b4`, `#85d7ef`];

export const getDefaultProfilePostsCounts = {
    [requestConstants.FOLLOWERS_COUNT]: numericConstants.ZERO,
    [requestConstants.FOLLOWING_COUNT]: numericConstants.ZERO,
    [requestConstants.WALLPAPERS_COUNT]: numericConstants.ZERO,
    [requestConstants.UPLOAD_COUNT]: numericConstants.ZERO,
    [requestConstants.DOWNLOAD_COUNT]: numericConstants.ZERO,
}

export const CAMERA_IMAGE_FILTERS = [
    {
        title: 'Normal',
        filterComponent: Normal,
    }, {
        title: 'Maven',
        filterComponent: MavenCompat,
    }, {
        title: 'Mayfair',
        filterComponent: MayfairCompat,
    }, {
        title: 'Moon',
        filterComponent: MoonCompat,
    }, {
        title: 'Nashville',
        filterComponent: NashvilleCompat,
    }, {
        title: 'Perpetua',
        filterComponent: PerpetuaCompat,
    }, {
        title: 'Reyes',
        filterComponent: ReyesCompat,
    }, {
        title: 'Rise',
        filterComponent: RiseCompat,
    }, {
        title: 'Slumber',
        filterComponent: SlumberCompat,
    }, {
        title: 'Stinson',
        filterComponent: StinsonCompat,
    }, {
        title: 'Brooklyn',
        filterComponent: BrooklynCompat,
    }, {
        title: 'Earlybird',
        filterComponent: EarlybirdCompat,
    }, {
        title: 'Clarendon',
        filterComponent: ClarendonCompat,
    }, {
        title: 'Gingham',
        filterComponent: GinghamCompat,
    }, {
        title: 'Hudson',
        filterComponent: HudsonCompat,
    }, {
        title: 'Inkwell',
        filterComponent: InkwellCompat,
    }, {
        title: 'Kelvin',
        filterComponent: KelvinCompat,
    }, {
        title: 'Lark',
        filterComponent: LarkCompat,
    }, {
        title: 'Lofi',
        filterComponent: LofiCompat,
    }, {
        title: 'Toaster',
        filterComponent: ToasterCompat,
    }, {
        title: 'Valencia',
        filterComponent: ValenciaCompat,
    }, {
        title: 'Walden',
        filterComponent: WaldenCompat,
    }, {
        title: 'Willow',
        filterComponent: WillowCompat,
    }, {
        title: 'Xpro2',
        filterComponent: Xpro2Compat,
    }, {
        title: 'Aden',
        filterComponent: AdenCompat,
    }, {
        title: '_1977',
        filterComponent: _1977Compat,
    }, {
        title: 'Brannan',
        filterComponent: BrannanCompat,
    }
];

export const notificationConsts = {
    CHANNEL_ID: `com.stardomapp`,
    HIGH_PRIORITY: `high`,
    VIEW_POST_ACTION: `View post`,
    PUBLIC_FOLLOWING: `Public following`,
    PRIVATE_ACCESS_APPROVED: `Private Access Approved`,
    VIEW_FOLLOWERS_ACTION: `View followers`,
    PRIVATE_FOLLOWING_ACCESS: `Private access following`,
    VIEW_PROFILE_ACTION: `View profile`,
    SMALL_ICON: `ic_stat_name`,
    GROUP: `SDNotificationGroup`,
    CREATE_CHANNEL_CREATE: `createChannel returned`,
    NOTIFICATION_CANCELLED: `Notification Cancelled`,
    USER_ACTION_ID: `userAction`,
    PUBLIC_FOLLOWING_ID: `publicFollowing`,
    PRIVATE_FOLLOWING_ACCESS_ID: `privateAccessFollowing`,
    VIEW_PROFILE_ID: `viewProfile`,
    NOTIFICATION_TICKER: `Stardom notification`
}

export const EULATexts = {
    H1: `1. ABOUT AVAILABILITY OF THE ONLINE SERVICES`,
    H2: `2. ABOUT YOUR ELIGIBILITY FOR THE ONLINE SERVICES`,
    H3: `3. ABOUT YOUR RESPONSIBILITY FOR THE SERVICES`,
    H4: `4. ABOUT INTELLECTUAL PROPERTY`,
    STARDOM_TEXT: `Stardom `,
    STARDOMS_TEXT: `Stardom's `,
    STARDOM_TEXT_COMMA: `Stardom, `,
    P1_H: `SOLE CONSIDERATION. `,
    P1_T: `You agree that our sole offer to you in connection with the Services is to provide them as-are, or as modified by us in our sole discretion, until such time as we should choose to discontinue the Services or any component of the Services.`,
    P2_H: `SERVICES PROVIDED AS-ARE. `,
    P2_T: `You agree to use the Services as-are. UNLESS THE DISCLAIMER OF SUCH WARRANTIES IS PROHIBITED BY APPLICABLE LAW, YOU EXPRESSLY AGREE THAT ACCESS TO THE SERVICE BY ANY MEANS IS AT YOUR SOLE RISK, AND THE SERVICES ARE PROVIDED "AS ARE" AND "AS AVAILABLE," AND WE DO NOT MAKE ANY WARRANTIES WHATSOEVER WITH RESPECT TO THE SERVICES, INCLUDING WITHOUT LIMITATION, WARRANTIES, EITHER EXPRESS OR IMPLIED, SUCH AS THE WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE, OR THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR FREE OR PROVIDE ADEQUATE, COMPLETE OR TIMELY INFORMATION OR DATA.`,
    P3_H: `ONLINE SERVICES MAY INCLUDE INTERACTIVE ACCOUNTS. `,
    P3_T: `In using the Services, you may be provided with the opportunity to upload information, data, or content specific to you ("Account Information" in "an Account"). Our provision of any such interactivity is a Service, and governed by these Terms of Service. You are responsible for keeping your username and password secure. If you believe that there has been unauthorized access to your username, password or your identity, please contact us as soon as possible so that we can work together to limit the damage. To the extent that the Services interact with any other social media account or service you use, such as Facebook via Facebook Connect, you understand and agree that the provision of that other account or service are not the responsibility of Stardom. We have the right to disable any username or password, whether chosen by you or allocated by us, at any time, if in our reasonable opinion you have failed to comply with any of the provisions of these Terms of Service. For certain Services, Stardom may require you to verify your phone number and consent to a one-time SMS message sent through a third-party service provider. You are responsible for providing your accurate phone number for verification purposes.`,
    P4_H: `ONLINE SERVICES SUBJECT TO CHANGE. `,
    P4_T: `You agree that we may change or discontinue the Services in our sole discretion and without prior notice. You agree that you will not rely on the continued availability of the Services in taking any action, refraining from any action, or entering into any commitment.`,
    P5_H: `CONTENT NOT RETAINED FOREVER. `,
    P5_T: `You agree that any Account you may create via these Services may be terminated, and/or some or all of the associated Account Information deleted, following a period of inactivity. Such deletion may be done without prior notice.`,
    P6_H: `IF IMPORTANT, KEEP A COPY. `,
    P6_T: `You agree that unless otherwise specified any Account Information which you upload or provide via the Services may be modified or deleted without prior notice and at Stardom's sole discretion. Therefore, to the extent any Account Information has importance to you, you agree to maintain an original copy separate from these Services.`,
    P7_H: `YOUR AGE. `,
    P7_T: `The Services are intended for use by individuals 13 years of age and older. You are not permitted to use the Services, establish an Account, or provide Account Information if you are under 13 years of age.`,
    P8_H: `YOUR LOCATION. `,
    P8_T: `The Websites are intended for use in the United States. The Services are operated by Stardom from the United States. Stardom makes no representation that the Services are appropriate or available for use in other locations.`,
    P9_H: `YOUR LIABILITY. `,
    P9_T: `You are fully responsible for how you use our Services. You agree to indemnify and hold harmless us and our directors, officers, employees, service providers, vendors, and agents from and against any and all losses, liabilities, claims, damages or expenses (including attorneys' fees and court costs and expenses) arising from or related to any use of the Services by you or that occurs because of you.`,
    P10_H: `PROHIBITED USE OF THE SERVICES. `,
    P10_T: `You may not create a user name, post, upload, email or otherwise transmit to Stardom submissions of any kind that are, within the sole discretion of Stardom, determined to be commercial, illegal, offensive or potentially harmful to others.`,
    P11_H: `YOU MUST KEEP YOUR EMAIL ADDRESS UP TO DATE. `,
    P11_T1: `If you change your e-mail address or other contact information used by Stardom to communicate with you electronically, you must notify Stardom of the change immediately by logging on to the Services and updating your profile to reflect the correct email address or by sending written notice of your updated e-mail address to `,
    P11_T2: `emailaccounts@stardom.net.`,
    P12_T1: `If you do not update or change an incorrect e-mail address or other contact information, you understand and agree that any notices, statements or other communications to you from `,
    P12_T2: `will still be considered to have been provided to you if they were made available to you in electronic form on the Services or e-mailed to the e-mail address we have for you in our records. `,
    P12_T3: `reserves the right, if we choose, to restrict your ability to use the Services if `,
    P12_T4: `believes that the e- mail address you provided is incorrect.`,
    P13_H: `YOUR SUBMISSIONS. `,
    P13_T1: `When you provide submissions ("Submissions") to `,
    P13_T2: `you still retain all of your rights of ownership in your Submissions. However, by uploading, posting or otherwise transmitting your Submissions on or to `,
    P13_T3: `you grant `,
    P13_T4: `(and its successors) a royalty-free, perpetual, irrevocable, transferable, worldwide, non-exclusive right (including any moral rights) and license to use, license, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, derive revenue or other remuneration from, communicate to the public, perform and display the content (in whole or in part) and/or to incorporate it in other works in any form, media, or technology now known or later developed, for the full term of any rights that may exist in such content. You also permit any subscriber to access, display, view, store and reproduce such content for personal use, as permitted by the Service and under these Terms of Service.`,
    P14_T1: `When you provide any Submissions to `,
    P14_T2: `you understand and accept complete responsibility for your Submissions, including any and all consequences that may arise. As such, you represent and warrant that you own or have secured all necessary licenses, rights, consents and permissions for such Submissions and authorize `,
    P14_T3: `to make use of these Submissions in the manner contemplated by the Service and these Terms of Service; and have explicit permission, such as a signed, written consent and/or release from every person that may appear within the Submissions for `,
    P14_T4: `to use the Submissions, including the names and likeness of those persons, in the manner contemplated by the Service and these Terms of Service.`,
    P15_H: `OUR INTELLECTUAL PROPERTY. `,
    P15_T1: `You acknowledge and agree that `,
    P15_T2: `or its third party licensors own the contents of the Services and all copyrights and all other right, title and interest in and to such content, and you agree not to challenge, directly or indirectly, `,
    P15_T3: `ownership (or that of its licensors) in and to such content. Nothing contained in the Services or in these Terms of Service should be construed as granting, by implication, estoppels, or otherwise, any license or right to use any name, logo, trademark or service mark displayed in the Services without the written permission of `,
    P15_T4: `or such third party that may own the trademark displayed via the Services, and you may not use any name, logo, trademark, or service mark available via the Services without prior written approval by `,
    P15_T5: `Except as expressly permitted in these Terms of Service, you may not copy, display, distribute, perform, create derivative works of, or otherwise use the Services or their content.`,
    P16_H: `COPYRIGHT VIOLATIONS. `,
    P16_T: `If you believe in good faith that any material provided through the Service infringes upon your copyright, you may send notice to Stardom requesting that the material or access to the material be removed, pursuant to the Indian Regional / National jurisdiction. The notice must include all of the following:`,
    P17_T: `An electronic or physical signature of the copyright owner or person authorized to act on behalf of the copyright owner; sufficient identification of the allegedly infringing material; sufficient information as to the location of the allegedly infringing material so that it may be found and identified; the complainant's name, address, telephone number and, if possible, email address; a written statement by the complainant of a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law; and a statement by the complainant, under the penalty of perjury, that the information in the notification is accurate, and under penalty of perjury, that the complainant is the owner or is authorized to act on behalf of the owner of the copyright that is allegedly infringed.`,
    P18_T1: `If you believe in good faith that a notice of copyright infringement has been wrongly filed against you, you may send `,
    P18_T2: `a counter-notice. All notices with respect to `,
    P18_T3: `should be sent to the `,
    P18_T4: `Copyright Agent. `,
    P18_T5: `suggests that you consult your legal advisor before filing a notice or counter-notice. You expressly acknowledge and agree that `,
    P18_T6: `shall not be liable to you under any circumstances for declining to replace material. Also, be aware that there can be penalties for false claims under the DMCA.`,
    P19_T1: `For any complaints write to us at:`,
    P19_T2: `newyolkllp@gmail.com`
}

export const AboutStardomTexts = {
    P1: `Stardom is a personalisation app where one can click / upload a photo, add filter, select relevant category and BOOM, your photo wallpaper is ready!`,
    P2: `From movies to sports, from travel to food, one shall choose the categories they love. You will get new wallpapers every day.`,
    P3: `It's a community of celebrities, photographers, food bloggers, artists etc. Search wallpaper or the user profile with just one click`,
    P4: `Customise your photo with filters & crop the image manually so that you enjoy the PERFECT FRAME even after the photo is clicked.`,
    P5: `We don't spam the photos! You need to get 'required likes' to get featured on the category, those who follow you can still enjoy your pics on their feed without any hassle.`,
    P6: `Choose the wallpaper to your lock screen, home screen or both.`,
    P7: `You can share the wallpaper to WhatsApp, WhatsApp status, Facebook & Instagram with one click.`,
    P8: `Keep the public & private photos on the same profile, just set the photo to 'PRIVATE' so that only your permitted family & friends can see those photos. Those secret admirers & fans who doesn't belong to your closed circle can still see your PUBLIC images anyway.`
}

export const countRanges = [
    { divider: 1e18, suffix: `E` },
    { divider: 1e15, suffix: `P` },
    { divider: 1e12, suffix: `T` },
    { divider: 1e9, suffix: `G` },
    { divider: 1e6, suffix: `M` },
    { divider: 1e3, suffix: `k` }
];
