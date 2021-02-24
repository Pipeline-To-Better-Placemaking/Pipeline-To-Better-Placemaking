import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { ModalContainer, PopUpContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditActivityInfo(props) {

  // used for Modal
  const [tempNum, setTempNum] = useState('');

  // which value are we editing
  const [editSurveyVisible, setEditSurveyVisible] = useState(false);
  const [editSMVisible, setEditSMVisible] = useState(false);
  const [editPMVisible, setEditPMVisible] = useState(false);

  const close = () => {
    props.setVisible(false);
  }

  const confirmModal = async() => {
    if (editSurveyVisible) {
      let success = false
      let res = null

      try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id, {
              method: 'PUT',
              headers: {
                  Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + props.token
              },
              body: JSON.stringify({
                  surveyDuration: parseInt(tempNum),
              })
          })
          res = await response.json()
          success = true
      } catch (error) {
          console.log("ERROR: ", error)
      }

      if (res.success !== undefined){
        success = res.success;
      }
      // if successfully updated info
      if(success) {
        let temp = {...props.project};
        temp.surveyDuration = parseInt(tempNum);
        props.setProject(temp);
      }
    } else if (editSMVisible) {
      let success = false
      let res = null

      try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id, {
              method: 'PUT',
              headers: {
                  Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + props.token
              },
              body: JSON.stringify({
                  stationaryDuration: parseInt(tempNum),
              })
          })
          res = await response.json()
          success = true
      } catch (error) {
          console.log("ERROR: ", error)
      }

      if (res.success !== undefined){
        success = res.success;
      }
      // if successfully updated info
      if(success) {
        let temp = {...props.project};
        temp.stationaryDuration = parseInt(tempNum);
        props.setProject(temp);
      }
    } else if (editPMVisible) {
      let success = false
      let res = null

      try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id, {
              method: 'PUT',
              headers: {
                  Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + props.token
              },
              body: JSON.stringify({
                  movingDuration: parseInt(tempNum),
              })
          })
          res = await response.json()
          success = true
      } catch (error) {
          console.log("ERROR: ", error)
      }

      if (res.success !== undefined){
        success = res.success;
      }
      // if successfully updated info
      if(success) {
        let temp = {...props.project};
        temp.movingDuration = parseInt(tempNum);
        props.setProject(temp);
      }
    }
    dimissModal();
  }

  const dimissModal = () => {
    setEditSurveyVisible(false);
    setEditSMVisible(false);
    setEditPMVisible(false);
    setTempNum('');
  }

  return (
    <ModalContainer {...props} visible={props.visible}>
      <PopUpContainer
        {...props}
        visible={editSurveyVisible || editSMVisible || editPMVisible}
        closePopUp={dimissModal}
      >
        <Text>Enter Number:          </Text>
        <Input
          placeholder={''}
          value={tempNum}
          onChangeText={(nextValue) => setTempNum(nextValue)}
          keyboardType="number-pad"
        />
        <Button style={{marginTop:5}} onPress={confirmModal}>
          Comfirm
        </Button>
      </PopUpContainer>

      <ScrollView>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text category='h5' style={{fontSize:25}}>Activity Information</Text>
          <Button
            style={{marginBottom:5}}
            onPress={close}
            status='info'
            appearance={'outline'}
          >
            Done
          </Button>
        </View>

        <View style={{marginTop:10, marginBottom:10}}>
          <Text category='s1'>Survey </Text>
          <Divider />
          <Text>Defaults: </Text>
          <Button
            onPress={() => setEditSurveyVisible(true)}
            accessoryRight={EditIcon}
            appearance={'ghost'}
            size={'small'}
          >
            <Text>Time at Site: {props.project.surveyDuration} (min)</Text>
          </Button>
        </View>

        <View style={{marginBottom:10}}>
          <Text category='s1'>Stationary Map Activity </Text>
          <Divider />
          <Text status='danger'>This activity requires Standing Points to be set.</Text>
          <Text>Defaults: </Text>
          <Button
            onPress={() => setEditSMVisible(true)}
            accessoryRight={EditIcon}
            appearance={'ghost'}
            size={'small'}
          >
            <Text>Time per Standing Point: {props.project.stationaryDuration} (min)</Text>
          </Button>
        </View>

        <View style={{marginBottom:10}}>
          <Text category='s1'>People Moving Activity </Text>
          <Divider />
          <Text status='danger'>This activity requires Standing Points to be set.</Text>
          <Text>Defaults: </Text>
          <Button
            onPress={() => setEditPMVisible(true)}
            accessoryRight={EditIcon}
            appearance={'ghost'}
            size={'small'}
          >
            <Text>Time per Standing Point: {props.project.movingDuration} (min)</Text>
          </Button>
        </View>
      </ScrollView>
    </ModalContainer>
  );
};

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

const CancelIcon = (props) => (
  <Icon {...props} name='close-outline'/>
);

const CreateIcon = (props) => (
  <Icon {...props} name='checkmark-outline'/>
);

const EditIcon = (props) => (
  <Icon {...props} name='edit-outline'/>
);

const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);

const DeleteIcon = (props) => (
  <Icon {...props} name='trash-2-outline'/>
);
