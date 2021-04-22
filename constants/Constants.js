
import { CardStyleInterpolators } from "@react-navigation/stack";
import { Dimensions } from "react-native";

export const isIOS = Platform.OS === `ios`;
export const isAndroid = Platform.OS === `android`;

export const { width, height } = Dimensions.get(`window`);

export const RESEND_OTP_TIME_LIMIT = 20; // 30 secs
export const AUTO_SUBMIT_OTP_TIME_LIMIT = 1;
export const OTP_INPUTS = 6;

export const screenOptions = {
    gestureEnabled: true, gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

export const stackOptions = {
    headerShown: false
}

export const screens = {
    INTRO: `Intro`,
    CATEGORY: `Category`,
    LOGIN: `Login`,
    ADD_POST: `Add Post`,
    REGISTER: `Register`,
    GLANCE: `Glance`,
}
export const urlConstants = {
    fetchCategories: `https://www.wallpiper.app/4RhvfbEGwnsmxcat.php`,
    fetchPosts: `https://www.wallpiper.app/4RhvfbEGwnsmxcpst.php`,
    setPostCounts: `https://www.wallpiper.app/4RhvfbEGwnsmxliks.php`,
    fetchReportAbuses: `https://www.wallpiper.app/4RhvfbEGwnsmxrpts.php`,
    setReportAbuseIdWithPostId: `https://www.wallpiper.app/4RhvfbEGwnsmxrptlist.php`
}

export const asyncStorageKeys = {
    SAVE_CATEGORY_ID: `@save_category_id`,
    SAVE_CATEGORY_BUTTON_TYPE: `@save_category_button_type`,
    SAVE_POST_COUNTS: `@save_post_counts`,
    SAVE_SELECTED_REPORT: `@save_selected_report`
}

export const fieldControllerName = {
    PHONE_NUMBER: `phoneNumber`,
    FULL_NAME: `fullName`,
    EMAIL: `email`,
    SECRET: `secret`,
    CONFIRM_SECRET: `confirmSecret`,
    OTP_INPUT: `otpInput`,
    NAME: `name`,
    DOB: `dob`,
    GENDER: `gender`,
    PROFILE_NAME: `profileName`,
    LOCATION: `location`,
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
    NEW_PASSWORD: `newPassword`,
    ONETIMECODE: `oneTimeCode`,
    NAME: `name`,
    PASSWORD: `password`
}

export const textContentType = {
    EMAIL: `emailAddress`,
}

export const actionButtonTextConstants = {
    SIGN_IN: `Sign in`,
    REGISTER: `Register`,
    SUBMIT: `Submit`,
    SURE: `Sure`,
    CANCEL: `Cancel`,
    NOT_NOW: `Not now`,
    PROCEED: `Proceed`,
    VERIFY: `Verify`,
    FORGOT_PASSWORD: `Forgot Password`,
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
    emailRule: {
        required: {
            value: true,
            message: `Please enter email address`
        },
        pattern: {
            value: /S+@S+.S+/,
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
        required: {
            value: true,
            message: `Please select a gender`
        },
        validate: value => value === 0 && `Please select a value` || true
    },
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
    EMPTY: "",
    COMMA: `,`,
    PLUS: `+`,
    SPACE: ` `,
    PIPELINE_JOIN: ` | `
}

export const modalTextConstants = {
    REPORT_ABUSE_TITLE: `Report this post`,
    ADD_POST_DETAILS: `Add post details`,
    CANCEL_BUTTON: `Cancel`,
    CLOSE_BUTTON: `Close`,
    SUBMIT_BUTTON: `Submit`
}
export const placeHolderText = {
    PHONE_NUMBER: `Enter 10 digit Number`,
    FULL_NAME: `Full Name`,
    EMAIL: `Email Address`,
    NAME: `Enter Name`,
    DOB: `Enter date of birth`,
    SECRET: `Enter 4 digit Password`,
    CONFIRM_PASSWORD: `Confirm 4 digit Password`,
    REGISTER_DESCRIPTION: `We will send you a verification code to your phone`,
    SEARCH_POSTS: `Search Posts`,
    SELECT_A_CATEGORY: `Select a category`,
    SELECT_A_GENDER: `Select a gender`,
    SELECT_CATEGORIES: 'Select Categories',
    ADD_POST_TITLE: `Enter Title`,
    ADD_POST_DESCRIPTION: `Enter Description`
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
    TWENTY_TWO: 22,
    TWENTY_FOUR: 24,
    TWENTY_EIGHT: 28,
    THIRTY: 30,
    FORTY_FIVE: 45,
    EIGHTY: 80,
    ONE_HUNDRED: 100,
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
    GO_BACK_TO_POST: `Go back to posts Anytime !!`
}

export const errorMessages = {
    ERROR_BOUNDARY: `The app ran into a problem and could not continue.We apologise for any inconvenience this has caused! Press the button below to restart the app and sign back in.Please contact us if this issue persists.`,
    SELECT_OTHER_CATEGORIES: `Selected category has no posts! Please select another category by clicking below.`,
    POST_IMAGE_LOAD_ERROR: `Image failed to load!`,
    SOMETHING_WENT_WRONG: `Oops, Something Went Wrong`
}

export const reportAbuseRequestPayloadKeys = {
    POST_ID: `postId`,
    POST_REPORT_ABUSE_ID: `postReportAbuseId`,
    POST_REPORT_ABUSE_SUBMITTED: `reportAbuseSubmitted`
}

export const responseStringData = {
    SUCCESS: `Success`
}

export const postitionStringConstants = {
    UP: `up`, RIGHT: `right`, DOWN: `down`, LEFT: `left`
}

export const colorConstants = {
    TRANSPARENT_BUTTON: `rgba(0, 0, 0, 0.0)`,
    GREY: `#999`,
    YELLOW: `#fcc200`,
    WHITE: `#ffffff`,
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
    DOB: `Date of Birth`,
    RELOAD_STARDOM: `Reload Stardom`,
    SELECT_CATEGORIES: `Select other categories`,
    NOT_AVAILABLE: `Not Available`,
    ALWAYS: `always`,
    CENTER: `center`,
    SMALL: `small`,
    RECTANGLE: `rectangle`,
    CIRCLE: `circle`,
    RIGHT: `right`,
    UP: `up`,
    STRETCH: `stretch`,
    WINDOW: `window`,
    LARGE: `large`,
    CAMERA: `camera`,
    GALLERY: `gallery`
}

export const genderList = [
    {
        label: stringConstants.EMPTY,
        value: -1,
        untouchable: true
    }, {
        label: `Select a gender`,
        value: 0,
        untouchable: true,
        textStyle: {
            fontWeight: `bold`,
            fontFamily: isAndroid && `normal` || `System`,
        }
    }, {
        label: `Male`,
        value: 1,
        textStyle: {
            color: 'lightGrey'
        }
    }, {
        label: `Female`,
        value: 2,
        textStyle: {
            color: 'lightGrey'
        }
    }, {
        label: `Other`,
        value: 3,
        textStyle: {
            color: 'lightGrey'
        }
    }
];

export const defaultPickerValue = {
    label: `Select a category`,
    value: 0,
    untouchable: true,
    textStyle: {
        fontWeight: `bold`,
        fontFamily: `wallpiper_bold_font`,
    }
}