import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { HeaderBack } from '../../../components/headers.component';
import { MapAreaWrapper, ShowArea, ShowMarkers } from '../../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './activitySignUp.styles';

export function ActivitySignUpPage(props) {

  const activityList = ["stationary", "People Count", "Survey"]

  const onBeginPress = async (index) => {

    if (props.activity.test_type == activityList[0]) {

      let activityDetails = {
        location: props.activity.area.points[0],
        area: props.activity.area.points,
        position: props.activity.standingPoints,
        time: props.activity.duration,
        timeLeft:props.activity.duration
      }

      let initialActivityDetails = {
        location: props.activity.area.points[0],
        area: props.activity.area.points,
        position: props.activity.standingPoints,
        time: props.activity.duration,
        timeLeft:props.activity.duration
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(initialActivityDetails);

      props.navigation.navigate("StationaryActivity")
    }
    else if (props.activity.test_type == activityList[1]){

    }
    else if (props.activity.test_type == activityList[2]){

      let activityDetails = {...props.activity};
      activityDetails.location = props.activity.area[0];
      activityDetails.time = (parseInt(props.activity.timeSlots[index].duration)* 60);
      activityDetails.timeLeft = (parseInt(props.activity.timeSlots[index].duration)* 60);

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(activityDetails);
      
      props.navigation.navigate("SurveyActivity")
    }
  }

  const onSignUp = async (timeSlot, index) => {
    /*let tempActivity = {...props.activity};
    let tempTimeSlots = [...props.activity.timeSlots];
    let tempSlot = {...timeSlot};
    let tempResearchers = [...timeSlot.researchers];
    let max = timeSlot.numResearchers;
    let len = timeSlot.researchers.length;

    if(max > 0 && (max-len) > 0 ) {
      //TODO: update the Activity to sign user up for time slot

      // add user locally
      tempResearchers.push(props.username);
      // this feels like nonsense lol but it works
      tempSlot.researchers = tempResearchers;
      tempTimeSlots[index] = tempSlot;
      tempActivity.timeSlots = tempTimeSlots;
      props.setActivity(tempActivity);
    }*/

  }

  const getPointsLocations = (timeSlot) => {
    let tempPoints = [];
    timeSlot.assignedPointIndicies.map(index => {
      tempPoints.push(props.activity.standingPoints[index.row]);
    });
    return tempPoints;
  }

  const getPointsString = (timeSlot) => {

    let tempPoints = [];
    timeSlot.standingPoints.map((point, index) => {
      tempPoints.push(point.title);
    });
    return tempPoints.join(', ');
  }

  const getName = (timeSlot, index) => {
    if(timeSlot.researchers !== null && timeSlot.researchers.length > index) {
      return timeSlot.researchers[index];
    } else {
      return " ...";
    }
  }

  const getResearchers = (timeSlot) => {
    if(timeSlot.maxResearchers <= 0){
      return "    none";
    }
    let names = [];
    for (let i = 0; i < timeSlot.maxResearchers; i++) {
      names.push("    " + (i+1) + ". " + getName(timeSlot, i));
    }
    let str = names.join('\n');
    return str;
  }

  const timeSlotCard = ({item, index}) => (
    <Card disabled={true}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flexDirection:'column'}}>
          <Text>Start Time </Text>
          <Text>{(props.activity.test_type === 'Survey' ? "Time at Site:" : "Time per Standing Point:")} {item.duration} (min)</Text>
          {(props.activity.test_type === 'Survey' ? null : <Text>Standing Points: {'\n\t' + getPointsString(item)}</Text>)}
          <Text>Researchers:</Text>
          <Text>{getResearchers(item)}</Text>
        </View>
        <View style={{flexDirection:'column', justifyContent:'space-around'}}>
          <Button status='info' style={{margin:5}} onPress={() => onSignUp(item, index)}>
            Sign Up
          </Button>
          <Button status='success' style={{margin:5}} onPress={() => onBeginPress(index)}>
            Begin
          </Button>
        </View>
      </View>
    </Card>
  );

  return (
    <ViewableArea>
      <HeaderBack {...props} text={props.activity.title}/>
      <ContentContainer>
        <View style={{height:'40%'}}>
          <MapAreaWrapper area={props.activity.area.points} mapHeight={'100%'}>
            <ShowArea area={props.activity.area.points} />
            {(props.activity.test_type === 'Survey' ? null : <ShowMarkers markers={props.activity.standingPoints} />)}
          </MapAreaWrapper>
        </View>
        <View style={{margin:15}}>
          <Text category='s1'>Activity: {props.activity.test_type}</Text>
          <Text category='s1'>Day: {props.activity.date}</Text>
        </View>
        <List
          style={{maxHeight:400}}
          data={[props.activity]}
          ItemSeparatorComponent={Divider}
          renderItem={timeSlotCard}
        />
      </ContentContainer>
    </ViewableArea>
  );
};
