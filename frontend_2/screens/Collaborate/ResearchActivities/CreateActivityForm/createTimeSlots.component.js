import React, { useState } from 'react';
import { View } from 'react-native';
import { Select, SelectItem, Modal, Text, Button, Input, Icon, Divider, List, Card } from '@ui-kitten/components';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { HeaderExit } from '../../../components/headers.component';

import { styles } from './createTimeSlots.styles';

export function CreateTimeSlots(props) {

  // This is the index of the current time slot we're modifying
  const [selectedIndex, setSelectedIndex] = useState(0);

  // start time
  const today = new Date();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [timeValue, setTimeValue] = useState(today);

  // number of researchers
  const [researchersVisible, setResearchersVisible] = useState(false);
  const [tempNum, setTempNum] = useState(''); // used for Pop up

  // select multiple standing points
  //const [tempPoints, setTempPoints] = useState([]);
  const [selectPointsVisible, setSelectPointsVisible] = useState(false);
  const [selectedPointsIndex, setSelectedPointsIndex] = useState([]);
  const groupDisplayValues = selectedPointsIndex.map(index => {
    return props.standingPoints[index.row].title;
  });

  // edit start time value for timeslot
  const editTime = (item, index) => {
    // load the current value
    setTimeValue(props.timeSlots[index].date);
    // set the index for which time slot we're editing
    setSelectedIndex(index);
    // view the modal
    setTimePickerVisibility(true);
  }

  // set the start time value for timeslot
  const setTime = (time) => {
    // Get info
    let tempList = [...props.timeSlots];
    let timeSlot = {...tempList[selectedIndex]};

    // set new value
    timeSlot.date = time;
    timeSlot.timeString = getTimeStr(time);

    // put the item back in the list
    tempList[selectedIndex] = timeSlot;

    // Update
    props.setTimeSlots(timeSlots => [...tempList]);
    setTimeValue(time);
    setTimePickerVisibility(false);
  }

  // create a new timeslot
  const createTime = () => {
    // this uses the last value in the timeSlots list as the new start time value
    let time = timeValue;
    let indicies = [];
    let numResearchers = '1';
    let length = props.timeSlots.length;

    if (length > 0) {
      time = props.timeSlots[length-1].date;
      numResearchers = props.timeSlots[length-1].maxResearchers;
      indicies = props.timeSlots[length-1].assignedPointIndicies;
    }
    let temp = {
        date: time,
        timeString: getTimeStr(time),
        maxResearchers: numResearchers,
        researchers: [],
        assignedPointIndicies: indicies,
    };
    props.setTimeSlots(timeSlots => [...timeSlots,temp]);
  }

  // delete time slot
  const deleteTime = (value, timeIndex) => {
    props.timeSlots.splice(timeIndex, 1);
    props.setTimeSlots(timeSlots => [...timeSlots]);
  }

  const editResearchers = (item, index) => {
    // load the current value
    setTempNum(props.timeSlots[index].maxResearchers);
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
    timeSlot.maxResearchers = tempNum;

    // put the item back in the list
    tempList[selectedIndex] = timeSlot;

    // Update
    props.setTimeSlots(timeSlots => [...tempList]);
  }

  const editPoints = async (item, index) => {
    // load the current value
    await setSelectedPointsIndex(props.timeSlots[index].assignedPointIndicies);
    // set the index for which time slot we're editing
    await setSelectedIndex(index);
    // view the modal
    setSelectPointsVisible(true);
  };

  const confirmPointsModal = () => {
    // Get info
    let tempList = [...props.timeSlots];
    let timeSlot = {...tempList[selectedIndex]};

    // set new value
    timeSlot.assignedPointIndicies = selectedPointsIndex;

    // put the item back in the list
    tempList[selectedIndex] = timeSlot;

    // Update
    props.setTimeSlots(timeSlots => [...tempList]);
    setSelectPointsVisible(false);
  }

  const confirmModal = () => {
    if (researchersVisible) {
      setResearchers()
    }
    dimissModal();
  }

  const dimissModal = () => {
    setResearchersVisible(false);
    setSelectPointsVisible(false);
  }

  const getPointsString = (timeSlot) => {
    let tempPoints = [];
    timeSlot.assignedPointIndicies.map(index => {
      tempPoints.push(props.standingPoints[index.row].title);
    });
    return tempPoints.join(', ');
  }

  const TimePicker = ({item, index}) => (
      <View style={styles.leftShift}>
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

  const NumResearchers = ({item, index}) => (
      <View style={styles.rowView}>
        <Button
          style={styles.leftShift}
          onPress={() => editResearchers(item, index)}
          accessoryRight={ResearchersIcon}
          appearance='ghost'
        >
          <Text>Number of Researchers: {item.maxResearchers}</Text>
        </Button>
      </View>
  );

  const EnterNumberModal = () => (
    <Modal
      style={styles.modal}
      visible={researchersVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dimissModal}
    >
      <Card disabled={true}>
        <Text>Enter Number:          </Text>
        <Input
          placeholder={''}
          value={tempNum}
          onChangeText={(nextValue) => setTempNum(nextValue)}
          keyboardType="number-pad"
        />
        <Button style={styles.confirmButton} onPress={confirmModal}>
          Confirm
        </Button>
      </Card>
    </Modal>
  );

  const SelectPointsModal = () => (
    <Modal
      style={styles.modal}
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
           return (<SelectItem key={index} title={value.title}/>);
         })}
       </Select>
        <Button style={styles.confirmButton1} onPress={confirmPointsModal}>
          Confirm
        </Button>
      </Card>
    </Modal>
  );

  const SelectPoints = ({item, index}) => (
      <View style={styles.rowView}>
        <Button
          disabled={props.standingPoints.length <= 0}
          style={styles.leftShift}
          onPress={() => editPoints(item, index)}
          accessoryRight={PinIcon}
          appearance='ghost'
        >
          <Text>Standing Points: {getPointsString(item)}</Text>
        </Button>
      </View>
  );

  const Delete = ({item, index}) => (
      <View style={styles.deleteButtonView}>
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
      <View style={styles.cardView}>

        <View style={styles.columnView}>
          <TimePicker {...{item, index}} />
          <NumResearchers {...{item, index}} />
          {/* may need to add the other tests (everything but sound test) to not show standing points */}
          {( props.selectedActivity === 'Survey' || props.selectedActivity === 'Boundary' ? 
            null 
          : 
            <SelectPoints {...{item, index}} />)}
        </View>

        <View style={styles.endView}>
          <Delete {...{item, index}}/>
        </View>

      </View>
    </Card>
  );

  return (
    <ViewableArea>
      <HeaderExit text={props.headerText} exit={props.exit}/>

      <EnterNumberModal />
      <SelectPointsModal />

      <ContentContainer>
        <View style={styles.container}>

          <View style={styles.btnView}>
            <Button
              onPress={createTime}
              accessoryLeft={PlusIcon}
            >
              Create Time Slot
            </Button>
          </View>

          <List
            style={styles.listView}
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
