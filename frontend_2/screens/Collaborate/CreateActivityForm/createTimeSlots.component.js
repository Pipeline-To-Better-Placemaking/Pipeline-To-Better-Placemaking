import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, Datepicker } from '@ui-kitten/components';
import { DateTimePickerModal, DateTimePicker } from "react-native-modal-datetime-picker";
import { ViewableArea, ContentContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './form.styles';

export function CreateTimeSlots(props) {

  const today = new Date();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [timeValue, setTimeValue] = useState(today);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getTimeStr = (time) => {
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

  const viewTime = (item, index) => {
    setTimeValue(props.timeSlots[index].timeVal);
    setSelectedIndex(index);
    setTimePickerVisibility(true);
  }

  const setTime = (time) => {
    let tempList = [...props.timeSlots];
    let timeSlot = {...tempList[selectedIndex]};

    timeSlot.timeVal = time;
    timeSlot.timeString = getTimeStr(time);

    tempList[selectedIndex] = timeSlot;
    props.setTimeSlots(timeSlots => [...tempList]);
    setTimeValue(time);
    setTimePickerVisibility(false);
  }

  const createTime = () => {
    // this uses the last value in the timeSlots list as the new start time value
    let time = timeValue;
    let length = props.timeSlots.length;
    if (length > 0) {
      time = props.timeSlots[length-1].timeVal;
    }
    let temp = {
        timeVal: time,
        timeString: getTimeStr(time),
    };
    props.setTimeSlots(timeSlots => [...timeSlots,temp]);
  }

  const deleteTime = (value, timeIndex) => {
    props.timeSlots.splice(timeIndex, 1);
    props.setTimeSlots(timeSlots => [...timeSlots]);
  }

  const TimePicker = ({item, index}) => (
      <View style={{marginLeft:-20}}>
        <Button
          onPress={() => viewTime(item, index)}
          accessoryRight={ClockIcon}
          appearance='ghost'
          >
          <Text>Time </Text>
          <Text>{item.timeString} </Text>
        </Button>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          date={timeValue}
          onConfirm={setTime}
          onCancel={() => setTimePickerVisibility(false)}
        />
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
    <ViewableArea>
      <ContentContainer>
        <View style={styles.container}>

          <View style={styles.activityView}>
            <Text>Create New Research Activity</Text>
            <Button
              onPress={() => props.navigation.navigate('ProjectPage')}
              status={'danger'}
              appearance={'ghost'}
              accessoryLeft={CancelIcon}
            >
            </Button>
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
            data={props.timeSlots}
            ItemSeparatorComponent={Divider}
            renderItem={signUpCard}
          />

          <View style={styles.activityView}>
            <Button
              onPress={() => props.navigation.navigate('CreateStandingPoints')}
              status='info'
              accessoryLeft={BackIcon}
            >
              Back
            </Button>
            <Button
              onPress={() => props.create()}
              status='success'
              accessoryRight={DoneIcon}
            >
              Complete
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

const DoneIcon = (props) => (
  <Icon {...props} name='done-all-outline'/>
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
