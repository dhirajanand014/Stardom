import React from 'react';
import axios from 'axios';
import AddPostConstant from '../constants/AddPostConstant.json';
import {
    urlConstants, keyChainConstansts,
    postCountTypes, postCountRequestKeys,
    savePostCountKeys, setPostImages,
    permissionsButtons, permissionMessages,
    stringConstants, alertTextMessages,
    reportAbuseRequestPayloadKeys, responseStringData,
    actionButtonTextConstants, colorConstants,
    miscMessage, width, height, numericConstants,
    screens, headerStrings, fieldControllerName, isAndroid,
    isIOS, OTP_INPUTS, errorMessages, requestConstants,
    jsonConstants, defaultProfilesValue, SDMenuOptions, tokenMessageConstants,
} from '../constants/Constants';
import {
    Alert, InteractionManager, NativeModules,
    PermissionsAndroid, ToastAndroid
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { withDelay, withSpring } from 'react-native-reanimated';
import { colors, headerStyles, SDGenericStyles } from '../styles/Styles';
import { TourGuideZone } from 'rn-tourguide';
import ImagePicker from 'react-native-image-crop-picker';
import { HeaderBackButton } from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';

export const fetchCategoryData = async () => {
    try {
        const responseData = await axios.get(urlConstants.fetchCategories);
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
            const parsedSelectedCategoryIds = selectedCategories.password.length &&
                JSON.parse(selectedCategories.password) || [];
            responseCategoryData.sort((cat1, cat2) => cat1.categoryTitle.localeCompare(cat2.categoryTitle))
                .map((category) => category.isSelected = parsedSelectedCategoryIds.some(selectedCategory =>
                    category.categoryId == selectedCategory.selectedCategoryId))
        }
        let initialCategory = await getCategoryButtonType();
        initialCategory = initialCategory && initialCategory.password || actionButtonTextConstants.SKIP_BUTTON;

        setCategory({ ...category, categories: responseCategoryData, initialCategory: initialCategory });
    } catch (error) {
        console.log(error);
        setCategory({ ...category, categories: [], initialCategory: actionButtonTextConstants.SKIP_BUTTON });
    }
}

export const fetchPostsAndSaveToState = async (sdomDatastate, setSdomDatastate, optionsState,
    setOptionsState, categoryIdFromNotification) => {
    try {
        const categoryPostsData = await retrievePostData(categoryIdFromNotification);
        setSdomDatastate({ ...sdomDatastate, posts: categoryPostsData, });
        setOptionsState({ ...optionsState, showSearch: true });
    } catch (error) {
        console.log(error);
        setSdomDatastate({ ...sdomDatastate, posts: [] });
    }
}


export const getSelectedCategoryIdsFromStorage = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.SAVE_CATEGORY_ID) || stringConstants.EMPTY
    } catch (error) {
        console.log('Cannot fetch the categoryIds from the storage', error);
    }
}

export const increaseAndSetPostCounts = async (post, sdomDatastate, setSdomDatastate, postCountType) => {
    try {
        if (postCountType == postCountTypes.POST_LIKES) {
            sdomDatastate.posts.find(item => item.postId == post.postId).postLikes = ++post.postLikes;
        } else if (postCountType == postCountTypes.POST_DOWNLOADS) {
            sdomDatastate.posts.find(item => item.postId == post.postId).postDownloads = ++post.postDownloads;
        } else if (postCountType == postCountTypes.POST_WALLPAPERS) {
            sdomDatastate.posts.find(item => item.postId == post.postId).postWallPapers = ++post.postWallPapers;
        }

        const postCountRequest = {
            [postCountRequestKeys.POST_ID_KEY]: parseInt(post.postId),
            [postCountRequestKeys.POST_COUNT_TYPE_KEY]: postCountType
        }

        setSdomDatastate({ ...sdomDatastate });

        if (postCountRequest) {
            const response = await axios.post(urlConstants.setPostCounts, postCountRequest);
            if (response && response.data == responseStringData.SUCCESS) {
                if (postCountType == postCountTypes.POST_LIKES) {
                    ToastAndroid.show(`You have liked the post : ${post.postTitle}`, ToastAndroid.SHORT);
                    await savePostCounts(post.postId, savePostCountKeys.SELECTED_POST_LIKES, sdomDatastate, setSdomDatastate);
                }
                postCountType == postCountTypes.POST_DOWNLOADS &&
                    ToastAndroid.show(`You have downloaded the post : ${post.postTitle}`, ToastAndroid.SHORT);
            }
        }
    } catch (error) {
        console.log("Cannot set the increased count to the database", error);
    }
}

