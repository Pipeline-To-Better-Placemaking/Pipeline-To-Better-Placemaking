import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreenStack } from './homeStack.component';
import { UserSettingsStack } from './userStack.component';
import { CollaborateStack } from './collaborateStack.component';

const { Navigator, Screen } = createStackNavigator();

export const TabNavigation = () => (
  <Navigator headerMode='none'>
    <Screen
      name="HomeScreenStack"
      component={HomeScreenStack}
    >
    </Screen>
    <Screen
      name="UserSettingsStack"
      component={UserSettingsStack}
    >
    </Screen>
    <Screen
      name="CollaborateStack"
      component={CollaborateStack}
    >
    </Screen>
  </Navigator>
);
