import React, {Component} from 'react';

import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import TitleScreen from './screens/TitleScreen.js';
import SignUp from './screens/SignUp/SignUp.js';
import Home from './screens/Home/Home.js';
import LogIn from './screens/Login/LogIn.js';
import UserSettings from './screens/UserSettings/UserSettings.js';
import Collaborate from './screens/Collaborate/Collaborate.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

/* Kinda hacky, for some reason trying to set the theme on NavigationContainer
 * doesn't work with the themes from '@eva-design/eva', it complains about the
 * backgroundColor. So I'm setting it like this for now.
 */
const MyLightTheme = {
  colors: {
    background: '#FFFFFF',
  },
};
const MyDarkTheme = {
  colors: {
    background: '#222B45',
  },
};

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      location: { },
      theme: lightTheme,
      darkTheme: false,
    }

    this.getCoords = this.getCoords.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  getCoords = (locationDetails) => {
    this.setState({
      location: locationDetails
    });
  }

  toggleTheme = () => {
    let nextTheme = this.state.theme === darkTheme ? lightTheme : darkTheme;
    let darkColor = nextTheme === darkTheme ? true : false;
    this.setState({
        theme: nextTheme,
        darkTheme: darkColor
    });
  };

  render() {

    return(
      <NavigationContainer theme={this.state.darkTheme ? MyDarkTheme : MyLightTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={this.state.theme}>
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
              name="Collaborate"
              component={Collaborate}
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
              options={{headerShown: false}}
              >
                {props => <UserSettings {...props} toggleTheme={this.toggleTheme}/>}
              </Stack.Screen>
          </Stack.Navigator>
        </ApplicationProvider>
      </NavigationContainer>
    );
  }
}

export default App;
