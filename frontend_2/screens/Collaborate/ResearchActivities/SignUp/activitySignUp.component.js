import React from 'react';
import { View } from 'react-native';
import { Text, Button, Divider, List, Card } from '@ui-kitten/components';
import { HeaderBack } from '../../../components/headers.component';
import { MapAreaWrapper, ShowArea, ShowMarkers } from '../../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../../components/content.component';

export function ActivitySignUpPage(props) {

  // Constant array of activities
  const activityList = ["stationary", "People Moving", "Survey"]

  const onBeginPress = async (timeSlot, index) => {

    if (props.activity.test_type == activityList[0]) {

      let activityDetails = {
        location: props.activity.area.points[0],
        area: props.activity.area.points,
        position: timeSlot.standingPoints,
        time: props.activity.duration*60,
        timeLeft: props.activity.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(activityDetails);

      props.navigation.navigate("StationaryActivity")
    }
    else if (props.activity.test_type == activityList[1]){
      let activityDetails = {
        location: props.activity.area.points[0],
        area: props.activity.area.points,
        position: timeSlot.standingPoints,
        time: props.activity.duration*60,
        timeLeft: props.activity.duration*60
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

    if(max > 0 && (max-len) > 0 ) {
      //TODO: update the Activity to sign user up for time slot
      let success = false
      let res = null

      try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/' + timeSlot._id, {
              method: 'PUT',
              headers: {
                  Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + props.token
              },
              body: JSON.stringify({
                 researcher: props.userId,
              })
          })
          res = await response.json()
          success = true
      } catch (error) {
          console.log("ERROR: ", error)
      }
      console.log("sign up user response:", res);
      if (res.success !== undefined) {
        success = res.success
        console.log("success: ", success);
      }

      if (success) {
        // add user locally
        tempResearchers.push(props.username);
        tempSlot.researchers = tempResearchers;
        tempTimeSlots[index] = tempSlot;
        props.setTimeSlots(tempTimeSlots);
      }
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
            {(props.activity.test_type === 'Survey' ? null : <ShowMarkers markers={props.project.standingPoints} />)}
          </MapAreaWrapper>
        </View>
        <View style={{margin:15}}>
          <Text category='s1'>Activity: {props.activity.test_type}</Text>
          <Text category='s1'>Day: {props.activity.date}</Text>
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
