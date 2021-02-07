import React, { useState, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IndexPath } from '@ui-kitten/components';
import { IntialForm } from '../screens/Collaborate/CreateActivityForm/intialInformation.component';
import { SelectLocation } from '../screens/Collaborate/CreateActivityForm/setLocation.component';
import { CreateStandingPoints } from '../screens/Collaborate/CreateActivityForm/createStandingPoints.component';
import { CreateTimeSlots } from '../screens/Collaborate/CreateActivityForm/createTimeSlots.component';

const { Navigator, Screen } = createStackNavigator();

export function CreateActivityStack(props) {

  const [activityName, setActivityName] = useState('');
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(new IndexPath(0));
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  const create = () => {
    // some error checking if they don't fill everything out
    let name = activityName;
    let row = selectedActivityIndex.row;
    if(row == undefined) {
      row = 0;
    }
    if(activityName.length <= 0) {
      name = props.activityTypes[row];
    }

    // the activity info
    let temp = {
      title: name,
      date: date,
      activity: props.activityTypes[row],
      timeSlots: timeSlots,
    };
    // TODO: POST the activity

    // update activites list
    props.setActivities(activites => [...activites,temp]);

    // Navigate back to Project page
    props.navigation.navigate('ProjectPage')
  };

  return (
    <Navigator headerMode='none'>
      <Screen name='IntialForm'>
        {props =>
          <IntialForm
            {...props}
            activityName={activityName}
            setActivityName={setActivityName}
            selectedActivityIndex={selectedActivityIndex}
            setSelectedActivityIndex={setSelectedActivityIndex}
            date={date}
            setDate={setDate}
            activityTypes={props.activityTypes}
          />
        }
      </Screen>
      <Screen name='SelectLocation'>
        {props =>
          <SelectLocation
            {...props}
          />
        }
      </Screen>
      <Screen name='CreateStandingPoints'>
        {props =>
          <CreateStandingPoints
            {...props}
          />
        }
      </Screen>
      <Screen name='CreateTimeSlots'>
        {props =>
          <CreateTimeSlots
            {...props}
            timeSlots={timeSlots}
            setTimeSlots={setTimeSlots}
            create={create}
          />
        }
      </Screen>
    </Navigator>
  );
};
