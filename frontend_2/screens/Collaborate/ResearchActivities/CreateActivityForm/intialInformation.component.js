import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, Datepicker } from '@ui-kitten/components';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { HeaderExit } from '../../../components/headers.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './form.styles';

export function IntialForm(props) {

  const today = new Date();

  const next = () => {
    if(props.selectArea) {
      props.navigation.navigate('SelectLocation')
    } else {
      props.navigation.navigate('CreateTimeSlots')
    }
  };

  return (
    <ViewableArea>
      <HeaderExit text={props.headerText} exit={props.exit}/>
      <ContentContainer>
        <View style={styles.container}>
          <View style={styles.container, {justifyContent: 'space-between'}}>

            <View style={styles.activityView}>
              <Text>Name: </Text>
              <Input
                placeholder={props.activityTypes[0]}
                value={props.activityName}
                onChangeText={(nextValue) => props.setActivityName(nextValue)}
                style={{flex:1}}
              />
            </View>

            <View style={styles.activityView}>
              <Text>Select a Research Activity: </Text>
              <Select
                style={{flex:1}}
                placeholder={props.activityTypes[0]}
                value={props.activityTypes[props.selectedActivityIndex.row]}
                selectedIndex={props.selectedActivityIndex}
                onSelect={index => props.setSelectedActivity(index)}
              >
                {props.activityTypes.map((item, index) =>
                    <SelectItem key="{item}" title={item}/>
                )}
              </Select>
            </View>

            <View style={styles.activityView}>
              <Text>Select a Date: </Text>
              <Datepicker
                style={{flex:1}}
                placeholder='Pick Date'
                min={props.today}
                date={props.date}
                value={props.date}
                onSelect={nextDate => props.setDate(nextDate)}
                accessoryRight={CalendarIcon}
                placement={'bottom end'}
              />
            </View>
          </View>

          <View style={styles.activityView}>
            <View />
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
