import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { defaultProfilesValue, jsonConstants, screens, stringConstants } from './constants/Constants';
import { fetchAndUpdateCategoryState, getAllProfiles } from './helper/Helper.js';
import { TourGuideProvider } from 'rn-tourguide';
import AddPostConstant from './constants/AddPostConstant.json';
import SDErrorBoundary from './exceptionhandlers/SDErrorBoundary';
import { ScreenNavigator } from '.';

export const CategoryContext = React.createContext();

export default function App({ navigationRef }) {

  const [addPost, setAddPost] = useState({
    showDetails: false,
    showBottomOptions: true,
    postTitle: stringConstants.EMPTY,
    postDescription: stringConstants.EMPTY,
    postCategories: jsonConstants.EMPTY,
    postType: stringConstants.EMPTY,
    postProfile: defaultProfilesValue.value,
    postImage: stringConstants.EMPTY,
  });

  const [userPosts, setUserPosts] = useState({
    posts: [AddPostConstant] || jsonConstants.EMPTY
  });

  const [profiles, setProfiles] = useState(jsonConstants.EMPTY);

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

  return (
    <SDErrorBoundary>
      <CategoryContext.Provider value={{
        addPost, setAddPost, userPosts, setUserPosts,
        fetchCategories, initialCategorySelection, profiles,
        postIdFromNotification, categoryIdFromNotification
      }}>
        <TourGuideProvider androidStatusBarVisible={true}
          backdropColor={navigationRef && navigationRef.initialCategorySelection == screens.INTRO && `rgba(145, 63, 146, 0.6)`}>
          <ScreenNavigator />
        </TourGuideProvider>
      </CategoryContext.Provider>
    </SDErrorBoundary>
  )
}