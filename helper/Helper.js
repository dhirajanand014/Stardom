import React from 'react';
import axios from 'axios';
import AddPostConstant from '../constants/AddPostConstant.json';
import {
    urlConstants, keyChainConstansts, permissionsButtons,
    postCountTypes, savePostCountKeys, permissionMessages,
    stringConstants, alertTextMessages, responseStringData, PRIVATE_FOLLOW_UNFOLLOW, keyBoardTypeConst,
    actionButtonTextConstants, colorConstants, getDefaultProfilePostsCounts,
    miscMessage, width, height, numericConstants, placeHolderText,
    screens, headerStrings, fieldControllerName, isAndroid, notificationConsts,
    isIOS, OTP_INPUTS, errorMessages, requestConstants, modalTextConstants,
    jsonConstants, defaultProfilesValue, SDMenuOptions, AUTO_SUBMIT_OTP_TIME_LIMIT,
    formRequiredRules, countRanges, RESEND_OTP_TIME_LIMIT
} from '../constants/Constants';
import {
    NativeModules,
    PermissionsAndroid, ToastAndroid
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { withDelay, withSpring } from 'react-native-reanimated';
import { colors, SDGenericStyles } from '../styles/Styles';
import RNOtpVerify from 'react-native-otp-verify';
import { TourGuideZone } from 'rn-tourguide';
import ImagePicker from 'react-native-image-crop-picker';
import DefaultUserProfile from '../constants/DefaultUserProfile.json';
import { HeaderBackButton } from '@react-navigation/stack';
import Share from 'react-native-share';
import { showMessage } from "react-native-flash-message";
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import { createChannel } from '../notification/notification';
import { Importance } from 'react-native-push-notification';

export const fetchCategoryData = async () => {
    try {
        const responseData = await axiosGetWithHeaders(urlConstants.fetchCategories);
        return responseData.data.categories;
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_CATEGORIES, error);
    }
    return jsonConstants.EMPTY
}

export const fetchAndUpdateCategoryState = async (category, setCategory) => {
    try {
        const responseCategoryData = await fetchCategoryData();
        if (responseCategoryData) {
            const selectedCategories = await getSelectedCategoryIdsFromStorage();
            const parsedSelectedCategoryIds = selectedCategories && JSON.parse(selectedCategories.password)
                || jsonConstants.EMPTY;
            responseCategoryData.sort((cat1, cat2) => cat1.categoryTitle.localeCompare(cat2.categoryTitle))
                .map((category) => category.isSelected = parsedSelectedCategoryIds.some(selectedCategory =>
                    category.categoryId == selectedCategory.selectedCategoryId))
        }
        let initialCategory = await getCategoryButtonType();
        initialCategory = initialCategory && initialCategory.password || actionButtonTextConstants.SKIP_BUTTON;

        setCategory({ ...category, categories: responseCategoryData, initialCategory: initialCategory });
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_CATEGORIES, error);
        setCategory({ ...category, categories: [], initialCategory: actionButtonTextConstants.SKIP_BUTTON });
    }
}

export const fetchPostsAndSaveToState = async (sdomDatastate, setSdomDatastate, optionsState,
    setOptionsState, categoryIdFromNotification) => {
    try {
        const categoryPostsData = await retrievePostData(categoryIdFromNotification);
        setSdomDatastate({ ...sdomDatastate, posts: categoryPostsData });
        setOptionsState({ ...optionsState, showSearch: true });
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_ALL_POSTS, error);
        setSdomDatastate({ ...sdomDatastate, posts: jsonConstants.EMPTY });
    }
}


export const getSelectedCategoryIdsFromStorage = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.SAVE_CATEGORY_ID);
    } catch (error) {
        console.error(errorMessages.CANNOT_FETCH_CATEGORIES_FROM_STORAGE, error);
    }
}

export const getPostIdFromStorage = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.POST_ID_KEY);
    } catch (error) {
        console.error(errorMessages.CANNOT_FETCH_POST_ID_VALUE, error);
    }
}

export const increaseAndSetPostCounts = async (paramKey, postDetailsState, setPostDetailsState, postCountType) => {
    try {
        paramKey == postCountTypes.POST_LIKE_KEY && postDetailsState.currentPost.likeAdded && --postDetailsState.currentPost[paramKey] ||
            ++postDetailsState.currentPost[paramKey];

        const postCountRequest = {
            [requestConstants.POST_ID_KEY]: parseInt(postDetailsState.currentPost.id),
            [requestConstants.REACH_TYPE]: postCountType
        }

        if (paramKey == postCountTypes.POST_LIKE_KEY && postDetailsState.currentPost.likeAdded) {
            postCountRequest[requestConstants.POST_DISLIKED] = true;
        }
        if (postCountRequest) {
            const response = await axiosPostWithHeaders(urlConstants.setPostReach, JSON.stringify(postCountRequest));
            const responseData = processResponseData(response);
            if (responseData.message == responseStringData.SUCCESS) {
                if (postCountType == postCountTypes.POST_LIKES) {
                    const message = postDetailsState.currentPost.likeAdded && `${alertTextMessages.POST_DISLIKED}${postDetailsState.currentPost.postTitle}` ||
                        `${alertTextMessages.POST_LIKED}${postDetailsState.currentPost.postTitle}`;

                    showSnackBar(message, true, true);
                    postDetailsState.currentPost.likeAdded = !postDetailsState.currentPost.likeAdded;
                    await savePostCounts(postDetailsState.currentPost.id, savePostCountKeys.SELECTED_POST_LIKES,
                        postDetailsState, setPostDetailsState);
                } else {
                    setPostDetailsState({ ...postDetailsState });
                }
                postCountType == postCountTypes.POST_DOWNLOADS &&
                    showSnackBar(`${alertTextMessages.POST_DOWNLOADED}${postDetailsState.currentPost.postTitle}`, true, true);
            }
        }
    } catch (error) {
        console.error(errorMessages.CANNOT_SET_INCREASED_COUNT_TO_DATABASE, error);
    }
}

export const savePostCounts = async (postId, postIdForSelectedCountType, postDetailsState, setPostDetailsState) => {
    try {
        const getPostIdOfPostForCount = await getPostCounts(keyChainConstansts.SAVE_POST_COUNTS);
        let postCounts, postIds = jsonConstants.EMPTY, postIdsJson;
        if (getPostIdOfPostForCount && getPostIdOfPostForCount.password) {
            postCounts = JSON.parse(getPostIdOfPostForCount.password) || stringConstants.EMPTY;
        }
        if (postIdForSelectedCountType == savePostCountKeys.SELECTED_POST_LIKES) {
            if (postCounts) {
                postIds = postCounts[savePostCountKeys.SELECTED_POST_LIKES];
                if (!postIds.includes(postId)) {
                    postIds.push(postId);
                } else if (postIds.includes(postId) && !postDetailsState.currentPost.likeAdded) {
                    postIds.splice(postIds.findIndex(id => id == postId), numericConstants.ONE);
                }
            } else {
                postIds.push(postId);
                postCounts = {
                    [savePostCountKeys.SELECTED_POST_LIKES]: postIds
                }
            }
            postIdsJson = JSON.stringify(postCounts);
            await saveDetailsToKeyChain(keyChainConstansts.SAVE_POST_COUNTS, keyChainConstansts.SAVE_POST_COUNTS,
                postIdsJson);
        }
        setPostDetailsState({ ...postDetailsState });
    } catch (error) {
        console.error(`Cannot save the post counts for the post id ${postId}`, error);
    }
}

export const getPostCounts = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.SAVE_POST_COUNTS);
    } catch (error) {
        console.error(`Cannot fetch the post ids from the selected post counts for type: ${postIdForSelectedCountType}`,
            error);
    }
}

export const setCurrentImageAsWallPaper = async (postUrl, postTitle, option) => {
    try {
        NativeModules.StartomApi.setPostAsWallPaper(postTitle, postUrl, option);
    } catch (error) {
        console.error(errorMessages.COULD_NOT_SET_WALLPAPER, error);
    }
}

export const downloadCurrentImage = async (postUrl, postTitle, isDownload, downloadCallback) => {
    try {
        let config = { fileCache: true };
        if (isDownload) {
            config.path = `${RNFetchBlob.fs.dirs.DownloadDir}${responseStringData.STARDOM_PATH}${stringConstants.SLASH}${postTitle}${responseStringData.DOWNLOAD_IMAGE_EXTENTION}`
        }
        const response = await RNFetchBlob.config(config).fetch(requestConstants.GET, postUrl)
            .progress((received, total) => { downloadCallback && downloadCallback(received, total) });
        return isDownload && processResponseData(response) || response;
    } catch (error) {
        console.error(errorMessages.COULD_NOT_DOWNLOAD_IMAGE, error);
    }
}

export const openPhotos = (imagePath) => {
    if (isIOS) {
        RNFetchBlob.ios.openDocument(imagePath);
    } else if (isAndroid) {
        RNFetchBlob.android.actionViewIntent(imagePath, miscMessage.IMAGE_TYPE);
    }
}

export const shareImage = async (post, resetFlashMessage) => {
    const { postImage, postTitle } = post;
    try {
        showSnackBar(`Sharing post image`, true, true);
        const response = await downloadCurrentImage(postImage, postTitle, false, null);
        if (response) {
            const base64Image = await response.readFile(miscMessage.BASE64);
            const base64Data = `${miscMessage.BASE64_BLOB}${base64Image}`;
            await Share.open({
                url: base64Data, filename: postTitle, excludedActivityTypes: [miscMessage.EXCLUDE_TYPE],
                type: miscMessage.IMAGE_TYPE, title: post.postLink, subject: postTitle,
            });
        } else {
            showSnackBar(errorMessages.COULD_NOT_SHARE_IMAGE, false);
        }
    } catch (error) {
        error.message && error.message == errorMessages.USER_DID_NOT_SHARE &&
            showSnackBar(errorMessages.USER_CANCELLED_SHARE, false);
        console.error(errorMessages.COULD_NOT_SHARE_IMAGE, error);
    }
    resetFlashMessage();
}

export const getCategoryButtonType = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.SAVE_CATEGORY_BUTTON_TYPE);
    } catch (error) {
        console.error(errorMessages.CANNOT_FETCH_SAVE_BUTTON_TYPE, error);
    }
}

export const setWallpaperByOption = async (paramKey, option, postDetailsState, setPostDetailsState) => {
    try {
        await setCurrentImageAsWallPaper(postDetailsState.currentPost.postImage, postDetailsState.currentPost.postTitle, option);
        await increaseAndSetPostCounts(paramKey, postDetailsState, setPostDetailsState, postCountTypes.POST_WALLPAPERS);
        showSnackBar(alertTextMessages.WALLPAPER_SET_SUCCESS_TEXT, true, true);
    } catch (error) {
        console.error(error);
    }
}

