import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, Datepicker } from '@ui-kitten/components';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { MapAdd, ShowArea, ShowMarkers } from '../../../components/Maps/mapPoints.component';
import { HeaderExit } from '../../../components/headers.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './form.styles';

export function CreateStandingPoints(props) {

  return (
    <ViewableArea>
      <HeaderExit text={props.headerText} exit={props.exit}/>
      <ContentContainer>
        <View style={styles.container}>
          <View style={styles.container, {justifyContent:'flex-start'}}>

            <View style={styles.activityView, {justifyContent:'center'}}>
              <Text style={{textAlign:'center', marginBottom:5, fontSize:20}} category='s1'>Create Standing Points</Text>
            </View>

            <View style={{maxHeight:'80%'}}>
              <MapAdd
                location={props.area[0]}
                markers={props.standingPoints}
                setMarkers={props.setStandingPoints}
                mapHeight={'50%'}
                listHeight={'50%'}
              >
                <ShowArea area={props.area} />
                <ShowMarkers markers={props.standingPoints} />
              </MapAdd>
            </View>
          </View>

          <View style={styles.activityView}>
            <Button
              onPress={() => props.navigation.goBack()}
              status='info'
              accessoryLeft={BackIcon}
            >
              Back
            </Button>
            <Button
              onPress={() => props.navigation.navigate('CreateTimeSlots')}
              status='info'
              accessoryRight={ForwardIcon}
            >
              Next
            </Button>
          </View>

        </View>
      </ContentContainer>
    </ViewableArea>
  );
};

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-forward-outline'/>
);

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);

const CancelIcon = (props) => (
  <Icon {...props} name='close-outline'/>
);

const DeleteIcon = (props) => (
  <Icon {...props} name='trash-2-outline'/>
);

const CreateIcon = (props) => (
  <Icon {...props} name='checkmark-outline'/>
);

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

const ClockIcon = (props) => (
  <Icon {...props} name='clock-outline'/>
);

const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);
