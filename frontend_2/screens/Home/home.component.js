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
    let result = null

    // Get Projects and put them in list called timeCards
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
        projects.push(project)
      }
    }

    // For each project get the result data from the collections
    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];
      // Stationary Collections
      if (project.stationaryCollections !== null) {
        for (let j = 0; j < project.stationaryCollections.length; j++) {
          let collection = project.stationaryCollections[j];
          if (collection.maps === undefined || collection.maps.length <= 0) {
            continue;
          }
          // For each (map) result
          for (let k = 0; k < collection.maps.length; k++) {
            let id = collection.maps[k];
            try {
              const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/' + id, {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + props.token
                  }
              })
              result = await response.json();
            } catch (error) {
              console.log("error", error)
            }

            if (result != null) {
              result.test_type = 'stationary';
              result.date = new Date(result.date);
              result.sharedData.date = new Date(collection.date);
              result.sharedData.projectName = collection.title;
              result.sharedData.location = project.description;

              let res = {
                result: result,
                testType: "Stationary Activity Map"
              }

              results.push(res)
            }
          } // end loop stationary results
        } // end loop stationary collections
      } // end if stationary collections !== null

      // Moving Collections
      if (project.movingCollections !== null) {
        for (let j = 0; j < project.movingCollections.length; j++) {
          let collection = project.movingCollections[j];
          if (collection.maps === undefined || collection.maps.length <= 0) {
            continue;
          }
          // For each (map) result
          for (let k = 0; k < collection.maps.length; k++) {
            let id = collection.maps[k];
            try {
              const response = await fetch('https://measuringplacesd.herokuapp.com/api/moving_maps/' + id, {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + props.token
                  }
              })
              result = await response.json();
            } catch (error) {
              console.log("error", error)
            }

            if (result != null) {
              result.test_type = 'moving';
              result.date = new Date(result.date);
              result.sharedData.date = new Date(collection.date);
              result.sharedData.projectName = collection.title;
              result.sharedData.location = project.description;

              let res = {
                result: result,
                testType: "People Moving"
              }

              results.push(res)
            }
          } // end loop moving results
        } // end loop moving collections
      } // end if moving collections !== null

      // Survey Collections
      if (project.surveyCollections !== null) {
        for (let j = 0; j < project.surveyCollections.length; j++) {
          let collection = project.surveyCollections[j];
          if (collection.surveys === undefined || collection.surveys.length <= 0) {
            continue;
          }
          // For each (survey) result
          for (let k = 0; k < collection.surveys.length; k++) {
            let id = collection.surveys[k];
            try {
              const response = await fetch('https://measuringplacesd.herokuapp.com/api/surveys/' + id, {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + props.token
                  }
              })
              result = await response.json();
            } catch (error) {
              console.log("error", error)
            }

            if (result != null) {
              result.test_type = 'survey';
              result.date = new Date(result.date);
              result.sharedData.date = new Date(collection.date);
              result.sharedData.projectName = collection.title;
              result.sharedData.location = project.description;

              let res = {
                result: result,
                testType: "Survey"
              }

              results.push(res)
            }
          } // end loop survey results
        } // end loop survey collections
      } // end if survey collections !== null

    } // end loop selected projects

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
      props.setSelectedProject(projectDetails);
      await getTeam(item.teamId);

      // get the SM results for the project
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
      props.setSelectedTeam(teamDetails);
    }
  }

  const getStationaryResults = async(projectDetails, results) => {
    // loop through all Stationary collections and get all of the maps
    for (let i = 0; i < projectDetails.stationaryCollections.length; i++) {
      let collection = projectDetails.stationaryCollections[i];
      for (let j=0; collection.maps !== null && j < collection.maps.length; j++) {
        let mapId = collection.maps[j];
        let day = new Date(collection.date)
        let time = day;
        let resultInfo = await getResultInfo(mapId, 'stationary_maps/');
        if (resultInfo !== null) {
          time = new Date(resultInfo.date); // start time
        }
        let tempObj = {
          title: collection.title,
          day: day,
          date: time,
          test_type: "stationary",
          _id: mapId
        }
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
        let mapId = collection.maps[j];
        let day = new Date(collection.date);
        let time = day;
        let resultInfo = await getResultInfo(mapId, 'moving_maps/');
        if (resultInfo !== null) {
          time = new Date(resultInfo.date); // start time
        }
        let tempObj = {
          title: collection.title,
          day: day,
          date: time,
          test_type: "moving",
          _id: mapId
        }
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
        let surveyId = collection.surveys[j];
        let day = new Date(collection.date);
        let time = day;
        let resultInfo = await getResultInfo(surveyId, 'surveys/');
        if (resultInfo !== null) {
          time = new Date(resultInfo.date); // start time
        }
        let tempObj = {
          title: collection.title,
          day: day,
          date: time,
          test_type: "survey",
          _id: surveyId,
        }
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
        addToSelectedProjects={props.addToSelectedProjects}
        removeFromSelectedProjects={props.removeFromSelectedProjects}
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