export const downloadImageFromURL = async (paramKey, postDetailsState, setPostDetailsState, downloadCallback, resetFlashMessage) => {
    const write_granted = await accessAndGrantPermssionsToWallPiper(permissionMessages.READ_WRITE_EXTERNAL_STORAGE_TITLE,
        permissionMessages.READ_WRITE_EXTERNAL_STORAGE_MESSAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    const read_granted = await accessAndGrantPermssionsToWallPiper(permissionMessages.READ_WRITE_EXTERNAL_STORAGE_TITLE,
        permissionMessages.READ_WRITE_EXTERNAL_STORAGE_MESSAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

    if (PermissionsAndroid.RESULTS.GRANTED == write_granted && PermissionsAndroid.RESULTS.GRANTED === read_granted) {
        const responseData = await downloadCurrentImage(postDetailsState.currentPost.postImage, postDetailsState.currentPost.postTitle, true,
            downloadCallback);
        responseData && openPhotos(responseData.path());
        await increaseAndSetPostCounts(paramKey, postDetailsState, setPostDetailsState, postCountTypes.POST_DOWNLOADS);
        resetFlashMessage();
    } else {
        showSnackBar(errorMessages.EXTERNAL_STORAGE_DENIED, false);
    }
}

export const accessAndGrantPermssionsToWallPiper = async (permissionTitie, permissionMessage, permissionType) => {
    try {
        return await PermissionsAndroid.request(permissionType,
            {
                title: permissionTitie,
                message:
                    permissionMessage,
                buttonNeutral: permissionsButtons.ASK_ME_LATER,
                buttonNegative: permissionsButtons.CANCEL,
                buttonPositive: permissionsButtons.OK
            }
        );
    } catch (error) {
        console.error(`Error accessing permissions for ${permissionType}`, error);
    }
}

export const fetchAndDisplayNamesAndCategoryTitles = (post) => {
    let names = [];
    if (post.categoryTitles) {
        const categoryTitlesArray = post.categoryTitles.split(stringConstants.COMMA);
        const displayTitles = categoryTitlesArray && categoryTitlesArray.slice(numericConstants.ZERO, numericConstants.TWO)
            || stringConstants.EMPTY;
        const concatinatedDisplayName = displayTitles.map(title => title.toUpperCase()).
            join(stringConstants.PIPELINE_JOIN);
        if (categoryTitlesArray.length > numericConstants.TWO) {
            names.push(concatinatedDisplayName.
                concat(stringConstants.PLUS.concat(categoryTitlesArray.length - displayTitles.length)));
        } else {
            names.push(concatinatedDisplayName);
        }
    }
    return names.join(stringConstants.PIPELINE_JOIN) || stringConstants.EMPTY;
}

export const setPostDetailsStateForModal = (postDetailsState, setPostDetailsState, modalKey) => {
    modalKey == miscMessage.POST_DESCRIPTION_MODAL_NAME &&
        setAnimationVisible(postDetailsState, setPostDetailsState, false);
    setPostDetailsState({ ...postDetailsState, [modalKey]: true });
}

export const setReportAbuseSelectedOption = (postDetailsState, setPostDetailsState, selectedReportAbuseId) => {
    setPostDetailsState({
        ...postDetailsState,
        selectedReportAbuse: {
            [requestConstants.POST_ID]: postDetailsState.currentPost.id,
            [requestConstants.POST_REPORT_ABUSE_ID]: selectedReportAbuseId,
            [requestConstants.POST_REPORT_ABUSE_SUBMITTED]: false
        }
    });
}

export const setOptionsStateRadioOptions = (optionsState, setOptionsState) => {
    setOptionsState({
        ...optionsState,
        reportAbuseModal: true
    });
}

export const resetModalState = (postDetailsState, setPostDetailsState, modalKey) => {
    postDetailsState[modalKey] = false;
    if (modalKey == miscMessage.POST_REPORT_ABUSE_MODAL_NAME) {
        postDetailsState.selectedReportAbuse = {};
        postDetailsState.reportAbuses = [];
        postDetailsState.reportAbuseSubmitDisabled = false;
    }
    setPostDetailsState({ ...postDetailsState });
}

export const setReportIdForPost = async (postDetailsState, setPostDetailsState) => {
    const { currentPost, selectedReportAbuse } = postDetailsState;
    const { id, postTitle } = currentPost;
    try {
        postDetailsState.reportAbuseSubmitDisabled = true;
        const requestReportAbusePayload = {
            [requestConstants.POST_ID_KEY]: id,
            [requestConstants.POST_REPORT_ABUSE_ID]: selectedReportAbuse.postReportAbuseId
        }
        const responseReportAbuseSet = await axiosPostWithHeaders(urlConstants.setReportAbuseIdWithPostId,
            requestReportAbusePayload);

        const responseData = processResponseData(responseReportAbuseSet);

        if (responseData && responseData.message == responseStringData.SUCCESS) {
            requestReportAbusePayload[requestConstants.POST_REPORT_ABUSE_SUBMITTED] = true;
            postDetailsState.selectedReportAbuse = requestReportAbusePayload;
        }

        ToastAndroid.show(`Thank you for submitting the report!`, ToastAndroid.SHORT);

        await saveReportAbuseOptions(postDetailsState);
        resetModalState(postDetailsState, setPostDetailsState, miscMessage.POST_REPORT_ABUSE_MODAL_NAME);
    } catch (error) {
        console.error(`Cannot set report abuse id for ${postTitle}`, error);
    }
}

export const saveReportAbuseOptions = async (postDetailsState) => {
    try {
        var saveReportsArray = [], isReportAbuseAlreadySet = false;
        const savedReportAbuses = await fetchSavedReportAbuseOptions();
        if (savedReportAbuses) {
            saveReportsArray = JSON.parse(savedReportAbuses.password);
            isReportAbuseAlreadySet = saveReportsArray && saveReportsArray.some((item) => item.postId == postDetailsState.selectedReportAbuse.id &&
                postDetailsState.selectedReportAbuse[requestConstants.POST_REPORT_ABUSE_SUBMITTED]);
        }
        if (!isReportAbuseAlreadySet) {
            saveReportsArray.push(postDetailsState.selectedReportAbuse);

            const saveReportsJSON = JSON.stringify(saveReportsArray);
            setReportAbuseOptions(saveReportsJSON);
        }
    } catch (error) {
        console.error(errorMessages.CANNOT_SAVE_REPORT_ABUSE, error);
    }
}

export const fetchReportAbuseValues = async (postDetailsState, setPostDetailsState) => {
    try {
        const savedReportAbusesJSON = await fetchSavedReportAbuseOptions();

        let reportAbusesData = savedReportAbusesJSON && JSON.parse(savedReportAbusesJSON.password);

        const reportAbuseForPostPresent = reportAbusesData && reportAbusesData.find((item) =>
            item.postId == postDetailsState.currentPost.id && item.reportAbuseSubmitted) || {};

        if (!Object.keys(reportAbuseForPostPresent).length) {

            const responseReportAbuses = await axiosGetWithHeaders(urlConstants.fetchReportAbuses);
            const responseData = processResponseData(responseReportAbuses);

            if (responseData) {
                if (reportAbusesData) {
                    reportAbusesData.map((item) => {
                        item[requestConstants.POST_REPORT_ABUSE_SUBMITTED] = false;
                        item[requestConstants.REPORT_ID] = parseInt(item.postReportAbuseId);
                    });
                }
                reportAbusesData = responseData;
            }
        }
        setPostDetailsState({
            ...postDetailsState,
            reportAbuses: reportAbusesData || [],
            selectedReportAbuse: reportAbuseForPostPresent || {}
        });
    } catch (error) {
        console.error(errorMessages.CANNOT_FETCH_REPORT_ABUSES, error);
    }
}


export const setReportAbuseOptions = async (saveReportsJSON) => {
    try {
        await saveDetailsToKeyChain(keyChainConstansts.SAVE_SELECTED_REPORT,
            keyChainConstansts.SAVE_SELECTED_REPORT, saveReportsJSON);
    } catch (error) {
        console.error(errorMessages.CANNOT_SET_SELECTED_REPORT_ABUSES, error);
    }
}

export const fetchSavedReportAbuseOptions = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.SAVE_SELECTED_REPORT);
    } catch (error) {
        console.error(errorMessages.CANNOT_FETCH_SELECTED_SAVED_REPORT_ABUSE, error);
    }
}

export const resetAnimatePostTextDetails = (textPostDescriptionAnimationValue, textPostTypeAnimationValue) => {
    const text_spring_config = {
        damping: numericConstants.TWENTY,
        stiffness: numericConstants.NINETY
    };
    textPostDescriptionAnimationValue.value = withSpring(-numericConstants.THOUSAND, text_spring_config);
    textPostTypeAnimationValue.value = withSpring(-numericConstants.THOUSAND, text_spring_config);
}

export const animateFinishedPostTextDetails = (textPostDescriptionAnimationValue, textPostTypeAnimationValue) => {
    const text_spring_config = {
        damping: numericConstants.TWENTY,
        stiffness: numericConstants.NINETY
    };
    textPostDescriptionAnimationValue.value = withDelay(numericConstants.ONE_HUNDRED_FIFTY, withSpring(numericConstants.ZERO, text_spring_config));
    textPostTypeAnimationValue.value = withDelay(numericConstants.FIFTY, withSpring(numericConstants.ZERO, text_spring_config));
}

export const onSwiperScrollEnd = (event, postDetailsRef, textPostDescriptionAnimationValue, textPostTypeAnimationValue, currentPostIndexForProfileRef) => {
    let index = numericConstants.ZERO;
    if (event.position || event.nativeEvent.position) {
        index = event.position - numericConstants.ONE || event.nativeEvent.position - numericConstants.ONE;
    } else if (event.nativeEvent.layoutMeasurement) {
        index = Math.round(event.nativeEvent.contentOffset.y / event.nativeEvent.layoutMeasurement.height) - numericConstants.ONE;
    }
    postDetailsRef?.current?.setScrollOffset(event.nativeEvent.contentOffset.y);
    postDetailsRef?.current?.setCurrentPost(index);
    if (currentPostIndexForProfileRef)
        currentPostIndexForProfileRef.current = index;
    animateFinishedPostTextDetails(textPostDescriptionAnimationValue, textPostTypeAnimationValue);
    postDetailsRef?.current?.renderLoaderScroll && setTimeout(() => {
        postDetailsRef?.current?.setRenderLoaderScroll(false);
    }, numericConstants.THREE_HUNDRED);
}

