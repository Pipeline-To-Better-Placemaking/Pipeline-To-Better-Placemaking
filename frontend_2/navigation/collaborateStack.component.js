import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Collaborate } from '../screens/Collaborate/collaborate.component';
import { TeamPage } from '../screens/Collaborate/Team/team.component';

const { Navigator, Screen } = createStackNavigator();

export function CollaborateStack(props) {

  const [team, setTeam] = useState(null);

  return (
    <Navigator headerMode='none'>
      <Screen name='Collaborate'>
        {props => <Collaborate {...props} setTeam={setTeam} />}
      </Screen>
      <Screen name='TeamPage'>
        {props => <TeamPage {...props} team={team} />}
      </Screen>
    </Navigator>
  );
};
