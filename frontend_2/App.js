import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/mainNavigation.component';
import { ThemeContext } from './theme-context';
import { Appearance } from 'react-native';

export default () => {

  const [theme, setTheme] = React.useState(Appearance.getColorScheme());

  const toggleTheme = () => {
    console.log(theme);
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
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
