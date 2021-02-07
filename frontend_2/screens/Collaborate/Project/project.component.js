import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { Header } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './project.styles';

export function ProjectPage(props) {

  return (
    <ViewableArea>
      <Header text={props.project.title}/>
      <ContentContainer>
        <Text style={{margin:5}}>
          This is the Project Page
        </Text>
      </ContentContainer>
    </ViewableArea>
  );
};
