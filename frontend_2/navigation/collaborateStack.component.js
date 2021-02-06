import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Collaborate } from '../screens/Collaborate/collaborate.component';
import { TeamPage } from '../screens/Collaborate/Team/team.component';

const { Navigator, Screen } = createStackNavigator();

export const CollaborateStack = () => (
  <Navigator headerMode='none'>
    <Screen
      name='Collaborate'
      component={Collaborate}
    >
    </Screen>
    <Screen
      name='TeamPage'
      component={TeamPage}
    >
    </Screen>
  </Navigator>
);
