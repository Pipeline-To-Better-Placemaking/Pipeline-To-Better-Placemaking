import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { MapWrapper, ShowAreas, MapAddArea, ShowMarkers, getAreaName } from '../../components/Maps/mapPoints.component';
import { ModalContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditPoints(props) {

  if(props.areaInfo === null) {
    return (null)
  }

  const [areaName, setAreaName] = useState(props.areaInfo.title);

  const cancel = () => {
    setAreaName('');
    props.setVisible(false);
  }

  const done = () => {
    if(props.areaInfo.newArea) {
      saveNewArea();
    } else {
      saveEditArea();
    }
    setAreaName('');
    props.setVisible(false);
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
    console.log("response ", res);
    if(success) {
      // update list of sub Areas (This has to be done by just updating the project)
      let tempArea = {...res};
      let tempSubareas = [...props.project.subareas];
      tempSubareas[props.areaInfo.index] = tempArea;
      let tempProject = {...props.project};
      tempProject.subareas = tempSubareas;
      props.setProject(tempProject);
    }
  }

    const saveEditArea = async() => {
        let token = await AsyncStorage.getItem("@token")
        let success = false
        let res = null
        // if we're editing the project perimeter then update the location name
        if(props.areaInfo.index === 0){
          updateProjectPerimeter();
        }

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
        console.log("response ", res);
        if(success) {
          // update list of sub Areas (This has to be done by just updating the project)
          let tempArea = {...props.areaInfo};
          let tempSubareas = [...props.project.subareas];
          tempSubareas[props.areaInfo.index] = tempArea;
          let tempProject = {...props.project};
          tempProject.subareas = tempSubareas;
          props.setProject(tempProject);
        }
    }

    const deleteArea = async() => {
      // do not delete the project perimeter, or a newArea
      if(props.areaInfo.index !== 0 && props.project.subareas.length > props.areaInfo.index && !props.areaInfo.newArea) {
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
          console.log("response ", res);
          if (success) {
            // update list of subAreas
            let tempSubareas = [...props.project.subareas];
            tempSubareas.splice(props.areaInfo.index, 1);
            let tempProject = {...props.project};
            tempProject.subareas = tempSubareas;
            props.setProject(tempProject);
          }
      }

      props.setVisible(false);
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
      console.log("response ", res);
      if(success) {
        // update project
        let tempProject = {...props.project};
        tempProject.description = description;
        props.setProject(tempProject);
      }
    }

  return (
    <ModalContainer {...props} visible={props.visible}>
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
          onPress={() => deleteArea()}
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
