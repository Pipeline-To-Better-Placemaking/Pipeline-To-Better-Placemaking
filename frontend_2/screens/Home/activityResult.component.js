import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBack } from '../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { getDayStr, getTimeStr } from '../components/timeStrings.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './projectResult.styles';

export function ActivityResultPage(props) {

  if (props.selectedResult === null || props.selectedResult.success === false) {
    return (
      <ViewableArea>
        <HeaderBack {...props} text={"nope"}/>
        <ContentContainer>
          <ScrollView style={styles.margins}>

            <Text category={'h5'}>No result information for this activity</Text>

          </ScrollView>
        </ContentContainer>
      </ViewableArea>
    );
  }

  let areaTitle = (props.selectedResult.sharedData.area.title === undefined ? 'Project Perimeter' : props.selectedResult.sharedData.area.title)
  let startTime = new Date(props.selectedResult.date);

  let researchers = props.selectedResult.researchers.map(user => {
    return "\n\t" + user.firstname + ' ' + user.lastname;
  });

  const viewMapResults = () => {
    props.navigation.navigate("StationaryActivityResultView");
  }

  const loadGraphResults = async () => {
    if (props.selectedResult.test_type === 'stationary') {
      await loadSMGraphData();
      props.navigation.navigate("SMGraphResultPage");
    }
  }

  async function loadSMGraphData() {
    if (props.selectedResult.data !== null && props.selectedResult.data.length >= 1 && props.selectedResult.graph === undefined) {
      let tempResult = {...props.selectedResult};
      let graph = {
        ageData: [],
        ageLabels: [],
        genderData: [],
        genderLabels: [],
        postureData: [],
        postureLabels: [],
        activityData: [],
        activityLabels: [],
      };
      let index = -1;
      let label = '';
      await props.selectedResult.data.map(dataPoint => {
        label = dataPoint.age;
        if (label !== undefined) {
          if (graph.ageLabels !== null && graph.ageLabels.length > 0) {
            index = graph.ageLabels.findIndex(element => element === label);
            // add category if it's not currently in the list
            if (index < 0) {
              index = graph.ageLabels.length;
              graph.ageLabels = [...graph.ageLabels, label];
              graph.ageData = [...graph.ageData, Number(0)];
            }
          } else { // first entry
            index = 0;
            graph.ageLabels = [label];
            graph.ageData = [Number(0)];
          }
          // increase count
          graph.ageData[index] = graph.ageData[index] + 1;
        }
        label = dataPoint.gender;
        if (label !== undefined) {
          if (graph.genderLabels !== null && graph.genderLabels.length > 0) {
            index = graph.genderLabels.findIndex(element => element === label);
            // add category if it's not currently in the list
            if (index < 0) {
              index = graph.genderLabels.length;
              graph.genderLabels = [...graph.genderLabels, label];
              graph.genderData = [...graph.genderData, Number(0)];
            }
          } else { // first entry
            index = 0;
            graph.genderLabels = [label];
            graph.genderData = [Number(0)];
          }
          // increase count
          graph.genderData[index] = graph.genderData[index] + 1;
        }
        label = dataPoint.posture;
        if (label !== undefined) {
          if (graph.postureLabels !== null && graph.postureLabels.length > 0) {
            index = graph.postureLabels.findIndex(element => element === label);
            // add category if it's not currently in the list
            if (index < 0) {
              index = graph.postureLabels.length;
              graph.postureLabels = [...graph.postureLabels, label];
              graph.postureData = [...graph.postureData, Number(0)];
            }
          } else { // first entry
            index = 0;
            graph.postureLabels = [label];
            graph.postureData = [Number(0)];
          }
          // increase count
          graph.postureData[index] = graph.postureData[index] + 1;
        }
        label = dataPoint.activity;
        if (label !== undefined) {
          if (graph.activityLabels !== null && graph.activityLabels.length > 0) {
            index = graph.activityLabels.findIndex(element => element === label);
            // add category if it's not currently in the list
            if (index < 0) {
              index = graph.activityLabels.length;
              graph.activityLabels = [...graph.activityLabels, label];
              graph.activityData = [...graph.activityData, Number(0)];
            }
          } else { // first entry
            index = 0;
            graph.activityLabels = [label];
            graph.activityData = [Number(0)];
          }
          // increase count
          graph.activityData[index] = graph.activityData[index] + 1;
        }
      });
      //console.log("resulting graph data: ", graph);
      tempResult.graph = {...graph};
      await props.setSelectedResult(tempResult);
    }

  }

  return (
    <ViewableArea>
      <HeaderBack {...props} text={(props.project.title + ": " + props.selectedResult.sharedData.title)}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Result Information</Text>
          <Divider style={{marginTop:5, marginBottom:10, borderWidth:0.5}} />

          <Text>Team: {props.team.title}</Text>
          <Text>Admin: {props.team.users[0].firstname} {props.team.users[0].lastname}</Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Location: {props.project.description}</Text>
          <Text>Area: {areaTitle}</Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Activity Type: {props.selectedResult.test_type}</Text>
          <Text>Start Time: {getTimeStr(startTime)} </Text>
          <Text>End Time: </Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Researcher(s): {researchers} </Text>

          <Divider style={{marginTop:10, marginBottom:20, borderWidth:0.5}} />

          <Button
            style={styles.margins}
            accessoryRight={MapIcon}
            onPress={viewMapResults}
          >
            View Map Results
          </Button>
          <Button
            onPress={loadGraphResults}
            style={styles.margins}
            accessoryRight={ChartIcon}
          >
            View Graphical Report
          </Button>
          <Button
            style={styles.margins}
            accessoryRight={MailIcon}
          >
            Email Me Results
          </Button>

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
};

// compass-outline
// pin-outline
const MapIcon = (props) => (
  <Icon {...props} name='compass-outline'/>
);

// file-text-outline
// pie-chart-outline
const ChartIcon = (props) => (
  <Icon {...props} name='file-text-outline'/>
);

const MailIcon = (props) => (
  <Icon {...props} name='email-outline'/>
);
