import React, { useState, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IntialForm } from '../screens/Collaborate/CreateActivityForm/intialInformation.component';
import { SelectLocation } from '../screens/Collaborate/CreateActivityForm/setLocation.component';
import { CreateStandingPoints } from '../screens/Collaborate/CreateActivityForm/createStandingPoints.component';
import { CreateTimeSlots } from '../screens/Collaborate/CreateActivityForm/createTimeSlots.component';

const { Navigator, Screen } = createStackNavigator();

export function CreateActivityStack() {
  return (
    <Navigator headerMode='none'>
      <Screen name='IntialForm'>
        {props =>
          <IntialForm
            {...props}
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
            token={props.token}
            userId={props.userId}
            team={props.team}
            project={props.project}
            activity={props.activity}
            setActivity={props.setActivity}
            activities={props.activities}
            setActivities={props.setActivities}
          />
        }
      </Screen>
    </Navigator>
  );
};
