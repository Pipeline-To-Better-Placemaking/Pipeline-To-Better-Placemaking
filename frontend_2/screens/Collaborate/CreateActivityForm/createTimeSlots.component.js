import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, IndexPath, Select, SelectItem, Modal } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, Datepicker } from '@ui-kitten/components';
import { DateTimePickerModal, DateTimePicker } from "react-native-modal-datetime-picker";
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { StopWatch } from '../../components/Icons/reactIcons.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './form.styles';

export function CreateTimeSlots(props) {

  const today = new Date();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // start time
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [timeValue, setTimeValue] = useState(today);

  // used for Modal
  const [tempNum, setTempNum] = useState('');

  // number of researchers
  const [researchersVisible, setResearchersVisible] = useState(false);

  // Duration (time limit)
  const [durationVisible, setDurationVisible] = useState(false);

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

  const editTime = (item, index) => {
    setTimeValue(props.timeSlots[index].timeVal);
    setSelectedIndex(index);
    setTimePickerVisibility(true);
  }

  const setTime = (time) => {
    // Get info
    let tempList = [...props.timeSlots];
    let timeSlot = {...tempList[selectedIndex]};

    // set new value
    timeSlot.timeVal = time;
    timeSlot.timeString = getTimeStr(time);

    // put the item back in the list
    tempList[selectedIndex] = timeSlot;

    // Update
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
        numResearchers: '1',
        duration: '30',
    };
    props.setTimeSlots(timeSlots => [...timeSlots,temp]);
  }

  const deleteTime = (value, timeIndex) => {
    props.timeSlots.splice(timeIndex, 1);
    props.setTimeSlots(timeSlots => [...timeSlots]);
  }

  const editResearchers = (item, index) => {
    setTempNum(props.timeSlots[index].numResearchers);
    setSelectedIndex(index);
    setResearchersVisible(true);
  }

  const setResearchers = () => {
    // Get info
    let tempList = [...props.timeSlots];
    let timeSlot = {...tempList[selectedIndex]};

    // set new value
    timeSlot.numResearchers = tempNum;

    // put the item back in the list
    tempList[selectedIndex] = timeSlot;

    // Update
    props.setTimeSlots(timeSlots => [...tempList]);
  }

  const editDuration = (item, index) => {
    setTempNum(props.timeSlots[index].duration);
    setSelectedIndex(index);
    setDurationVisible(true);
  }

  const setDuration = () => {
    // Get info
    let tempList = [...props.timeSlots];
    let timeSlot = {...tempList[selectedIndex]};

    // set new value
    timeSlot.duration = tempNum;

    // put the item back in the list
    tempList[selectedIndex] = timeSlot;

    // Update
    props.setTimeSlots(timeSlots => [...tempList]);
  }

  const confirmModal = () => {
    if (researchersVisible) {
      setResearchers()
    } else if (durationVisible) {
      setDuration()
    }
    dimissModal();
  }

  const dimissModal = () => {
    setResearchersVisible(false);
    setDurationVisible(false);
  }

  const TimePicker = ({item, index}) => (
      <View style={{marginLeft:-20}}>
        <Button
          onPress={() => editTime(item, index)}
          accessoryRight={ClockIcon}
          appearance='ghost'
          >
          <Text>Start Time </Text>
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

  const EnterNumberModal = () => (
    <Modal
      visible={researchersVisible || durationVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dimissModal}
    >
      <Card disabled={true}>
        <Text>Enter Number:          </Text>
        <Input
          placeholder={''}
          value={tempNum}
          onChangeText={(nextValue) => setTempNum(nextValue)}
          keyboardType="numeric"
        />
        <Button onPress={confirmModal}>
          Comfirm
        </Button>
      </Card>
    </Modal>
  );

  const NumResearchers = ({item, index}) => (
      <View style={{flexDirection:'row'}}>
        <Button
          style={{marginLeft:-20}}
          onPress={() => editResearchers(item, index)}
          accessoryRight={ResearchersIcon}
          appearance='ghost'
        >
          <Text>Number of Researchers: {item.numResearchers}</Text>
        </Button>
      </View>
  );

  const Duration = ({item, index}) => (
      <View style={{flexDirection:'row'}}>
        <Button
          style={{marginLeft:-20}}
          onPress={() => editDuration(item, index)}
          accessoryRight={ClockIcon}
          appearance='ghost'
        >
          <Text>Time Limit: {item.duration} (min)</Text>
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
              <Duration {...{item, index}} />
              <NumResearchers {...{item, index}} />
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

          <EnterNumberModal />

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

const ResearchersIcon = (props) => (
  <Icon {...props} name='people-outline'/>
);
