import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/home.component';
import { ProjectResultPage } from '../screens/Home/projectResult.component';
import { ActivityResultPage } from '../screens/Home/activityResult.component';
import { CompareScreen } from '../screens/Home/Compare/compare.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { Navigator, Screen } = createStackNavigator();

export function HomeScreenStack(props){

  var location = props.location
  let allProjects = props.allProjects

  // selected projects used for comparing
  const [selectedProjects, setSelectedProjects] = useState([]);

  // selected project
  const [selectedProject, setSelectedProject] = useState(null);
  // selected team, associated with the project selected
  const [selectedTeam, setSelectedTeam] = useState(null);

  // selected activity result information
  const [selectedResult, setSelectedResult] = useState(null);
  const [results, setResults] =  useState([]);

  // These are used for api calls
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function getInfo() {
      // used for api calls
      let token = await AsyncStorage.getItem("@token");
      setToken(token);

      let id = await AsyncStorage.getItem("@id");
      setUserId(id);
    }

    getInfo()
  }, []);

  const removeFromSelectedProjects = async (name) => {

    var selectedProjectsArray = [...selectedProjects];
    var index = selectedProjectsArray.indexOf(name)
    selectedProjectsArray.splice(index, 1)

    //console.log("Array: " + JSON.stringify(selectedProjectsArray))

    setSelectedProjects(selectedProjectsArray)
  }

  const getSelectedProjects = (projects) => {
    setSelectedProjects(projects)
  }

  return (
    <Navigator headerMode='none'>
      <Screen
        name='Home'
      >
      {props =>
        <HomeScreen {...props}
          selectedProjects={selectedProjects}
          setProjects={getSelectedProjects}
          removeFromSelectedProjects={removeFromSelectedProjects}
          location={location}
          allProjects={allProjects}
          token={token}
          userId={userId}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setSelectedTeam={setSelectedTeam}
          results={results}
          setResults={setResults}
         />
       }
      </Screen>

      <Screen
        name="CompareScreen"
      >
      {props =>
        <CompareScreen
          {...props}
          removeFromSelectedProjects={removeFromSelectedProjects}
          selectedProjects={selectedProjects}
          compareCount={selectedProjects.length}
        >
        </CompareScreen>
      }
      </Screen>
      <Screen
        name='ProjectResultPage'
      >
      {props =>
        <ProjectResultPage
          {...props}
          token={token}
          userId={userId}
          project={selectedProject}
          team={selectedTeam}
          results={results}
          setSelectedResult={setSelectedResult}
         />
       }
      </Screen>
      <Screen
        name='ActivityResultPage'
      >
      {props =>
        <ActivityResultPage
          {...props}
          token={token}
          userId={userId}
          project={selectedProject}
          team={selectedTeam}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
         />
       }
      </Screen>
    </Navigator>
  )
};
