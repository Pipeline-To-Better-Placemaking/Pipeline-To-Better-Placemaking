import React, { useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { Divider, Text, Button, List, ListItem } from '@ui-kitten/components';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { DummyResult } from '../components/dummyResult.component.js';
import { HomeMapView } from '../components/Maps/home.map.component.js';
import { getProject, getAllUserProjects, getAllResults } from '../components/apiCalls';

import { styles } from './home.styles';

export const HomeScreen = ( props ) => {

  let location = props.location
  const [compare, setCompare] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshDetails();
    setRefreshing(false);
  }, []);

  const refreshDetails = async () => {
    let projectList = await getAllUserProjects();
    await props.setAllProjects(projectList);
  };

  const onComparePress = () => {
    setCompare(!compare)
  }

  const onCompareConfirm = async () => {
    let projects = []
    let allResults = []
    let stationaryResults = []
    let movingResults = []
    let surveyResults = []
    let soundResults = []
    let boundaryResults = []
    let natureResults = []
    let lightResults = []
    let orderResults = []

    //add the new test result arrays here ^

    // Get selected Projects
    for (let i = 0; i < props.selectedProjects.length; i++) {
      let project = await getProject(props.selectedProjects[i]);
      if (project !== null) {
        projects.push(project)
      }
    }

    // get the results for each project
    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];
      let tempList = await getAllResults(project);
      for (let j = 0; tempList !== null && j < tempList.length; j++) {
        let result = tempList[j];
        allResults.push(result);
        if (result.test_type === "stationary") {
          stationaryResults.push(result);
        } else if (result.test_type === "moving") {
          movingResults.push(result);
        } else if (result.test_type === "survey") {
          surveyResults.push(result);
        } else if (result.test_type === "sound"){
          soundResults.push(result);
        } else if (result.test_type === "boundary"){
          boundaryResults.push(result);
        } else if (result.test_type === "nature"){
          natureResults.push(result);
        } else if (result.test_type === "light"){
          lightResults.push(result);
        } else if (result.test_type === "order"){
          orderResults.push(result);
        }
        //add the new tests here ^^

      }
    }

    let filteredResults = {
      all: [...allResults],
      stationary: [...stationaryResults],
      moving: [...movingResults],
      survey: [...surveyResults],
      sound: [...soundResults],
      boundary: [...boundaryResults],
      nature: [...natureResults],
      light: [...lightResults],
      order: [...orderResults]
      //add the new tests here ^^
    };

    await props.setFilterCriteria(filteredResults);

    props.navigation.navigate("CompareFilteredView");
  }

  const inSelectedProject = (project) => {
    return props.selectedProjects.includes(project);
  }

  const openResultPage = async(item) => {
    let project = await getProject(item);
    if (project !== null) {
      await props.setSelectedProject(project);
      await props.setSelectedTeam(project.team);
      let results = await getAllResults(project); // sets to empty list if no results
      await props.setResults(results);
      // open results page
      props.navigation.navigate('ProjectResultPage');
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
            style={styles.confirmCompareButton}
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

        <View style={styles.mapSpace}>
          <HomeMapView location={location}/>
        </View>

        <View style={styles.resultTextView}>

          <View>
            <Text style={styles.resultText}> Results </Text>
          </View>

          <CompareBar />
        </View>

        <View style={styles.resultLine} />

        <View style={styles.listView}>
          <List
            data={props.allProjects}
            ItemSeparatorComponent={Divider}
            renderItem={resultItem}
            style={styles.listElements}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </View>

      </ContentContainer>
  </ViewableArea>
  );
}