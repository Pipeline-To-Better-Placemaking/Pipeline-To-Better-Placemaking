import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/home.component';

const { Navigator, Screen } = createStackNavigator();

export const HomeScreenStack = () => (
  <Navigator headerMode='none'>
    <Screen
      name='Home'
      component={HomeScreen}
    >
    </Screen>
  </Navigator>
);
