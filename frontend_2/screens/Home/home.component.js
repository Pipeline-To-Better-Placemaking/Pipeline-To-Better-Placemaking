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

  const onCompareConfirm = () => {
      //console.log("Props: " + JSON.stringify(props));
      props.navigation.navigate("CompareScreen");
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
      console.log("Project: ", projectDetails);
      // set selected project page information
      props.setSelectedProject(projectDetails);
      props.setSelectedTeam(item.team);

      // get the SM results for the project
      getSMResults(projectDetails, []);

      // open results page
      props.navigation.navigate('ProjectResultPage');
    }
  }

  const getSMResults = async(projectDetails, results) => {
    // loop through all SM collections ad get all of the maps
    for (let i = 0; i < projectDetails.stationaryCollections.length; i++) {
      let collection = projectDetails.stationaryCollections[i];
      if (collection.maps !== null) {
        collection.maps.map(mapId => {
          // not really sure what we'll need here to display for the list
          // we could add the area
          let day = new Date(collection.date)
          let tempObj = {
            title: getDayStr(day) + ' ' + collection.title,
            day: collection.date,
            test_type: "stationary",
            _id: mapId
          }
          results.push(tempObj);
        });
      }
    }

    await props.setResults(results);
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
