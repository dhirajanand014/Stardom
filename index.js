
import 'react-native-gesture-handler';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
    headerLessStackOptions, numericConstants, profileScreenOptions,
    screenOptions, screens, tabBarOptions, width
} from './constants/Constants';
import { authorizationHeader, categoryHeader, getNotificationConfiguration } from './helper/Helper';
import { Category } from './screens/category/Category';
import { Intro } from './screens/Intro';
import { AddPostDetails } from './screens/post/AddPostDetails';
import { SDUserMenus } from './screens/SDUserMenus';
import { Login } from './screens/user/Login';
import { Profile } from './screens/user/Profile';
import { Register } from './screens/user/Register';
import { RegistrationConfirmation } from './screens/user/RegisterConfirmation';
import { RegistrationDetails } from './screens/user/RegistrationDetails';
import { RegistrationOTP } from './screens/user/RegitrationOTP';
import { Posts } from './views/imagePost/Posts';
import { SDCameraView } from './views/cameraView/SDCameraView';
import { Glance } from './screens/post/Glance';
import { SelectPostCategories } from './screens/post/SelectPostCategories';
import { UserFollowFollowing } from './screens/user/UserFollowFollowing';
import { EditUserProfile } from './screens/user/EditUserProfile';
import { SDCameraImagePreview } from './views/cameraView/SDCameraImagePreview';
import { SDSplashScreen } from './screens/SDSplashScreen';
import { userMenuStyles } from './styles/Styles';
import { ViewUserPost } from './screens/post/ViewUserPost';
import { FollowerFollowingProfile } from './screens/user/FollowerFollowingProfile';
import { SDSearchUserAndPosts } from './screens/user/SDSearchUserAndPosts';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

LogBox.ignoreLogs(['Remote debugger is in a background tab which may cause apps to perform slowly',
    'Require cycle: node_modules/rn-fetch-blob/index.js',
    'Require cycle: node_modules/react-native/Libraries/Network/fetch.js']);
LogBox.ignoreAllLogs(true);

messaging().setBackgroundMessageHandler(async remoteMessage => console.log(remoteMessage));

const navigationRef = React.createRef();

const Stack = createStackNavigator();
const TabNavigator = createMaterialTopTabNavigator();
const DrawerNavigator = createDrawerNavigator();

export const TabNavigation = () => {
    return (
        <TabNavigator.Navigator initialRouteName={screens.GLANCE} tabBarOptions={tabBarOptions}>
            <TabNavigator.Screen name={screens.CAMERA} component={SDCameraView} />
            <TabNavigator.Screen name={screens.GLANCE} component={DrawerNavigation} />
            <TabNavigator.Screen name={screens.PROFILE} component={Profile} options={profileScreenOptions} />
        </TabNavigator.Navigator>
    )
}

export const DrawerNavigation = () => {
    return (
        <DrawerNavigator.Navigator lazy drawerStyle={[userMenuStyles.menuBackgroundColor, { width: width }]}
            drawerContent={props => <SDUserMenus {...props} />} edgeWidth={numericConstants.ZERO}>
            <DrawerNavigator.Screen name={screens.GLANCE} component={Glance} />
            <DrawerNavigator.Screen name={screens.MENU} component={SDUserMenus} />
        </DrawerNavigator.Navigator>
    )
}

export const ScreenNavigator = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={screens.SPLASH_SCREEN} screenOptions={screenOptions}
                headerMode={`float`} animation={`fade`}>
                <Stack.Screen name={screens.SPLASH_SCREEN} component={SDSplashScreen} options={headerLessStackOptions} />
                <Stack.Screen name={screens.INTRO} component={Intro} options={headerLessStackOptions} />
                <Stack.Screen name={screens.GLANCE} component={TabNavigation} options={headerLessStackOptions} />
                <Stack.Screen name={screens.OTP_VERIFICATION} component={RegistrationOTP} options={headerLessStackOptions} />
                <Stack.Screen name={screens.REGISTRATION_DETAILS} component={RegistrationDetails} options={headerLessStackOptions} />
                <Stack.Screen name={screens.REGISTRATION_CONFIRMATION} component={RegistrationConfirmation} options={headerLessStackOptions} />
                <Stack.Screen name={screens.CATEGORY} component={Category} options={categoryHeader} />
                <Stack.Screen name={screens.LOGIN} component={Login} options={headerLessStackOptions} />
                <Stack.Screen name={screens.ADD_POST_DETAILS} component={AddPostDetails} options={headerLessStackOptions} />
                <Stack.Screen name={screens.SELECT_POST_CATEGORIES} component={SelectPostCategories} options={headerLessStackOptions} />
                <Stack.Screen name={screens.POSTS} component={Posts} options={authorizationHeader} />
                <Stack.Screen name={screens.REGISTER} component={Register} options={headerLessStackOptions} />
                <Stack.Screen name={screens.EDIT_USER_PROFILE} component={EditUserProfile} options={headerLessStackOptions} />
                <Stack.Screen name={screens.FOLLOWER_FOLLOWING_PROFILE} component={FollowerFollowingProfile} options={headerLessStackOptions} />
                <Stack.Screen name={screens.VIEW_USER_POSTS} component={ViewUserPost} options={headerLessStackOptions} />
                <Stack.Screen name={screens.USER_FOLLOWERS_FOLLOWING} component={UserFollowFollowing} options={headerLessStackOptions} />
                <Stack.Screen name={screens.POSTS_USERS_SEARCH} component={SDSearchUserAndPosts} options={headerLessStackOptions} />
                <Stack.Screen name={screens.IMAGE_PREVIEW_FILTERS} component={SDCameraImagePreview} options={headerLessStackOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const HeadlessCheck = ({ isHeadless }) => {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }
    return <App navigationRef={navigationRef} />;
}

PushNotification.configure(getNotificationConfiguration(navigationRef));
AppRegistry.registerComponent(appName, () => HeadlessCheck);
