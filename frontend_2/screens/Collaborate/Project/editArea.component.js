import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { MapWrapper, ShowAreas, MapAddArea, ShowMarkers, getAreaName } from '../../components/Maps/mapPoints.component';
import { ModalContainer, ConfirmDelete } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditPoints(props) {

  if(props.areaInfo === null) {
    return (null)
  }

  const [areaName, setAreaName] = useState(props.areaInfo.title);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const cancel = async () => {
    await setAreaName('');
    await props.setVisible(false);
  }

  const done = async () => {
    if(props.areaInfo.newArea) {
      await saveNewArea();
    } else {
      await saveEditArea();
    }
    await setAreaName('');
    await props.setVisible(false);
  }

  const getName = () => {
    if(areaName === null || areaName.trim() === '' || areaName.trim().length <= 0) {
      return props.areaInfo.title;
    } else {
      return areaName;
    }
  }

  const saveNewArea = async() => {
    let token = await AsyncStorage.getItem("@token")
    let success = false
    let res = null

    // Save the new area
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                    props.project._id +
                                    '/areas', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              title: getName(),
              points: props.tempArea
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
    console.log("save new area response ", res);
    if(success) {
      // update list of sub Areas (This has to be done by just updating the project)
      let tempArea = {...res};
      let tempSubareas = [...props.project.subareas];
      tempSubareas[props.areaInfo.index] = tempArea;
      let tempProject = {...props.project};
      tempProject.subareas = tempSubareas;
      await props.setProject(tempProject);
    }
  }

    const saveEditArea = async() => {
        let token = await AsyncStorage.getItem("@token")
        let success = false
        let res = null
        // if we're editing the project perimeter then update the location name
        if(props.areaInfo.index === 0){
          await updateProjectPerimeter();
        }
        console.log("save area with id:", props.areaInfo._id);
        // Save the area
        try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                        props.project._id +
                                        '/areas/' +
                                        props.areaInfo._id, {
              method: 'PUT',
              headers: {
                  Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({
                  title: getName(),
                  points: props.tempArea
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

        if(success) {
          console.log("save edit area response ", res);
          let index = props.project.subareas.findIndex(element => element._id === props.areaInfo._id);
          // update list of sub Areas (This has to be done by just updating the project)
          let tempArea = {...props.areaInfo};
          tempArea.points = props.tempArea;
          tempArea.title = getName();
          let tempSubareas = [...props.project.subareas];
          tempSubareas[index] = tempArea;
          let tempProject = {...props.project};
          tempProject.subareas = tempSubareas;
          await props.setProject(val => tempProject);
        }
    }

    const deleteArea = async() => {
      let index = props.project.subareas.findIndex(element => element._id === props.areaInfo._id);
      console.log("delete area with id:", props.areaInfo);
      // do not delete the project perimeter, or a newArea
      if(index >=1 && !props.areaInfo.newArea) {
          let token = await AsyncStorage.getItem("@token")
          let success = false
          let res = null
          console.log("deleteing area with id:", props.areaInfo._id);
          // Delete area
          try {
              const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                            props.project._id +
                                            '/areas/' +
                                            props.areaInfo._id, {
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
          console.log("delete area response ", res);
          if (success) {
            // update list of subAreas
            let tempSubareas = [...props.project.subareas];
            tempSubareas.splice(index, 1);
            let tempProject = {...props.project};
            tempProject.subareas = tempSubareas;
            await props.setProject(val => tempProject);
          }
      }

      await setConfirmDeleteVisible(false);
      await props.setVisible(false);
    }

    const updateProjectPerimeter = async () => {
      let token = await AsyncStorage.getItem("@token")
      let success = false
      let res = null
      let description = await getAreaName(props.tempArea);

      try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                description: description,
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
      console.log("update location name response ", res);
      if(success) {
        // update project
        let tempProject = {...props.project};
        tempProject.description = description;
        await props.setProject(tempProject);
      }
    }

  return (
    <ModalContainer {...props} visible={props.visible}>
      <ConfirmDelete
        visible={confirmDeleteVisible}
        setVisible={setConfirmDeleteVisible}
        dataType={"sub-area"}
        deleteFunction={deleteArea}
      />
      <View style={{justifyContent:'flex-start'}}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom: 5}}>
          <Input
            onChangeText={(value) => setAreaName(value)}
            placeholder={'Enter Area Name...'}
            style={{flex:1, marginRight: 5, fontSize:25}}
          >
            {props.areaInfo.title}
          </Input>
          <Button
            status='danger'
            onPress={() => cancel()}
          >
            Cancel
          </Button>
        </View>

        <View style={{height:'80%'}}>
          <MapAddArea
            location={props.areaInfo.location}
            region={props.areaInfo.location}
            markers={props.tempArea}
            setMarkers={props.setTempArea}
            mapHeight={'60%'}
            listHeight={'40%'}
          >
          </MapAddArea>
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
