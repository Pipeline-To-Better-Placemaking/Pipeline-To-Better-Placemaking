import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TitleScreen } from '../screens/Title/title.component';
import { LoginScreen } from '../screens/Login/login.component';
import { SignUpScreen } from '../screens/SignUp/signup.component';
import { TabNavigation } from './tabNavigation.component';

const { Navigator, Screen } = createStackNavigator();

export function AppNavigator (props) {

  const [location, setLocation] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  return(
    <NavigationContainer>
      {(signedIn ?
        <Navigator headerMode='none'>
        <Screen
          name="TabNavigation"
        >
          {props =>
            <TabNavigation
              {...props}
              location={location}
              setSignedIn={setSignedIn}
            >
            </TabNavigation>
          }
        </Screen>
        </Navigator>
      :
      <Navigator headerMode='none'>
        <Screen
          name='Title'
          component={TitleScreen}
        />
        <Screen
          name='Login'
        >
          {props =>
            <LoginScreen
              {...props}
              setLocation={setLocation}
              setSignedIn={setSignedIn}
            >
            </LoginScreen>
          }
        </Screen>
        <Screen
          name='SignUp'
        >
          {props =>
            <SignUpScreen
              {...props}
              setSignedIn={setSignedIn}
              setLocation={setLocation}
            >
            </SignUpScreen>
          }
        </Screen>
      </Navigator>
      )}
    </NavigationContainer>
  )
};
