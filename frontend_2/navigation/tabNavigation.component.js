import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreenStack } from './homeStack.component';
import { UserSettingsStack } from './userStack.component';
import { CollaborateStack } from './collaborateStack.component';

const { Navigator, Screen } = createBottomTabNavigator();

function BottomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  /// Hide the tab bar
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const nav = (index) => {
    // if already on this tab, go to top of stack
    if (index === state.index && navigation.canGoBack()) {
      navigation.popToTop();
    } else {
      navigation.navigate(state.routeNames[index]);
    }
  }

  return (
    <BottomNavigation
      keyboardHidesNavigationBar={true}
      selectedIndex={state.index}
      onSelect={index => nav(index)}>
      <BottomNavigationTab icon={ClipBoardIcon}/>
      <BottomNavigationTab icon={HomeIcon}/>
      <BottomNavigationTab icon={PersonIcon}/>
    </BottomNavigation>
  );
};

export function TabNavigation(props) {
  // user's location when they login
  var location = props.location;
  // boolean value used for navigation so the user can't log out by swiping back
  let setSignedIn = props.setSignedIn;

  // total list of projects the user is a part of to display on the home page
  const [allProjects, setAllProjects] = useState([]);

  // Hide Tabs for these screens within the 3 stack screens (CollaborateStack, HomeScreenStack, UserSettingsStack)
  const tabHiddenRoutes = ["CreateActivityStack", "StationaryActivity", "SurveyActivity", "PeopleMovingActivity"];

  useEffect(() => {
    async function getInfo() {

      // get list of projects for all teams the user is a member of
      await setAllProjects([]);
      let projectList = [];
      let teamsList = await AsyncStorage.getItem('@teams');
      teamsList = JSON.parse(teamsList);
      if (teamsList !== null) {
        for (let i = 0; i < teamsList.length; i++) {
          projectList = await setTeamDetails(teamsList[i], projectList);
        }
      }
      await setAllProjects(projectList);
    }

    getInfo()
  }, []);

  const setTeamDetails = async (team, projectList) => {
    let token = await AsyncStorage.getItem("@token");
    let success = false
    let teamDetails = null
    // Get the team information
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/teams/' + team._id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
            }
        })
        teamDetails = await response.json();
        success = true
    } catch (error) {
        console.log("error getting team\n", error)
    }

    if(teamDetails.success !== undefined){
      success = teamDetails.success
      //console.log("success: ", success);
    }

    // return team info
    if(success && teamDetails.projects !== null) {
      //console.log("teamDetails.projects: ", teamDetails.projects);
      for (let i = 0; i < teamDetails.projects.length; i++){
        let project = teamDetails.projects[i];
        project.info = "Team: " + teamDetails.title + "\nLocation: " + project.description;
        project.teamName = teamDetails.title;
        project.teamId = teamDetails._id;
        projectList.push(project);
      }
      //await setAllProjects(allProjects);
    }
    return projectList;
  }

  const addProject = async (projectDetails, teamDetails) => {
    projectDetails.info = "Team: " + teamDetails.title + "\nLocation: " + projectDetails.description;
    projectDetails.teamName = teamDetails.title;
    projectDetails.teamId = teamDetails._id;
    allProjects.push(projectDetails);
    await setAllProjects(allProjects);
  }

  const removeProject = async (projectId) => {
    let projectIndex = allProjects.findIndex(element => element._id === projectId);
		allProjects.splice(projectIndex, 1);
		await setAllProjects(allProjects);
  }

  function getTabBarVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      return false;
    } else {
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
            location={location}
            addProject={addProject}
            removeProject={removeProject}
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
            allProjects={allProjects}
            setAllProjects={setAllProjects}
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
            setSignedIn={setSignedIn}
          >
          </UserSettingsStack>
        }
      </Screen>
    </Navigator>
  );
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
