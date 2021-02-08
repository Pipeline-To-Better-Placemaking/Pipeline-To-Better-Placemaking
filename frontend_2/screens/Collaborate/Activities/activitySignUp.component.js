import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../../components/headers.component';
import { MapViewPoints } from '../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './activitySignUp.styles';

export function ActivitySignUpPage(props) {

  console.log("Selected Activity:\n", props.activity);

  return (
    <ViewableArea>
      <Header text={props.activity.title}/>
      <ContentContainer>
        <View style={{height:'40%'}}>
          <MapViewPoints
            location={props.activity.area[0]}
            area={props.activity.area}
            markers={props.activity.standingPoints}
          />
        </View>
        <Text>This is the Activity Sign Up Page</Text>
      </ContentContainer>
    </ViewableArea>
  );
};
