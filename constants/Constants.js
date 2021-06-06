
import { CardStyleInterpolators } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import {
    AdenCompat, _1977Compat, BrannanCompat, BrooklynCompat, ClarendonCompat, EarlybirdCompat, GinghamCompat,
    HudsonCompat, InkwellCompat, KelvinCompat, LarkCompat, LofiCompat, MavenCompat, MayfairCompat, MoonCompat,
    NashvilleCompat, PerpetuaCompat, ReyesCompat, RiseCompat, SlumberCompat, StinsonCompat, ToasterCompat, ValenciaCompat,
    WaldenCompat, WillowCompat, Xpro2Compat, Colo, Normal, Browni
} from 'react-native-image-filter-kit';
import { isValidURL } from "../helper/Helper";

export const isIOS = Platform.OS === `ios`;
export const isAndroid = Platform.OS === `android`;

export const { width, height } = Dimensions.get(`window`);

export const RESEND_OTP_TIME_LIMIT = 20; // 30 secs
export const AUTO_SUBMIT_OTP_TIME_LIMIT = 1;
export const OTP_INPUTS = 6;
const BASE_URI = `https://stardom.wallpiper.app/api`;


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
    headerShown: false
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
    REGISTRATION_DETAILS: `Registration Details`,
    REGISTRATION_CONFIRMATION: `Confirm Registration`,
    GLANCE: `Glance`,
    NON_MODAL: `NonModal`,
    PROFILE: `Profile`,
    EDIT_USER_PROFILE: `Edit user profile`,
    FOLLOWER_FOLLOWING_PROFILE: `Follower Following profile`,
    VIEW_USER_POSTS: `View user posts`,
    CAMERA: `Camera`,
    POSTS: `Posts`,
    MENU: `Menu`,
    OTP_VERIFICATION: `OTP Verification`,
    USER_FOLLOWERS_FOLLOWING: `User Follow Following`,
    IMAGE_PREVIEW_FILTERS: `Image Preview Filters`
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
    fetchPostsByUserId: `${BASE_URI}/post/user`,
    fetchUserPosts: `${BASE_URI}/userpost`,
    checkUserRegistered: `${BASE_URI}/checkuser`,
    registerUser: `${BASE_URI}/auth/register`,
    userFollow: `${BASE_URI}/post/follow`,
    userUnFollow: `${BASE_URI}/post/unfollow`,
    removeFollower: `${BASE_URI}/post/removefollower`,
    fetchAllProfiles: `${BASE_URI}/profile`,
    addPost: `${BASE_URI}/post/details/add`,
    updatePost: `${BASE_URI}/post/details/update`,
    deletePost: `${BASE_URI}/post/delete`,
    fetchUsersFollowers: `${BASE_URI}/user/followers/fetch`,
    fetchUsersFollowings: `${BASE_URI}/user/following/fetch`,
    fetchAllUsers: `${BASE_URI}/user/allusers/fetch`,
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
    SEARCH_USERS: `Search Users`
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
    SAVE: `Save`,
    ALERT_CANCEL_STYLE: `cancel`,
    CANCEL: `Cancel`,
    ADD_POST: `Add Post`,
    UPDATE: `Update`,
    UPDATE_POST: `Update Post`,
    DELETE_POST: `Delete Post`,
    CANCEL_POST: `<<Cancel`,
    NOT_NOW: `Not now`,
    PROCEED: `Proceed`,
    VERIFY: `Verify`,
    FORGOT_PASSWORD: `Forgot Password`,
    CHECK_AVAILABILITY: `Check Availability`,
    RESET_PASSWORD: `Reset Password`,
    OK: `OK`,
    DATE: `Date`,
    FEEDBACK: `Feedback`,
    SHARE: `Share`,
    REQUEST_DONERS: `Request Doners`,
    SKIP_BUTTON: `skipButton`,
    SAVE_BUTTON: `saveButton`,
    SKIP_BUTTON_TEXT: `Skip >>`,
    ADD_BIO: `Add bio`,
    VERIFY_USER: `Verify User`,
    FOLLOW: `Follow`,
    UNFOLLOW: `Unfollow`,
    PRIVATE_FOLLOW: `Private Follow`,
    APPROVE: `Approve`,
    REJECT: `Reject`,
    PUBLIC_FOLLOW: `Public Follow`,
    REMOVE: `Remove`
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
    addPostTitleRule: {
        required: {
            value: true,
            message: `Please enter a title`
        },
        maxLength: {
            value: 15,
            message: `Enter only 15 characters`
        }
    },
    addPostLinkRule: {
        validate: value => !value || isValidURL(value) && true || `Please enter a valid URL`
    },
    addPostDescription: {
        required: {
            value: true,
            message: `Please enter a description`
        },
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
    POST_IMAGE_LOAD_ERROR: 3
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
    POST_WALLPAPERS: `wallpapers`
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
    COMMA: `,`,
    UNDERSCORE: `_`,
    PLUS: `+`,
    SPACE: ` `,
    SEMI_COLON: `:`,
    PIPELINE_JOIN: ` | `,
    SLASH: `/`
}