export const setAnimationVisible = (postDetailsState, setPostDetailsState, isVisible) => {
    setPostDetailsState({
        ...postDetailsState,
        animationVisible: isVisible
    });
}

export const scrollWhenPostIdFromNotification = (posts, postIdFromNotification, viewPagerRef, postDetailsRef, isFromNotification) => {
    try {
        if ((isFromNotification && isFromNotification.current) || (!postDetailsRef?.current?.newPostViewed
            && postIdFromNotification?.current && viewPagerRef?.current)) {
            const index = posts.findIndex(post => post.id == postIdFromNotification.current) || numericConstants.ZERO;
            isFromNotification && isFromNotification.current && viewPagerRef.current.scrollTo(numericConstants.ONE);
            postDetailsRef?.current?.setPostIndex(isFromNotification && numericConstants.ZERO || index);
            postDetailsRef?.current?.setNewPostViewed(true);
            postIdFromNotification.current = null;
            if (isFromNotification) isFromNotification.current = false;
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_PERFORM_SCROLL_POST, error);
    }
}

export const checkAndAddCategoriesFromFCMNotification = async (selectedCategories, categoryIdFromNotification) => {
    try {
        if (categoryIdFromNotification && selectedCategories.length) {
            let selectCategories = JSON.parse(selectedCategories);
            if (selectCategories.some((selectedCategory) =>
                selectedCategory.selectedCategoryId != categoryIdFromNotification)) {
                const responseCategoryData = await fetchCategoryData();

                const categoryTitle = responseCategoryData.find((item) => item.categoryId == categoryIdFromNotification).categoryTitle ||
                    stringConstants.EMPTY;

                selectCategories.push({
                    selectedCategoryId: categoryIdFromNotification.toString(),
                    selectedCategoryTitle: categoryTitle
                });

                selectedCategories = JSON.stringify(selectCategories);
                await saveDetailsToKeyChain(keyChainConstansts.SAVE_CATEGORY_ID, keyChainConstansts.SAVE_CATEGORY_ID,
                    selectedCategories);
            }
        }
        return selectedCategories;
    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param {*} categoryIdFromNotification 
 */
const retrievePostData = async (categoryIdFromNotification) => {
    let categoryPostsData = jsonConstants.EMPTY;
    const responseData = await axiosGetWithHeaders(urlConstants.fetchAllPosts);
    if (responseData) {
        const responsePostsData = responseData.data.posts;
        let selectedCategories = await getSelectedCategoryIdsFromStorage();
        //May not be required
        selectedCategories = await checkAndAddCategoriesFromFCMNotification(selectedCategories.password,
            categoryIdFromNotification);

        const fetchedPostCounts = await getPostCounts();
        const postCounts = fetchedPostCounts && JSON.parse(fetchedPostCounts.password);

        const parsedCategoryIds = selectedCategories && JSON.parse(selectedCategories) || categoryPostsData;

        categoryPostsData = parsedCategoryIds && parsedCategoryIds.length &&
            responsePostsData.filter(post => parsedCategoryIds.some((selectedCategory) =>
                post.categoryIds.split(stringConstants.COMMA).includes(selectedCategory.selectedCategoryId.toString())))
                .sort((datePost1, datePost2) => {
                    return Date.parse(datePost2.created_at) - Date.parse(datePost1.created_at);
                }) || responsePostsData.sort((datePost1, datePost2) => {
                    return Date.parse(datePost2.created_at) - Date.parse(datePost1.created_at);
                });

        categoryPostsData.map(postItem => {
            const postHasLikes = postCounts && postCounts[savePostCountKeys.SELECTED_POST_LIKES] &&
                postCounts[savePostCountKeys.SELECTED_POST_LIKES].some(postId => postItem.id == postId);
            if (postHasLikes) {
                postItem.likeAdded = postHasLikes;
            }
            postItem.postCategoriesIn = fetchAndDisplayNamesAndCategoryTitles(postItem);
        });
        categoryPostsData = await filterLoggedInUsersPosts(categoryPostsData, true);
    }
    return categoryPostsData;
}

const filterLoggedInUsersPosts = async (allPosts, isForPostWallpaper) => {
    try {
        const loggedInUser = await getLoggedInUserDetails();
        if (loggedInUser && loggedInUser.details) {
            const user = JSON.parse(loggedInUser.details);
            allPosts = allPosts.filter(post => {
                const postFollowers = post.user.followers.filter(follower => follower.follower_id == user.id);
                if (postFollowers && postFollowers.length && post.postType == fieldControllerName.POST_TYPE_PRIVATE) {
                    const privateAccess = postFollowers.find(follower => follower.follower_id == user.id).pvtaccess ||
                        PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED;
                    return privateAccess == PRIVATE_FOLLOW_UNFOLLOW.APPROVED;
                } else if (post.user.id == user.id) {
                    return post.postType == fieldControllerName.POST_TYPE_PUBLIC ||
                        post.postType == fieldControllerName.POST_TYPE_PRIVATE;
                }
                return post.user.user_type == miscMessage.VERIFIED_AUTHOR && post.postType == fieldControllerName.POST_TYPE_PUBLIC;
            });
        } else {
            allPosts = isForPostWallpaper && allPosts.filter(post => {
                if (post.user.user_type == miscMessage.VERIFIED_AUTHOR || post.user.id === numericConstants.ONE) { //1 is always for admin
                    return post.postType == fieldControllerName.POST_TYPE_PUBLIC;
                }
                return post.postType == fieldControllerName.POST_TYPE_PUBLIC && post.postLikes >= numericConstants.ONE_HUNDRED
            }) || allPosts.filter(post => post.postType == fieldControllerName.POST_TYPE_PUBLIC);
        }
        return allPosts;
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FILTER_OUT_PRIVATE_POST_FOR_LOGGED_IN_USER, error);
    }
}

export const focusOnInputIfFormInvalid = (formState, inputRef) => {
    if (!formState.isValid)
        inputRef?.current?.focus();
}

export const onChangeByValueType = async (inputProps, value, props) => {
    switch (props.inputName) {
        case fieldControllerName.PHONE_NUMBER:
            const phoneValue = value.replace(stringConstants.REPLACE_REGEX, stringConstants.EMPTY);
            inputProps.onChange(phoneValue);
            props.isSignUp && props.setSignUpDetails({ ...props.signUpDetails, phoneNumber: phoneValue });
            break;
        case fieldControllerName.USER_ID:
            inputProps.onChange(value);
            props.clearErrors();
            break;
        case fieldControllerName.SEARCH_POSTS:
            const filteredPosts = value && props.items.filter(postFilter => postFilter.postTitle.toLowerCase().
                includes(value.toLowerCase())) || props.items;
            props.setState({ ...props.state, posts: filteredPosts });
            break;
        case fieldControllerName.SEARCH_USERS:
            const filteredUsers = value && props.items.filter(user => user.name && user.name.toLowerCase().includes(value.toString().toLowerCase())
                || user.user_id && user.user_id.toString().toLowerCase().includes(value.toString().toLowerCase())) || props.items;
            props.setState({ ...props.state, users: filteredUsers });
            break;
        case fieldControllerName.SEARCH_FOLLOWERS:
        case fieldControllerName.SEARCH_FOLLOWINGS:
            const filteredFollowersFollowings = value && props.items.filter(user => user.name && user.name.toLowerCase().includes(value.toString().toLowerCase()))
                || props.items;
            props.setState({ ...props.state, users: filteredFollowersFollowings });
            break;
        default:
            inputProps.onChange(value);
            break;
    }
}

export const convertDate = (event, datePickerProps, props, date) => {
    const formatedDate = datePickerConvert(event, date);
    formatedDate && onChangeByValueType(datePickerProps, formatedDate, props);
}

const datePickerConvert = (event, date) => {
    try {
        if (!event.type && isIOS) {
            return date;
        } else if (miscMessage.SET == event.type) {
            return isIOS && date || moment(event.nativeEvent.timestamp).toDate();
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}

export const showSelectedImage = async (type, isFrom, navigation) => {
    try {
        if (type == miscMessage.CAMERA) {
            navigation.navigate(screens.CAMERA, { isFrom: isFrom });
        } else if (type == miscMessage.GALLERY) {
            const imageValue = await ImagePicker.openPicker({ width: width, height: height });
            imageValue && navigation.navigate(screens.IMAGE_PREVIEW_FILTERS, {
                isFrom: isFrom,
                imageValue: imageValue.path
            });
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_SHOW_SELECTED_IMAGE, error);
    }
}

export const categoryHeader = () => {
    return ({
        headerShown: true,
        headerTitle: headerStrings.SELECT_CATEGORY,
        headerStyle: SDGenericStyles.backGroundColorBlack,
        headerTintColor: colorConstants.WHITE,
        headerTitleAlign: miscMessage.CENTER,
        headerTitleStyle: SDGenericStyles.fontFamilyRobotoMedium,
        navigationOptions: ({ navigation }) => ({
            headerLeft: (
                <TourGuideZone zone={numericConstants.TWO} borderRadius={numericConstants.EIGHT} shape={miscMessage.CIRCLE}
                    text={miscMessage.CATEGORY_BACK}>
                    <HeaderBackButton tintColor={SDGenericStyles.colorWhite} onPress={() => { navigation.goBack() }} />
                </TourGuideZone>
            )
        })
    })
}

export const authorizationHeader = props => {
    return ({
        headerShown: true,
        headerTitle: props.title,
        headerStyle: SDGenericStyles.backGroundColorBlack,
        headerTintColor: colorConstants.WHITE,
        headerTitleAlign: miscMessage.CENTER,
        headerTitleStyle: SDGenericStyles.fontFamilyRobotoMedium,
        navigationOptions: ({ navigation }) => ({
            headerLeft: (
                <HeaderBackButton tintColor={SDGenericStyles.colorWhite} onPress={() => { navigation.goBack() }} />
            )
        })
    })
}

export const onResendOtpButtonPress = async (firstTextInputRef, setOtpArray, setResendButtonDisabledTime, setAttemptsRemaining,
    attemptsRemaining, startResendOtpTimer, phoneNumber, isFrom, navigation, clearErrors, setLoaderCallback) => {
    // clear last OTP
    if (firstTextInputRef) {
        setOtpArray(Array(OTP_INPUTS).fill(stringConstants.EMPTY));
        firstTextInputRef.current.focus();
    }
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    setAttemptsRemaining(--attemptsRemaining);
    startResendOtpTimer();
    const signUpDetails = {
        [fieldControllerName.PHONE_NUMBER]: phoneNumber
    };
    await handleUserSignUpOtp(signUpDetails, isFrom, navigation, true, setLoaderCallback);
    clearErrors(fieldControllerName.OTP_INPUT);
};

// only backspace key press event is fired on Android
// to have consistency, using this event just to detect backspace key press and
// onOtpChange for other digits press
export const onOtpKeyPress = (index, otpArray, firstTextInputRef, secondTextInputRef, thirdTextInputRef, fourthTextInputRef,
    fifthTextInputRef, setOtpArray, setError, clearErrors, setAutoSubmittingOtp) => {
    return ({ nativeEvent: { key: value } }) => {
        // auto focus to previous InputText if value is blank and existing value is also blank
        if (value === miscMessage.BACKSPACE && otpArray[index] === stringConstants.EMPTY) {
            setAutoSubmittingOtp(false);
            switch (index) {
                case numericConstants.ONE:
                    firstTextInputRef.current.focus();
                    break;
                case numericConstants.TWO:
                    secondTextInputRef.current.focus();
                    break;
                case numericConstants.THREE:
                    thirdTextInputRef.current.focus();
                    break;
                case numericConstants.FOUR:
                    fourthTextInputRef.current.focus();
                    break;
                case numericConstants.FIVE:
                    fifthTextInputRef.current.focus();
                    break;
                default:
                    break;
            }
            /**
             * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
             * doing this thing for us
             * todo check this behaviour on ios
             */
            if (index > numericConstants.ZERO) {
                const otpArrayCopy = otpArray.concat();
                otpArrayCopy[index - numericConstants.ONE] = stringConstants.EMPTY; // clear the previous box which will be in focus
                setOtpArray(otpArrayCopy);
            }
        }
        if (isAndroid) {
            const otpString = otpArray.reduce((result, item) => { return `${result}${item}` }, stringConstants.EMPTY);
            identifyOtpError(otpString, otpArray, setError, clearErrors);
        }
    };
};

// this event won't be fired when text changes from '' to '' i.e. backspace is pressed
// using onOtpKeyPress for this purpose
export const onOtpChange = (index, otpArray, setOtpArray, secondTextInputRef, thirdTextInputRef, fourthTextInputRef,
    fifthTextInputRef, sixththTextInputRef, setError, clearErrors) => {
    return value => {
        if (isNaN(Number(value))) {
            // do nothing when a non digit is pressed
            return;
        }
        const otpArrayCopy = otpArray.concat();
        otpArrayCopy[index] = value;
        setOtpArray(otpArrayCopy);

        if (isIOS) {
            const otpString = otpArrayCopy.reduce((result, item) => { return `${result}${item}` }, stringConstants.EMPTY);
            identifyOtpError(otpString, otpArrayCopy, setError, clearErrors);
        }

        // auto focus to next InputText if value is not blank
        if (value !== stringConstants.EMPTY) {
            switch (index) {
                case numericConstants.ZERO:
                    secondTextInputRef.current.focus();
                    break;
                case numericConstants.ONE:
                    thirdTextInputRef.current.focus();
                    break;
                case numericConstants.TWO:
                    fourthTextInputRef.current.focus();
                    break;
                case numericConstants.THREE:
                    fifthTextInputRef.current.focus();
                    break;
                case numericConstants.FOUR:
                    sixththTextInputRef.current.focus();
                    break;
                default:
                    break;
            }
        }
    };
};

export const identifyOtpError = (otpString, otpArray, setError, clearErrors) => {
    if (otpString === stringConstants.EMPTY || otpString.length < OTP_INPUTS) {
        setError(fieldControllerName.OTP_INPUT, {
            type: `length`,
            message: `Please enter 6 digit OTP`
        })
        return false;
    }
    if (otpArray && otpArray.length === OTP_INPUTS) {
        clearErrors(fieldControllerName.OTP_INPUT);
        return true;
    }
    return false;
}

export const verifyOtpRequest = async (otpString, randomNumber) => {
    if (randomNumber) {
        if (parseInt(otpString) === randomNumber) {
            return miscMessage.CONFIRM_SECRET;
        }
        showSnackBar(errorMessages.INCORRECT_OTP_ENTERED, false);
        return miscMessage.INCORRECT_OTP;
    }
}

export const verifyOtpReceived = async (setOtpArray, setAutoSubmitOtpTime, startAutoSubmitOtpTimer, setAutoSubmittingOtp, isFrom) => {
    try {
        // docs: https://github.com/faizalshap/react-native-otp-verify
        if (isAndroid) {
            const otpMessage = await RNOtpVerify.getOtp();
            otpMessage && RNOtpVerify.addListener((message) =>
                listenOtp(message, setOtpArray, setAutoSubmitOtpTime, startAutoSubmitOtpTimer, setAutoSubmittingOtp, isFrom));
        }
        // remove listener on unmount
        return () => isAndroid && RNOtpVerify.removeListener();
    } catch (error) {
        console.error(error.message, 'RNOtpVerify.getOtp, OtpVerification');
    }
}

const listenOtp = (message, setOtpArray, setAutoSubmitOtpTime, startAutoSubmitOtpTimer, setAutoSubmittingOtp, isFrom) => {
    try {
        if (message) {
            const messageArray = message.split(stringConstants.OTP_SPLIT_CHARS);
            if (messageArray[numericConstants.ZERO]) {
                let otp;
                if (isFrom == miscMessage.SIGN_UP) {
                    otp = messageArray[numericConstants.ZERO].split(stringConstants.SPACE)[numericConstants.EIGHT]
                } else if (isFrom == miscMessage.FORGOT_PASSWORD) {
                    otp = messageArray[numericConstants.ZERO].split(stringConstants.SPACE)[numericConstants.NINE]
                }
                if (otp.length === numericConstants.SIX) {
                    setOtpArray(otp.split(stringConstants.EMPTY));
                    setAutoSubmitOtpTime(AUTO_SUBMIT_OTP_TIME_LIMIT);
                    startAutoSubmitOtpTimer();
                    setAutoSubmittingOtp(true);
                    return true;
                }
            }
        }
    } catch (error) {
        console.error(error.message, errorMessages.OTP_MESSAGE_READ_ERROR);
    }
    return false;
}

export const handleUserSignUpOtp = async (phoneNumber, isFrom, navigation, isResendOtp) => {
    try {

        // Math.random() returns float between 0 and 1, 
        // so minimum number will be 100000, max - 999999. 
        const random6Digit = Math.floor(Math.random() * 899999 + 100000);
        const hashValue = isAndroid && await RNOtpVerify.getHash() || "RaZGrAI03n4";
        const otpRequestData = {
            phoneNumber: phoneNumber,
            rand_number: random6Digit,
            hash_value: hashValue[numericConstants.ZERO],
            isFrom: isFrom
        }
        const otpRequestDataJSON = JSON.stringify(otpRequestData);

        const response = await axiosPostWithHeaders(urlConstants.triggerSmsOtp, otpRequestDataJSON);
        const responseData = processResponseData(response);

        if (responseData && !isResendOtp) {
            const params = getSignUpParams(random6Digit, isFrom);
            navigation.navigate(screens.OTP_VERIFICATION, params);
            return true;
        }
        showSnackBar(alertTextMessages.SENT_SMS_SUCCESSFULLY, true);
    } catch (error) {
        console.error(`${errorMessages.REQUEST_OTP_FAILED} : ${phoneNumber}`, error);
    }
    return false;
}

export const processSaveRegistrationStatus = async (isUserIdAvailable, registrationResponse, phoneNumber, navigateUser, data) => {
    isUserIdAvailable.current = false;
    let isFromForgotPassword = false;
    if (registrationResponse.message && registrationResponse.message == alertTextMessages.SECRET_UPDATED_SUCCESSFULLY) {
        await resetTokens();
        isFromForgotPassword = true;
    } else {
        await saveRegistrationStatus(phoneNumber, miscMessage.REGISTERED);
    }
    await navigateUser(data, isFromForgotPassword);
}

export const getSignUpParams = (random6Digit, isFrom) => {
    let returnValue = {};
    if (isFrom) {
        returnValue.isFrom = isFrom;
    }
    returnValue.rand_number = random6Digit;
    return returnValue;
}

export const handleUserLogin = async (data, loggedInUser, setLoggedInUser, messaging) => {
    try {
        const loginRequest = {
            [requestConstants.PHONE_NUMBER]: data.phoneNumber,
            [requestConstants.SECRET]: data.secret
        }
        const loginJson = JSON.stringify(loginRequest);
        const response = await axiosPostWithHeaders(urlConstants.login, loginJson);
        const responseData = processResponseData(response);
        if (responseData && responseData.user.block == numericConstants.ZERO) {
            const currentToken = responseData.user.device_id;
            await updateDeviceToken(messaging, currentToken, responseData.access_token, data.phoneNumber);

            const userName = `${data.phoneNumber}${stringConstants.SEMI_COLON}${responseData.access_token}`;
            const userDetailsJSON = JSON.stringify(responseData.user);

            const details = {
                [miscMessage.PHONE_NUMBER]: data.phoneNumber,
                [miscMessage.TOKEN]: responseData.access_token,
                [miscMessage.USER_DETAILS]: userDetailsJSON
            }
            setLoggedInUser({ ...loggedInUser, loginDetails: details, isLoggedIn: true });

            await saveDetailsToKeyChain(keyChainConstansts.LOGGED_IN_USER, userName,
                userDetailsJSON);
        }
        return responseData;
    } catch (error) {
        console.error(errorMessages.COULD_NOT_LOGIN_USER, error);
    }
    return false;
}

export const saveDetailsToKeyChain = async (key, username, password) => {
    try {
        await Keychain.setGenericPassword(username, password, { service: key });
        return true;
    } catch (error) {
        console.error(errorMessages.COULD_NOT_SAVE_TO_KEYCHAIN, error);
    }
    return false
}

export const handleUserRegistration = async (phoneNumber, data, isFrom) => {
    try {
        let requestData;
        switch (isFrom) {
            case miscMessage.CREATE:
                requestData = {
                    [requestConstants.PHONE_NUMBER]: phoneNumber,
                    [requestConstants.SECRET]: data.secret,
                    [requestConstants.USER_ID]: placeHolderText.AMPERSAND + data.userId
                }
                break;
            case miscMessage.FORGOT_PASSWORD:
                requestData = {
                    [requestConstants.PHONE_NUMBER]: phoneNumber,
                    [requestConstants.SECRET]: data.secret
                }
                break;
            case miscMessage.UPDATE:
                requestData = {
                    [requestConstants.PHONE_NUMBER]: phoneNumber,
                    [requestConstants.NAME]: data.name,
                    [requestConstants.EMAIL_ID]: data.email,
                    [requestConstants.DOB]: moment(data.dob).format(miscMessage.DATE_PICKER_FORMAT),
                    [requestConstants.GENDER]: data.gender,
                    [requestConstants.PROFILE_ID]: data.profile
                }
                break
            default: console.warn(isFrom);
                break;
        }
        const requestJSON = JSON.stringify(requestData);
        const url = isFrom == miscMessage.FORGOT_PASSWORD && urlConstants.resetSecret || urlConstants.registerUser;
        const responseData = await axiosPostWithHeaders(url, requestJSON);
        return processResponseData(responseData);
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(errorMessages.COULD_NOT_REGISTER_USER, false);
    }
    return false;
}

export const resetTokens = async () => {
    try {
        await Keychain.resetGenericPassword({ service: keyChainConstansts.ACCOUNT_STATUS });
        await Keychain.resetGenericPassword({ service: keyChainConstansts.LOGGED_IN_USER });
        return true;
    } catch (error_response) {
        console.error(errorMessages.COULD_NOT_RESET_KEYCHAIN_VALUES, error_response);
    }
    return false;
}

export const requestNotificationPermission = async (messaging) => {
    try {
        const authStatus = await messaging().requestPermission();
        return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (error) {
        console.error(errorMessages.CANNOT_REQUEST_PERMISSION_TO_USER, error);
    }
    console.warn(errorMessages.USER_DENIED_NOTIFICATION);
    return false;
}

export const processResponseData = (response, errorText) => {
    try {
        if (response) {
            switch (response.status) {
                case 200:
                    if (response.data && response.data.status) {
                        return tokenStatusDetails(response);
                    }
                    return response.data;
                case 201:
                    console.log(responseStringData.RESPONSE_MESSAGE, response.data.message);
                    return response.data;
                case 400:
                case 401:
                case 403:
                case 500:
                    console.error(errorText, response.data);
                    return response.data;
                default: console.log(response);
                    break;
            }
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_PARSE_RESPONSE, error);
    }
}

export const showSnackBar = (message, success, isLong, actionCallback) => {
    showMessage({
        message: success && responseStringData.SUCCESS || responseStringData.ERROR,
        description: message,
        icon: success && miscMessage.SUCCESS || miscMessage.DANGER,
        type: success && miscMessage.SUCCESS || miscMessage.DANGER,
        duration: isLong && numericConstants.FIVE_THOUSAND || numericConstants.THOUSAND_EIGHT_FIFTY,
        onPress: () => actionCallback()
    })
}

export const showProgressSnackbar = (progressValue) => {
    showMessage({
        message: miscMessage.DOWNLOADING,
        icon: miscMessage.INFO,
        type: miscMessage.INFO,
        autoHide: progressValue == numericConstants.ONE
    })
}

export const saveRegistrationStatus = async (phoneNumber, status) => {
    try {
        const status_value = {
            [requestConstants.ACCOUNT_STATUS]: status
        }
        await saveDetailsToKeyChain(keyChainConstansts.ACCOUNT_STATUS, `${phoneNumber}_${status}`,
            JSON.stringify(status_value));
        return true;
    } catch (error) {
        console.error(errorMessages.CANNOT_SAVE_ACCOUNT_STATUS, error);
    }
    return false;
}

export const getAllProfiles = async () => {
    try {
        let profiles = [{
            label: stringConstants.EMPTY, value: numericConstants.MINUS_ONE, untouchable: true
        }, defaultProfilesValue];
        let response = await axiosGetWithHeaders(urlConstants.fetchAllProfiles);
        response.data && response.data.map(profile => profile.textStyle = {
            fontFamily: `stardom_roboto_medium`,
        });
        return profiles.concat(response.data);
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_PROFILES, error);
    }
    return false;
}

export const axiosGetWithHeaders = async (url) => {
    return await axios.get(url, { headers: { [miscMessage.CONTENT_TYPE]: miscMessage.APPLICATION_JSON } });
}

export const axiosPostWithHeaders = async (url, data) => {
    return await axios.post(url, data, { headers: { [miscMessage.CONTENT_TYPE]: miscMessage.APPLICATION_JSON } });
}

const getKeyChainDetails = async (key) => {
    try {
        return await Keychain.getGenericPassword({ service: key });
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_DETAILS_FROM_KEYCHAIN, error)
    }
    return false;
}

export const axiosPostWithHeadersAndToken = async (url, data, token) => {

    return await axios.post(url, data, {
        headers: {
            [miscMessage.CONTENT_TYPE]: miscMessage.APPLICATION_JSON,
            [miscMessage.AUTHORIZATION]: `${miscMessage.BEARER}${stringConstants.SPACE}${token}`
        }
    });
}

export const axiosPostUploadImageWithHeaders = async (url, data, token, uploadProgressCallback) => {
    const config = {
        onUploadProgress: (progressEvent) => { uploadProgressCallback(progressEvent) },
        headers: {
            [miscMessage.CONTENT_TYPE]: miscMessage.MULTIPART_FORM,
            [miscMessage.AUTHORIZATION]: `${miscMessage.BEARER}${stringConstants.SPACE}${token}`
        }
    };
    return await axios.post(url, data, config);
}

export const prepareSDOMMenu = () => {
    try {
        return SDMenuOptions;
    } catch (error) {
        console.error(error);
    }
}

export const redirectUserToGlance = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.SAVE_CATEGORY_ID);
    } catch (error) {
        console.error(errorMessages.COULD_NOT_REDIRECT_TO_GLANCE, error);
    }
    return false
}

