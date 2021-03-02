import React, { useState, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IndexPath } from '@ui-kitten/components';
import { IntialForm } from '../screens/Collaborate/ResearchActivities/CreateActivityForm/intialInformation.component';
import { SelectLocation } from '../screens/Collaborate/ResearchActivities/CreateActivityForm/setLocation.component';
import { CreateTimeSlots } from '../screens/Collaborate/ResearchActivities/CreateActivityForm/createTimeSlots.component';

const { Navigator, Screen } = createStackNavigator();

export function CreateActivityStack(props) {

  let headerText = "Create Research Activity";

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

    // Stationary Map
    if(row === 0) {
      postSM(name);

    } // People Moving
    else if (row === 1) {
      // some fake activity info until we set up the api calls
      timeSlots.map(timeSlot => {
        let selectedPoints = [...props.project.standingPoints];
        if (timeSlot.assignedPointIndicies !== null && timeSlot.assignedPointIndicies.length > 0) {
          selectedPoints = timeSlot.assignedPointIndicies.map(index => {
            return standingPoints[index.row];
          });
        }
        timeSlot.standingPoints = selectedPoints;
      })

      let activityDetails = {
        title: name,
        date: date,
        duration: parseInt(duration),
        activity: activityTypes[row],
        test_type: activityTypes[row],
        timeSlots: timeSlots,
        area: area,
      };
      props.setActivities(values => [...values,activityDetails]);
    } // Survey
    else if (row === 2) {

      let activityDetails = {
        title: name,
        date: date,
        duration: parseInt(duration),
        activity: activityTypes[row],
        test_type: activityTypes[row],
        timeSlots: timeSlots,
        area: area,
      };
      props.setActivities(values => [...values,activityDetails]);
    }

    // Navigate back to Project page
    props.navigation.navigate('ProjectPage')
  };

  const postSM = async (name) => {
    let success = false
    let collectionDetails = null
    // Save the activity
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id + '/stationary_collections', {
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
    console.log("create SM collection response:", collectionDetails);
    if(collectionDetails.success !== undefined) {
      success = collectionDetails.success
      console.log("success: ", success);
    }

    if(success) {
      // create the time timeSlots
      await timeSlots.map(timeSlot => {
        postSMTimeSlot(timeSlot, name, collectionDetails._id)
      });

      // set the type
      collectionDetails.test_type = 'stationary';

      // get the area
      let areaIndex = props.project.subareas.findIndex(element => element._id === collectionDetails.area);
      collectionDetails.area = props.project.subareas[areaIndex];

      // add the collection to the list
      await props.setActivities(values => [...values, collectionDetails]);
    }
  }

  const postSMTimeSlot = async (timeSlot, name, id) => {
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
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
                title: name,
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
    console.log("create SM activity response:", activityDetails);
    if (activityDetails.success !== undefined) {
      success = activityDetails.success
      console.log("success: ", success);
    }

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
    props.navigation.navigate('ProjectPage')
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