export const modalTextConstants = {
    REPORT_ABUSE_TITLE: `Report this post`,
    ADD_POST_DETAILS: `Add post details`,
    CANCEL_BUTTON: `Cancel`,
    CLOSE_BUTTON: `Close`,
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
    NAME: `Enter Name`,
    DOB: `Enter date of birth`,
    SECRET: `Enter 6 Character Password`,
    CONFIRM_PASSWORD: `Confirm Password`,
    REGISTER_DESCRIPTION: `We will send you a verification code to your phone`,
    SEARCH_POSTS: `Search Posts`,
    SELECT_A_CATEGORY: `Select a category`,
    SELECT_A_GENDER: `Select a gender`,
    SELECT_A_PROFILE: `Select a profile`,
    SELECT_CATEGORIES: 'Select Categories',
    ADD_POST_TITLE: `Enter Title`,
    ADD_POST_LINK: `Enter post link`,
    ADD_POST_DESCRIPTION: `Enter Description`,
    VERIFY_USER_DETAILS: `Enter your social media contact details`,
    SELECT_GENDER: `Select a gender`,
    SELECT_POST_TYPE: `Select Post type`,
    SEARCH_USERS: `Search Users`
}

export const numericConstants = {
    TWELVE_PCNT: `12%`,
    HUNDRED_PCNT: `100%`,
    MINUS_ONE: -1,
    ZEROPTFIVE: 0.5,
    ZEROPTNINETY: 0.90,
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
    TWENTY_EIGHT: 28,
    THIRTY: 30,
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
    WALLPAPER_SET_SUCCESS_TEXT: `Image successfully set as wallpaper`,
    SKIP_SAVE_CATEGORIES: `Skip or save categories to view posts!`,
    USER_DETAILS_ADDED_SUCCESSFULLY: `User details added successfully`,
    GO_BACK_TO_POST: `Go back to posts Anytime !!`,
    REMOVING_FOLLOWER: `Removing follower`,
    SUCCESSFULLY_REGISTERED: `Successfully Registered!`,
    ONLY_THREE_CATEGORIES: `Select only upto 3 categories`,
    SUCCESSFULLY_LOGGED_IN: `Login successful`,
    DOWNLOAD_COMPLETE: `Download Complete`,
    DOWNLOADING_IMAGE: `Downloading image`,
    NO_USERS_AVAILABLE: `No Users available`,
    FETCHING_USER_PROFILE_DETAILS: `Fetching user profile details`,
    FOLLOWING_USER: `Following user`,
    PRIVATE_FOLLOWING_USER: `Private following user`,
    PRIVATE_UNFOLLOWING_USER: `Private unfollowing user`,
    UNFOLLOWING_USER: `Unfollowing user`,
    APPROVING_VERIFICATION_REQUEST: `Approving verification request`,
    REJECTING_VERIFICATION_REQUEST: `Rejecting verification request`,
    SUCCESSFULLY_LOGGED_OUT: `Logout successful`,
    LOADING_USERS_POSTS: `Loading users posts`,
    MAX_THREE_CATEGORIES: `(Select maximum 3)`,
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
    SUCCESSFUL_BIO_UPDATE: `Details successfully updated`,
    SUBMITTED_FOR_VERIFICATION: `You have successfully submitted the details for verification`,
    YOU_HAVE_SUCCESSFULLY_APPROVED: `You have successfuly approved private access to this user`,
    YOU_HAVE_SUCCESSFULLY_REJECTED: `You have successfuly rejected private access to this user`,
    YOU_HAVE_NO_FOLLOWERS: `You have no followers.`,
    NO_ONE_FOLLOWING: `Looks like no one is following you. Please post images to increase reach.`,
    UPDATING_DETAILS: `Updating Details`,
    DETAILS_UPDATED_SUCCESSFULLY: `Details updated successfully`,
    ADDING_NEW_POST: `Please wait. Adding new post`,
    UPDATING_POST_DETAILS: `Please wait. Updating post details`,
    DELETING_POST: `Deleting post`,
    LOADING_CATEGORIES: `Please wait. Loading categories`
}