export const saveCategoryDetailsToKeyChain = async (key, data) => {
    try {
        await saveDetailsToKeyChain(key, key, data);
        return true;
    } catch (error) {
        console.error(errorMessages.COULD_NOT_SAVE_CATEGORY_DETAILS_TO_KEYCHAIN, error);
    }
    return false;
}

export const getLoggedInUser = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.LOGGED_IN_USER);
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_LOGIN_DETAILS_FROM_KEYCHAIN, error);
    }
    return false;
}

export const axiosGetWithAuthorization = async (url, token) => {
    return await axios.get(url, {
        headers: {
            [miscMessage.CONTENT_TYPE]: miscMessage.APPLICATION_JSON,
            [miscMessage.AUTHORIZATION]: `${miscMessage.BEARER}${stringConstants.SPACE}${token}`
        }
    });
}

export const deleteWithAuthorization = async (url, id, token) => {
    const urlDelete = id && `${url}${stringConstants.SLASH}${id}` || url;
    return await axios.delete(urlDelete, {
        headers: {
            [miscMessage.AUTHORIZATION]: `${miscMessage.BEARER}${stringConstants.SPACE}${token}`
        }
    });
}

export const getLoggedInUserDetails = async () => {
    try {
        const loggedInUser = await getLoggedInUser();
        return loggedInUser && {
            [miscMessage.PHONE_NUMBER]: loggedInUser.username.split(stringConstants.SEMI_COLON)[numericConstants.ZERO],
            [miscMessage.TOKEN]: loggedInUser.username.split(stringConstants.SEMI_COLON)[numericConstants.ONE],
            [miscMessage.USER_DETAILS]: loggedInUser.password
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_PARSE_LOGIN_TOKEN, error);
    }
    return false;
}

