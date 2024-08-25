// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/LoginPage.js';
import HomePage from './screens/HomePage';
import CanteenView from './screens/CanteenView.js';
import UserSettings from './screens/UserSettings.js';
import { PaperProvider } from 'react-native-paper';  
import {FoodReviewPage } from './screens/components/Food.js';
import ReviewFormPage from './screens/reviewformpage.js';
import {
  RecoilRoot,
} from 'recoil';

const Stack = createStackNavigator();



export default function App() {
  return (
    <RecoilRoot>
      <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="CanteenView" component={CanteenView} options={{ headerShown: false }} />
          <Stack.Screen name="UserSettings" component={UserSettings} options={{ headerShown: true }} />
          <Stack.Screen name="FoodReviewPage" component={FoodReviewPage} options={{ headerShown: false }} />
          <Stack.Screen name="ReviewFormPage" component={ReviewFormPage} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>


  );
}
