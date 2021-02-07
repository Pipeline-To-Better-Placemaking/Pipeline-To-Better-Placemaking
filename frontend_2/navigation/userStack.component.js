import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserSettings } from '../screens/UserSettings/userSettings.component';

const { Navigator, Screen } = createStackNavigator();

export function UserSettingsStack() {
  return (
    <Navigator headerMode='none'>
      <Screen
        name='UserSettings'
        component={UserSettings}
      >
      </Screen>
    </Navigator>
  );
};
