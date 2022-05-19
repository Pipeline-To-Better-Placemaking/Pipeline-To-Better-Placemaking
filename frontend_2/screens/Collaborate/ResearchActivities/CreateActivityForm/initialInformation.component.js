import React, { useState } from 'react';
import { View } from 'react-native';
import { Select, SelectItem, Text, Button, Input, Icon, Datepicker } from '@ui-kitten/components';
import { ViewableArea, ContentContainer, EnterNumber, ConfirmDelete } from '../../../components/content.component';
import { HeaderExit } from '../../../components/headers.component';

import { styles } from './initialInformation.styles';

export function IntialForm(props) {

  const today = new Date();
  const [editDurationVisible, setEditDurationVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

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
                placeholder={props.activityTypes[0]}
                value={props.activityName}
                onChangeText={(nextValue) => props.setActivityName(nextValue)}
                style={styles.input}
              />
            </View>
            {props.updateActivity ?
              <View style={styles.activityView}>
                <Text>Research Activity: {props.activityTypes[props.selectedActivityIndex.row]}</Text>
              </View>
            :
              <View style={styles.activityView}>
                <Text>Select a Research Activity: </Text>
                <Select
                  style={styles.input}
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
                <Text>
                {(props.activityTypes[props.selectedActivityIndex.row] === 'Survey' ?
                  "Time at Site" : "Time per Standing Point")}: {props.duration} (min)
                </Text>
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
