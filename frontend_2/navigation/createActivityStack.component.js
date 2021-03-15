import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IndexPath } from '@ui-kitten/components';
import { IntialForm } from '../screens/Collaborate/ResearchActivities/CreateActivityForm/intialInformation.component';
import { SelectLocation } from '../screens/Collaborate/ResearchActivities/CreateActivityForm/setLocation.component';
import { CreateTimeSlots } from '../screens/Collaborate/ResearchActivities/CreateActivityForm/createTimeSlots.component';
import { getDayStr, getTimeStr } from '../screens/components/timeStrings.component';

const { Navigator, Screen } = createStackNavigator();

export function CreateActivityStack(props) {

  let updateActivity = props.updateActivity;
  let headerText = props.updateActivity ? "Update Research Activity" : "Create Research Activity";

  // List of activity types
  const activityTypes = [...props.activityTypes];
  // these are the activites that require standing points to be defined
  const activitesRequirePoints = ['Stationary Map', 'People Moving'];

  // This is the unique name the user gives the Activity
  const [activityName, setActivityName] = useState('');
  const [duration, setDuration] = useState('15');

  // This is the index of the selected Activity from the lsit of activityTypes
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(new IndexPath(0));
  const [selectedActivity, setActivity] = useState('Stationary Map');

  // Only use the Day from this value, this is the date the user selects for the Activity to take place
  const [date, setDate] = useState(new Date());

  // This is a list of all of the Time Slot Cards for the activity day
  const [timeSlots, setTimeSlots] = useState([]);

  // This is the list of points, the user can set to reccomend where a researcher stands
  const [standingPoints, setStandingPoints] = useState(props.project.standingPoints);
  // This boolean identitifies whether or not standing points are required for this type of activity
  const [pointsRequired, setPointsRequired] = useState(true);

  // This is the selected sub area
  const [area, setArea] = useState(props.project.subareas[0]);
  const [selectedAreaIndex, setSelectedAreaIndex] = React.useState(0);
  // This boolean is used to determine if there's more than 1 sub area for the user to choose from
  // if there's only 1 sub area, then they don't need to select a sub location
  const selectArea = (props.project.subareas.length > 1);
  const [subareas, setSubareas] = useState(props.project.subareas);

  useEffect(() => {
    if (props.updateActivity) {
      setInitialValues();
    }
  }, []);

  const setInitialValues = async () => {
    await setActivityName(props.activity.title);
    await setDate(props.activity.date);
    await setDuration('' + props.activity.duration);

    let types = ['stationary', 'moving', 'survey'];
    let activityIndex = types.findIndex(element => element === props.activity.test_type);
    setSelectedActivity(new IndexPath(activityIndex));

    await setArea(props.activity.area);
    let areaIndex = props.project.subareas.findIndex(element => element._id === props.activity.area._id);
    await setSelectedAreaIndex(areaIndex);

    let tempTimeSlots = [];
    if (props.activity.maps !== null && props.activity.maps.length >= 1) {
      props.activity.maps.map(timeSlot => {
        // date to value
        timeSlot.date = new Date(timeSlot.date);
        // displayable timeString
        timeSlot.timeString = getTimeStr(new Date(timeSlot.date));
        // num researchers to string
        timeSlot.maxResearchers = '' + timeSlot.maxResearchers;
        // assignedPointIndicies, we have standingPoints with an array of the ids
        timeSlot.assignedPointIndicies = [];
        if (timeSlot.standingPoints !== undefined && timeSlot.standingPoints !== null) {
          for(let i=0; i < timeSlot.standingPoints.length; i++) {
            let index = standingPoints.findIndex(element => element._id === timeSlot.standingPoints[i]);
            if (index >= 0) {
              timeSlot.assignedPointIndicies.push(new IndexPath(index));
            }
          }
        }
        tempTimeSlots.push(timeSlot);
      })
    }
    await setTimeSlots(tempTimeSlots);
  }

  const create = async () => {
    // some error checking if they don't fill everything out
    let name = activityName;
    let row = selectedActivityIndex.row;
    if(row == undefined) {
      row = 0;
    }
    if(activityName.trim().length <= 0) {
      name = activityTypes[row];
    }

    if (props.updateActivity) {
      if (row === 0) { // Stationary Map
        putCollection(name, 'stationary', '/stationary_collections', 'stationary_maps/');
      }
      else if (row === 1) { // People Moving
        putCollection(name, 'moving', '/moving_collections', 'moving_maps/');
      }
      else if (row === 2) { // Survey
        //putCollection(name, 'survey', '/survey_collections', 'survey_codes/');
      }
      props.setUpdateActivity(false);
      props.navigation.navigate('ProjectPage')
    }
    // create new activity(collection)
    else {
      if (row === 0) { // Stationary Map
        postCollection(name, 'stationary', '/stationary_collections', 'stationary_maps/');
      }
      else if (row === 1) { // People Moving
        postCollection(name, 'moving', '/moving_collections', 'moving_maps/');
      }
      else if (row === 2) { // Survey
        //postCollection(name, 'survey', '/survey_collections', 'survey_codes/'); // not sure what the routes will be for this one
        // some fake activity info until we set up the api calls
        let activityDetails = {
          title: name,
          date: date,
          duration: parseInt(duration),
          activity: activityTypes[row],
          test_type: "survey",
          timeSlots: timeSlots,
          area: area,
        };
        props.setActivities(values => [...values,activityDetails]);
      }

      // Navigate back to Project page
      props.navigation.navigate('ProjectPage')
    }
  };

  const postCollection = async (name, test_type, collectionName, timeSlotName) => {
    let success = false
    let collectionDetails = null
    // Save the activity
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id + collectionName, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
                title: name,
                date: date,
                area: area._id,
                duration: parseInt(duration),
            })
        })
        collectionDetails = await response.json()
        success = true
    } catch (error) {
        console.log("ERROR: ", error)
    }
    console.log("create collection response:", collectionDetails);
    if(collectionDetails.success !== undefined) {
      success = collectionDetails.success
      console.log("success: ", success);
    }

    if(success) {
      // create the time timeSlots
      await timeSlots.map(timeSlot => {
        postTimeSlot(timeSlot, name, collectionDetails._id, timeSlotName)
      });

      // set the type
      collectionDetails.test_type = test_type;

      // get the area
      let areaIndex = props.project.subareas.findIndex(element => element._id === collectionDetails.area);
      collectionDetails.area = props.project.subareas[areaIndex];

      // add the collection to the list
      await props.setActivities(values => [...values, collectionDetails]);
    }
  }

  const postTimeSlot = async (timeSlot, name, id, timeSlotName) => {
    let success = false
    let activityDetails = null
    let selectedPoints = [...props.project.standingPoints]; // default standing points to project list
    if (timeSlot.assignedPointIndicies !== null && timeSlot.assignedPointIndicies.length > 0) {
      selectedPoints = timeSlot.assignedPointIndicies.map(index => {
        return standingPoints[index.row];
      });
    }
    // Save the activity
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/' + timeSlotName, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
                title: name.// + ' (' + getTimeStr(timeSlot.date) + ')',
                standingPoints: selectedPoints,
                researchers: [],
                project: props.project._id,
                collection: id,
                date: timeSlot.date, // start time
                maxResearchers: parseInt(timeSlot.maxResearchers),
            })
        })
        activityDetails = await response.json()
        success = true
    } catch (error) {
        console.log("ERROR: ", error)
    }
    console.log("create activity response:", activityDetails);
    if (activityDetails.success !== undefined) {
      success = activityDetails.success
      console.log("success: ", success);
    }
  }

  const putCollection = async (name, test_type, collectionName, timeSlotName) => {
    let success = false
    let collectionDetails = null
    // Save the activity
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                      props.project._id +
                                      collectionName  +
                                      '/' + props.activity._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
                title: name,
                date: date,
                area: area._id,
                duration: parseInt(duration),
            })
        })
        collectionDetails = await response.json()
        success = true
    } catch (error) {
        console.log("ERROR: ", error)
    }
    console.log("put collection response:", collectionDetails);
    if(collectionDetails.success !== undefined) {
      success = collectionDetails.success
      console.log("success: ", success);
    }

    if(success) {
      // modify the time slots
      let timesToDelete = [];
      let timesToModify = [];
      let timesToAdd = [];

      for (let i=0; i < props.activity.maps.length; i++) {
        let currId = props.activity.maps[i]._id
        let findId = timeSlots.findIndex(element => (element._id !== undefined && element._id === currId));
        // if time slot still exists, modify it
        if (findId >= 0) {
          timesToModify.push(timeSlots[findId]);
        } // if the timeslot doesn't exist anymore, delete it
        else {
          timesToDelete.push(props.activity.maps[i]);
        }
      }

      // add new timeslots
      for (let i=0; i < timeSlots.length; i++) {
        if (timeSlots[i]._id === undefined) {
          timesToAdd.push(timeSlots[i]);
        }
      }

      for (let i=0; i< timesToAdd.length; i++) {
        await postTimeSlot(timesToAdd[i], name, props.activity._id, timeSlotName);
      }
      for (let i=0; i< timesToModify.length; i++) {
        await postTimeSlot(timesToModify[i], name, props.activity._id, timeSlotName);
      }
      for (let i=0; i< timesToDelete.length; i++) {
        await deleteTimeSlot(timesToDelete[i], timeSlotName);
      }

      // modify collection name in the list
      let collections = [...props.activities];
      let modifyIndex = collections.findIndex(element => element._id === props.activity._id);
      collections[modifyIndex].title = name;
      await props.setActivities([...collections]);
    }

  }

  const putTimeSlot = async (timeSlot, name, id, timeSlotName) => {
    let success = false
    let activityDetails = null
    let selectedPoints = [...props.project.standingPoints]; // default standing points to project list
    if (timeSlot.assignedPointIndicies !== null && timeSlot.assignedPointIndicies.length > 0) {
      selectedPoints = timeSlot.assignedPointIndicies.map(index => {
        return standingPoints[index.row];
      });
    }
    // Save the activity
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/' + timeSlotName + '/' + timeSlot._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
                title: name,// + ' (' + getTimeStr(timeSlot.date) + ')',
                standingPoints: selectedPoints,
                collection: id,
                date: timeSlot.date, // start time
                maxResearchers: parseInt(timeSlot.maxResearchers),
            })
        })
        activityDetails = await response.json()
        success = true
    } catch (error) {
        console.log("ERROR: ", error)
    }
    console.log("put timeslot response:", activityDetails);
    if (activityDetails.success !== undefined) {
      success = activityDetails.success
      console.log("success: ", success);
    }
  }

  const deleteTimeSlot = async (timeSlot, timeSlotName) => {
    let success = false
    let res = null
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/' + timeSlotName + '/' + timeSlot._id, {
          method: 'DELETE',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + props.token
          }
      })
      res = await response.json()
      success = true
    } catch (error) {
      console.log("ERROR: ", error)
    }
    console.log("delete timeslot response:", res);
  }

  const deleteActivity = async () => {
    let success = false
    let res = null
    let collectionName = '/' + props.activity.test_type + '_collections';
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                    props.project._id +
                                    collectionName  +
                                    '/' + props.activity._id, {
          method: 'DELETE',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + props.token
          }
      })
      res = await response.json()
      success = true
    } catch (error) {
      console.log("ERROR: ", error)
    }
    console.log("delete collection response:", res);
    if (success) {
      // remove collection from the list
      let collections = [...props.activities];
      let removeIndex = collections.findIndex(element => element._id === props.activity._id);
      collections.splice(removeIndex, 1);
      await props.setActivities([...collections]);
    }
    // done
    props.setUpdateActivity(false);
    props.navigation.navigate('ProjectPage')
  }

  const setSelectedActivity = (index) => {
    setSelectedActivityIndex(index);
    let tempName = activityTypes[index.row];
    setActivity(tempName);

    if(activitesRequirePoints.includes(tempName)){
      setPointsRequired(true);
    } else {
      setPointsRequired(false);
    }
  };

  const exit = () => {
    if (props.updateActivity) {
      props.navigation.navigate('ActivitySignUpPage')
    } else {
      props.navigation.navigate('ProjectPage')
    }
  }

  return (
    <Navigator headerMode='none'>
      <Screen name='IntialForm'>
        {props =>
          <IntialForm
            {...props}
            activityName={activityName}
            setActivityName={setActivityName}
            selectedActivityIndex={selectedActivityIndex}
            setSelectedActivity={setSelectedActivity}
            date={date}
            setDate={setDate}
            selectArea={selectArea}
            headerText={headerText}
            exit={exit}
            activityTypes={activityTypes}
            setDuration={setDuration}
            duration={duration}
            updateActivity={updateActivity}
            deleteActivity={deleteActivity}
          />
        }
      </Screen>
      <Screen name='SelectLocation'>
        {props =>
          <SelectLocation
            {...props}
            area={area}
            setArea={setArea}
            subareas={subareas}
            selectedAreaIndex={selectedAreaIndex}
            setSelectedAreaIndex={setSelectedAreaIndex}
            headerText={headerText}
            exit={exit}
          />
        }
      </Screen>
      <Screen name='CreateTimeSlots'>
        {props =>
          <CreateTimeSlots
            {...props}
            timeSlots={timeSlots}
            setTimeSlots={setTimeSlots}
            standingPoints={standingPoints}
            selectedActivity={selectedActivity}
            create={create}
            headerText={headerText}
            exit={exit}
          />
        }
      </Screen>
    </Navigator>
  );
};