export const errorMessages = {
    ERROR_BOUNDARY: `The app ran into a problem and could not continue.We apologise for any inconvenience this has caused! Press the button below to restart the app and sign back in.Please contact us if this issue persists.`,
    SELECT_OTHER_CATEGORIES: `Selected category has no posts! Please select another category by clicking below.`,
    POST_IMAGE_LOAD_ERROR: `Image failed to load!`,
    SOMETHING_WENT_WRONG: `Oops, Something Went Wrong`,
    CANNOT_REQUEST_PERMISSION_TO_USER: `Could not provide permission to user`,
    USER_DENIED_NOTIFICATION: `Permission denied by user`,
    FAILED_TO_UPDATE_REGISTRATION_DETAILS: `Failed to update Registration Details`,
    CANNOT_REGISITER_USER: `Could not register user`,
    COULD_NOT_FETCH_USERS_POSTS: `Could not fetch users posts`,
    COULD_NOT_REGISTER_USER: `Could not register user`,
    NUMBER_ALREADY_REGISTERED_LOGIN: `User has been aleady registered.Please login`,
    COULD_NOT_SHARE_IMAGE: `Cannot share image`,
    COULD_NOT_RESET_KEYCHAIN_VALUES: `Could not reset keychain values`,
    COULD_NOT_FETCH_ALL_POSTS: `Could not fetch all posts`,
    CANNOT_FETCH_SAVE_BUTTON_TYPE: `Cannot fetch the save button type from the storage`,
    COULD_NOT_UPLOAD_POST: `Could not upload post`,
    COULD_NOT_UPDATE_POST: `Could not update post`,
    CANNOT_SAVE_REPORT_ABUSE: 'Cannot save selected report abuse',
    COULD_NOT_DELETE_POST: `Could not delete post`,
    COULD_NOT_FOllOW_USER: `Could not follow user`,
    COULD_NOT_CROP_IMAGE: `Could not crop image`,
    COULD_NOT_SET_WALLPAPER: "Cannot set current image as wallpaper",
    COULD_NOT_UNFOllOW_USER: `Could not unfollow user`,
    COULD_NOT_VALIDATE_PHONE_NUMBER: `Could not validate phone number`,
    COULD_NOT_VALIDATE_USER_ID: `Could not validate user id`,
    COULD_NOT_DOWNLOAD_IMAGE: "Cannot download the current image",
    COULD_NOT_PARSE_RESPONSE: `Could not parse response`,
    CANNOT_SAVE_ACCOUNT_STATUS: `Cannot save account status`,
    COULD_NOT_SHOW_SELECTED_IMAGE: `Could not show selected image`,
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
    ALREADY_FOLLOWING_USER: `User already following`,
    COULD_NOT_FETCH_USER_PROFILE_POST: `Could not fetch user profile posts`,
    FAILED_TO_LIST_FOLLOWERS: `Failed to show followers`,
    FAILED_TO_LIST_FOLLOWING: `Failed to show followings`,
    EXTERNAL_STORAGE_DENIED: `External Storage Permission Denited`,
    COULD_NOT_LOGOUT: `Could not logout`,
    YOUR_SESSION_IS_EXPIRED_PLEASE_LOGIN: `Your session has been expired. Click here to login`,
    COULD_NOT_UPDATE_USER_BIO: `Could not update user bio`,
    COULD_NOT_SUBMIT_VERIFICATION: `Could not submit your request for verification.`,
    CANNOT_FETCH_CATEGORIES_FROM_STORAGE: 'Cannot fetch the categoryIds from the storage',
    CANNOT_SET_INCREASED_COUNT_TO_DATABASE: `Cannot set the increased count to the database`,
    COULD_NOT_FILTER_OUT_PRIVATE_POST_FOR_LOGGED_IN_USER: `Could not filter posts for logged in user in Glance screen`,
    CANNOT_FETCH_REPORT_ABUSES: `Cannot fetch report abuses`,
    CANNOT_SET_SELECTED_REPORT_ABUSES: 'Cannot set selected report abuse to the storage',
    CANNOT_FETCH_SELECTED_SAVED_REPORT_ABUSE: 'Cannot fetch selected saved report abuses from storage',
    USER_DID_NOT_SHARE: `User did not share`,
    USER_CANCELLED_SHARE: `You cancelled sharing the image`
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
    RESET: `Reset`,
    SUCCESSFUL: `Successful`,
    CREATE: `create`,
    UPDATE: `update`,
    CREATE: `create`,
    SHARE_FILE_TYPE: `.png`,
    TOP: `top`,
    RELOAD_STARDOM: `Reload Stardom`,
    SELECT_CATEGORIES: `Select other categories`,
    SIGN_UP: `Sign Up`,
    NOT_AVAILABLE: `Not Available`,
    ALWAYS: `always`,
    CENTER: `center`,
    ATTEMPT_REMAINING: `Attempts remaining`,
    SMALL: `small`,
    RECTANGLE: `rectangle`,
    CIRCLE: `circle`,
    MESSAGE: `message`,
    DUPLICATE: `Duplicate`,
    FORGOT_PASSWORD: `Forgot Password`,
    DATE_PICKER_FORMAT: `DD / MM / YYYY`,
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
    IMAGE_TYPE: `image/*`,
    DETAILS: `details`,
    CONFIRM_SECRET: `OTP Confirmed`,
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
    FOLLOWERS: `FOLLOWERS`,
    FOLLOWING: `FOLLOWING`,
    WALLS: `WALLS`,
    UPLOADS: `UPLOADS`,
    DOWNLOADS: `DOWNLOADS`,
    REQUEST_FOR_PRIVATE_ACCESS: `Request to access private wallpaper`,
    PRIVATE_POST: `Private post`,
    SUCCESSFULLY_ADDED_FOLLOWER: `Successfully Added Follower`,
    SUCCESSFULLY_ADDED_PRIVATE_FOLLOWER: `Successfully Requested Private Access`,
    SUCCESSFULLY_UNFOLLOWED: `Successfully unfollowed`,
    SUCCESSFULLY_UNFOLLOWED_PRIVATE_ACCESS: `Successfully unfollowed private access`,
    GET_VERIFIED: `Get verified`,
    PRIVATE_REQUEST_ACCESS: `Private request access`,
    TYPE: `type`,
    FLASH_MODE: `flashMode`,
    EDIT_PROFILE_IMAGE: `Edit profile image`,
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
    POST_IMAGE: `post_image`,
    FOLLOWER_ID: `follower_id`,
    FOLLOWING_ID: `following_id`,
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
    REACH_TYPE: `reachType`,
    REPORT_ID: `report_id`,
    POST_REPORT_ABUSE_ID: `postReportAbuseId`,
    POST_REPORT_ABUSE_SUBMITTED: `reportAbuseSubmitted`
};

