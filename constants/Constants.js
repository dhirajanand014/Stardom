
import { CardStyleInterpolators } from "@react-navigation/stack";
import { Dimensions } from "react-native";

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
    headerShown: false
}

export const screens = {
    INTRO: `Intro`,
    CATEGORY: `Category`,
    LOGIN: `Login`,
    ADD_POST_DETAILS: `Add Post Details`,
    REGISTER: `Register`,
    REGISTRATION_DETAILS: `Registration Details`,
    REGISTRATION_CONFIRMATION: `Confirm Registration`,
    GLANCE: `Glance`,
    NON_MODAL: `NonModal`,
    PROFILE: `Profile`,
    CAMERA: `Camera`,
    POSTS: `Posts`,
    MENU: `Menu`,
    OTP_VERIFICATION: `OTP Verification`
}

export const headerStrings = {
    SELECT_CATEGORY: `Select Categories`,
}

export const urlConstants = {
    fetchCategories: `https://www.wallpiper.app/4RhvfbEGwnsmxcat.php`,
    fetchPosts: `https://www.wallpiper.app/4RhvfbEGwnsmxcpst.php`,
    setPostCounts: `https://www.wallpiper.app/4RhvfbEGwnsmxliks.php`,
    fetchReportAbuses: `https://www.wallpiper.app/4RhvfbEGwnsmxrpts.php`,
    setReportAbuseIdWithPostId: `https://www.wallpiper.app/4RhvfbEGwnsmxrptlist.php`,
    login: `${BASE_URI}/auth/login`,
    fetchPostsByUserId: `${BASE_URI}/post/userid`,
    registerUser: `${BASE_URI}/auth/register`,
    fetchAllProfiles: `${BASE_URI}/profile`,
    addPost: `${BASE_URI}/post/details/add`
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
    LOCATION: `location`,
    GENDER_MALE: `male`,
    POST_TYPE_PRIVATE: `private`,
    POST_TYPE_PUBLIC: `public`,
    GENDER_FEMALE: `female`,
    POST_TYPE: `postType`,
    RATHER_NOT_SAY: `ratherNotSay`,
    INTERESTS: `interests`,
    CATEGORIES: `categories`,
    ADD_POST_TITLE: `postTitle`,
    ADD_POST_DESCRIPTION: `postDescription`
}

