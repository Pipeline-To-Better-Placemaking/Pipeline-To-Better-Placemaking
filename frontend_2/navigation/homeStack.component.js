import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/home.component';
import { ProjectResultPage } from '../screens/Home/projectResult.component';
import { StationaryResultPage } from '../screens/Home/ResultPages/stationaryResultPage.component';
import { MovingResultPage } from '../screens/Home/ResultPages/movingResultPage.component';
import { CompareScreen } from '../screens/Home/Compare/compare.component.js';
import { CompareFilteredView } from '../screens/Home/Compare/compareFilteredView.component.js'
import { StationaryActivityResultView } from '../screens/Home/ResultPages/stationaryMapResults.component.js'
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
  const [compareResults, setCompareResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState([])

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
          results={results}
          selectedProjects={selectedProjects}
          setCompareResults={setCompareResults}
          setFilterCriteria={setFilterCriteria}
          compareCount={selectedProjects.length}
          token={token}
        >
        </CompareScreen>
      }
      </Screen>
      <Screen
        name="CompareFilteredView"
      >
      {props =>
        <CompareFilteredView
          {...props}
          results={compareResults}
          filterCriteria={filterCriteria}
        >
        </CompareFilteredView>
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
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
         />
       }
      </Screen>
      <Screen
        name='StationaryResultPage'
      >
      {props =>
        <StationaryResultPage
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
        name='MovingResultPage'
      >
      {props =>
        <MovingResultPage
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
    </Navigator>
  )
};
