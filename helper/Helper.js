import axios from 'axios'
import {
    urlConstants, asyncStorageKeys,
    postCountTypes, postCountRequestKeys,
    savePostCountKeys, setPostImages,
    permissionsButtons, permissionMessages,
    stringConstants, alertTextMessages,
    reportAbuseRequestPayloadKeys, responseStringData,
} from '../constants/Constants';
import { Alert, InteractionManager, NativeModules, PermissionsAndroid, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withDelay, withSpring } from 'react-native-reanimated';

export const fetchCategoryData = async () => {
    const responseData = await axios.get(urlConstants.fetchCategories);
    return responseData.data.categories;
}

export const fetchAndUpdateCategoryState = async (category, setCategory) => {
    try {
        const responseCategoryData = await fetchCategoryData();
        if (responseCategoryData) {
            const selectedCategories = await getSelectedCategoryIdsFromStorage();
            const parsedSelectedCategoryIds = selectedCategories.length && JSON.parse(selectedCategories) || [];
            responseCategoryData.sort((cat1, cat2) => cat1.categoryTitle.localeCompare(cat2.categoryTitle))
                .map((category) => category.isSelected = parsedSelectedCategoryIds.some(selectedCategory =>
                    category.categoryId == selectedCategory.selectedCategoryId))
        }

        let initialCategory = await getCategoryButtonType();
        initialCategory = initialCategory && initialCategory || 'skipButton';

        setCategory({ ...category, categories: responseCategoryData, initialCategory: initialCategory });
    } catch (error) {
        console.log(error);
        setCategory({ ...category, categories: [], initialCategory: 'skipButton' });
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

export const saveCategoryIdsToStorage = async (categoryIds) => {
    try {
        await AsyncStorage.setItem(asyncStorageKeys.SAVE_CATEGORY_ID, categoryIds);
    } catch (error) {
        console.log('Cannot save categoryIds to the storage', error);
    }
}

export const getSelectedCategoryIdsFromStorage = async () => {
    try {
        return await AsyncStorage.getItem(asyncStorageKeys.SAVE_CATEGORY_ID) || stringConstants.EMPTY;
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
        const getPostIdOfPostForCount = await getPostCounts(asyncStorageKeys.SAVE_POST_COUNTS);
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
            await AsyncStorage.setItem(asyncStorageKeys.SAVE_POST_COUNTS, postIdsJson)
        }
    } catch (error) {
        console.log(`Cannot save the post counts for the post id ${postId}`, error);
    }
}

export const getPostCounts = async () => {
    try {
        return await AsyncStorage.getItem(asyncStorageKeys.SAVE_POST_COUNTS);
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

export const saveCategoryButtonType = async (inCategoryButtonType) => {
    try {
        await AsyncStorage.setItem(asyncStorageKeys.SAVE_CATEGORY_BUTTON_TYPE, inCategoryButtonType);
    } catch (error) {
        console.log('Cannot save button type to the storage', error);
    }
}

export const getCategoryButtonType = async () => {
    try {
        return await AsyncStorage.getItem(asyncStorageKeys.SAVE_CATEGORY_BUTTON_TYPE) || stringConstants.EMPTY;
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
                }, 200);
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
        await AsyncStorage.setItem(asyncStorageKeys.SAVE_SELECTED_REPORT, saveReportsJSON);
    } catch (error) {
        console.log('Cannot set selected report abuse to the storage', error);
    }
}

export const fetchSavedReportAbuseOptions = async () => {
    try {
        return await AsyncStorage.getItem(asyncStorageKeys.SAVE_SELECTED_REPORT) || stringConstants.EMPTY;
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
                await saveCategoryIdsToStorage(selectedCategories);
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

        selectedCategories = await checkAndAddCategoriesFromFCMNotification(selectedCategories,
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

