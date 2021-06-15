import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState, useRef } from 'react';

import {
  jsonConstants, numericConstants,
  screens, stringConstants, requestConstants,
  PRIVATE_FOLLOW_UNFOLLOW
} from './constants/Constants';
import { fetchAndUpdateCategoryState, fetchUpdateLoggedInUserProfile, getAllProfiles } from './helper/Helper.js';
import { TourGuideProvider } from 'rn-tourguide';
import AddPostConstant from './constants/AddPostConstant.json';
import SDErrorBoundary from './exceptionhandlers/SDErrorBoundary';
import { ScreenNavigator } from '.';
import { SDLoaderView } from './components/modals/SDLoaderView';
import { useSharedValue } from 'react-native-reanimated';
import { FlashMessageRenderer } from './components/modals/FlashMessageRenderer';

export const CategoryContext = React.createContext();

export default function App({ navigationRef }) {
  const [loggedInUser, setLoggedInUser] = useState({
    loginDetails: stringConstants.EMPTY,
    isLoggedIn: false
  });

  const currentPostIndexForProfileRef = useRef(numericConstants.ZERO);

  const [downloadProgressState, setDownloadProgressState] = useState({
    progressValue: useSharedValue(numericConstants.ZERO),
    isDownloading: useSharedValue(false)
  })

  const [sdomDatastate, setSdomDatastate] = useState(jsonConstants.EMPTY);
  const [optionsState, setOptionsState] = useState({
    currentPostIndex: numericConstants.ZERO,
    showSearch: false,
    selectedPost: stringConstants.EMPTY,
    isImageLoadError: false
  });

  const [signUpDetails, setSignUpDetails] = useState({
    phoneNumber: stringConstants.EMPTY,
    userId: stringConstants.EMPTY,
    secret: stringConstants.EMPTY,
    registrationSuccessful: false,
    tokenValidation: false
  });

  const [userPosts, setUserPosts] = useState({
    posts: [AddPostConstant] || jsonConstants.EMPTY,
    details: {
      showDetails: false,
      showBottomOptions: true,
      postTitle: stringConstants.EMPTY,
      postDescription: stringConstants.EMPTY,
      postCategories: jsonConstants.EMPTY,
      postType: stringConstants.EMPTY,
      postLink: stringConstants.EMPTY,
      postImage: stringConstants.EMPTY,
    }
  });

  const [profileDetail, setProfileDetail] = useState({
    userPosts: jsonConstants.EMPTY,
    count: {
      [requestConstants.FOLLOWERS_COUNT]: numericConstants.ZERO,
      [requestConstants.FOLLOWING_COUNT]: numericConstants.ZERO,
      [requestConstants.WALLPAPERS_COUNT]: numericConstants.ZERO,
      [requestConstants.UPLOAD_COUNT]: numericConstants.ZERO,
      [requestConstants.DOWNLOAD_COUNT]: numericConstants.ZERO,
    },
    isFollowing: false,
    privateRequestAccessStatus: PRIVATE_FOLLOW_UNFOLLOW.NOT_REQUESTED
  })

  const [profiles, setProfiles] = useState(jsonConstants.EMPTY);

  const [loader, setLoader] = useState({
    isLoading: false,
    loadingText: stringConstants.EMPTY,
    progressValue: numericConstants.ZERO
  });

  useEffect(() => {
    (async () => {
      await fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, true);
    })();
  }, jsonConstants.EMPTY);


  useEffect(() => {
    (async () => {
      const allProfiles = await getAllProfiles();
      allProfiles && setProfiles(allProfiles);
    })();
  }, jsonConstants.EMPTY);

  const setLoaderCallback = useCallback((isLoading, loadingText, progressValue) => {
    setLoader({
      ...loader, isLoading: isLoading, loadingText: loadingText && loadingText || stringConstants.EMPTY, progressValue: progressValue
    });
  });

  const fetchCategories = (category, setCategory, categoryIdFromNotification) => {
    fetchAndUpdateCategoryState(category, setCategory, categoryIdFromNotification);
  }
  const initialCategorySelection = navigationRef && navigationRef.initialCategorySelection || false;
  const postIdFromNotification = navigationRef && navigationRef.postIdFromNotification || false;
  const categoryIdFromNotification = navigationRef && navigationRef.categoryIdFromNotification || false;

  return (
    <SDErrorBoundary>
      <CategoryContext.Provider value={{
        userPosts, setUserPosts, signUpDetails, setSignUpDetails,
        fetchCategories, initialCategorySelection, profiles, setLoader,
        postIdFromNotification, categoryIdFromNotification, loader,
        loggedInUser, setLoggedInUser, sdomDatastate, setSdomDatastate,
        optionsState, setOptionsState, profileDetail, setProfileDetail,
        currentPostIndexForProfileRef, loader, setLoaderCallback,
        downloadProgressState, setDownloadProgressState,
      }}>
        <TourGuideProvider androidStatusBarVisible={true}
          backdropColor={navigationRef && navigationRef.initialCategorySelection == screens.INTRO && `rgba(145, 63, 146, 0.6)`}>
          <ScreenNavigator />
        </TourGuideProvider>
        {
          loader && <SDLoaderView loader={loader} />
        }
        <FlashMessageRenderer />
      </CategoryContext.Provider>
    </SDErrorBoundary>
  )
}