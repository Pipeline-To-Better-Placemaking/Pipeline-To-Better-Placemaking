import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TitleScreen } from '../screens/Title/title.component';
import { LoginScreen } from '../screens/Login/login.component';
import { TabNavigation } from './tabNavigation.component';

const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode='none'>
      <Screen
        name='Title'
        component={TitleScreen}
      />
      <Screen
        name='Login'
        component={LoginScreen}
      />
      <Screen
        name="TabNavigation"
        component={TabNavigation}
      >
      </Screen>
    </Navigator>
  </NavigationContainer>
);
