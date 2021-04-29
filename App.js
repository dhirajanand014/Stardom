import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './screens/user/Login';
import { Register } from './screens/user/Register';
import {
  screenOptions, screens,
  headerLessStackOptions,
  tabBarOptions
} from './constants/Constants';
import { PostSideView } from './views/imagePost/PostSideView';
import { Glance } from './screens/post/Glance';
import { Category } from './screens/category/Category';
import { categoryHeader, fetchAndUpdateCategoryState, authorizationHeader } from './helper/Helper.js';
import { Intro } from './screens/Intro';
import { TourGuideProvider } from 'rn-tourguide';
import SDErrorBoundary from './exceptionhandlers/SDErrorBoundary';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AddPost } from './screens/post/AddPost';
import { SDCameraView } from './views/cameraView/SDCameraView';
import { RegistrationOTP } from './screens/user/RegitrationOTP';
import { RegistrationDetails } from './screens/user/RegistrationDetails';
import { RegistrationConfirmation } from './screens/user/RegisterConfirmation';
import { SDUserMenus } from './screens/SDUserMenus';

export const CategoryContext = React.createContext();

export default function App({ navigationRef }) {
  const Stack = createStackNavigator();
  const PostDrawer = createDrawerNavigator();
  const TabNavigator = createMaterialTopTabNavigator();

  const TabNavigation = () => {
    return (
      <TabNavigator.Navigator initialRouteName={screens.GLANCE} tabBarOptions={tabBarOptions}>
        <TabNavigator.Screen name={screens.CAMERA} component={SDCameraView} />
        <TabNavigator.Screen name={screens.GLANCE} component={Glance} />
        <TabNavigator.Screen name={screens.MENU} component={SDUserMenus} />
      </TabNavigator.Navigator>
    )
  }
  const ScreenNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={screens.GLANCE/*navigationRef.navigationRoute*/} screenOptions={screenOptions}
          headerMode={`float`} animation={`fade`}>
          <Stack.Screen name={screens.INTRO} component={Intro} options={headerLessStackOptions} />
          <Stack.Screen name={screens.GLANCE} component={TabNavigation} options={headerLessStackOptions} />
          <Stack.Screen name={screens.OTP_VERIFICATION} component={RegistrationOTP} options={authorizationHeader} />
          <Stack.Screen name={screens.REGISTRATION_DETAILS} component={RegistrationDetails} options={authorizationHeader} />
          <Stack.Screen name={screens.REGISTRATION_CONFIRMATION} component={RegistrationConfirmation} options={authorizationHeader} />
          <Stack.Screen name={screens.CATEGORY} component={Category} options={categoryHeader} />
          <Stack.Screen name={screens.LOGIN} component={Login} options={authorizationHeader} />
          <Stack.Screen name={screens.ADD_POST} component={AddPost} />
          <Stack.Screen name={screens.REGISTER} component={RegistrationDetails} options={authorizationHeader} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  const ViewDrawer = () => {
    return (
      <PostDrawer.Navigator initialRouteName={screens.GLANCE} drawerContent={props => <PostSideView {...props} />} drawerPosition={`right`}>
        <PostDrawer.Screen name={screens.GLANCE} component={Glance} />
        <PostDrawer.Screen name={screens.LOGIN} component={Login} options={authorizationHeader} />
        <PostDrawer.Screen name={screens.CATEGORY} component={Category} options={categoryHeader} />
        <PostDrawer.Screen name={screens.ADD_POST} component={AddPost} />
        <PostDrawer.Screen name={screens.REGISTER} component={Register} options={authorizationHeader} />
      </PostDrawer.Navigator>
    )
  }

  const fetchCategories = (category, setCategory, categoryIdFromNotification) => {
    fetchAndUpdateCategoryState(category, setCategory, categoryIdFromNotification);
  }
  const initialCategorySelection = navigationRef && navigationRef.initialCategorySelection || false;
  const postIdFromNotification = navigationRef && navigationRef.postIdFromNotification || false;
  const categoryIdFromNotification = navigationRef && navigationRef.categoryIdFromNotification || false;

  return (
    <SDErrorBoundary>
      <CategoryContext.Provider value={{
        fetchCategories, initialCategorySelection,
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