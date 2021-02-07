import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
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

function BottomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  /// Hide the tab bar
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <BottomNavigation
      keyboardHidesNavigationBar={true}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={ClipBoardIcon}/>
      <BottomNavigationTab icon={HomeIcon}/>
      <BottomNavigationTab icon={PersonIcon}/>
    </BottomNavigation>
  );
};

export function TabNavigation(props) {

  var location = props.location;

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

  // Hide Tabs for these screens within the 3 stack screens (CollaborateStack, HomeScreenStack, UserSettingsStack)
  const tabHiddenRoutes = ["CreateActivityStack"];

  function getTabBarVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      //console.log("route: ", routeName, ", hide");
      return false;
    } else {
      //console.log("route: ", routeName, ", show");
      return true;
    }
  };

  return (
    <Navigator
      initialRouteName="HomeScreenStack"
      tabBar={props => <BottomTabBar {...props} />}
    >
      <Screen
        name="CollaborateStack"
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      >
        {props =>
          <CollaborateStack
            {...props}
          >
          </CollaborateStack>
        }
      </Screen>
      <Screen
        name="HomeScreenStack"
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      >
        {props =>
          <HomeScreenStack
            {...props}
            location={location}
          >
          </HomeScreenStack>
        }
      </Screen>
      <Screen
        name="UserSettingsStack"
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      >
        {props =>
          <UserSettingsStack
            {...props}
          >
          </UserSettingsStack>
        }
      </Screen>
    </Navigator>
  );
};