export const fetchUpdateLoggedInUserProfile = async (loggedInUser, setLoggedInUser, fetchUpdated) => {
    try {
        const user = await getLoggedInUserDetails();
        loggedInUser.loginDetails = { ...user };
        loggedInUser.isLoggedIn = true
        if (user && fetchUpdated) {
            const updatedDetails = await axiosGetWithAuthorization(urlConstants.getUserProfile, user.token);
            if (updatedDetails.status == numericConstants.TWO_HUNDRED) {
                const responseData = processResponseData(updatedDetails);
                const JSONDetails = JSON.stringify(responseData);
                await saveDetailsToKeyChain(keyChainConstansts.LOGGED_IN_USER,
                    `${user.phoneNumber}${stringConstants.SEMI_COLON}${user.token}`, JSONDetails);
                fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, false);
            } else {
                console.error(errorMessages.COULD_NOT_FETCH_UPDATED_USER_PROFILE, error);
            }
        }
        user && setLoggedInUser({ ...loggedInUser, loginDetails: user, isLoggedIn: user && true || false });
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_LOGIN_DETAILS_FROM_API, error);
    }
}

export const fetchUserPosts = async (userPosts, setUserPosts) => {
    try {
        const user = await getLoggedInUserDetails();
        if (user) {
            const userDetails = JSON.parse(user.details);
            const url = `${urlConstants.fetchPostsByUserId}${stringConstants.SLASH}${userDetails.id}`;
            const response = await axiosGetWithAuthorization(url, user.token);
            const responseData = processResponseData(response);
            if (responseData == responseStringData.TOKEN_INVALID || responseData == responseStringData.TOKEN_EXPIRED) {
                console.error('login redirect')
            } else {
                const sortedPosts = responseData.posts.sort((datePost1, datePost2) => {
                    return Date.parse(datePost2.created_at) - Date.parse(datePost1.created_at);
                }) || responsePostsData.sort((datePost1, datePost2) => {
                    return Date.parse(datePost2.created_at) - Date.parse(datePost1.created_at);
                });
                userPosts.posts = [AddPostConstant, ...sortedPosts];
                setUserPosts({ ...userPosts });
            }
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_USERS_POSTS, error);
    }
}

const tokenStatusDetails = (response) => {
    switch (response.data.status) {
        case responseStringData.TOKEN_INVALID:
            return responseStringData.TOKEN_INVALID;
        case responseStringData.TOKEN_EXPIRED:
            return responseStringData.TOKEN_EXPIRED;
        default:
            return response.data;
    }
}

export const setAddPostStateValues = (action, userPosts, setUserPosts, item) => {
    userPosts.details.postTitle = action == miscMessage.UPDATE && item.postTitle || stringConstants.EMPTY;
    userPosts.details.postDescription = action == miscMessage.UPDATE && item.postDescription || stringConstants.EMPTY;
    userPosts.details.postProfile = action == miscMessage.UPDATE && item.profile.id;
    userPosts.details.postCategories = action == miscMessage.UPDATE && item.categoryIds.split(stringConstants.COMMA) ||
        jsonConstants.EMPTY;
    userPosts.details.postType = action == miscMessage.UPDATE && item.postType || stringConstants.EMPTY;
    userPosts.details.capturedImage = action == miscMessage.UPDATE && item.postImage || stringConstants.EMPTY;
    setUserPosts({ ...userPosts });
}

