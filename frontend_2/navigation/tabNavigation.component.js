import React from 'react';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreenStack } from './homeStack.component';
import { UserSettingsStack } from './userStack.component';
import { CollaborateStack } from './collaborateStack.component';

const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
);

const ClipBoardIcon = (props) => (
    <Icon {...props} name='clipboard-outline'/>
);

const HomeIcon = (props) => (
    <Icon {...props} name='home-outline'/>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={ClipBoardIcon}/>
    <BottomNavigationTab icon={HomeIcon}/>
    <BottomNavigationTab icon={PersonIcon}/>
  </BottomNavigation>
);

export const TabNavigation = () => (
  <Navigator
    initialRouteName="HomeScreenStack"
    tabBar={props => <BottomTabBar {...props} />}
  >
    <Screen
      name="CollaborateStack"
      component={CollaborateStack}
    >
    </Screen>
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
  </Navigator>
);
