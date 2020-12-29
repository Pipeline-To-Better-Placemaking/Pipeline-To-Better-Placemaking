import React, {Component} from 'react';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import TitleScreen from './screens/TitleScreen.js';
import SignUp from './screens/SignUp.js';
import Home from './screens/Home.js';
import LogIn from './screens/LogIn.js';
import UserSettings from './screens/UserSettings.js';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      location: { }
    }

    this.getCoords = this.getCoords.bind(this);
  }

  getCoords = (locationDetails) => {
    this.setState({
      location: locationDetails
    });
  }

  render() {
    return(
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <Stack.Navigator>
            
            <Stack.Screen
              name="TitleScreen"
              component={TitleScreen}
              options={{ headerShown: false}}
            />

            <Stack.Screen
              name="LogIn"
              options={{headerShown: false}}
            >
              {props => <LogIn {...props} getCoords={this.getCoords}></LogIn>}
            </Stack.Screen>

            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Home"
              options={{headerShown: false}}
            >
              {props => <Home {...props} location = {this.state.location}></Home>}
            </Stack.Screen>

            <Stack.Screen
              name="UserSettings"
              component={UserSettings}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{headerShown: false}}
            />

          </Stack.Navigator>
        </ApplicationProvider>
      </NavigationContainer>
    );
  }
}

export default App;
