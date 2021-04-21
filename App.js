import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Login } from './screens/user/Login';
import { Register } from './screens/user/Register';
import { screenOptions, screens } from './constants/Constants';
import { PostSideView } from './views/imagePost/PostSideView';
import { Glance } from './screens/post/Glance';
import { Category } from './screens/category/Category';
import { fetchAndUpdateCategoryState } from './helper/Helper.js';
import { Intro } from './screens/Intro';
import { TourGuideProvider, TourGuideZone } from 'rn-tourguide';
import SDErrorBoundary from './exceptionhandlers/SDErrorBoundary';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AddPost } from './screens/post/AddPost';
import { headerStyles } from './styles/Styles';

export const CategoryContext = React.createContext();

export default class App extends React.PureComponent {

  render() {
    const Stack = createStackNavigator();
    const PostDrawer = createDrawerNavigator();

    const postViewDrawer = () => {
      return (
        <PostDrawer.Navigator initialRouteName={screens.LOGIN} drawerContent={props => <PostSideView {...props} />}>
          <PostDrawer.Screen name={screens.GLANCE} component={Glance} />
          <PostDrawer.Screen name={screens.LOGIN} component={Login} />
          <PostDrawer.Screen name={screens.ADD_POST} component={AddPost} />
          <PostDrawer.Screen name={screens.REGISTER} component={Register} />
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
            <NavigationContainer>
              <Stack.Navigator initialRouteName={this.props.navigationRoute} screenOptions={screenOptions}
                headerMode='float' animation="fade">
                <Stack.Screen name={screens.INTRO} component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name={screens.GLANCE} component={postViewDrawer} options={{ headerShown: false }} />
                <Stack.Screen name={screens.CATEGORY} component={Category} options={{
                  headerShown: true,
                  headerTitle: 'Select Categories',
                  headerStyle: { backgroundColor: '#3d3d3d' },
                  headerTintColor: '#fff',
                  headerTitleAlign: 'center',
                  headerTitleStyle: headerStyles.headerText,
                  navigationOptions: ({ navigation }) => ({
                    headerLeft: (
                      <TourGuideZone zone={2} borderRadius={8} shape={`circle`} text={`Go back to posts Anytime !!`}>
                        <HeaderBackButton tintColor='#fff' onPress={() => { navigation.goBack() }} />
                      </TourGuideZone>
                    )
                  })
                }} />
              </Stack.Navigator>
            </NavigationContainer>
          </TourGuideProvider>
        </CategoryContext.Provider>
      </SDErrorBoundary>
    )
  }
}