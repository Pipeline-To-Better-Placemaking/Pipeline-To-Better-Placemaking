import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, IndexPath, Select, SelectItem, Modal } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, Datepicker } from '@ui-kitten/components';
import { DateTimePickerModal, DateTimePicker } from "react-native-modal-datetime-picker";
import { ViewableArea, ContentContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './form.styles';

export function CreateTimeSlots(props) {

  const today = new Date();

  // This is the index of the current time slot we're modifying
  const [selectedIndex, setSelectedIndex] = useState(0);

  // start time
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [timeValue, setTimeValue] = useState(today);

  // used for Modal
  const [tempNum, setTempNum] = useState('');

  // number of researchers
  const [researchersVisible, setResearchersVisible] = useState(false);

  // duration (time limit)
  const [durationVisible, setDurationVisible] = useState(false);

  // select multiple standing points
  const [tempPoints, setTempPoints] = useState([]);
  const [selectPointsVisible, setSelectPointsVisible] = useState(false);
  const [selectedPointsIndex, setSelectedPointsIndex] = useState([]);
  const groupDisplayValues = selectedPointsIndex.map(index => {
    return "Point " + (index.row + 1);
  });

  // helper function to get a readable time string value
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
    // load the current value
    setTimeValue(props.timeSlots[index].timeVal);
    // set the index for which time slot we're editing
    setSelectedIndex(index);
    // view the modal
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
        assignedPoints: [],
        assignedPointsString: '',
        assignedPointIndicies: [],
    };
    props.setTimeSlots(timeSlots => [...timeSlots,temp]);
  }

  const deleteTime = (value, timeIndex) => {
    props.timeSlots.splice(timeIndex, 1);
    props.setTimeSlots(timeSlots => [...timeSlots]);
  }

  const editResearchers = (item, index) => {
    // load the current value
    setTempNum(props.timeSlots[index].numResearchers);
    // set the index for which time slot we're editing
    setSelectedIndex(index);
    // view the modal
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
    // load the current value
    setTempNum(props.timeSlots[index].duration);
    // set the index for which time slot we're editing
    setSelectedIndex(index);
    // view the modal
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

  const editPoints = (item, index) => {
    // load the current value
    setSelectedPointsIndex(props.timeSlots[index].assignedPointIndicies);
    // set the index for which time slot we're editing
    setSelectedIndex(index);
    // view the modal
    setSelectPointsVisible(true);
  };

  const confirmPointsModal = () => {
    // Get info
    let tempList = [...props.timeSlots];
    let timeSlot = {...tempList[selectedIndex]};

    // set new value
    timeSlot.assignedPoints = selectedPointsIndex.map(value => {
      return props.standingPoints[value.row];
    })

    timeSlot.assignedPointIndicies = selectedPointsIndex;
    timeSlot.assignedPointsString = groupDisplayValues.join(', ');

    // put the item back in the list
    tempList[selectedIndex] = timeSlot;

    // Update
    props.setTimeSlots(timeSlots => [...tempList]);
    setSelectPointsVisible(false);
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
    setSelectPointsVisible(false);
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
      style={{width:'60%'}}
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
        <Button style={{marginTop:5}} onPress={confirmModal}>
          Comfirm
        </Button>
      </Card>
    </Modal>
  );

  const SelectPointsModal = () => (
    <Modal
      style={{width:'80%'}}
      visible={selectPointsVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dimissModal}
    >
      <Card disabled={true}>
        <Text>Select Points: </Text>
        <Select
         multiSelect={true}
         value={groupDisplayValues.join(', ')}
         selectedIndex={selectedPointsIndex}
         onSelect={index => setSelectedPointsIndex(index)}>
         {props.standingPoints.map((value, index) => {
           return (<SelectItem key={index} title={"Point " + (index+1)}/>);
         })}
       </Select>
        <Button style={{marginTop:10}} onPress={confirmPointsModal}>
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

  const SelectPoints = ({item, index}) => (
      <View style={{flexDirection:'row'}}>
        <Button
          disabled={props.standingPoints.length <= 0}
          style={{marginLeft:-20}}
          onPress={() => editPoints(item, index)}
          accessoryRight={PinIcon}
          appearance='ghost'
        >
          <Text>Standing Points: {item.assignedPointsString}</Text>
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
              <SelectPoints {...{item, index}} />
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

          <SelectPointsModal />

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
            style={{marginTop:15, marginBottom:15}}
            data={props.timeSlots}
            ItemSeparatorComponent={Divider}
            renderItem={signUpCard}
          />

          <View style={styles.activityView}>
            <Button
              onPress={() => props.navigation.goBack()}
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

const PinIcon = (props) => (
  <Icon {...props} name='pin-outline'/>
);
