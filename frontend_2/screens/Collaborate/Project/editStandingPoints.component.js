import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { MapWrapper, ShowAreas, MapAddOne, ShowMarkers } from '../../components/Maps/mapPoints.component';
import { ModalContainer, ConfirmDelete } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditPoints(props) {

  if(props.pointInfo === null) {
    return (null)
  }

  const [pointName, setPointName] = useState(props.pointInfo.title);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const cancel = async () => {
    await setPointName('');
    await props.setVisible(false);
  }

  const done = async () => {
    if(props.pointInfo.newPoint) {
      await saveNewPoint();
    } else {
      await saveEditPoint();
    }
    await setPointName('');
    await props.setVisible(false);
  }

  const getName = () => {
    if(pointName === null || pointName.trim() === '' || pointName.trim().length <= 0) {
      return props.pointInfo.title;
    } else {
      return pointName;
    }
  }

  const saveNewPoint = async() => {
    let token = props.token
    let success = false
    let res = null

    // Save the new point
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                    props.project._id +
                                    '/standing_points', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              title: getName(),
              latitude: props.pointInfo.latitude,
              longitude: props.pointInfo.longitude
          })
      })
      res = await response.json()
      success = true
    } catch (error) {
      console.log("error ", error)
    }
    if(res.success !== undefined){
      success = res.success
      console.log("success: ", success);
    }
    console.log("save new point response ", res);
    if(success) {

      // update list of standingPoints (This has to be done by just updating the project)
      let tempPoint = {...props.pointInfo};
      tempPoint._id = res._id;
      tempPoint.title = res.title;
      let tempPoints = [...props.project.standingPoints, tempPoint];
      let tempProject = {...props.project};
      tempProject.standingPoints = tempPoints;
      await props.setProject(tempProject);
    }
  }

  const saveEditPoint = async() => {
    let token = props.token
    let success = false
    let res = null
    console.log("editing point with id:", props.pointInfo._id);
    // Save the new area
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                    props.project._id +
                                    '/standing_points/' +
                                    props.pointInfo._id, {
          method: 'PUT',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              title: getName(),
              latitude: props.pointInfo.latitude,
              longitude: props.pointInfo.longitude
          })
      })
      res = await response.json()
      success = true
    } catch (error) {
      console.log("error ", error)
    }
    if(res.success !== undefined){
      success = res.success
      console.log("success: ", success);
    }
    console.log("save edit pt response ", res);
    if(success) {
      let tempPoint = {...props.pointInfo};
      tempPoint.title = getName();
      let tempPoints = [...props.project.standingPoints];
      tempPoints[props.pointInfo.index] = tempPoint;
      let tempProject = {...props.project};
      tempProject.standingPoints = tempPoints;
      await props.setProject(tempProject);
    }
  }

  const deletePoint = async() => {
    // do not delete a newPoint, must have at least 1 point
    if(props.project.standingPoints.length-1 > 0 && !props.pointInfo.newPoint) {
      let token = props.token
      let success = false
      let res = null
      console.log("deleteing point with id:", props.pointInfo._id);
      // Delete point
      try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                        props.project._id +
                                        '/standing_points/' +
                                        props.pointInfo._id, {
              method: 'DELETE',
              headers: {
                  Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
              }
          })
          res = await response.json()
          success = true
      } catch (error) {
          console.log("error ", error)
      }
      if(res.success !== undefined){
        success = res.success
        console.log("success: ", success);
      }
      console.log("delete pt response ", res);
      if (success) {
        // update list of standing points
        let index = props.project.standingPoints.findIndex(element => element._id === props.pointInfo._id);
        let tempPoints = [...props.project.standingPoints];
        tempPoints.splice(index, 1);
        let tempProject = {...props.project};
        tempProject.standingPoints = tempPoints;
        await props.setProject(tempProject);
      }
    }

    await setConfirmDeleteVisible(false);
    await props.setVisible(false);
  }

  const setMarker = async (coords) => {
    let temp = {...props.pointInfo};
    temp.latitude = coords.latitude;
    temp.longitude = coords.longitude;
    await props.setPointInfo(point => temp);
  }

  return (
    <ModalContainer {...props} visible={props.visible}>
      <ConfirmDelete
        visible={confirmDeleteVisible}
        setVisible={setConfirmDeleteVisible}
        dataType={"standing point"}
        deleteFunction={deletePoint}
      />
      <View style={{justifyContent:'flex-start'}}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom: 5}}>
          <Input
            onChangeText={(value) => setPointName(value)}
            placeholder={'Enter Point Name...'}
            style={{flex:1, marginRight: 5, fontSize:25}}
          >
            {props.pointInfo.title}
          </Input>
          <Button
            status='danger'
            onPress={() => cancel()}
          >
            Cancel
          </Button>
        </View>

        <View style={{height:'90%'}}>
          <MapAddOne
            areas={props.project.subareas}
            marker={props.pointInfo}
            setMarker={setMarker}
          >
          </MapAddOne>
        </View>
      </View>

      <View style={{flexDirection:'row', justifyContent: 'space-between', margin:5}}>
        <Button
          status='danger'
          onPress={() => setConfirmDeleteVisible(true)}
          accessoryLeft={DeleteIcon}
        >
          Delete
        </Button>
        <Button
          status='success'
          onPress={() => done()}
          accessoryLeft={CreateIcon}
        >
          Done
        </Button>
      </View>
    </ModalContainer>
  )
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
