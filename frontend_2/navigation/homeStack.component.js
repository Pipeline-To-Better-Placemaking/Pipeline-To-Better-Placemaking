import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/home.component';
import { ProjectResultPage } from '../screens/Home/projectResult.component';
import { StationaryResultPage } from '../screens/Home/ResultPages/stationaryResultPage.component';
import { MovingResultPage } from '../screens/Home/ResultPages/movingResultPage.component';
import { SurveyResultPage } from '../screens/Home/ResultPages/surveyResultPage.component';
import { CompareFilteredView } from '../screens/Home/Compare/compareFilteredView.component.js'
import { StationaryCompare } from '../screens/Home/Compare/stationaryCompare.component.js'
import { MovingCompare } from '../screens/Home/Compare/movingCompare.component.js'
import { StationaryActivityResultView } from '../screens/Home/ResultPages/stationaryMapResults.component.js'
import { MovingMapResultsView } from '../screens/Home/ResultPages/movingMapResultsView.component.js';
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
  const [compareResults, setCompareResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState([]);

  //** Results **//
  let allProjects = props.allProjects
  const setAllProjects = async (projects) => {
    await props.setAllProjects(projects);
  }

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
          setAllProjects={setAllProjects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setSelectedTeam={setSelectedTeam}
          results={results}
          setResults={setResults}
          setFilterCriteria={setFilterCriteria}
         />
       }
      </Screen>
      <Screen
        name="CompareFilteredView"
      >
      {props =>
        <CompareFilteredView
          {...props}
          filterCriteria={filterCriteria}
          compareResults={compareResults}
          setCompareResults={setCompareResults}
          token={token}
        >
        </CompareFilteredView>
      }
      </Screen>
      <Screen
        name="StationaryCompare"
      >
      {props =>
        <StationaryCompare
          {...props}
          results={compareResults}
        />
      }
      </Screen>
      <Screen
        name="MovingCompare"
      >
      {props =>
        <MovingCompare
          {...props}
          results={compareResults}
        />
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
          setResults={setResults}
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
          setResults={setResults}
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
          setResults={setResults}
         />
       }
      </Screen>
      <Screen
        name='SurveyResultPage'
      >
      {props =>
        <SurveyResultPage
          {...props}
          token={token}
          userId={userId}
          project={selectedProject}
          team={selectedTeam}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
          setResults={setResults}
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
        name='MovingMapResultsView'
      >
        {props =>
        <MovingMapResultsView
          {...props}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
         />
       }

      </Screen>
    </Navigator>
  )
};
