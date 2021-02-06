import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Collaborate } from '../screens/Collaborate/collaborate.component';
import { TeamPage } from '../screens/Collaborate/Team/team.component';

const { Navigator, Screen } = createStackNavigator();

export function CollaborateStack(props) {

  const [team, setTeam] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getToken() {
      let token = await AsyncStorage.getItem("@token");
      setToken(token);
    }

    getToken()
  }, []);

  return (
    <Navigator headerMode='none'>
      <Screen name='Collaborate'>
        {props =>
          <Collaborate
            {...props}
            token={token}
            setTeam={setTeam}
          />
        }
      </Screen>
      <Screen name='TeamPage'>
        {props =>
          <TeamPage
            {...props}
            token={token}
            team={team}
          />
        }
      </Screen>
    </Navigator>
  );
};
