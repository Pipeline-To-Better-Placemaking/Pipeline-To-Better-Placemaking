import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Select, SelectItem, Text, Button, Input, Icon, Datepicker } from '@ui-kitten/components';
import { ViewableArea, ContentContainer, EnterNumber, ConfirmDelete } from '../../../components/content.component';
import { HeaderExit } from '../../../components/headers.component';
import { retrieveTestName } from '../../../components/helperFunctions';

import { styles } from './initialInformation.styles';

export function IntialForm(props) {

  const today = new Date();
  const [editDurationVisible, setEditDurationVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [select, setSelect] = useState(false);

  const next = () => {
    if(props.selectArea) {
      props.navigation.navigate('SelectLocation')
    } else {
      props.navigation.navigate('CreateTimeSlots')
    }
  };

  // used to set the inital timeslots based on the selected activity/test
  useEffect(()=>{
    if(select){
      // inital timeslots for stationary, people moving, and survey activities
      if(
        props.activityTypes[props.selectedActivityIndex.row] === 'Stationary Map' || 
        props.activityTypes[props.selectedActivityIndex.row] === 'People Moving' ||
        props.activityTypes[props.selectedActivityIndex.row] === 'Survey'
      ){  
        props.setDuration('15');
        setSelect(false);
      }
      // security activities
      // sound test's inital timeslot is 30 sec
      else if(props.activityTypes[props.selectedActivityIndex.row] === 'Sound'){  
        props.setDuration('30');
        setSelect(false);
      }
      // inital timeslot for boundary, light, nature, and order tests is 20 min
      else if(
        props.activityTypes[props.selectedActivityIndex.row] === 'Boundary' ||
        props.activityTypes[props.selectedActivityIndex.row] === 'Nature' ||
        props.activityTypes[props.selectedActivityIndex.row] === 'Light' ||
        props.activityTypes[props.selectedActivityIndex.row] === 'Order'
      ){
        props.setDuration('20');
        setSelect(false);
      }
    }
  }, [select])

  return (
    <ViewableArea>
      <HeaderExit text={props.headerText} exit={props.exit}/>
      <EnterNumber
        {...props}
        visible={editDurationVisible}
        value={props.duration}
        setValue={props.setDuration}
        closePopUp={() => setEditDurationVisible(false)}
      />
      <ContentContainer>
        <ConfirmDelete
          visible={confirmDeleteVisible}
          setVisible={setConfirmDeleteVisible}
          dataType={"research activity"}
          deleteFunction={props.deleteActivity}
        />
        <View style={styles.container}>
          <View style={styles.container}>

            <View style={styles.activityView}>
              <Text>Name: </Text>
              <Input
                placeholder={retrieveTestName(props.activityTypes[props.selectedActivityIndex.row])}
                value={props.activityName}
                onChangeText={(nextValue) => props.setActivityName(nextValue)}
                style={styles.input}
              />
            </View>
            {props.updateActivity ?
              <View style={styles.activityView}>
                <Text>Research Activity: {retrieveTestName(props.activityTypes[props.selectedActivityIndex.row])}</Text>
              </View>
            :
              <View style={styles.activityView}>
                <Text>Select a Research Activity: </Text>
                <Select
                  style={styles.input}
                  placeholder={retrieveTestName(props.activityTypes[0])}
                  value={retrieveTestName(props.activityTypes[props.selectedActivityIndex.row])}
                  selectedIndex={props.selectedActivityIndex}
                  onSelect={index =>{
                    props.setSelectedActivity(index)
                    setSelect(true);
                  }}
                >
                  {props.activityTypes.map((item, index) =>{
                    let testType = retrieveTestName(item);
                    return(
                      <SelectItem key="{item}" title={testType}/>
                    )                  
                  })}
                </Select>
              </View>
            }

            <View style={styles.activityView}>
              <Text>Select a Date: </Text>
              <Datepicker
                style={styles.input}
                placeholder='Pick Date'
                min={today}
                date={props.date}
                value={props.date}
                onSelect={nextDate => props.setDate(nextDate)}
                accessoryRight={CalendarIcon}
                placement={'bottom end'}
              />
            </View>

            <View style={styles.activityView}>
              <Button
                style={styles.leftShift}
                appearance={'ghost'}
                onPress={() => setEditDurationVisible(true)}
              >
                { props.activityTypes[props.selectedActivityIndex.row] === 'Sound' ?
                  <Text>
                    Time per Standing Point: {props.duration} (sec)
                  </Text>
                :
                  <Text>
                    {(props.activityTypes[props.selectedActivityIndex.row] === 'Survey' || 
                    props.activityTypes[props.selectedActivityIndex.row] === 'Boundary' || 
                    props.activityTypes[props.selectedActivityIndex.row] === 'Nature' ||
                    props.activityTypes[props.selectedActivityIndex.row] === 'Light' ||
                    props.activityTypes[props.selectedActivityIndex.row] === 'Order' ?
                      "Time at Site" 
                    : 
                      "Time per Standing Point"
                    )}: {props.duration} (min)
                  </Text>
                }
              </Button>
            </View>

            {(props.errorMessages !== null && props.errorMessages.length > 35 )
              ?
                <View style={styles.errorMsgView}>
                  <Text status='danger' category='s1' style={styles.errorText}>
                    {props.errorMessages}
                  </Text>
                </View>
              :
                null
            }

          </View>

          <View style={styles.activityView}>
            {props.updateActivity ?
              <Button
                onPress={()=>{setConfirmDeleteVisible(true)}}
                status='danger'
                accessoryLeft={DeleteIcon}
                style={styles.deleteButton}
              >
                DELETE
              </Button>
            :
              <View />
            }
            <Button
              onPress={next}
              status='info'
              accessoryRight={ForwardIcon}
              style={styles.button}
            >
              Next
            </Button>
          </View>

        </View>
      </ContentContainer>
    </ViewableArea>
  );
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

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

const ClockIcon = (props) => (
  <Icon {...props} name='clock-outline'/>
);

const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);
