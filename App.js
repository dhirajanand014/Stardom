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

export const CategoryContext = React.createContext();

export default class App extends React.PureComponent {

  render() {
    const Stack = createStackNavigator();
    const PostDrawer = createDrawerNavigator();
    const TabNavigator = createMaterialTopTabNavigator();

    const TabNavigation = () => {
      return (
        <TabNavigator.Navigator initialRouteName={screens.GLANCE} tabBarOptions={tabBarOptions}>
          <TabNavigator.Screen name={screens.GLANCE} component={ViewDrawer} />
          <TabNavigator.Screen name={screens.CAMERA} component={SDCameraView} />
        </TabNavigator.Navigator>
      )
    }
    const ScreenNavigator = () => {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={this.props.navigationRoute} screenOptions={screenOptions}
            headerMode='float' animation="fade">
            <Stack.Screen name={screens.INTRO} component={Intro} options={headerLessStackOptions} />
            <Stack.Screen name={screens.GLANCE} component={TabNavigation} options={headerLessStackOptions} />
            <Stack.Screen name={screens.CATEGORY} component={Category} options={categoryHeader} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    const ViewDrawer = () => {
      return (
        <PostDrawer.Navigator initialRouteName={screens.GLANCE} drawerContent={props => <PostSideView {...props} />}>
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
    const initialCategorySelection = this.props.initialCategorySelection || false;
    const postIdFromNotification = this.props.postIdFromNotification || false;
    const categoryIdFromNotification = this.props.categoryIdFromNotification || false;

    return (
      <SDErrorBoundary>
        <CategoryContext.Provider value={{
          fetchCategories, initialCategorySelection,
          postIdFromNotification, categoryIdFromNotification
        }}>
          <TourGuideProvider androidStatusBarVisible={true}
            backdropColor={this.props.initialCategorySelection == screens.INTRO && `rgba(145, 63, 146, 0.6)`}>
            <ScreenNavigator />
          </TourGuideProvider>
        </CategoryContext.Provider>
      </SDErrorBoundary>
    )
  }
}