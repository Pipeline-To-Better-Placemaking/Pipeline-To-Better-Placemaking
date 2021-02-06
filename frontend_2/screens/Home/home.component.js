import React from 'react';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { styles } from './home.styles';

export const HomeScreen = ({ navigation }) => {

  return (
    <ViewableArea>
      <Header text={'Home Page'}/>
      <ContentContainer>
        <Text style={{margin:5}}>
          This is the Home Screen
        </Text>
      </ContentContainer>
    </ViewableArea>
  );
};
