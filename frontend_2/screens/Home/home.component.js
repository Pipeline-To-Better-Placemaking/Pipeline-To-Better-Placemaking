import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button, List, ListItem } from '@ui-kitten/components';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { DummyResult } from '../components/dummyResult.component.js';
import { HomeMapView } from '../components/Maps/home.map.component.js';
import { getDayStr, getTimeStr } from '../components/timeStrings.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './home.styles';

export const HomeScreen = ( props ) => {

  const [compare, setCompare] = useState(false)

  var location = props.location

  const onComparePress = () => {
    setCompare(!compare)
  }

  const onCompareConfirm = async () => {
    let projects = []
    let results = []

    // Get selected Projects
    for (let i = 0; i < props.selectedProjects.length; i++) {
      let id = props.selectedProjects[i]._id
      let project = null
      try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + id, {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + props.token
              }
          })
          project = await response.json();
      } catch (error) {
          console.log("error", error)
      }
      if (project !== null) {
        project.teamName = props.selectedProjects[i].teamName;
        projects.push(project)
      }
    }

    // get the results for each project
    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];
      results = await getStationaryResults(project, results);
      results = await getMovingResults(project, results);
      results = await getSurveyResults(project, results);
    }

    await props.setFilterCriteria(results)

    props.navigation.navigate("CompareFilteredView");
  }

  const inSelectedProject = (project) => {
    return props.selectedProjects.includes(project);
  }

  const openResultPage = async(item) => {
    let success = false
    let projectDetails = null
    // Get the Project information
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + item._id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        projectDetails = await response.json();
        success = true
    } catch (error) {
        console.log("error", error)
    }

    // if successfully retrieved project info, Update
    if(success) {
      console.log("Selected Project: ", projectDetails);
      // set selected project page information
      await props.setSelectedProject(projectDetails);
      await getTeam(item.teamId);
      projectDetails.teamName = item.teamName;

      // get the results for the project
      let results = []
      results = await getStationaryResults(projectDetails, results);
      results = await getMovingResults(projectDetails, results);
      results = await getSurveyResults(projectDetails, results);
      await props.setResults(results);
      // open results page
      props.navigation.navigate('ProjectResultPage');
    }
  }

  const getTeam = async(id) => {
    let success = false
    let teamDetails = null
    // Get the team information
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/teams/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
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
    if(success) {
      await props.setSelectedTeam(teamDetails);
    }
  }

  const getStationaryResults = async(projectDetails, results) => {
    // loop through all Stationary collections and get all of the maps
    for (let i = 0; i < projectDetails.stationaryCollections.length; i++) {
      let collection = projectDetails.stationaryCollections[i];
      for (let j=0; collection.maps !== null && j < collection.maps.length; j++) {
        // help info
        let mapId = collection.maps[j];
        let day = new Date(collection.date);
        // temp obj if resultInfo is null
        let tempObj = {
          title: collection.title,
          sharedData: {},
          date: day,
          _id: mapId,
          success: false,
        }
        let resultInfo = await getResultInfo(mapId, 'stationary_maps/');
        if (resultInfo !== null) {
          resultInfo.date = new Date(resultInfo.date);
          resultInfo.success = true;
          tempObj = resultInfo;
        }
        // add some helpful information
        tempObj.test_type = "stationary";
        tempObj.sharedData.date = day;
        tempObj.sharedData.projectName = projectDetails.title;
        tempObj.sharedData.location = projectDetails.description;
        tempObj.sharedData.teamName = projectDetails.teamName;
        results.push(tempObj);
      }
    }
    return results;
  }

  const getMovingResults = async(projectDetails, results) => {
    // loop through all People Moving collections and get all of the maps
    for (let i = 0; i < projectDetails.movingCollections.length; i++) {
      let collection = projectDetails.movingCollections[i];
      for (let j=0; collection.maps !== null && j < collection.maps.length; j++) {
        // help info
        let mapId = collection.maps[j];
        let day = new Date(collection.date);
        // temp obj if resultInfo is null
        let tempObj = {
          title: collection.title,
          sharedData: {},
          date: day,
          _id: mapId,
          success: false,
        }
        let resultInfo = await getResultInfo(mapId, 'moving_maps/');
        if (resultInfo !== null) {
          resultInfo.date = new Date(resultInfo.date);
          resultInfo.success = true;
          tempObj = resultInfo;
        }
        // add some helpful information
        tempObj.test_type = "moving";
        tempObj.sharedData.date = day;
        tempObj.sharedData.projectName = projectDetails.title;
        tempObj.sharedData.location = projectDetails.description;
        tempObj.sharedData.teamName = projectDetails.teamName;
        results.push(tempObj);
      }
    }
    return results;
  }

  const getSurveyResults = async(projectDetails, results) => {
    // loop through all survey collections and get all of the surveys
    for (let i = 0; i < projectDetails.surveyCollections.length; i++) {
      let collection = projectDetails.surveyCollections[i];
      for (let j=0; collection.surveys !== null && j < collection.surveys.length; j++) {
        // help info
        let surveyId = collection.surveys[j];
        let day = new Date(collection.date);
        // temp obj if resultInfo is null
        let tempObj = {
          title: collection.title,
          sharedData: {},
          date: day,
          _id: surveyId,
          success: false,
        }
        let resultInfo = await getResultInfo(surveyId, 'surveys/');
        if (resultInfo !== null) {
          resultInfo.date = new Date(resultInfo.date);
          resultInfo.success = true;
          tempObj = resultInfo;
        }
        // add some helpful information
        tempObj.test_type = "survey";
        tempObj.sharedData.date = day;
        tempObj.sharedData.projectName = projectDetails.title;
        tempObj.sharedData.location = projectDetails.description;
        tempObj.sharedData.teamName = projectDetails.teamName;
        results.push(tempObj);
      }
    }
    return results;
  }

  const getResultInfo = async (resultId, routePath) => {
    let success = false
    let res = null
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/' + routePath + resultId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        res = await response.json();
        success = true
    } catch (error) {
        console.log("error getting result information\n", error)
    }
    if(success) {
      return res;
    } else {
      return null;
    }
  }

  const resultItem = ({ item, index }) => (
    <ListItem
      onPress={() => openResultPage(item)}
    >
      <DummyResult
        {...props}
        key={index}
        inList={inSelectedProject}
        compare={compare}
        project={item}
      />
    </ListItem>
  );

  const CompareBar = () => {
    if (compare) {
      return (
        <View style={styles.resultCompareButtonView}>
          <Button
            style={{marginRight:10}}
            disabled={false}
            appearance={'outline'}
            onPress={onCompareConfirm}
          >
            Confirm Compare
          </Button>
          <Button status='danger' appearance='outline' onPress={onComparePress}>
              Cancel
          </Button>
        </View>
      );

    } else {
      return (
        <View style={styles.resultCompareButtonView}>
          <Button status='primary' appearance='outline' onPress={onComparePress}>
              Compare
          </Button>
        </View>
      );
    }
  }

  return (
    <ViewableArea>
      <Header text={'Home Page'}/>
      <ContentContainer>

        <View style={{height:'35%'}}>
          <HomeMapView location={location}/>
        </View>

        <View style={styles.resultTextView}>

          <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
            <Text style={styles.resultText}> Results </Text>
          </View>

          <CompareBar />
        </View>

        <View style={styles.resultLine} />

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'55%', marginTop:15}}>
          <List
            data={props.allProjects}
            ItemSeparatorComponent={Divider}
            renderItem={resultItem}
          />
        </View>

      </ContentContainer>
  </ViewableArea>
  );
};
