import React, { useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { Text, Button, Divider, List, Card, MenuItem } from '@ui-kitten/components';
import { HeaderBack, HeaderBackEdit } from '../../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { MapAreaWrapper, ShowArea, ShowMarkers } from '../../../components/Maps/mapPoints.component';
import { getDayStr, getTimeStr } from '../../../components/timeStrings.component';
import { getAllCollectionInfo } from '../../../components/apiCalls';
import { retrieveTestName } from '../../../components/helperFunctions';
import { LOCAL_SERVER } from '@env';

import { styles } from './activitySignUp.styles';

export function ActivitySignUpPage(props) {

  // add new tests here, keep indices consistent
  // Constant array of activities
  const activityList = ["stationary", "moving", "survey", "sound", "boundary", "nature", "light", "order"]

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
            <HeaderBackEdit {...props} text={props.activity.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible} >
              <MenuItem title='Edit Info' onPress={() => {setEditMenuVisible(false); editActivityInfo()}}/>
            </HeaderBackEdit>
          :
            <HeaderBack {...props} text={props.activity.title}/>
          }
          <ContentContainer>
            <View style={styles.errorView}>
              <Text status='danger' category='h5' style={styles.errorText}>
                Error getting Research activity information. {'\n'}
                Team Admin needs to reset the activity area.
              </Text>
            </View>
            <View style={styles.viewSpacer}>
              <Text category='s1'>Activity: {retrieveTestName(props.activity.test_type)}</Text>
              <Text category='s1'>Day: {getDayStr(props.activity.date)}</Text>
              { props.activity.test_type === activityList[3] ?
                  <Text>Time per Standing Point: {props.activity.duration} (sec)</Text>
                :
                  <Text>
                    {(props.activity.test_type === activityList[2] || 
                    props.activity.test_type === activityList[4] ||
                    props.activity.test_type === activityList[5] ? 
                      "Time at Site:"
                    : 
                      "Time per Standing Point:"
                    )} {props.activity.duration} (min)
                  </Text>
              }
            </View>
          </ContentContainer>
        </ViewableArea>
      );
    }

  // add stuff for new tests to ignore standing points (all but sound test)
  // standing point error checking
  if (props.activity.test_type !== activityList[2] && 
    props.activity.test_type !== activityList[4] && 
    props.activity.test_type !== activityList[5] &&
    props.activity.test_type !== activityList[6] &&
    props.activity.test_type !== activityList[7]
    ){
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
              <View style={styles.mapWrapper}>
                <MapAreaWrapper area={props.activity.area.points} mapHeight={'100%'}>
                  <ShowArea area={props.activity.area.points} />
                </MapAreaWrapper>
              </View>
              <View style={styles.viewSpacer}>
                <Text category='s1'>Activity: {retrieveTestName(props.activity.test_type)}</Text>
                <Text category='s1'>Day: {getDayStr(props.activity.date)}</Text>
                {/* add stuff for the new tests here to be time at site (all but sound test) */}
                { props.activity.test_type === activityList[3] ?
                  <Text>Time per Standing Point: {props.activity.duration} (sec)</Text>
                :
                  <Text>
                    {(props.activity.test_type === activityList[2] || 
                    props.activity.test_type === activityList[4] ||
                    props.activity.test_type === activityList[5] ||
                    props.activity.test_type === activityList[6] ||
                    props.activity.test_type === activityList[7] ? 
                      "Time at Site:"
                    : 
                      "Time per Standing Point:"
                    )} {props.activity.duration} (min)
                  </Text>
                }
              </View>
              <View style={styles.errorView}>
                <Text status='danger' category='h5' style={styles.errorText}>
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

    if (props.activity.test_type == activityList[0]){
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
    //add more else ifs here for the new tests
    // sound test
    else if (props.activity.test_type == activityList[3]){
      let activityDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: timeSlot.standingPoints,
        time: timeSlot.sharedData.duration,
        timeLeft: timeSlot.sharedData.duration
      }

      let originalDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: timeSlot.standingPoints,
        time: timeSlot.sharedData.duration,
        timeLeft: timeSlot.sharedData.duration
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(originalDetails);

      props.navigation.navigate("SoundTest")
    }
    // boundary test
    else if (props.activity.test_type == activityList[4]){
      let activityDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      let originalDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(originalDetails);

      props.navigation.navigate("BoundaryTest")
    }
    // nature test
    else if (props.activity.test_type == activityList[5]){
      let activityDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      let originalDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(originalDetails);

      props.navigation.navigate("NatureTest")
    }
    // light test
    else if (props.activity.test_type == activityList[6]){
      let activityDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      let originalDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(originalDetails);

      props.navigation.navigate("LightTest")
    }
    // order test
    else if (props.activity.test_type == activityList[7]){
      let activityDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      let originalDetails = {
        _id: timeSlot._id,
        location: timeSlot.sharedData.area.points[0],
        area: timeSlot.sharedData.area.points,
        position: [],
        time: timeSlot.sharedData.duration*60,
        timeLeft: timeSlot.sharedData.duration*60
      }

      props.setTimeSlot(activityDetails);
      props.setInitialTimeSlot(originalDetails);

      props.navigation.navigate("OrderTest")
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
    } else if (props.activity.test_type === activityList[3]) {
      route = 'sound_maps/';
    } else if (props.activity.test_type === activityList[4]) {
      route = 'boundaries_maps/';
    } else if (props.activity.test_type === activityList[5]) {
      route = 'nature_maps/';
    } else if (props.activity.test_type === activityList[6]) {
      route = 'light_maps/';
    } else if (props.activity.test_type === activityList[7]) {
      route = 'order_maps/';
    }
    // add any new tests to this ^

    // if the researcher is already signed up and they press the button again, unsign them up
    let findIndex = tempResearchers.findIndex(element => element._id === props.userId)
    if (findIndex >= 0) {
      max = -1; // don't add the user
      await removeUser(timeSlot, route);
      tempResearchers.splice(findIndex, 1);
      tempSlot.researchers = tempResearchers;
      tempTimeSlots[index] = tempSlot;
      props.setTimeSlots(tempTimeSlots);
    }

    // if there's space to add another researcher
    if(max > 0 && (max-len) > 0) {
      let success = false
      success = await signUpTimeSlot(timeSlot, route);

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
        const response = await fetch(LOCAL_SERVER+'/' + route + timeSlot._id + '/claim', {
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
        const response = await fetch(LOCAL_SERVER+'/'+ route + timeSlot._id + '/claim', {
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
    return names.join('\n');
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
      <View style={styles.rowView}>
        <View style={styles.infoColumn}>
          <Text>Start Time: {getTimeStr(item.date)}</Text>
          {/* if the test doesn't have standing points, don't render anything*/}
          {props.activity.test_type === activityList[2] || 
          props.activity.test_type === activityList[4] ||
          props.activity.test_type === activityList[5] ||
          props.activity.test_type === activityList[6] ||
          props.activity.test_type === activityList[7] ? 
            null 
          : 
            <Text>Standing Points: {'\n\t' + getPointsString(item)}</Text>
          }
          <Text>Researchers:</Text>
          <Text>{getResearchers(item)}</Text>
        </View>
        <View style={styles.buttonView}>
          {isSignedUp(item, props.userId) ?
            <View>
              <Button status='primary' style={styles.button} onPress={() => onSignUp(item, index)}>
                Withdraw
              </Button>
              
              <Button status='success' style={styles.button} onPress={() => onBeginPress(item, index)}>
                Begin
              </Button>
            </View>
          :
            <Button status='info' style={styles.button} onPress={() => onSignUp(item, index)}>
              Sign Up
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
        <View style={styles.mapWrapper}>
          <MapAreaWrapper area={props.activity.area.points} mapHeight={'100%'}>
            <ShowArea area={props.activity.area.points} />
            {/* if the test doesn't have standing points, don't render any markers*/}
            {(props.activity.test_type === activityList[2] || 
            props.activity.test_type === activityList[4] ||
            props.activity.test_type === activityList[5] ||
            props.activity.test_type === activityList[6] ||
            props.activity.test_type === activityList[7] ? 
              null 
            : 
              <ShowMarkers markers={props.project.standingPoints} />)
            }
          </MapAreaWrapper>
        </View>
        <View style={styles.viewSpacer}>
          <Text category='s1'>Activity: {retrieveTestName(props.activity.test_type)}</Text>
          <Text category='s1'>Day: {getDayStr(props.activity.date)}</Text>
          { props.activity.test_type === activityList[3] ?
            <Text>Time per Standing Point: {props.activity.duration} (sec)</Text>
          :
            <Text>
              {(props.activity.test_type === activityList[2] || 
              props.activity.test_type === activityList[4] ||
              props.activity.test_type === activityList[5] ||
              props.activity.test_type === activityList[6] ||
              props.activity.test_type === activityList[7] ? 
                "Time at Site:"
              : 
                "Time per Standing Point:"
              )} {props.activity.duration} (min)
            </Text>
          }
        </View>
        <View style={styles.listView}>
          <List
            style={styles.list}
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
}