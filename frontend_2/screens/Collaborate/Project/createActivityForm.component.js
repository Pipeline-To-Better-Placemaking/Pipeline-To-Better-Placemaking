import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, Datepicker } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './createActivityForm.styles';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
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

export function CreateActivityPopUp(props) {

  const [activityName, setActivityName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [date, setDate] = useState(new Date());
  const today = new Date();
  const [timeSlots, setTimeSlots] = useState([]);

  const dismiss = () => {
    setSelectedIndex(new IndexPath(0));
    setTimeSlots([]);
    setActivityName('');
    props.setVisible(false);
  }

  const create = () => {
    // some error checking if they don't fill everything out
    let name = activityName;
    let row = selectedIndex.row;
    if(row == undefined) {
      row = 0;
    }
    if(activityName.length <= 0) {
      name = props.activityTypes[row];
    }

    // the activity info
    let temp = {
      title: name,
      date: date,
      activity: props.activityTypes[row],
      timeSlots: timeSlots,
    };
    // TODO: POST the activity

    // update activites list
    props.setActivities(activites => [...activites,temp]);

    // clear the values
    dismiss();
  }

  function getTimeStr(time) {
      let hours = time.getHours();
      let minutes = `${time.getMinutes()}`;
      let morning = " AM";
      // 12 hour instead of 24
      if (hours > 12) {
          hours = hours - 12
          morning = " PM";
      } else if (hours === 12) {
          morning = " PM";
      } else if (hours === 0) {
          hours = 12
      }
      // 2 digits
      if (minutes.length !== 2) {
          minutes = 0 + minutes;
      }
      return hours + ":" + minutes + morning;
  }

  const createTime = () => {
    let temp = {
        timeVal: today,
        timeString: getTimeStr(today),
    };
    setTimeSlots(timeSlots => [...timeSlots,temp]);
  }

  const deleteTime = (value, timeIndex) => {
    timeSlots.splice(timeIndex, 1);
    setTimeSlots(timeSlots => [...timeSlots]);
  }

  const TimePicker = ({item, index}) => (
      <View style={{marginLeft:-20}}>
        <Button
          accessoryRight={ClockIcon}
          appearance='ghost'
          >
          <Text>Time </Text>
          <Text>{item.timeString} </Text>
        </Button>
      </View>
  );

  const Delete = ({item, index}) => (
      <View style={{marginRight:-20, marginTop:-10}}>
          <Button
            onPress={() => deleteTime(item, index)}
            accessoryRight={DeleteIcon}
            status='danger'
            appearance='ghost'
           />
      </View>
  );

  const signUpCard = ({item, index}) => (
      <Card>
        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>

          <View style={{flex:1, flexDirection:'column', alignItems:'flex-start'}}>
              <TimePicker {...{item, index}} />
          </View>

          <View style={{alignItems:'flex-end'}}>
              <Delete {...{item, index}}/>
          </View>

        </View>
      </Card>
  );

  return (
    <Popover
      anchor={props.anchor}
      visible={props.visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dismiss}
      fullWidth={true}
    >
      <View style={styles.container}>

        <View style={styles.activityView}>
          <Text>Name: </Text>
          <Input
            placeholder={props.activityTypes[0]}
            value={activityName}
            onChangeText={(nextValue) => setActivityName(nextValue)}
            style={{flex:1}}
          />
        </View>

        <View style={styles.activityView}>
          <Text>Select a Research Activity: </Text>
          <Select
            style={{flex:1}}
            placeholder={props.activityTypes[0]}
            value={props.activityTypes[selectedIndex.row]}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
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
            min={today}
            date={date}
            value={date}
            onSelect={nextDate => setDate(nextDate)}
            accessoryRight={CalendarIcon}
            placement={'bottom end'}
          />
        </View>

        <View style={styles.btnView}>
          <Button
            onPress={createTime}
            accessoryLeft={PlusIcon}
          >
            Create Time Slot
          </Button>
        </View>

        <List
          style={{marginRight:40, maxHeight:500}}
          data={timeSlots}
          ItemSeparatorComponent={Divider}
          renderItem={signUpCard}
        />

        <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
          <Button
            onPress={dismiss}
            status='danger'
            accessoryLeft={CancelIcon}
          >
            Cancel
          </Button>
          <Button
            onPress={create}
            status='success'
            accessoryLeft={CreateIcon}
          >
            Create
          </Button>
        </View>
      </View>
    </Popover>
  );
};