export const keyChainConstansts = {
    LOGGED_IN_USER: `loggedInUser`,
    ACCOUNT_STATUS: `accountStatus`,
    SAVE_CATEGORY_ID: `save_category_id`,
    SAVE_CATEGORY_BUTTON_TYPE: `save_category_button_type`,
    SAVE_POST_COUNTS: `save_post_counts`,
    SAVE_SELECTED_REPORT: `save_selected_report`
}

export const defaultPickerValue = {
    label: `Select a category`,
    value: 0,
    untouchable: true,
    textStyle: {
        fontWeight: `bold`,
        fontFamily: `wallpiper_bold_font`,
    }
}

export const defaultProfilesValue = {
    label: `Select a profile`,
    value: 0,
    untouchable: true,
    textStyle: {
        color: `#fafafa`,
        fontFamily: `wallpiper_roman_font`,
    }
}

export const PRIVATE_FOLLOW_UNFOLLOW = {
    NOT_REQUESTED: numericConstants.ZERO,
    REQUESTED: numericConstants.ONE,
    APPROVED: numericConstants.TWO,
    REJECTED: numericConstants.THREE
}

export const SDMenuOptions = [
    {
        label: miscMessage.FOLLOWING_TEXT,
        key: screens.USER_FOLLOWERS_FOLLOWING,
        loggedIn: true
    }, {
        label: miscMessage.FOLLOWERS_TEXT,
        key: screens.USER_FOLLOWERS_FOLLOWING,
        loggedIn: true
    }, {
        label: miscMessage.PRIVATE_REQUEST_ACCESS,
        key: screens.USER_FOLLOWERS_FOLLOWING,
        loggedIn: true
    }, {
        label: screens.POSTS,
        key: screens.POSTS,
        loggedIn: true
    }, {
        label: miscMessage.GET_VERIFIED,
        key: actionButtonTextConstants.VERIFY_USER,
        loggedIn: true
    }, {
        label: fieldControllerName.SEARCH_USERS,
        key: screens.USER_FOLLOWERS_FOLLOWING,
        loggedIn: true
    }, {
        label: screens.CATEGORY,
        key: screens.CATEGORY
    }
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