export const cropImage = async (imagePath) => {
    try {
        return await ImagePicker.openCropper({
            path: imagePath, width: numericConstants.MAX_RESOLUTION_WIDTH, height: numericConstants.MAX_RESOLUTION_HEIGHT,
            compressImageQuality: numericConstants.ZEROPTNINETY, hideBottomControls: false,
            cropperStatusBarColor: colors.SDOM_TEXT_BOX, cropperActiveWidgetColor: colors.SDOM_YELLOW,
            cropperToolbarWidgetColor: colors.SDOM_YELLOW, cropperToolbarColor: colors.SDOM_BLACK,
            loadingLabelText: alertTextMessages.CROPPING_IMAGE
        });
    } catch (error) {
        if (error.code && !error.code == miscMessage.USER_CANCELLED_CROP_CODE) {
            console.error(errorMessages.COULD_NOT_CROP_IMAGE, error);
            showSnackBar(errorMessages.COULD_NOT_CROP_IMAGE, false);
        }
    }
}

export const handleAddPostDetails = async (data, postImagePath, toAction, selectedItem, setLoaderCallback, uploadProgressCallback) => {
    try {
        const formData = new FormData();
        const categories = data.postCategories && data.postCategories.join() || stringConstants.EMPTY;
        const user = await getLoggedInUserDetails();
        if (user) {
            const userDetails = JSON.parse(user.details);
            const imageName = postImagePath.substring(postImagePath.lastIndexOf(stringConstants.SLASH) +
                numericConstants.ONE, postImagePath.length);
            if (toAction == miscMessage.UPDATE)
                formData.append(requestConstants.POST_ID, selectedItem.id);
            else
                formData.append(requestConstants.USER_ID, userDetails.id)
            formData.append(requestConstants.POST_TITLE, data.postTitle);
            formData.append(requestConstants.POST_DESCRIPTION, data.postDescription);
            formData.append(requestConstants.POST_CATEGORIES, categories);
            formData.append(requestConstants.POST_TYPE, data.postType);
            formData.append(requestConstants.PROFILE_ID, userDetails.profile_id);
            data.postLink &&
                formData.append(requestConstants.POST_LINK, data.postLink);
            formData.append(requestConstants.POST_IMAGE, { uri: postImagePath, name: imageName, type: miscMessage.IMAGE_TYPE });
            const response = await axiosPostUploadImageWithHeaders(toAction == miscMessage.UPDATE && urlConstants.updatePost ||
                urlConstants.addPost, formData, user.token, uploadProgressCallback);
            return processResponseData(response);
        }
        return responseStringData.NOT_LOGGED_IN;
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        setLoaderCallback(false);
        setTimeout(() => showSnackBar(toAction == miscMessage.UPDATE && errorMessages.COULD_NOT_UPDATE_POST ||
            errorMessages.COULD_NOT_UPLOAD_POST, false), numericConstants.THREE_HUNDRED)

    }
}

export const handlePostDelete = async (postId, token) => {
    try {
        const response = await deleteWithAuthorization(urlConstants.deletePost, postId, token);
        response.data = { [miscMessage.MESSAGE]: alertTextMessages.POST_DELETED_SUCCESSFULLY }
        return processResponseData(response);
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(errorMessages.COULD_NOT_DELETE_POST, false);
    }
}

export const handleProfileImageDelete = async (profile, loggedInUser, setLoggedInUser) => {
    try {
        const response = await deleteWithAuthorization(urlConstants.deleteProfileImage, stringConstants.EMPTY,
            loggedInUser.loginDetails.token);
        if (response.status == numericConstants.TWO_HUNDRED) {
            let details = JSON.parse(loggedInUser.loginDetails.details);
            details.profile_picture = details.profile_image = profile.profile_image = urlConstants.profileStorageUrl;
            loggedInUser.loginDetails.details = JSON.stringify(details);
            setLoggedInUser({ ...loggedInUser });
        }
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(errorMessages.COULD_NOT_DELETE_PROFILE_IMAGE, false);
    }
}

export const handleUserFollowUnfollowAction = async (action, profileId, isPrivate) => {
    try {
        const user = await getLoggedInUserDetails();
        if (user) {
            let url, requestData;
            if (action == actionButtonTextConstants.REMOVE) {
                const userDetails = JSON.parse(user.details);
                requestData = {
                    [requestConstants.ID]: profileId,
                    [requestConstants.FOLLOWING_ID]: userDetails.id,
                }
                url = urlConstants.removeFollower;
            } else if (action == actionButtonTextConstants.UPDATE_NOTIFICATION) {
                requestData = {
                    [requestConstants.FOLLOWING_ID]: profileId
                }
                url = urlConstants.updateFollowNotificaton;
            } else {
                requestData = {
                    [requestConstants.FOLLOWING_ID]: profileId,
                    [requestConstants.TYPE]: isPrivate && miscMessage.POST_TYPE_PRIVATE_TEXT.toLowerCase() ||
                        miscMessage.POST_TYPE_PUBLIC_TEXT.toLowerCase()
                }
                url = action == actionButtonTextConstants.FOLLOW && urlConstants.userFollow || urlConstants.userUnFollow;
            }
            const response = await axiosPostWithHeadersAndToken(url, JSON.stringify(requestData), user.token);
            return processResponseData(response);
        }
        return responseStringData.REDIRECT_USER_LOGIN;
    } catch (error) {
        const errorResponseData = processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(errorResponseData.message == errorMessages.ALREADY_FOLLOWING_USER &&
            alertTextMessages.YOU_ARE_ALREADY_FOLLOWING_THIS_USER || alertTextMessages.YOU_ARE_ALREADY_UNFOLLOWING_THIS_USER, false);
    }
}

export const checkTokenStatus = (responseData) => {
    return responseData == responseStringData.TOKEN_EXPIRED || responseData == responseStringData.TOKEN_INVALID ||
        responseStringData.NOT_LOGGED_IN;
}

/**Signature function to follow and unfollow publically and privetly.
 * 
 * @param {*} responseData 
 * @param {*} action 
 * @param {*} profile 
 * @param {*} sdomDatastate 
 * @param {*} setSdomDatastate 
 * @param {*} loggedInUser 
 * @param {*} profileDetail 
 * @param {*} setProfileDetail 
 */
export const updateProfileActionValueToState = async (responseData, action, profile, sdomDatastate, setSdomDatastate, loggedInUser,
    profileDetail, setProfileDetail) => {
    try {
        const user = JSON.parse(loggedInUser.loginDetails.details);
        if (user) {
            const followerId = { [fieldControllerName.FOLLOWER_ID]: user.id };
            const followingId = { [fieldControllerName.FOLLOWING_ID]: profile.id };
            const responseDataMessage = responseData.message;
            switch (action) {
                case actionButtonTextConstants.FOLLOW:
                    sdomDatastate.posts.map(selectedPost => {
                        if (selectedPost.user.id == profile.id) {
                            if (responseDataMessage == miscMessage.SUCCESSFULLY_ADDED_PRIVATE_FOLLOWER) {
                                selectedPost.user.followers.filter(follower => follower.follower_id == followerId.follower_id)
                                    .map(follower => follower.pvtaccess = PRIVATE_FOLLOW_UNFOLLOW.REQUESTED);
                                profileDetail.privateRequestAccessStatus = PRIVATE_FOLLOW_UNFOLLOW.REQUESTED;
                            }
                            if (responseDataMessage == miscMessage.SUCCESSFULLY_ADDED_FOLLOWER &&
                                !selectedPost.user.followers.some(follower => follower.follower_id == followerId.follower_id)) {
                                const followerPush = {
                                    [fieldControllerName.FOLLOWER_ID]: followerId.follower_id,
                                    [requestConstants.PVT_ACCESS_TEXT]: numericConstants.ZERO
                                }
                                selectedPost.user.followers.push(followerPush);
                            }
                        } else if (selectedPost.user.id == user.id) {
                            if (responseDataMessage == miscMessage.SUCCESSFULLY_ADDED_PRIVATE_FOLLOWER) {
                                selectedPost.user.following.filter(following => following.following_id == followingId.following_id)
                                    .map(following => following.pvtaccess = PRIVATE_FOLLOW_UNFOLLOW.REQUESTED);
                                profileDetail.privateRequestAccessStatus = PRIVATE_FOLLOW_UNFOLLOW.REQUESTED;
                            }
                            if (responseDataMessage == miscMessage.SUCCESSFULLY_ADDED_FOLLOWER &&
                                !selectedPost.user.following.some(following => following.following_id == followingId.following_id)) {
                                const followingPush = {
                                    [fieldControllerName.FOLLOWING_ID]: followingId.following_id,
                                    [requestConstants.PVT_ACCESS_TEXT]: numericConstants.ZERO
                                }
                                selectedPost.user.following.push(followingPush);
                            }
                        }
                    });
                    break;
                case actionButtonTextConstants.UNFOLLOW:
                    sdomDatastate.posts.map(selectedPost => {
                        if (selectedPost.user.id == profile.id) {
                            if (responseDataMessage == miscMessage.SUCCESSFULLY_UNFOLLOWED_PRIVATE_ACCESS) {
                                selectedPost.user.followers.filter(follower => follower.follower_id == followerId.follower_id)
                                    .map(follower => follower.pvtaccess = PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED);
                                profileDetail.privateRequestAccessStatus = PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED;
                            }
                            if (responseDataMessage == miscMessage.SUCCESSFULLY_UNFOLLOWED &&
                                selectedPost.user.followers.some(follower => follower.follower_id == followerId.follower_id)) {
                                selectedPost.user.followers.pop(followerId);
                            }
                        } else if (selectedPost.user.id == user.id) {
                            if (responseDataMessage == miscMessage.SUCCESSFULLY_UNFOLLOWED_PRIVATE_ACCESS) {
                                selectedPost.user.following.filter(following => following.following_id == followingId.following_id)
                                    .map(following => following.pvtaccess = PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED);
                                profileDetail.privateRequestAccessStatus = PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED;
                            }
                            if (responseDataMessage == miscMessage.SUCCESSFULLY_UNFOLLOWED &&
                                selectedPost.user.following.some(following => following.following_id == followingId.following_id)) {
                                selectedPost.user.following.pop(followingId);
                            }
                        }
                    });
                    break;
                case actionButtonTextConstants.UPDATE_NOTIFICATION:
                    profileDetail.userPostNotificationsEnabled = responseDataMessage == alertTextMessages.UPDATE_NOTIFICATION_TRUE;
                    break;
                default:
                    break;
            }
            setTimeout(() => {
                profileDetail.isFollowing = profile.followers.some(follower => follower.follower_id == user.id);
                setProfileDetail({ ...profileDetail });
                setSdomDatastate({ ...sdomDatastate })
            }, numericConstants.TWENTY);
        }
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
    }
}

