import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, Datepicker } from '@ui-kitten/components';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { SelectArea } from '../../../components/Maps/mapPoints.component';
import { HeaderExit } from '../../../components/headers.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './form.styles';

export function SelectLocation(props) {

  const next = () => {
    props.setArea(props.subareas[props.selectedAreaIndex]);
    props.navigation.navigate('CreateTimeSlots');
  }

  const back = () => {
    props.setArea(props.subareas[props.selectedAreaIndex]);
    props.navigation.goBack();
  }

  return (
    <ViewableArea>
      <HeaderExit text={props.headerText} exit={props.exit}/>
      <ContentContainer>
        <View style={styles.container}>

          <View style={styles.activityView, {justifyContent:'center'}}>
            <Text style={{textAlign:'center', marginBottom:5, fontSize:20}} category='s1'>Set sub location</Text>
          </View>

          <View style={{height:'90%'}}>
            <SelectArea areas={props.subareas} selectedIndex={props.selectedAreaIndex} setSelectedIndex={props.setSelectedAreaIndex}/>
          </View>

          <View style={styles.activityView}>
            <Button
              onPress={back}
              status='info'
              accessoryLeft={BackIcon}
            >
              Back
            </Button>
            <Button
              onPress={next}
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