export const savePostCounts = async (postId, postIdForSelectedCountType, sdomDatastate, setSdomDatastate) => {
    try {
        const getPostIdOfPostForCount = await getPostCounts(keyChainConstansts.SAVE_POST_COUNTS);
        let postCounts, postIds = [], postIdsJson;
        if (getPostIdOfPostForCount) {
            postCounts = JSON.parse(getPostIdOfPostForCount) || stringConstants.EMPTY;
        }
        if (postIdForSelectedCountType == savePostCountKeys.SELECTED_POST_LIKES) {
            if (postCounts) {
                postIds = postCounts[savePostCountKeys.SELECTED_POST_LIKES];
                !postIds.includes(postId) && postIds.push(postId);
            }
            else {
                postIds.push(postId);
                postCounts = {
                    [savePostCountKeys.SELECTED_POST_LIKES]: postIds
                }
            }
            sdomDatastate.posts.filter(post => post.postId == postId).map(item => item.likeDisabled = true);
            setSdomDatastate({ ...sdomDatastate });
            postIdsJson = JSON.stringify(postCounts);
            await saveDetailsToKeyChain(keyChainConstansts.SAVE_POST_COUNTS, keyChainConstansts.SAVE_POST_COUNTS,
                postIdsJson);
        }
    } catch (error) {
        console.log(`Cannot save the post counts for the post id ${postId}`, error);
    }
}

export const getPostCounts = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.SAVE_POST_COUNTS);
    } catch (error) {
        console.log(`Cannot fetch the post ids from the selected post counts for type: ${postIdForSelectedCountType}`,
            error);
    }
}

export const setCurrentImageAsWallPaper = async (postUrl, postTitle, postType) => {
    try {
        NativeModules.WallPiperApi.setPostAsWallPaper(postUrl, postTitle, postType);
    } catch (error) {
        console.log("Cannot set current image as wallpaper", error);
    }
}

export const downloadCurrentImage = async (postUrl, postTitle, postType) => {
    try {
        NativeModules.WallPiperApi.downloadPostImage(postUrl, postTitle, postType);
    } catch (error) {
        console.log("Cannot download the current image", error);
    }
}

export const shareImage = async (post) => {
    const { postImage, postTitle } = post
    try {
        NativeModules.WallPiperApi.shareImage(postImage, postTitle);
    } catch (error) {
        console.log("Cannot share image", error);
    }
}

export const getCategoryButtonType = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.SAVE_CATEGORY_BUTTON_TYPE);
    } catch (error) {
        console.log('Cannot fetch the save button type from the storage', error);
    }
}

export const postWallPaperAlert = async (item, sdomDatastate, setSdomDatastate) => {
    try {
        return (
            Alert.alert(
                alertTextMessages.CONFIRM_TITLE,
                alertTextMessages.POST_WALLPAPER_TEXT,
                [
                    {
                        text: permissionsButtons.CANCEL, style: "cancel"
                    },
                    {
                        text: permissionsButtons.OK, onPress: async () => {
                            await setCurrentImageAsWallPaper(item.postImage, item.postTitle, setPostImages.SET_POST_WALLPAPER);
                            await increaseAndSetPostCounts(item, sdomDatastate, setSdomDatastate, postCountTypes.POST_WALLPAPERS);
                            displaySuccessAlert();
                        }
                    }
                ],
                { cancelable: false }
            ));
    } catch (error) {
        console.log(error);
    }
}