export const checkLoggedInUserMappedWithUserProfile = async (profile, loggedInUser, profileDetail, setProfileDetail, setAgain) => {
    if (loggedInUser.loginDetails && loggedInUser.loginDetails.details) {
        const loggedInUserDetails = JSON.parse(loggedInUser.loginDetails.details);
        profileDetail.isSameUser = loggedInUserDetails.id == profile.id;
        profileDetail.isFollowing = profile.followers.some(follower =>
            follower.follower_id == loggedInUserDetails.id);
        if (profileDetail.isFollowing) {
            profileDetail.privateRequestAccessStatus = profile.followers && profile.followers.find(following =>
                following.follower_id == loggedInUserDetails.id).pvtaccess || PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED;
            profileDetail.userPostNotificationsEnabled = profile.followers && profile.followers.some(following =>
                following.notification_status == numericConstants.ONE) || false;
        }
    }
    profileDetail.count = profile.id == numericConstants.MINUS_ONE && getDefaultProfilePostsCounts ||
        await fetchProfilePostsCounts(profile.id);
    setProfileDetail({ ...profileDetail });
}

export const fetchPostsOfUserProfile = async (profile, profileDetail, setProfileDetail, loggedInUser, actionCallBack) => {
    try {
        let userPosts = jsonConstants.EMPTY, responseData, response;
        if (loggedInUser.isLoggedIn) {
            const url = `${urlConstants.fetchPostsByUserId}${stringConstants.SLASH}${profile.id}`;
            response = await axiosGetWithAuthorization(url, loggedInUser.loginDetails.token);
            responseData = processResponseData(response);
            if (responseData == responseStringData.TOKEN_INVALID || responseData == responseStringData.TOKEN_EXPIRED) {
                showSnackBar(errorMessages.PLEASE_LOGIN_TO_CONTINUE, false, actionCallBack);
            } else {
                userPosts = responseData.posts;
            }
        } else {
            response = await axiosGetWithHeaders(urlConstants.fetchAllPosts);
            responseData = processResponseData(response);
            if (responseData && responseData.posts) {
                userPosts = responseData.posts.filter(post => post.user.id == profile.id);
            }
        }
        userPosts.sort((datePost1, datePost2) => {
            return Date.parse(datePost2.created_at) - Date.parse(datePost1.created_at);
        }) || responsePostsData.sort((datePost1, datePost2) => {
            return Date.parse(datePost2.created_at) - Date.parse(datePost1.created_at);
        });
        setProfileDetail({ ...profileDetail, userPosts: userPosts });
    } catch (error) {
        showSnackBar(errorMessages.COULD_NOT_FETCH_USER_PROFILE_POST, false);
        console.error(errorMessages.COULD_NOT_FETCH_USER_PROFILE_POST, error);
    }
}

export const fetchProfilePostsCounts = async (userProfileId) => {
    try {
        const url = `${urlConstants.fetchProfilePostsCounts}${stringConstants.SLASH}${userProfileId}`
        const response = await axiosGetWithHeaders(url);
        return processResponseData(response);
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
    }
}

const navigateUserFromPostAction = (action, responseData, profile, sdomDatastate, setSdomDatastate, loggedInUser,
    profileDetail, setProfileDetail, navigation) => {
    if (responseData == responseStringData.TOKEN_EXPIRED || responseData == responseStringData.TOKEN_INVALID
        || responseData == responseStringData.REDIRECT_USER_LOGIN) {
        showSnackBar(errorMessages.PLEASE_LOGIN_TO_CONTINUE, false);
        navigation.navigate(screens.LOGIN, { intermediateLogin: screens.PROFILE });
    } else if (responseData && responseData.message.includes(responseStringData.SUCCESS)) {
        updateProfileActionValueToState(responseData, action, profile, sdomDatastate, setSdomDatastate, loggedInUser,
            profileDetail, setProfileDetail);
        displaySnackBarBasedOnResponseData(responseData, action);
    }
}

const displaySnackBarBasedOnResponseData = (responseData, action) => {
    if (action == actionButtonTextConstants.FOLLOW) {
        if (responseData.message == miscMessage.SUCCESSFULLY_ADDED_FOLLOWER) {
            showSnackBar(alertTextMessages.SUCCESS_FOLLOW, true);
        }
        if (responseData.message == miscMessage.SUCCESSFULLY_ADDED_PRIVATE_FOLLOWER) {
            showSnackBar(alertTextMessages.SUCCESS_PRIVATE_FOLLOW, true);
        }
    }
    if (action == alertTextMessages.SUCCESS_FOLLOW) {
        if (responseData.message == miscMessage.SUCCESSFULLY_UNFOLLOWED) {
            showSnackBar(alertTextMessages.SUCCESS_UNFOLLOW, true);
        }
        if (responseData.message == miscMessage.SUCCESSFULLY_UNFOLLOWED_PRIVATE_ACCESS) {
            showSnackBar(alertTextMessages.SUCCESS_PRIVATE_UNFOLLOW, true);
        }
    } else if (action == actionButtonTextConstants.UPDATE_NOTIFICATION) {
        showSnackBar(responseData.message == alertTextMessages.UPDATE_NOTIFICATION_TRUE &&
            alertTextMessages.SUCCESS_UPDATED_NOTIFICATION_TRUE || alertTextMessages.SUCCESS_UPDATED_NOTIFICATION_FALSE,
            responseData.message == alertTextMessages.UPDATE_NOTIFICATION_TRUE);
    }
}

export const handleUserPostAction = async (action, profile, sdomDatastate, setSdomDatastate, loggedInUser,
    profileDetail, setProfileDetail, navigation, privateAccessRequest) => {
    const responseData = await handleUserFollowUnfollowAction(action, profile.id, privateAccessRequest);
    navigateUserFromPostAction(action, responseData, profile, sdomDatastate, setSdomDatastate, loggedInUser,
        profileDetail, setProfileDetail, navigation);
}

export const fetchUserFollowersFollowing = async (listFor, token) => {
    try {
        let url;
        if (listFor == miscMessage.PRIVATE_REQUEST_ACCESS || listFor == miscMessage.FOLLOWERS_TEXT) {
            url = urlConstants.fetchUsersFollowers;
        } else if (listFor == miscMessage.FOLLOWING_TEXT) {
            url = urlConstants.fetchUsersFollowings;
        } else if (listFor == fieldControllerName.SEARCH_USERS) {
            url = urlConstants.fetchAllUsers;
        }
        const response = await axiosGetWithAuthorization(url, token);
        return processResponseData(response);
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(listFor == miscMessage.FOLLOWERS_TEXT && errorMessages.FAILED_TO_LIST_FOLLOWERS ||
            errorMessages.FAILED_TO_LIST_FOLLOWING, false);
    }
}

export const fetchUserForSearch = async (token) => {
    try {
        const response = await axiosGetWithAuthorization(urlConstants.fetchAllUsers, token);
        return processResponseData(response);
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(errorMessages.COULD_NOT_FETCH_ALL_USERS, false);
    }
}

export const logoutUser = async (token, loggedInUser, setLoggedInUser) => {
    try {
        const response = await axiosPostWithHeadersAndToken(urlConstants.logout, stringConstants.EMPTY, token);
        const responseData = processResponseData(response);
        responseData.message == responseStringData.SUCCESS_LOGOUT &&
            showSnackBar(alertTextMessages.SUCCESSFULLY_LOGGED_OUT, true);
        loggedInUser.loginDetails = stringConstants.EMPTY;
        loggedInUser.isLoggedIn = false;
        setLoggedInUser({ ...loggedInUser });
        await resetTokens();
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(errorMessages.COULD_NOT_LOGOUT, false);
    }
}

export const validateUserAction = async (action, value) => {
    try {
        let actionValue;
        if (action == fieldControllerName.USER_ID) {
            actionValue = requestConstants.USER_ID;
        } else if (action == fieldControllerName.PHONE_NUMBER) {
            actionValue = requestConstants.PHONE_NUMBER
        }
        const url = `${urlConstants.validateUser}${stringConstants.SLASH}${actionValue}${stringConstants.SLASH}${value}`;
        const response = await axiosGetWithHeaders(url);
        return processResponseData(response);
    } catch (error) {
        const responseMessage = fieldControllerName.PHONE_NUMBER && errorMessages.COULD_NOT_VALIDATE_PHONE_NUMBER ||
            errorMessages.COULD_NOT_VALIDATE_USER_ID;
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(responseMessage, false);
    }
}
export const isValidURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export const userPostAction = async (request, data, token, uploadProgressCallback) => {
    try {
        let requestJSON, url, response;
        switch (request) {
            case requestConstants.USER_VERIFY:
                url = `${urlConstants.userSaveAction}${stringConstants.SLASH}${requestConstants.USER_VERIFY}`
                requestJSON = JSON.stringify({
                    facebook_link: data.facebookLink,
                    instagram_link: data.instagramLink,
                    details: data.verifyUserDetails
                });
                response = await axiosPostWithHeadersAndToken(url, requestJSON, token);
                break;
            case requestConstants.EDIT:
                url = `${urlConstants.userSaveAction}${stringConstants.SLASH}${requestConstants.EDIT}`
                if (data.bio == null)
                    data.bio = stringConstants.EMPTY

                const formData = new FormData();
                formData.append(requestConstants.NAME, data.name);
                formData.append(requestConstants.EMAIL_ID, data.email);
                formData.append(requestConstants.SECRET, data.secret);
                formData.append(requestConstants.USER_BIO, data.bio);
                if (!isValidURL(data.imagePath)) {
                    const imageName = data.imagePath.substring(data.imagePath.lastIndexOf(stringConstants.SLASH) +
                        numericConstants.ONE, data.imagePath.length);
                    formData.append(requestConstants.PROFILE_PICTURE, { uri: data.imagePath, name: imageName, type: miscMessage.IMAGE_TYPE });
                }
                response = await axiosPostUploadImageWithHeaders(url, formData, token, uploadProgressCallback);
                break;
            case requestConstants.PRIVATE_ACCESS_ACTION:
                url = `${urlConstants.userSaveAction}${stringConstants.SLASH}${requestConstants.PRIVATE_ACCESS_ACTION}`
                response = await axiosPostWithHeadersAndToken(url, data, token);
            default:
                break;
        }
        return processResponseData(response);
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
    }
}

