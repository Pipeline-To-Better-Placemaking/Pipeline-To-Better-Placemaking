import React, {Component} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import {TitleScreen} from './screens/TitleScreen.js'; 

class App extends Component {
  render() {
    return(
      <ApplicationProvider {...eva} theme={eva.dark}>
        <TitleScreen/>
      </ApplicationProvider>
    );
  }
}

export default App;