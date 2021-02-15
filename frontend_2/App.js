import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/mainNavigation.component';
import { ThemeContext } from './theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  
  return (
      <>
      <IconRegistry icons={EvaIconsPack}/>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
            <AppNavigator/>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};
