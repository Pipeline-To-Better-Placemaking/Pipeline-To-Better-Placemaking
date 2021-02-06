import React from 'react';
import { SafeAreaView, View, ScrollView, Pressable, Image } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { styles } from './userSettings.styles';

export const UserSettings = ({ navigation }) => {

  const themeContext = React.useContext(ThemeContext);

  return (
    <ViewableArea>
      <Header text={'User Settings'}/>
      <ContentContainer>
        <Text style={{margin:5}}>
          This is the User Settings
        </Text>
        <Button style={{margin:5}} onPress={themeContext.toggleTheme}>
          TOGGLE THEME
        </Button>
      </ContentContainer>
    </ViewableArea>
  );
};