export const keyBoardTypeConst = {
    DEFAULT: `default`,
    ANDROID_NUMERIC: `numeric`,
    IOS_NUMERIC: `number-pad`,
    TELPHONETYPE: `telephoneNumber`,
    EMAIL: `email-address`,
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
    REGISTER: `Register`,
    SUBMIT: `Submit`,
    SURE: `Sure`,
    SAVE: `Save`,
    CANCEL: `Cancel`,
    ADD_POST: `Add Post`,
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
    SKIP_BUTTON_TEXT: `Skip >>`
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
            value: 4,
            message: `Please enter only 4 digit password`
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
        }
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
        }
    },
    addPostDescription: {
        required: {
            value: true,
            message: `Please enter a description`
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

export const setPostImages = {
    SET_POST_WALLPAPER: `postWallPaper`,
    SET_POST_DOWNLOAD: `postDownload`
}

export const jsonConstants = {
    EMPTY: []
}

export const postCountTypes = {
    POST_LIKES: `postLikes`,
    POST_DOWNLOADS: `postDownloads`,
    POST_WALLPAPERS: `postWallPapers`
}

export const postCountRequestKeys = {
    POST_ID_KEY: `post_id`,
    POST_COUNT_TYPE_KEY: `post_count_type`
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
    ACCOUNT_DETAILS: `Account Details`,
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
    SECRET: `Enter 4 digit Password`,
    CONFIRM_PASSWORD: `Confirm 4 digit Password`,
    REGISTER_DESCRIPTION: `We will send you a verification code to your phone`,
    SEARCH_POSTS: `Search Posts`,
    SELECT_A_CATEGORY: `Select a category`,
    SELECT_A_GENDER: `Select a gender`,
    SELECT_A_PROFILE: `Select a profile`,
    SELECT_CATEGORIES: 'Select Categories',
    ADD_POST_TITLE: `Enter Title`,
    ADD_POST_DESCRIPTION: `Enter Description`,
    SELECT_GENDER: `Select a gender`,
    SELECT_POST_TYPE: `Select Post type`
}

export const numericConstants = {
    MINUS_ONE: -1,
    ZERO: 0,
    ONE: 1,
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
    FORTY_FIVE: 45,
    FIFTY: 50,
    EIGHTY: 80,
    ONE_HUNDRED: 100,
    ONE_HUNDRED_TWENTY: 120,
    ONE_HUNDRED_THIRTY: 130,
    ONE_HUNDRED_FIFTY: 150,
    ONE_HUNDER_EIGHTY: 180,
    TWO_HUNDRED: 200,
    THREE_HUNDRED: 300,
    THREE_HUNDRED_THIRTY: 330,
    FOUR_HUNDRED_ONE: 401,
    FIVE_HUNDRED: 500,
    THOUSAND: 1000,
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
    SUCCESSFULLY_REGISTERED: `Successfully Registered!`,
    ONLY_THREE_CATEGORIES: `Select only upto 3 categories`,
    SUCCESSFULLY_LOGGED_IN: `Login successful`,
    MAX_THREE_CATEGORIES: `(Select maximum 3)`,
    POST_ADDED_SUCCESSFULLY: `Added Successfully`,
    POST_UPDATED_SUCCESSFULLY: `Updated Successfully`
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
    COULD_NOT_REGISTER_USER: `Could not register user`,
    COULD_NOT_UPLOAD_POST: `Could not upload post`,
    COULD_NOT_PARSE_RESPONSE: `Could not parse response`,
    CANNOT_SAVE_ACCOUNT_STATUS: `Cannot save account status`,
    COULD_NOT_FETCH_CATEGORIES: `Could not fetch categories`,
    COULD_NOT_SAVE_CATEGORY_DETAILS_TO_KEYCHAIN: `Could not save category details to Key Chain`,
    COULD_NOT_FETCH_PROFILES: `Could not fetch all profiles`,
    INCORRECT_OTP_ENTERED: `Incorrect OTP entered`,
    COULD_NOT_SAVE_TO_KEYCHAIN: `Could not save data to Keychain`,
    COULD_NOT_FETCH_DETAILS_FROM_KEYCHAIN: `Could not fetch details from keychain`,
    COULD_NOT_FETCH_LOGIN_DETAILS_FROM_KEYCHAIN: `Could not fetch login details from keychain`,
    COULD_NOT_PARSE_LOGIN_TOKEN: `Could not parse login token`,
    COULD_NOT_LOGIN_USER: `Error logging in user`,
    COULD_NOT_REDIRECT_TO_GLANCE: `Could not redirect to glance`
}

export const reportAbuseRequestPayloadKeys = {
    POST_ID: `postId`,
    POST_REPORT_ABUSE_ID: `postReportAbuseId`,
    POST_REPORT_ABUSE_SUBMITTED: `reportAbuseSubmitted`
}

export const responseStringData = {
    SUCCESS: `Success`,
    RESPONSE_MESSAGE: `Response Message : `,
    USER_SUCCESSFULLY_REGISTER: `Registration Successful`
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
    INDIA: `+91`
}

export const miscMessage = {
    NONE: `none`,
    DONT_HAVE_ACCOUNT: `Dont have an account?`,
    CLICK_TO_ADD_IMAGE: `Click + to add or select image`,
    DOB_DATE_FORMAT: `DD/MM/YYYY`,
    DATE: `date`,
    RESET: `Reset`,
    SUCCESSFUL: `Successful`,
    CREATE: `create`,
    UPDATE: `update`,
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
    DUPLICATE: `Duplicate`,
    FORGOT_PASSWORD: `Forgot Password`,
    DATE_PICKER_FORMAT: `DD/MM/YYYY`,
    RIGHT: `right`,
    UP: `up`,
    STRETCH: `stretch`,
    BACKSPACE: `Backspace`,
    PHONE_NUMBER: `phoneNumber`,
    TOKEN: `token`,
    USER_DETAILS: `details`,
    WINDOW: `window`,
    LARGE: `large`,
    COVER: `cover`,
    VERIFIED: `Verified`,
    REGISTERED: `Registered`,
    INCORRECT_OTP: `Incorrect OTP`,
    MALE_TEXT: `Male`,
    FEMALE_TEXT: `Female`,
    POST_TYPE_PUBLIC_TEXT: `Public`,
    POST_TYPE_PRIVATE_TEXT: `Private`,
    RATHER_NOT_SAY_TEXT: `I'd rather not say`,
    CAMERA: `camera`,
    MAX_LENGTH: `maxLength`,
    RESEND_OTP: `Resend OTP`,
    GALLERY: `gallery`,
    SET: `set`,
    IMAGE_TYPE: `image/*`,
    CONFIRM_SECRET: `OTP Confirmed`,
    CATEGORY_BACK: `Go back to posts Anytime !!`,
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: `Authorization`,
    BEARER: `Bearer`,
    APPLICATION_JSON: `application/json`,
    MULTIPART_FORM: `multipart/form-data`,
    CREATE: `create`,
    ADD_POST: `Add Post`
}

export const requestConstants = {
    PHONE_NUMBER: `phone_number`,
    SECRET: `password`,
    NAME: `name`,
    EMAIL_ID: 'email',
    DOB: `dob`,
    GENDER: `gender`,
    USER_TYPE: `user_type`,
    USER_ID: `user_id`,
    PROFILE_ID: `profile_id`,
    PHONE_NUMBER: `phone_number`,
    SECRET: `password`,
    POST_TITLE: `post_title`,
    POST_DESCRIPTION: `post_description`,
    POST_CATEGORIES: `post_categories`,
    POST_TYPE: `post_type`,
    POST_IMAGE: `post_image`
};

export const keyChainConstansts = {
    LOGGED_IN_USER: `loggedInUser`,
    ACCOUNT_STATUS: `accountStatus`,
    INITIAL_CATEGORY_SELECTIONS: `initialCategories`,
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

export const SDMenuOptions = [
    {
        label: `Following`,
        key: `following`,
        value: 20
    }, {
        label: `Followers`,
        key: `followers`,
        value: 10
    }, {
        label: `Posts`,
        key: screens.POSTS
    }, {
        label: `Category`,
        key: screens.CATEGORY
    }
];

export const tokenMessageConstants = {
    TOKEN_INVALID: `Token is Invalid`,
    TOKEN_EXPIRED: `Token is Expired`
}