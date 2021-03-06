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
    </ViewableArea>);
  }

  let areaTitle = (props.selectedResult.sharedData.area.title === undefined ? 'Project Perimeter' : props.selectedResult.sharedData.area.title)
  let startTime = new Date(props.selectedResult.date);

  let researchers = props.selectedResult.researchers.map(user => {
    return "\n\t" + user.firstname + ' ' + user.lastname;
  });

  const viewMapResults = () => {
    console.log("Selected result: " + JSON.stringify(props.selectedResult))

    props.navigation.navigate("StationaryActivityResultView");
  }

  return (
    <ViewableArea>
      <HeaderBack {...props} text={props.project.title}/>
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
