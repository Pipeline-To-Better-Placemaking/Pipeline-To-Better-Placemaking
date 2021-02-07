import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/home.component';

const { Navigator, Screen } = createStackNavigator();

export function HomeScreenStack(props){

  var location = props.location
  const [selectedProjects, setSelectedProjects] = useState([])

  removeFromSelectedProjects = async (name) => {

    var selectedProjectsArray = selectedProjects
  
    var index = selectedProjectsArray.indexOf(name)
  
    selectedProjectsArray.splice(index, 1)
  
    console.log("Array: " + JSON.stringify(selectedProjectsArray))
  
    setSelectedProjects(selectedProjectsArray)
  }

  getSelectedProjects = (projects) => {
    setSelectedProjects(projects)
  }

  return (
    <Navigator headerMode='none'>
      <Screen
        name='Home'
      >
      {props => <HomeScreen {...props}
                  selectedProjects={selectedProjects}
                  setProjects={getSelectedProjects}
                  removeFromSelectedProjects = {removeFromSelectedProjects}
                  location={location}
                >
                </HomeScreen>}
      </Screen>
    </Navigator>
  )
};
