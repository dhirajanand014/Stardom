import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton, CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { TourGuideZone } from 'rn-tourguide';
import { Login } from './screens/user/Login';
import { Register } from './screens/user/Register';

export const CategoryContext = React.createContext();

export default class App extends React.PureComponent {

  render() {

    const LoginStack = createStackNavigator();

    return (
      <NavigationContainer>
        <LoginStack.Navigator initialRouteName={this.props.navigationRoute}
          screenOptions={{
            gestureEnabled: true, gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
          headerMode='float' animation="fade">
          <LoginStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <LoginStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </LoginStack.Navigator>
      </NavigationContainer>
    )
  }
}
