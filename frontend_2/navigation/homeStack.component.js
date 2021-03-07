import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/home.component';
import { ProjectResultPage } from '../screens/Home/projectResult.component';
import { ActivityResultPage } from '../screens/Home/activityResult.component';
import { CompareScreen } from '../screens/Home/Compare/compare.component.js';
import { StationaryActivityResultView } from '../screens/Home/ResultsView/stationaryActivityResultView.js'
import { SMGraphResultPage } from '../screens/Home/ResultsView/stationaryGraphs.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { Navigator, Screen } = createStackNavigator();

export function HomeScreenStack(props){
  // user location
  var location = props.location

  // These are used for api calls
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  //** Compare **//
  // selected projects
  const [selectedProjects, setSelectedProjects] = useState([]);

  //** Results **//
  let allProjects = props.allProjects

  // selected project
  const [selectedProject, setSelectedProject] = useState(null);
  // selected team, associated with the project selected
  const [selectedTeam, setSelectedTeam] = useState(null);

  // selected activity result information
  const [selectedResult, setSelectedResult] = useState(null);
  const [results, setResults] =  useState([]);

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

  const addToSelectedProjects = async (project) => {
    let selectedProjectsArray = [...selectedProjects]
    selectedProjectsArray.push(project)
    await setSelectedProjects(selectedProjectsArray)
  }

  const removeFromSelectedProjects = async (project) => {
    var selectedProjectsArray = [...selectedProjects];
    var index = selectedProjectsArray.findIndex(element => element._id === project._id);
    selectedProjectsArray.splice(index, 1)
    await setSelectedProjects(selectedProjectsArray)
  }

  return (
    <Navigator headerMode='none'>
      <Screen
        name='Home'
      >
      {props =>
        <HomeScreen
          {...props}
          // general
          token={token}
          userId={userId}
          location={location}
          // compare
          selectedProjects={selectedProjects}
          addToSelectedProjects={addToSelectedProjects}
          removeFromSelectedProjects={removeFromSelectedProjects}
          // results
          allProjects={allProjects}
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
      <Screen
        name='StationaryActivityResultView'
      >
        {props =>
          <StationaryActivityResultView
            {...props}
            project={selectedProject}
            selectedResult={selectedResult}
          >
          </StationaryActivityResultView>
        }
      </Screen>
      <Screen
        name='SMGraphResultPage'
      >
        {props =>
          <SMGraphResultPage
            {...props}
            token={token}
            userId={userId}
            project={selectedProject}
            team={selectedTeam}
            result={selectedResult}
           />
        }
      </Screen>
    </Navigator>
  )
};
