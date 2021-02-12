import React, {useState} from 'react';
import { SafeAreaView, View, ScrollView, Pressable, Image } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { styles } from './userSettings.styles';

export function UserSettings(props) {

  const themeContext = React.useContext(ThemeContext);

  return (
    <ViewableArea>
      <Header text={'User Settings'}/>
      <ContentContainer>
				<View style={styles.userDetails}>
						<Text style={{fontSize: 20, alignSelf: 'center'}}> {props.firstName} {props.lastName} </Text>
						<Text style={{fontSize: 20, alignSelf: 'center'}}> {props.email} </Text>
				</View>

        <Button style={{margin:5}} onPress={themeContext.toggleTheme}>
          TOGGLE THEME
        </Button>

      </ContentContainer>
    </ViewableArea>
  );
};
