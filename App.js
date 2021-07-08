import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  jsonConstants, numericConstants,
  screens, stringConstants, requestConstants,
  PRIVATE_FOLLOW_UNFOLLOW,
  miscMessage
} from './constants/Constants';
import { fetchAndUpdateCategoryState, fetchUpdateLoggedInUserProfile, getAllProfiles, showSnackBar } from './helper/Helper.js';
import { TourGuideProvider } from 'rn-tourguide';
import AddPostConstant from './constants/AddPostConstant.json';
import SDErrorBoundary from './exceptionhandlers/SDErrorBoundary';
import { ScreenNavigator } from '.';
import { SDLoaderView } from './components/modals/SDLoaderView';
import NetInfo from "@react-native-community/netinfo";
import { useSharedValue } from 'react-native-reanimated';
import messaging from '@react-native-firebase/messaging';
import { FlashMessageRenderer } from './components/modals/FlashMessageRenderer';
import { showNotification } from './notification/notification';
import { DisconnectedNetModal } from './components/modals/DisconnectedNetModal';
export const CategoryContext = React.createContext();

export default function App({ navigationRef }) {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      showNotification(remoteMessage);
    });
    return unsubscribe;
  }, jsonConstants.EMPTY);

  const [loggedInUser, setLoggedInUser] = useState({
    loginDetails: stringConstants.EMPTY,
    isLoggedIn: false
  });

  const postIdFromNotification = useRef(null);
  const viewPagerPostsRef = useRef(null);
  const currentPostIndexForProfileRef = useRef(numericConstants.ZERO);

  const [downloadProgressState, setDownloadProgressState] = useState({
    progressValue: useSharedValue(numericConstants.ZERO),
    isDownloading: useSharedValue(false)
  });

  const [netConnection, setNetConnection] = useState({ isConnected: stringConstants.EMPTY });

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
    const unsubscribe = NetInfo.addEventListener((state) => {
      showSnackBar(state.isConnected && miscMessage.CONNECTED || miscMessage.DISCONNECTED, state.isConnected);
      setNetConnection({ ...netConnection, isConnected: state.isConnected });
    });
    (async () => {
      await fetchUpdateLoggedInUserProfile(loggedInUser, setLoggedInUser, true);
      const allProfiles = await getAllProfiles();
      allProfiles && setProfiles(allProfiles);
    })();
    return () => {
      unsubscribe();
    }
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
        downloadProgressState, setDownloadProgressState, viewPagerPostsRef
      }}>
        <TourGuideProvider androidStatusBarVisible={true}
          backdropColor={navigationRef && navigationRef.initialCategorySelection == screens.INTRO && `rgba(145, 63, 146, 0.6)`}>
          <ScreenNavigator />
        </TourGuideProvider>
        {
          loader && <SDLoaderView loader={loader} />
        }
        <FlashMessageRenderer />
        <DisconnectedNetModal isConnected={netConnection.isConnected} />
      </CategoryContext.Provider>
    </SDErrorBoundary>
  )
}