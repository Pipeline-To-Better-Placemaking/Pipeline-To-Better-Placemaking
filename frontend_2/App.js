import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/mainNavigation.component';
import { ThemeContext } from './theme-context';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {

  const [theme, setTheme] = React.useState('light');
  const [location, setLocation] = React.useState(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      console.log("Getting location...")
      let loc = await Location.getCurrentPositionAsync({})
      console.log("Location: " + JSON.stringify(loc))
      setLocation(loc);
    })();
  }, []);

  return (
      <>
      <IconRegistry icons={EvaIconsPack}/>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
            <AppNavigator location={location}/>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};
