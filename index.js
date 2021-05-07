
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { headerLessStackOptions, screenOptions, screens, tabBarOptions } from './constants/Constants';
import { authorizationHeader, categoryHeader } from './helper/Helper';
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

LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const TabNavigator = createMaterialTopTabNavigator();


export const TabNavigation = () => {
    return (
        <TabNavigator.Navigator initialRouteName={screens.GLANCE} tabBarOptions={tabBarOptions}>
            <TabNavigator.Screen name={screens.CAMERA} component={SDCameraView} />
            <TabNavigator.Screen name={screens.GLANCE} component={Glance} />
            <TabNavigator.Screen name={screens.MENU} component={SDUserMenus} />
        </TabNavigator.Navigator>
    )
}
export const ScreenNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={screens.GLANCE/*navigationRef.navigationRoute*/} screenOptions={screenOptions}
                headerMode={`float`} animation={`fade`}>
                <Stack.Screen name={screens.INTRO} component={Intro} options={headerLessStackOptions} />
                <Stack.Screen name={screens.GLANCE} component={TabNavigation} options={headerLessStackOptions} />
                <Stack.Screen name={screens.OTP_VERIFICATION} component={RegistrationOTP} options={headerLessStackOptions} />
                <Stack.Screen name={screens.REGISTRATION_DETAILS} component={RegistrationDetails} options={headerLessStackOptions} />
                <Stack.Screen name={screens.REGISTRATION_CONFIRMATION} component={RegistrationConfirmation} options={headerLessStackOptions} />
                <Stack.Screen name={screens.CATEGORY} component={Category} options={categoryHeader} />
                <Stack.Screen name={screens.LOGIN} component={Login} options={headerLessStackOptions} />
                <Stack.Screen name={screens.ADD_POST_DETAILS} component={AddPostDetails} options={headerLessStackOptions} />
                <Stack.Screen name={screens.POSTS} component={Posts} options={authorizationHeader} />
                <Stack.Screen name={screens.REGISTER} component={Register} options={headerLessStackOptions} />
                <Stack.Screen name={screens.PROFILE} component={Profile} options={{
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
AppRegistry.registerComponent(appName, () => App);
