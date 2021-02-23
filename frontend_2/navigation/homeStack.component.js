import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/home.component';
import { ProjectResultPage } from '../screens/Home/projectResult.component';
import { CompareScreen } from '../screens/Home/Compare/compare.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { Navigator, Screen } = createStackNavigator();

export function HomeScreenStack(props){

  var location = props.location

  const [selectedProjects, setSelectedProjects] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // These are used for api calls
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function getInfo() {
      // used for api calls
      let token = await AsyncStorage.getItem("@token");
      setToken(token);

      let id = await AsyncStorage.getItem("@id");
      setUserId(id);

      // get list of projects for all teams the user is a member of
      await setProjectList([]);
      let teamsList = await AsyncStorage.getItem('@teams');
      teamsList = JSON.parse(teamsList);
      teamsList.map((team, index) => {
        setTeamDetails(team);
      });

    }

    getInfo()
  }, []);

  const setTeamDetails = async (team) => {
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
      console.log("success: ", success);
    }

    // return team info
    if(success && teamDetails.projects !== null) {
      //let list = [...projectList];
      teamDetails.projects.map((project, index) => {
        project.description = "Team: " + teamDetails.title + "\nLocation: " + project.description;
        project.team = teamDetails;
        projectList.push(project);
      });
      await setProjectList(projectList);
      return true;
    } else {
      return false;
    }
  }

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
          projectList={projectList}
          token={token}
          userId={userId}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setSelectedTeam={setSelectedTeam}
         />
       }
      </Screen>

      <Screen
          name="CompareScreen"
      >
          {props => <CompareScreen {...props}
                      removeFromSelectedProjects={removeFromSelectedProjects}
                      selectedProjects={selectedProjects}
                      compareCount={selectedProjects.length}>
                      </CompareScreen>}
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
         />
       }
      </Screen>

    </Navigator>
  )
};
