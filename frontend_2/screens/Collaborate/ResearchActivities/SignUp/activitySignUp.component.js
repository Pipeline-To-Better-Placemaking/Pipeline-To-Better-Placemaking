import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../../../components/headers.component';
import { MapViewPoints } from '../../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './activitySignUp.styles';

export function ActivitySignUpPage(props) {

  const activityList = ["Stationary Map", "People Count", "Survey"]

  const onBeginPress = async (index) => {

    // console.log("Activity Props: " + JSON.stringify(props.activity))

    if (props.activity.activity == activityList[0]) {

      // console.log("Activity Props: " + JSON.stringify(props.activity))d
      // console.log("Area: " + props.activity.area)
      // console.log("Standing points: " + props.activity.standingPoints)

      // console.log("Time slot: " + JSON.stringify(item));

      await AsyncStorage.setItem("@time", props.activity.timeSlots[index].duration)

      // get the list of points for each index

      let activityDetails = {
        location: props.activity.area[0],
        area: props.activity.area,
        markers: getPointsLocations(props.activity.timeSlots[index]),
      }
      // console.log("Index: " + index)
      // console.log("Activity Details: " + JSON.stringify(activityDetails))

      console.log("Activity markers: " + JSON.stringify(activityDetails.markers))

      props.navigation.navigate("StationaryActivity",
          {
              activityDetails: activityDetails,
              position: activityDetails.markers
          }
      )
    }
    else if (props.activity.activity == activityList[1]){

    }
    else if (props.activity.activity == activityList[2]){

    }
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
    timeSlot.assignedPointIndicies.map(index => {
      tempPoints.push("Point " + (index.row + 1));
    });
    return tempPoints.join(', ');
  }

  const timeSlotCard = ({item, index}) => (
    <Card disabled={true}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flexDirection:'column'}}>
          <Text>Start Time {item.timeString}</Text>
          <Text>Time Limit: {item.duration} (min)</Text>
          <Text>Standing Points: {getPointsString(item)}</Text>
          <Text>Number of Researchers: {item.numResearchers}</Text>
        </View>
        <View style={{flexDirection:'column', justifyContent:'space-around'}}>
          <Button status='info' style={{margin:5}}>
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
      <Header text={props.activity.title}/>
      <ContentContainer>
        <View style={{height:'40%'}}>
          <MapViewPoints
            location={props.activity.area[0]}
            area={props.activity.area}
            markers={props.activity.standingPoints}
          />
        </View>
        <View style={{margin:15}}>
          <Text category='s1'>{props.activity.activity} Activity</Text>
          <Text category='s1'>Day: {props.activity.date.toLocaleDateString()}</Text>
        </View>
        <List
          style={{maxHeight:400}}
          data={props.activity.timeSlots}
          ItemSeparatorComponent={Divider}
          renderItem={timeSlotCard}
        />
      </ContentContainer>
    </ViewableArea>
  );
};
