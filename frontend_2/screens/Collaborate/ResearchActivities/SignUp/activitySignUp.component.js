import React, { useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { Text, Button, Divider, List, Card, MenuItem } from '@ui-kitten/components';
import { HeaderBack, HeaderBackEdit } from '../../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { MapAreaWrapper, ShowArea, ShowMarkers } from '../../../components/Maps/mapPoints.component';
import { getDayStr, getTimeStr } from '../../../components/timeStrings.component';
import { getAllCollectionInfo } from '../../../components/apiCalls';

export function ActivitySignUpPage(props) {

  // Constant array of activities
  const activityList = ["stationary", "moving", "survey"]

  const [editMenuVisible, setEditMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshDetails();
    setRefreshing(false);
  }, []);

  const refreshDetails = async () => {
    let collectionDetails = {...props.activity};
    collectionDetails = await getAllCollectionInfo(collectionDetails);

    // if successfully retrieved activity info, Update
    if(collectionDetails !== null) {
      await props.setTimeSlots([...collectionDetails.timeSlots]);
      collectionDetails.timeSlots = [];
      await props.setActivity(collectionDetails);
    }
  };

  const editActivityInfo = async () => {
    await props.setUpdateActivity(true);
    props.navigation.navigate('CreateActivityStack')
  }

  // area error checking
  if (props.activity.area === undefined ||
      props.activity.area === null ||
      props.activity.area.points === undefined ||
      props.activity.area.points === null
    ) {
      return (
        <ViewableArea>
          {props.teamOwner() ?
            <HeaderBackEdit {...props} text={props.activity.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
              <MenuItem title='Edit Info' onPress={() => {setEditMenuVisible(false); editActivityInfo()}}/>
            </HeaderBackEdit>
          :
            <HeaderBack {...props} text={props.activity.title}/>
          }
          <ContentContainer>
            <View style={{margin:15, borderWidth:4, borderColor:'red'}}>
              <Text status='danger' category='h5' style={{padding:5}}>
                Error getting Research activity information. {'\n'}
                Team Admin needs to reset the activity area.
              </Text>
            </View>
            <View style={{margin:15}}>
              <Text category='s1'>Activity: {props.activity.test_type}</Text>
              <Text category='s1'>Day: {getDayStr(props.activity.date)}</Text>
              <Text>{(props.activity.test_type === activityList[2] ? "Time at Site:" : "Time per Standing Point:")} {props.activity.duration} (min)</Text>
            </View>
          </ContentContainer>
        </ViewableArea>
      );
    }

  // standing point error checking
  if (props.activity.test_type !== activityList[2]) {
      let allGood = true;
      for (let i = 0; i < props.timeSlots.length; i++) {
        let points = props.timeSlots[i].standingPoints;
        if (points === undefined || points === null || points.length <= 0) {
          allGood = false;
        }
      }
      if (!allGood) {
        return (
          <ViewableArea>
            {props.teamOwner() ?
              <HeaderBackEdit {...props} text={props.activity.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
                <MenuItem title='Edit Info' onPress={() => {setEditMenuVisible(false); editActivityInfo()}}/>
              </HeaderBackEdit>
            :
              <HeaderBack {...props} text={props.activity.title}/>
            }
            <ContentContainer>
              <View style={{height:'40%'}}>
                <MapAreaWrapper area={props.activity.area.points} mapHeight={'100%'}>
                  <ShowArea area={props.activity.area.points} />
                </MapAreaWrapper>
              </View>
              <View style={{margin:15}}>
                <Text category='s1'>Activity: {props.activity.test_type}</Text>
                <Text category='s1'>Day: {getDayStr(props.activity.date)}</Text>
                <Text>{(props.activity.test_type === activityList[2] ? "Time at Site:" : "Time per Standing Point:")} {props.activity.duration} (min)</Text>
              </View>
              <View style={{margin:15, borderWidth:4, borderColor:'red'}}>
                <Text status='danger' category='h5' style={{padding:5}}>
                  Error getting some standing point information. {'\n'}
                  Team Admin needs to fix the activity.
                </Text>
              </View>
            </ContentContainer>
          </ViewableArea>
        );
      }
  }

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

      let originalDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: timeSlot.standingPoints,
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(originalDetails);

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

      let originalDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: timeSlot.standingPoints,
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(originalDetails);

      props.navigation.navigate("PeopleMovingActivity")
    }
    else if (props.activity.test_type == activityList[2]){
      let activityDetails = {
        _id: timeSlot._id,
        key: timeSlot.key,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      let originalDetails = {
        _id: timeSlot._id,
        key: timeSlot.key,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(originalDetails);

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
      route = 'surveys/';
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
        console.log("sign up user response:", res)
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
        console.log("remove user response:", res)
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

  const isSignedUp = (timeSlot, userId) => {
    for (let i = 0; i < timeSlot.maxResearchers; i++) {
      if(timeSlot.researchers[i] != null && timeSlot.researchers[i]._id !== undefined && timeSlot.researchers[i]._id  == userId)
          return true;
    }

    return false;
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
          {isSignedUp(item, props.userId) &&
            <Button status='success' style={{margin:5}} onPress={() => onBeginPress(item, index)}>
              Begin
            </Button>
          }
        </View>
      </View>
    </Card>
  );

  return (
    <ViewableArea>
      {props.teamOwner() ?
        <HeaderBackEdit {...props} text={props.activity.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
          <MenuItem title='Edit Info' onPress={() => {setEditMenuVisible(false); editActivityInfo()}}/>
        </HeaderBackEdit>
      :
        <HeaderBack {...props} text={props.activity.title}/>
      }
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
};
