import React, {Component} from 'react';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import TitleScreen from './screens/TitleScreen.js';
import SignUp from './screens/SignUp.js';
import LogIn from './screens/LogIn.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends Component {
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
              component={LogIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </ApplicationProvider>
      </NavigationContainer>
    );
  }
}

export default App;export default App;
