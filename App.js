import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { defaultProfilesValue, jsonConstants, screens, stringConstants } from './constants/Constants';
import { fetchAndUpdateCategoryState, getAllProfiles, getLoggedInUserDetails } from './helper/Helper.js';
import { TourGuideProvider } from 'rn-tourguide';
import AddPostConstant from './constants/AddPostConstant.json';
import SDErrorBoundary from './exceptionhandlers/SDErrorBoundary';
import { ScreenNavigator } from '.';

export const CategoryContext = React.createContext();

export default function App({ navigationRef }) {

  const [loggedInUser, setLoggedInUser] = useState({
    loginDetails: stringConstants.EMPTY,
    isLoggedIn: false
  });

  const [sdomDatastate, setSdomDatastate] = useState(jsonConstants.EMPTY);
  const [optionsState, setOptionsState] = useState({
    descriptionModal: false,
    reportAbuseModal: false,
    showSearch: false,
    selectedPost: stringConstants.EMPTY,
    selectedReportAbuse: {},
    reportAbuses: jsonConstants.EMPTY,
    reportAbuseSubmitDisabled: false,
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
      postProfile: defaultProfilesValue.value,
      postImage: stringConstants.EMPTY,
    }
  });

  const [profiles, setProfiles] = useState(jsonConstants.EMPTY);

  useEffect(() => {
    (async () => {
      const userLoggedIn = await getLoggedInUserDetails();
      setLoggedInUser({
        ...loggedInUser,
        loginDetails: userLoggedIn,
        isLoggedIn: userLoggedIn && true || false
      })
    })();
  }, []);


  useEffect(() => {
    (async () => {
      const allProfiles = await getAllProfiles();
      allProfiles && setProfiles(allProfiles);
    })();
  }, []);


  const fetchCategories = (category, setCategory, categoryIdFromNotification) => {
    fetchAndUpdateCategoryState(category, setCategory, categoryIdFromNotification);
  }
  const initialCategorySelection = navigationRef && navigationRef.initialCategorySelection || false;
  const postIdFromNotification = navigationRef && navigationRef.postIdFromNotification || false;
  const categoryIdFromNotification = navigationRef && navigationRef.categoryIdFromNotification || false;
  console.log(signUpDetails.phoneNumber)
  return (
    <SDErrorBoundary>
      <CategoryContext.Provider value={{
        userPosts, setUserPosts, signUpDetails, setSignUpDetails,
        fetchCategories, initialCategorySelection, profiles,
        postIdFromNotification, categoryIdFromNotification,
        loggedInUser, setLoggedInUser, sdomDatastate, setSdomDatastate,
        optionsState, setOptionsState
      }}>
        <TourGuideProvider androidStatusBarVisible={true}
          backdropColor={navigationRef && navigationRef.initialCategorySelection == screens.INTRO && `rgba(145, 63, 146, 0.6)`}>
          <ScreenNavigator />
        </TourGuideProvider>
      </CategoryContext.Provider>
    </SDErrorBoundary>
  )
}