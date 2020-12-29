import React, {Component} from 'react';

import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import MainStackNavigation from './navigation/MainStackNavigation.js';

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
      <ApplicationProvider mapping={mapping} theme={this.state.theme}>
        <NavigationContainer theme={this.props.darkTheme ? MyDarkTheme : MyLightTheme}>
          <IconRegistry icons={EvaIconsPack} />
          <MainStackNavigation 
            theme={this.state.theme}
            getCoords={this.getCoords}
            location={this.state.location}
            toggleTheme={this.toggleTheme}
          />
        </NavigationContainer>
      </ApplicationProvider>
    );
  }
}

export default App;
