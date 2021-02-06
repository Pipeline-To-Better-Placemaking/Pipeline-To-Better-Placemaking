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
var teams;
var invites;
var userDetails = {
    firstname: '',
    lastname: '',
    email: ''
};

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

  console.log("Tab Props: " + JSON.stringify(props))

  useEffect(() => {
    async function fetchMyAPI() {
      let token = await AsyncStorage.getItem("@token")
      let id = await AsyncStorage.getItem("@id")
      let success = false

      await fetch('https://measuringplacesd.herokuapp.com/api/users/' + id, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then((response) => (response.json()))
      .then(async (res) => (
              console.log(res),

              await AsyncStorage.setItem("@firstName", res.firstname),
              await AsyncStorage.setItem("@lastName", res.lastname),
              await AsyncStorage.setItem("@email", res.email),
              await AsyncStorage.setItem("@teams", JSON.stringify(res.teams)),
              await AsyncStorage.setItem("@invites", JSON.stringify(res.invites)),

              userDetails = {
                  firstName: res.firstname,
                  lastName: res.lastname,
                  email: res.email
              },
              teams = res.teams,
              invites = res.invites
          ))
      .catch((error) => (console.log(error), success = false))
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
                      location={location}>
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
