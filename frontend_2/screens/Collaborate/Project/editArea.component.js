import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { MapWrapper, ShowAreas, MapAdd, ShowMarkers } from '../../components/Maps/mapPoints.component';
import { ModalContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditPoints(props) {

  if(props.areaInfo === null) {
    return (null)
  }

  const cancel = () => {
    props.setVisible(false);
  }

  const done = () => {
    if(props.areaInfo.newArea){
      saveNewArea();
    } else {
      saveEditArea();
    }
    props.setVisible(false);
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
              area: props.tempArea
          })
      })
      res = await response.json()
      success = true
    } catch (error) {
      console.log("error ", error)
    }
    //console.log("response ", res);
    if(success) {
      // update list of sub Areas (This has to be done by just updateing the project)
      let tempArea = {
        _id: 0, // need to get this from the response if sub area is created
        area: props.tempArea,
      }
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

        // Save the new area
        try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                        props.project._id +
                                        '/areas/' +
                                        props.areaInfo.id, {
              method: 'PUT',
              headers: {
                  Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({
                  area: props.tempArea
              })
          })
          res = await response.json()
          success = true
        } catch (error) {
          console.log("error ", error)
        }
        //console.log("response ", res);
        if(success) {
          // update list of sub Areas (This has to be done by just updateing the project)
          let tempArea = {
            _id: props.areaInfo.id,
            area: props.tempArea,
          }
          let tempSubareas = [...props.project.subareas];
          tempSubareas[props.areaInfo.index] = tempArea;
          let tempProject = {...props.project};
          tempProject.subareas = tempSubareas;
          props.setProject(tempProject);
        }
    }

    const deleteArea = async() => {
        /*if(props.areaInfo.index !== 0 && this.state.subareas.length > this.state.areaIndex) {
            this.state.subareas.splice(this.state.areaIndex, 1);
            let token = await AsyncStorage.getItem("@token")
            let success = false
            let res = null
            console.log("deleteing area with id:", this.state.areaItem._id);
            // Delete area
            try {
                const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                              this.state.project._id +
                                              '/areas/' +
                                              this.state.areaItem._id, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                    }
                })
                res = await response.json()
            } catch (error) {
                console.log("error ", error)
            }
            console.log("response ", res);
        }//*/
    }

  return (
    <ModalContainer {...props} visible={props.visible}>
      <View style={{justifyContent:'flex-start'}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:25}}>{props.areaInfo.title}</Text>
        </View>

        <View style={{height:'80%'}}>
          <MapAdd
            location={props.areaInfo.location}
            markers={props.tempArea}
            setMarkers={props.setTempArea}
            mapHeight={'60%'}
            listHeight={'40%'}
          >
            <ShowMarkers markers={props.tempArea}/>
          </MapAdd>
        </View>
      </View>

      <View style={{flexDirection:'row', justifyContent: 'space-between', margin:5}}>
        <Button
          status='info'
          onPress={() => cancel()}
          accessoryLeft={CancelIcon}
        >
          Cancel
        </Button>
        <Button
          status='info'
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