export const displaySuccessAlert = () => {
    return (
        Alert.alert(
            alertTextMessages.WALLPAPER_SET_SUCESS,
            alertTextMessages.WALLPAPER_SET_SUCCESS_TEXT,
            [
                {
                    text: permissionsButtons.OK
                }
            ],
            { cancelable: true }
        ));
}

export const downloadImageFromURL = async (item, sdomDatastate, setSdomDatastate) => {
    const write_granted = await accessAndGrantPermssionsToWallPiper(permissionMessages.READ_WRITE_EXTERNAL_STORAGE_TITLE,
        permissionMessages.READ_WRITE_EXTERNAL_STORAGE_MESSAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    const read_granted = await accessAndGrantPermssionsToWallPiper(permissionMessages.READ_WRITE_EXTERNAL_STORAGE_TITLE,
        permissionMessages.READ_WRITE_EXTERNAL_STORAGE_MESSAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

    if (PermissionsAndroid.RESULTS.GRANTED == write_granted && PermissionsAndroid.RESULTS.GRANTED === read_granted) {
        await downloadCurrentImage(item.postImage, item.postTitle, setPostImages.SET_POST_DOWNLOAD);
        await increaseAndSetPostCounts(item, sdomDatastate, setSdomDatastate, postCountTypes.POST_DOWNLOADS);
    } else {
        ToastAndroid.show(`External Storage Permission Denited`, ToastAndroid.SHORT);
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
        console.log(`Error accessing permissions for ${permissionType}`, error);
    }
}

export const fetchAndDisplayNamesAndCategoryTitles = (post) => {
    let names = [];
    if (post.categoryTitles) {
        const categoryTitlesArray = post.categoryTitles.split(stringConstants.COMMA);
        const displayTitles = categoryTitlesArray && categoryTitlesArray.slice(0, 2) || stringConstants.EMPTY;
        const concatinatedDisplayName = displayTitles.map(title => title.toUpperCase()).
            join(stringConstants.PIPELINE_JOIN);
        if (categoryTitlesArray.length > 2) {
            names.push(concatinatedDisplayName.
                concat(stringConstants.PLUS.concat(categoryTitlesArray.length - displayTitles.length)));
        } else {
            names.push(concatinatedDisplayName);
        }
    }
    return names.join(stringConstants.PIPELINE_JOIN) || stringConstants.EMPTY;
}

export const setOptionsStateForDescription = (optionsState, setOptionsState, item,
    postDetailsState, setPostDetailsState) => {
    setAnimationVisible(postDetailsState, setPostDetailsState, false);
    setOptionsState({ ...optionsState, descriptionModal: true, selectedPost: item });
}

export const setReportAbuseSelectedOption = (optionsState, setOptionsState, selectedReportAbuseId) => {
    setOptionsState({
        ...optionsState,
        selectedReportAbuse: {
            [reportAbuseRequestPayloadKeys.POST_ID]: optionsState.selectedPost.postId,
            [reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_ID]: selectedReportAbuseId,
            [reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_SUBMITTED]: false
        }
    });
}

export const setOptionsStateRadioOptions = (optionsState, setOptionsState) => {
    setOptionsState({
        ...optionsState,
        reportAbuseModal: true
    });
}

export const resetOptionsState = (optionsState, setOptionsState) => {
    setOptionsState({
        ...optionsState,
        descriptionModal: false,
        selectedPost: stringConstants.EMPTY
    });
}

export const setReportIdForPost = async (optionsState, setOptionsState) => {
    const { selectedPost, selectedReportAbuse } = optionsState;
    const { postId, postTitle } = selectedPost;
    try {
        optionsState.reportAbuseSubmitDisabled = true;
        const requestReportAbusePayload = {
            [reportAbuseRequestPayloadKeys.POST_ID]: parseInt(postId),
            [reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_ID]: parseInt(selectedReportAbuse.postReportAbuseId)
        }
        const responseReportAbuseSet = await axios.post(urlConstants.setReportAbuseIdWithPostId,
            requestReportAbusePayload);

        if (responseReportAbuseSet && responseReportAbuseSet.data == responseStringData.SUCCESS) {
            requestReportAbusePayload[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_SUBMITTED] = true;
            optionsState.selectedReportAbuse = requestReportAbusePayload;
        }

        ToastAndroid.show(`Thank you for submitting the report!`, ToastAndroid.SHORT);

        saveReportAbuseOptions(optionsState);
        closeReportAbuseModal(optionsState, setOptionsState);
    } catch (error) {
        console.log(`Cannot set report abuse id for ${postTitle}`, error);
    }
}

export const closeReportAbuseModal = (optionsState, setOptionsState) => {
    setOptionsState({
        ...optionsState,
        reportAbuseModal: false,
        selectedReportAbuse: {},
        reportAbuses: [],
        reportAbuseSubmitDisabled: false
    });
}

export const saveReportAbuseOptions = async (optionsState) => {
    try {
        var saveReportsArray = [], isReportAbuseAlreadySet = false;
        const savedReportAbuses = await fetchSavedReportAbuseOptions();
        if (savedReportAbuses) {
            saveReportsArray = JSON.parse(savedReportAbuses);
            isReportAbuseAlreadySet = saveReportsArray && saveReportsArray.some((item) => item.postId == optionsState.selectedReportAbuse.postId &&
                optionsState.selectedReportAbuse[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_SUBMITTED]);
        }
        if (!isReportAbuseAlreadySet) {
            saveReportsArray.push(optionsState.selectedReportAbuse);

            const saveReportsJSON = JSON.stringify(saveReportsArray);
            setReportAbuseOptions(saveReportsJSON);
        }
    } catch (error) {
        console.log('Cannot save selected report abuse ', error);
    }
}

export const togglePostSearchBox = (searchValues, setSearchValues, post,
    input_search_box_translate_x, content_translate_y, content_opacity, width,
    height, isShowInputBox, inputTextRef, viewPagerRef) => {
    try {
        const input_text_translate_x_config = {
            damping: 20
        }
        const content_translate_y_config = {
            damping: 20
        }
        const content_opacity_config = {
            damping: 20
        }
        viewPagerRef.current.scrollView.setNativeProps({ scrollEnabled: !isShowInputBox });
        input_search_box_translate_x.value = withSpring(isShowInputBox && 1 || width, input_text_translate_x_config)

        content_translate_y.value = withSpring(isShowInputBox && 1 || height + 500, content_translate_y_config);

        content_opacity.value = withSpring(isShowInputBox && 1 || 0, content_opacity_config);

        InteractionManager.runAfterInteractions(() => {
            if (!isShowInputBox) {
                inputTextRef.current.clear();
                inputTextRef.current.blur();
                setSearchValues({
                    ...searchValues,
                    searchForPostId: stringConstants.EMPTY,
                    searchText: stringConstants.EMPTY
                });
            } else {
                setTimeout(() => {
                    inputTextRef.current.focus();
                    setSearchValues({
                        ...searchValues,
                        searchForPostId: post.postId
                    });
                }, numericConstants.TWO_HUNDRED);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const fetchReportAbuseValues = async (optionsState, setOptionsState) => {
    try {
        const savedReportAbusesJSON = await fetchSavedReportAbuseOptions();

        let reportAbusesData = savedReportAbusesJSON && JSON.parse(savedReportAbusesJSON) || stringConstants.EMPTY;

        const reportAbuseForPostPresent = reportAbusesData && reportAbusesData.find((item) => item.postId == optionsState.selectedPost.postId &&
            item.reportAbuseSubmitted) || {};

        if (!Object.keys(reportAbuseForPostPresent).length) {

            const responseReportAbuses = await axios.get(urlConstants.fetchReportAbuses);

            if (responseReportAbuses && responseReportAbuses.data.reports) {
                reportAbusesData = responseReportAbuses.data.reports;
                reportAbusesData.map((item) => {
                    item[reportAbuseRequestPayloadKeys.POST_REPORT_ABUSE_SUBMITTED] = false;
                    item.reportId = parseInt(item.reportId);
                });
            }
        }
        setOptionsState({
            ...optionsState,
            reportAbuses: reportAbusesData || [],
            selectedReportAbuse: reportAbuseForPostPresent || {}
        })
    } catch (error) {
        console.log("Cannot fetch report abuses", error);
    }
}


export const setReportAbuseOptions = async (saveReportsJSON) => {
    try {
        await saveDetailsToKeyChain(keyChainConstansts.SAVE_SELECTED_REPORT,
            keyChainConstansts.SAVE_SELECTED_REPORT, saveReportsJSON);
    } catch (error) {
        console.log('Cannot set selected report abuse to the storage', error);
    }
}

export const fetchSavedReportAbuseOptions = async () => {
    try {
        return await getKeyChainDetails(keyChainConstansts.SAVE_SELECTED_REPORT);
    } catch (error) {
        console.log('Cannot fetch selected saved report abuses from storage', error);
    }
}

export const resetAnimatePostTextDetails = (textPostDescriptionAnimationValue, textPostTypeAnimationValue) => {
    const text_spring_config = {
        damping: 20,
        stiffness: 90
    };
    textPostDescriptionAnimationValue.value = withSpring(-1000, text_spring_config);
    textPostTypeAnimationValue.value = withSpring(-1000, text_spring_config);
}

export const animateFinishedPostTextDetails = (textPostDescriptionAnimationValue, textPostTypeAnimationValue) => {
    const text_spring_config = {
        damping: 20,
        stiffness: 90
    };
    textPostDescriptionAnimationValue.value = withDelay(150, withSpring(0, text_spring_config));
    textPostTypeAnimationValue.value = withDelay(50, withSpring(0, text_spring_config));
}

export const onSwiperScrollEnd = (event, postDetailsRef, textPostDescriptionAnimationValue, textPostTypeAnimationValue) => {
    let index = 0;
    if (event.position || event.nativeEvent.position) {
        index = event.position - 1 || event.nativeEvent.position - 1;
    } else if (event.nativeEvent.layoutMeasurement) {
        index = Math.round(event.nativeEvent.contentOffset.y / event.nativeEvent.layoutMeasurement.height) - 1;
    }
    postDetailsRef?.current?.setPostIndex(index);
    animateFinishedPostTextDetails(textPostDescriptionAnimationValue, textPostTypeAnimationValue);
}

export const setAnimationVisible = (postDetailsState, setPostDetailsState, isVisible) => {
    setPostDetailsState({
        ...postDetailsState,
        animationVisible: isVisible
    });
}

export const scrollWhenPostIdFromNotification = (sdomDatastate, postIdFromNotification, viewPagerRef,
    postDetailsRef) => {
    try {
        if (!postDetailsRef?.current?.newPostViewed && postIdFromNotification && viewPagerRef?.current) {
            const index = sdomDatastate.posts.findIndex(post => post.postId == postIdFromNotification)
            viewPagerRef.current.scrollBy(index);
            postDetailsRef?.current?.setPostIndex(index);
            postDetailsRef?.current?.setNewPostViewed(true);
        }
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }
}

export const setImageLoadError = async (optionsState, setOptionsState, bool) => {
    setOptionsState({ ...optionsState, isImageLoadError: bool });
}

/**
 * 
 * @param {*} categoryIdFromNotification 
 */
const retrievePostData = async (categoryIdFromNotification) => {
    let categoryPostsData = [];
    const responseData = await axios.get(urlConstants.fetchPosts);
    if (responseData) {
        const responsePostsData = responseData.data.posts;
        let selectedCategories = await getSelectedCategoryIdsFromStorage();

        selectedCategories = await checkAndAddCategoriesFromFCMNotification(selectedCategories.password,
            categoryIdFromNotification);

        const fetchedPostCounts = await getPostCounts();
        const postCounts = fetchedPostCounts && JSON.parse(fetchedPostCounts) || [];

        const parsedCategoryIds = selectedCategories && JSON.parse(selectedCategories) || categoryPostsData;
        categoryPostsData = parsedCategoryIds && parsedCategoryIds.length &&
            responsePostsData.filter(post => parsedCategoryIds.some((selectedCategory) => post.categoryIds[0].split(',').includes(selectedCategory.selectedCategoryId))).sort((datePost1, datePost2) => {
                return Date.parse(datePost2.addedOn) - Date.parse(datePost1.addedOn);
            }) || responsePostsData.sort((datePost1, datePost2) => {
                return Date.parse(datePost2.addedOn) - Date.parse(datePost1.addedOn);
            });

        categoryPostsData.map(postItem => {
            const postHasLikes = postCounts && postCounts[savePostCountKeys.SELECTED_POST_LIKES] &&
                postCounts[savePostCountKeys.SELECTED_POST_LIKES].some(postId => postItem.postId == postId);
            if (postHasLikes) {
                postItem.likeDisabled = postHasLikes;
            }
            postItem.postCategoriesIn = fetchAndDisplayNamesAndCategoryTitles(postItem);
        });
    }
    return categoryPostsData;
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

export const showSelectedImage = async (type, bottomSheetRef, addPost, setAddPost) => {
    try {
        let imageValue;
        switch (type) {
            case miscMessage.CAMERA:
                imageValue = await ImagePicker.openCamera({ width: width, height: height, mediaType: `photo` })
                break;
            case miscMessage.GALLERY:
                imageValue = await ImagePicker.openPicker({ width: width, height: height });
                break;
            default:
                break;
        }
        addPost.capturedImage = imageValue.path;
        addPost.showBottomOptions = false;
        setAddPost({ ...addPost });
        bottomSheetRef?.current?.snapTo(numericConstants.ONE);
    } catch (error) {
        console.log(error);
    }
}

export const categoryHeader = () => {
    return ({
        headerShown: true,
        headerTitle: headerStrings.SELECT_CATEGORY,
        headerStyle: SDGenericStyles.backGroundColorBlack,
        headerTintColor: colorConstants.WHITE,
        headerTitleAlign: miscMessage.CENTER,
        headerTitleStyle: headerStyles.headerText,
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
        headerTitleStyle: headerStyles.headerText,
        navigationOptions: ({ navigation }) => ({
            headerLeft: (
                <HeaderBackButton tintColor={SDGenericStyles.colorWhite} onPress={() => { navigation.goBack() }} />
            )
        })
    })
}

export const onResendOtpButtonPress = async (firstTextInputRef, setOtpArray, setResendButtonDisabledTime, setAttemptsRemaining,
    attemptsRemaining, startResendOtpTimer, phoneNumber, isFrom, navigation, clearErrors, setLoader) => {
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
    await handleUserSignUpOtp(signUpDetails, isFrom, navigation, true, setLoader);
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

export const handleUserSignUpOtp = async (signUpDetails, isFrom, navigation, _isResendOtp, setSignUpDetails) => {
    try {

        // Math.random() returns float between 0 and 1, 
        // so minimum number will be 100000, max - 999999. 
        const random6Digit = Math.floor(Math.random() * 899999 + 100000);

        // const response = await axios.post(urlConstants.TRIGGER_SMS_OTP, otpRequestDataJSON);

        // if (response && response.data && !isResendOtp) {
        const params = getSignUpParams(signUpDetails, random6Digit, isFrom, setSignUpDetails);

        navigation.navigate(screens.OTP_VERIFICATION, params);
        // setLoader(false);
        return true;
        //}
        // showSnackBar(successFulMessages.SENT_SMS_SUCCESSFULLY, true);
    } catch (error) {
        console.error(`${errorModalMessageConstants.REQUEST_OTP_FAILED} : ${signUpDetails.phoneNumber}`, error);
    }
    return false;
}

export const getSignUpParams = (signUpDetails, random6Digit, isFrom, setSignUpDetails) => {
    let returnValue = {};
    if (isFrom) {
        returnValue.isFrom = isFrom;
    }
    returnValue.signUpDetails = signUpDetails;
    returnValue.rand_number = random6Digit;
    returnValue.setSignUpDetails = setSignUpDetails;
    return returnValue;
}

export const handleUserLogin = async (data) => {
    try {
        const loginRequest = {
            [requestConstants.PHONE_NUMBER]: data.phoneNumber,
            [requestConstants.SECRET]: data.secret
        }
        const loginJson = JSON.stringify(loginRequest);
        const response = await axiosPostWithHeaders(urlConstants.login, loginJson);
        const responseData = processResponseData(response);
        if (responseData) {
            const userName = `${data.phoneNumber}_${responseData.access_token}`;
            const userDetailsJSON = JSON.stringify(responseData.user);
            return await saveDetailsToKeyChain(keyChainConstansts.LOGGED_IN_USER, userName,
                userDetailsJSON);
        }
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
    }
    return false;
}

export const saveDetailsToKeyChain = async (key, username, password) => {
    try {
        await Keychain.setGenericPassword(username, password, { service: key });
        console.log(username);
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
                    [requestConstants.USER_ID]: data.userId
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
            default:
                break;
        }
        const requestJSON = JSON.stringify(requestData);
        const responseData = await axiosPostWithHeaders(urlConstants.registerUser, requestJSON);
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
        console.error(error_response);
        setErrorModal(error, setError, errorModalMessageConstants.UNEXPECTED_ERROR,
            errorModalMessageConstants.SOMETHING_WENT_WRONG, true);
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

export const setErrorModal = (error, setError, title, message, showModal) => {
    setError({ ...error, title: title, message: message, showModal: showModal });
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

export const showSnackBar = (message, success, isLong) => {
    Snackbar.show({
        text: message,
        textColor: colors.SDOM_WHITE,
        duration: isLong && Snackbar.LENGTH_LONG || Snackbar.LENGTH_SHORT,
        backgroundColor: success && colors.GREEN || colors.RED
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
            label: stringConstants.EMPTY, value: -1, untouchable: true
        }, defaultProfilesValue];
        let response = await axiosGetWithHeaders(urlConstants.fetchAllProfiles);
        response.data && response.data.map(profile => profile.textStyle = {
            fontFamily: `wallpiper_bold_font`,
        });
        return profiles.concat(response.data);
    } catch (error) {
        console.log(errorMessages.COULD_NOT_FETCH_PROFILES, error);
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

export const axiosPostUploadImageWithHeaders = async (url, data, token) => {
    return await axios.post(url, data, {
        headers: {
            [miscMessage.CONTENT_TYPE]: miscMessage.MULTIPART_FORM, [miscMessage.AUTHORIZATION]: `${miscMessage.BEARER}${stringConstants.SPACE}${token}`
        }
    });
}

export const prepareSDOMMenu = () => {
    try {
        return SDMenuOptions;
    } catch (error) {
        console.log(error);
    }
}

export const redirectUserToGlance = async () => {
    try {
        const categoryData = await getKeyChainDetails(keyChainConstansts.INITIAL_CATEGORY_SELECTIONS);
        return categoryData;
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
    return await axios.delete(`${url}${stringConstants.SLASH}${id}`, {
        headers: {
            [miscMessage.AUTHORIZATION]: `${miscMessage.BEARER}${stringConstants.SPACE}${token}`
        }
    });
}

export const getLoggedInUserDetails = async () => {
    try {
        const loggedInUser = await getLoggedInUser();
        return loggedInUser && {
            [miscMessage.PHONE_NUMBER]: loggedInUser.username.split(stringConstants.UNDERSCORE)[numericConstants.ZERO],
            [miscMessage.TOKEN]: loggedInUser.username.split(stringConstants.UNDERSCORE)[numericConstants.ONE],
            [miscMessage.USER_DETAILS]: loggedInUser.password
        }
    } catch (error) {
        console.error(errorMessages.COULD_NOT_PARSE_LOGIN_TOKEN, error);
    }
    return false;
}

export const fetchUserPosts = async (userPosts, setUserPosts) => {
    try {
        const user = await getLoggedInUserDetails();
        if (user) {
            const userDetails = JSON.parse(user.details);
            const url = `${urlConstants.fetchPostsByUserId}${stringConstants.SLASH}${userDetails.id}`;
            const response = await axiosGetWithAuthorization(url, user.token);
            const responseData = processResponseData(response);
            if (responseData == tokenMessageConstants.TOKEN_INVALID || responseData == tokenMessageConstants.TOKEN_EXPIRED) {
                console.error('login redirect')
            } else {
                userPosts.posts = [AddPostConstant, ...responseData.posts];
                setUserPosts({ ...userPosts });
            }
        }
    } catch (error) {
        console.error(error);
    }
}

const tokenStatusDetails = (response) => {
    switch (response.data.status) {
        case tokenMessageConstants.TOKEN_INVALID:
            return tokenMessageConstants.TOKEN_INVALID;
        case tokenMessageConstants.TOKEN_EXPIRED:
            return tokenMessageConstants.TOKEN_EXPIRED;
        default:
            return response.data;
    }
}

export const setAddPostStateValues = (action, addPost, setAddPost, item) => {
    addPost.postTitle = action == miscMessage.UPDATE && item.postTitle || stringConstants.EMPTY;
    addPost.postDescription = action == miscMessage.UPDATE && item.postDescription || stringConstants.EMPTY;
    addPost.postProfile = action == miscMessage.UPDATE && item.profile.id;
    addPost.postCategories = action == miscMessage.UPDATE && item.categoryIds.split(stringConstants.COMMA) ||
        jsonConstants.EMPTY;
    addPost.postType = action == miscMessage.UPDATE && item.postType || stringConstants.EMPTY;
    addPost.capturedImage = action == miscMessage.UPDATE && item.postImage || stringConstants.EMPTY;
    setAddPost({ ...addPost });
}

export const handleAddPostDetails = async (data, postImagePath, toAction, selectedItem) => {
    try {
        const formData = new FormData();
        const categories = data.postCategories.
            reduce((result, item) => { return `${result}${item}` },
                data.postCategories.length > numericConstants.ONE && stringConstants.COMMA || stringConstants.EMPTY);
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
            formData.append(requestConstants.PROFILE_ID, data.postProfile);
            formData.append(requestConstants.POST_IMAGE, { uri: postImagePath, name: imageName, type: miscMessage.IMAGE_TYPE });
            const response = await axiosPostUploadImageWithHeaders(toAction == miscMessage.UPDATE && urlConstants.updatePost ||
                urlConstants.addPost, formData, user.token);
            return processResponseData(response);
        }
        //handle login here
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(toAction == miscMessage.UPDATE && errorMessages.COULD_NOT_UPDATE_POST ||
            errorMessages.COULD_NOT_UPLOAD_POST, false);
    }
}

export const handlePostDelete = async (postId) => {
    try {
        const user = await getLoggedInUserDetails();
        if (user) {
            let response = await deleteWithAuthorization(urlConstants.deletePost, postId, user.token);
            response.data = { [miscMessage.MESSAGE]: alertTextMessages.POST_DELETED_SUCCESSFULLY }
            return processResponseData(response);
        }
        //handle login here
    } catch (error) {
        processResponseData(error.response, errorMessages.SOMETHING_WENT_WRONG);
        showSnackBar(errorMessages.COULD_NOT_DELETE_POST, false);
    }
}