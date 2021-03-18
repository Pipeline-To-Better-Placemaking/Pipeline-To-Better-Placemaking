import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBack } from '../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { getDayStr, getTimeStr } from '../components/timeStrings.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './projectResult.styles';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export function ProjectResultPage(props) {

  const openActivityPage = async (item) => {
    if (item.test_type === 'stationary') {
      await getStationaryResults(item);
    } else if (item.test_type === 'moving') {
      await getMovingResults(item);
    } else if (item.test_type === 'survey') {

    }
  };

  const getStationaryResults = async (item) => {
    let success = false
    let result = null

    console.log("Getting stationary results")

    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/' + item._id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        result = await response.json();
        success = true
    } catch (error) {
        console.log("error", error)
    }
    if (result === null) {
      success = false;
    }

    if(success) {
      console.log("Selected result: ", result);
      result.sharedData.date = item.day;
      await props.setSelectedResult(result);
      await formatStationaryGraphData(result);
      // open results page
      props.navigation.navigate("StationaryResultPage");
    }
  };

  const getMovingResults = async (item) => {
    let success = false
    let result = null
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/moving_maps/' + item._id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        result = await response.json();
        success = true
    } catch (error) {
        console.log("error", error)
    }
    if (result === null) {
      success = false;
    }

    if(success) {
      console.log("Selected result: ", result);
      result.sharedData.date = item.day;
      await props.setSelectedResult(result);
      await formatMovingGraphData(result);
      // open results page
      props.navigation.navigate("MovingResultPage");
    }
  };

  async function formatStationaryGraphData(result) {
    if (result.data !== null && result.data.length >= 1 && result.graph === undefined) {
      let tempResult = {...result};
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
      await result.data.map(dataPoint => {
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

  async function formatMovingGraphData(result) {
    if (result.data !== null && result.data.length >= 1 && result.graph === undefined) {
      let tempResult = {...result};
      let graph = {
        data: [],
        labels: [],
      };
      let index = -1;
      let label = '';
      await result.data.map(dataPoint => {
        label = dataPoint.mode;
        if (label !== undefined) {
          if (graph.labels !== null && graph.labels.length > 0) {
            index = graph.labels.findIndex(element => element === label);
            // add category if it's not currently in the list
            if (index < 0) {
              index = graph.labels.length;
              graph.labels = [...graph.labels, label];
              graph.data = [...graph.data, Number(0)];
            }
          } else { // first entry
            index = 0;
            graph.labels = [label];
            graph.data = [Number(0)];
          }
          // increase count
          graph.data[index] = graph.data[index] + 1;
        }
      });
      //console.log("resulting graph data: ", graph);
      tempResult.graph = {...graph};
      await props.setSelectedResult(tempResult);
    }
  }

  const emailResults = async () => {
    let success = false
    let result = null

    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id + '/stationary_data', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        result = await response.json();
        success = true
    } catch (error) {
        console.log("error", error)
    }
  }

  const activityItem = ({ item, index }) => (
      <ListItem
        title={
          <Text style={{fontSize:20}}>
              {`${item.title}`}
          </Text>
        }
        description={getTimeStr(item.date) + ' - ' + getDayStr(item.day) + ' - ' + item.test_type}
        accessoryRight={ForwardIcon}
        onPress={() => openActivityPage(item)}
      />
  );

  return (
    <ViewableArea>
      <HeaderBack {...props} text={props.project.title}/>
      <ContentContainer>

        <View style={{height:'35%'}}>
          <MapAreaWrapper area={props.project.subareas[0].points} mapHeight={'100%'}>
            <ShowArea area={props.project.subareas[0].points} />
          </MapAreaWrapper>
        </View>

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text>Location: {props.project.description}</Text>
                <Text>Admin: {props.team.users[0].firstname} {props.team.users[0].lastname}</Text>
            </View>
        </View>

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}>Research Results</Text>
            </View>
            <Button
              size={'small'}
              style={{marginRight:10}}
              status={'info'}
              appearance={'outline'}
              accessoryRight={MailIcon}
              onPress={emailResults}
            >
              Email Me Results
            </Button>
        </View>
        <Divider style={{marginTop: 5}} />

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'50%', marginTop:15}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%'}}
            data={props.results}
            ItemSeparatorComponent={Divider}
            renderItem={activityItem}
          />
        </View>

      </ContentContainer>
    </ViewableArea>
  );
};

const MailIcon = (props) => (
  <Icon {...props} name='email-outline'/>
);
