import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const TabNavigation = (props) => {

  useEffect(() => {
    async function fetchMyAPI() {
      let token = await AsyncStorage.getItem("@token")
      let id = await AsyncStorage.getItem("@id")
      let success = false
      let result = null

      try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/users/' + id, {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
              }
          })
          result = await response.json()
          console.log(result)
          success = true
      } catch (error) {
          console.log(error)
      }

      if (success) {
          await AsyncStorage.setItem("@firstName", result.firstname)
          await AsyncStorage.setItem("@lastName", result.lastname)
          await AsyncStorage.setItem("@email", result.email)
          await AsyncStorage.setItem("@teams", JSON.stringify(result.teams))
          await AsyncStorage.setItem("@invites", JSON.stringify(result.invites))
    }
  }

    fetchMyAPI()
  }, [])

  return (
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
      >
        {props => <HomeScreenStack {...props}
                      location={props.location}>
                  </HomeScreenStack>}
      </Screen>
      <Screen
        name="UserSettingsStack"
        component={UserSettingsStack}
      >
      </Screen>
    </Navigator>
  );
};
