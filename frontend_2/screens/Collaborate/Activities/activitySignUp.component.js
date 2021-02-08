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

  const timeSlotCard = ({item, index}) => (
    <Card disabled={true}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flexDirection:'column'}}>
          <Text>Start Time {item.timeString}</Text>
          <Text>Time Limit: {item.duration} (min)</Text>
          <Text>Standing Points: {item.assignedPointsString}</Text>
          <Text>List of users who have signed Up </Text>
        </View>
        <View style={{flexDirection:'column', justifyContent:'space-around'}}>
          <Button status='info' style={{margin:5}}>
            Sign Up
          </Button>
          <Button status='success' style={{margin:5}}>
            Begin
          </Button>
        </View>
      </View>
    </Card>
  );

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
        <View style={{margin:15}}>
          <Text category='s1'>{props.activity.activity} Activity</Text>
          <Text category='s1'>Day: {props.activity.date.toLocaleDateString()}</Text>
        </View>
        <List
          style={{maxHeight:400}}
          data={props.activity.timeSlots}
          ItemSeparatorComponent={Divider}
          renderItem={timeSlotCard}
        />
      </ContentContainer>
    </ViewableArea>
  );
};
