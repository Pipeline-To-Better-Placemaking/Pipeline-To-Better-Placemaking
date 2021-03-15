import React from 'react';
import { View } from 'react-native';
import { Text, Button, Divider, List, Card } from '@ui-kitten/components';
import { HeaderBack } from '../../../components/headers.component';
import { MapAreaWrapper, ShowArea, ShowMarkers } from '../../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { getDayStr, getTimeStr } from '../../../components/timeStrings.component';

export function ActivitySignUpPage(props) {

  // Constant array of activities
  const activityList = ["stationary", "moving", "survey"]

  const onBeginPress = async (timeSlot, index) => {

    if (props.activity.test_type == activityList[0]) {

      //console.log("Activity: " + JSON.stringify(props.activity))
      console.log("timeSlot: ", timeSlot);

      let activityDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: timeSlot.standingPoints,
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(activityDetails);

      props.navigation.navigate("StationaryActivity")
    }
    else if (props.activity.test_type == activityList[1]){
      let activityDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: timeSlot.standingPoints,
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(activityDetails);

      props.navigation.navigate("PeopleMovingActivity")
    }
    else if (props.activity.test_type == activityList[2]){

      let activityDetails = {...props.activity};
      activityDetails.location = props.activity.area[0];
      activityDetails.time = props.activity.duration*60;
      activityDetails.timeLeft = props.activity.duration*60;

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(activityDetails);

      props.navigation.navigate("SurveyActivity")
    }
  }

  const onSignUp = async (timeSlot, index) => {
    let tempTimeSlots = [...props.timeSlots];

    let tempSlot = {...timeSlot};
    let tempResearchers = [...timeSlot.researchers];
    let max = timeSlot.maxResearchers;
    let len = timeSlot.researchers.length;
    let route = '';

    if (props.activity.test_type === activityList[0]) {
      route = 'stationary_maps/';
    } else if (props.activity.test_type === activityList[1]) {
      route = 'moving_maps/';
    } else if (props.activity.test_type === activityList[2]) {
      route = ''; // survey_codes
    }

    // if the researcher is already signed up and they press the button again, unsign them up
    let findIndex = tempResearchers.findIndex(element => element._id === props.userId)
    if (findIndex >= 0) {
      max = -1; // don't add the user
      removeUser(timeSlot, route);
      tempResearchers.splice(findIndex, 1);
      tempSlot.researchers = tempResearchers;
      tempTimeSlots[index] = tempSlot;
      props.setTimeSlots(tempTimeSlots);
    }

    // if there's space to add another researcher
    if(max > 0 && (max-len) > 0) {
      let success = false
      success = signUpTimeSlot(timeSlot, route);

      if (success) {
        // add user locally
        tempResearchers.push({
            _id:props.userId,
            firstname:props.firstname,
            lastname:props.lastname
          });
        tempSlot.researchers = tempResearchers;
        tempTimeSlots[index] = tempSlot;
        props.setTimeSlots(tempTimeSlots);
      }
    }

  }

  const signUpTimeSlot = async (timeSlot, route) => {
    let success = false
    let res = null
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/' + route + timeSlot._id + '/claim', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        res = await response.json()
        //console.log("sign up user response:", res)
        success = true
    } catch (error) {
        console.log("ERROR: ", error)
        success = false
    }

    return success;
  }

  const removeUser = async (timeSlot, route) => {
    let success = false
    let res = null
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/'+ route + timeSlot._id + '/claim', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        res = await response.json()
        //console.log("remove user response:", res)
        success = true
    } catch (error) {
        console.log("ERROR: ", error)
        success = false
    }

    return success;
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
      return timeSlot.researchers[index].firstname + " " + timeSlot.researchers[index].lastname;
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
          <Text>Start Time: {getTimeStr(item.date)}</Text>
          {(props.activity.test_type === activityList[2] ? null : <Text>Standing Points: {'\n\t' + getPointsString(item)}</Text>)}
          <Text>Researchers:</Text>
          <Text>{getResearchers(item)}</Text>
        </View>
        <View style={{flexDirection:'column', justifyContent:'space-around'}}>
          <Button status='info' style={{margin:5}} onPress={() => onSignUp(item, index)}>
            Sign Up
          </Button>
          <Button status='success' style={{margin:5}} onPress={() => onBeginPress(item, index)}>
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
            {(props.activity.test_type === activityList[2] ? null : <ShowMarkers markers={props.project.standingPoints} />)}
          </MapAreaWrapper>
        </View>
        <View style={{margin:15}}>
          <Text category='s1'>Activity: {props.activity.test_type}</Text>
          <Text category='s1'>Day: {getDayStr(props.activity.date)}</Text>
          <Text>{(props.activity.test_type === activityList[2] ? "Time at Site:" : "Time per Standing Point:")} {props.activity.duration} (min)</Text>
        </View>
        <View style={{height:'50%'}}>
          <List
            style={{maxHeight:'100%'}}
            data={props.timeSlots}
            ItemSeparatorComponent={Divider}
            renderItem={timeSlotCard}
          />
        </View>
      </ContentContainer>
    </ViewableArea>
  );
};
