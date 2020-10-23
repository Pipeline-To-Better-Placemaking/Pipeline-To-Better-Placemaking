import React, {Component} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import TitleScreen from './screens/TitleScreen.js';
import SignUp from './screens/SignUp.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return(
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <Stack.Navigator>
            <Stack.Screen
              name="TitleScreen"
              component={TitleScreen}
              options={{ headerShown: false}}
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

export default App;