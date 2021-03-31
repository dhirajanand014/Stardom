import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login } from './screens/user/Login';
import { Register } from './screens/user/Register';
import { screenOptions, stackOptions } from './constants/Constants';
import { PostSideView } from './views/imagePost/PostSideView';

export const CategoryContext = React.createContext();

export default class App extends React.PureComponent {

  render() {

    const LoginStack = createStackNavigator();
    const PostDrawer = createDrawerNavigator();


    const loginDrawer = () => {
      return (
        <PostDrawer.Navigator initialRouteName={"Login"} drawerContent={props => <PostSideView {...props} />}>
          <PostDrawer.Screen name="Category" component={Catego} />
          <PostDrawer.Screen name="Login" component={Login} />
          <PostDrawer.Screen name="Register" component={Register} />
        </PostDrawer.Navigator>
      )
    }

    return (
      <NavigationContainer>
        <LoginStack.Navigator initialRouteName={this.props.navigationRoute} screenOptions={screenOptions}
          headerMode='float' animation="fade">
          <LoginStack.Screen name="Login" component={loginDrawer} options={stackOptions} />
          <LoginStack.Screen name="Register" component={Register} options={stackOptions} />
        </LoginStack.Navigator>
      </NavigationContainer>
    )
  }
}