export const checkProfileFrom = (currentPostIndexForProfileRef, sdomDatastate, isFrom, loggedInUser, followerFollowingProfile) => {
    if (loggedInUser.isLoggedIn && isFrom == modalTextConstants.VIEW_PROFILE) {
        const profile = JSON.parse(loggedInUser.loginDetails.details);
        return profile && { ...profile, profile_image: profile.profile_picture } || DefaultUserProfile;
    } else if (isFrom == modalTextConstants.VIEW_FOLLOWER_FOLLOWING_PROFILE) {
        return followerFollowingProfile || DefaultUserProfile;
    } else {
        const postIndex = currentPostIndexForProfileRef.current || numericConstants.ZERO;
        return sdomDatastate.posts && sdomDatastate.posts.length && sdomDatastate.posts[postIndex].user || DefaultUserProfile;
    }
}

export const fetchUserProfilePosts = async (userId, setPosts, postDetailsRef) => {
    let postData = jsonConstants.EMPTY;
    try {
        const url = `${urlConstants.fetchUserPosts}${stringConstants.SLASH}${userId}`;
        const response = await axiosGetWithHeaders(url);
        let responseData = processResponseData(response);
        if (responseData.posts.length) {
            postData = await filterLoggedInUsersPosts(responseData.posts, false) || jsonConstants.EMPTY;
            postData.map(postItem => postItem.postCategoriesIn = fetchAndDisplayNamesAndCategoryTitles(postItem))
                .sort((datePost1, datePost2) => {
                    return Date.parse(datePost2.created_at) - Date.parse(datePost1.created_at);
                }) || responsePostsData.sort((datePost1, datePost2) => {
                    return Date.parse(datePost2.created_at) - Date.parse(datePost1.created_at);
                });
            postDetailsRef?.current?.setNewPostViewed(true);
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_USERS_POSTS, error);
    }
    setPosts(postData);
}

export const fetchGalleryImages = async (cameraState, setCameraState) => {
    try {
        const photos = await CameraRoll.getPhotos({
            first: numericConstants.ONE_HUNDRED,
            assetType: miscMessage.PHOTOS,
            fromTime: moment().subtract(numericConstants.TWO, miscMessage.MONTHS).valueOf()
        });
        setCameraState({
            ...cameraState, galleryImages: photos.edges && photos.edges.map(item => item.node) || jsonConstants.EMPTY,
            uploadFromGallery: true
        });
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_PHOTOS_FROM_GALLERY, error);
    }
}

export const openGalleryFromCamera = async (selectImageCallback) => {
    try {
        const imageValue = await ImagePicker.openPicker({ width: width, height: height });
        if (imageValue) selectImageCallback(imageValue);
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_PHOTOS_FROM_GALLERY, error);
    }
}

export const fetchUserIdByPhoneNumber = async (phoneNumber) => {
    try {
        const url = urlConstants.getUserIdByPhoneNumber + stringConstants.SLASH + phoneNumber;
        const response = await axiosGetWithHeaders(url);
        const responseData = processResponseData(response);
        return responseData && responseData.user_id
    } catch (error) {
        console.error(errorMessages.COULD_NOT_FETCH_USER_ID_BY_PHONE_NUMBER, error);
    }
}

export const handleForgotPassword = async (watchMobileNumber, navigation, trigger, setError, clearErrors, signUpDetails,
    setSignUpDetails) => {
    try {
        if (watchMobileNumber && watchMobileNumber.length >= numericConstants.TEN) {
            const response = await validateUserAction(fieldControllerName.PHONE_NUMBER, watchMobileNumber);
            if (!response) {
                setError(fieldControllerName.PHONE_NUMBER, formRequiredRules.forgotPasswordRule);
            } else {
                clearErrors(fieldControllerName.PHONE_NUMBER);
                const phone = { phoneNumber: watchMobileNumber };
                await handleUserSignUpOtp(phone.phoneNumber, miscMessage.FORGOT_PASSWORD, navigation, false);
                setSignUpDetails({ ...signUpDetails, phoneNumber: watchMobileNumber });
            }
        } else {
            trigger(fieldControllerName.PHONE_NUMBER);
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_REQUEST_FORGOT_PASSWORD, error);
    }
}

export const getAndroidLocalNotificationDetails = (remoteMessage) => {

    const actionButtons = getNotificationActionButtons(remoteMessage);

    return {
        channelId: notificationConsts.CHANNEL_ID,
        autoCancel: true,
        ticker: notificationConsts.NOTIFICATION_TICKER,
        message: remoteMessage.notification.body,
        bigText: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        data: remoteMessage.data,
        color: colors.SDOM_BLACK,
        vibrate: true,
        group: notificationConsts.CHANNEL_ID,
        actions: actionButtons,
        smallIcon: notificationConsts.SMALL_ICON,
        largeIconUrl: remoteMessage.data.user_icon,
        bigPictureUrl: remoteMessage.data.post_url
    }
}

const getNotificationActionButtons = (remoteMessage) => {
    switch (remoteMessage.data.actionType) {
        case notificationConsts.VIEW_POST_ACTION:
            return [notificationConsts.VIEW_POST_ACTION];
        case notificationConsts.PUBLIC_FOLLOWING:
            return [notificationConsts.VIEW_FOLLOWERS_ACTION]
        case notificationConsts.PRIVATE_FOLLOWING_ACCESS:
            remoteMessage.notification.body =
                `${alertTextMessages.USER}${stringConstants.SPACE}${remoteMessage.data.follower_user_id}${stringConstants.SPACE}${alertTextMessages.REQUESTED_PRIVATE_ACCESS}`
            return [actionButtonTextConstants.APPROVE, actionButtonTextConstants.REJECT];
        case notificationConsts.PRIVATE_ACCESS_APPROVED:
            return [notificationConsts.VIEW_POST_ACTION];
        default: return jsonConstants.EMPTY;
    }
}

export const getNotificationChannelCreation = () => {
    return {
        channelId: notificationConsts.CHANNEL_ID,
        channelName: notificationConsts.CHANNEL_ID,
        soundName: keyBoardTypeConst.DEFAULT,
        importance: Importance.HIGH,
        vibrate: true,
    }
}

export const updateDeviceToken = async (messaging, currentDeviceToken, apiAccessToken, phoneNumber) => {
    try {
        const deviceToken = await messaging().getToken();
        if (!currentDeviceToken || (null != currentDeviceToken && deviceToken !== currentDeviceToken)) {
            const payLoadRequest = {
                [requestConstants.PHONE_NUMBER]: phoneNumber,
                [miscMessage.DEVICE_TOKEN]: deviceToken
            }
            const response = await axiosPostWithHeadersAndToken(urlConstants.updateDeviceToken, JSON.stringify(payLoadRequest),
                apiAccessToken);
            return response && response.data;
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_UPDATE_DEVICE_ID, ` ${phoneNumber} `, error);
    }
}

export const getNotificationConfiguration = (navigation) => {
    return {
        onRegister: () => {
            createChannel();
        }, onNotification: async (notification) => {
            (async () => {
                await notificationAction(notification, navigation.current, miscMessage.FROM_ON_NOTIFICATION);
            })();
        }, onAction: (notification) => {
            (async () => {
                await notificationAction(notification, navigation.current);
            })();
        },
        onRegistrationError: (err) => {
            console.error(err.message, err);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: !isIOS,
    }
}

export const notificationAction = async (notification, navigation, from) => {
    try {
        switch (notification.data.actionType) {
            case notificationConsts.VIEW_POST_ACTION:
                from && from == miscMessage.FROM_ON_NOTIFICATION &&
                    navigation.reset({
                        index: numericConstants.ZERO, routes: [{
                            name: screens.GLANCE,
                            params: {
                                isFromNotification: true,
                                postIdFromNotification: { current: parseInt(notification.data.post_id) }
                            }
                        }]
                    });
                break;
            case notificationConsts.PRIVATE_ACCESS_APPROVED:
                navigation.reset({ index: numericConstants.ZERO, routes: [{ name: screens.GLANCE }] });
                break;
            case notificationConsts.PUBLIC_FOLLOWING:
            case notificationConsts.PRIVATE_FOLLOWING_ACCESS:
                const loggedInUserDetails = await getLoggedInUserDetails();
                const loggedInUserJSON = { isLoggedIn: true, loginDetails: loggedInUserDetails };
                navigation.navigate(screens.USER_FOLLOWERS_FOLLOWING, {
                    loggedInUser: loggedInUserJSON, listFor: notification.data.actionType == notificationConsts.PUBLIC_FOLLOWING
                        && miscMessage.FOLLOWERS_TEXT || miscMessage.PRIVATE_REQUEST_ACCESS
                });
                break;
            default:
                break;
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_HANDLE_NOTIFICATION_ACTION, error);
    }
}

export const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = numericConstants.TWENTY;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export const getAcceptedEULA = async () => {
    try {
        const savedEULA = await Keychain.getGenericPassword({ service: miscMessage.ACCEPTED_EULA });
        return savedEULA && JSON.parse(savedEULA.password) || false;
    } catch (error) {
        console.error(errorMessages.CANNOT_FETCH_SAVED_EULA, error);
    }
    return false;
}

export const saveEULA = async (acceptedEULA) => {
    try {
        await Keychain.setGenericPassword(miscMessage.ACCEPTED, JSON.stringify(acceptedEULA),
            { service: miscMessage.ACCEPTED_EULA });
    } catch (error) {
        console.error(errorMessages.CANNOT_SAVE_EULA, error);
    }
}

export const prepareLoggedInMenu = async (profileMenu, menuLoggedInUser, setMenuLoggedInUser, drawerOpenStatus, filterOutLoginMenus) => {
    drawerOpenStatus.current && fetchUpdateLoggedInUserProfile(menuLoggedInUser, setMenuLoggedInUser, true);
    profileMenu.userMenus = prepareSDOMMenu();
    const details = JSON.parse(menuLoggedInUser.loginDetails.details);
    const counts = await fetchProfilePostsCounts(details.id);
    filterOutLoginMenus(profileMenu.userMenus, details);
    profileMenu.profileImage = details.profile_picture;
    profileMenu.profileName = details.name;
    profileMenu.profileUserId = details.user_id;
    profileMenu.followersCount = counts.followingCount;
    profileMenu.followingCount = counts.followersCount;
}

export const formatNumber = (inputNumber) => {
    for (var index = numericConstants.ZERO; index < countRanges.length; index++) {
        if (inputNumber >= countRanges[index].divider) {
            return (inputNumber / countRanges[index].divider).toString() + countRanges[index].suffix;
        }
    }
    return inputNumber.toString();
}