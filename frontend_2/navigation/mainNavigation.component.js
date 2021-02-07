import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TitleScreen } from '../screens/Title/title.component';
import { LoginScreen } from '../screens/Login/login.component';
import { TabNavigation } from './tabNavigation.component';

const { Navigator, Screen } = createStackNavigator();

export function AppNavigator (props) {

  const [location, setLocation] = useState(null)

  return(
    <NavigationContainer>
      <Navigator headerMode='none'>
        <Screen
          name='Title'
          component={TitleScreen}
        />
        <Screen
          name='Login'
        >
          {props => <LoginScreen {...props}
                      setLocation={setLocation}>
                    </LoginScreen>}
        </Screen>
        <Screen
          name="TabNavigation"
        >
          {props => <TabNavigation {...props}
                      location ={location}>
                    </TabNavigation>}
        </Screen>
      </Navigator>
    </NavigationContainer>
  )
};
