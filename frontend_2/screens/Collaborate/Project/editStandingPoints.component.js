import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { MapWrapper, ShowAreas, MapAddOne, ShowMarkers } from '../../components/Maps/mapPoints.component';
import { ModalContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditPoints(props) {

  if(props.areaInfo === null) {
    return (null)
  }

  const [pointName, setPointName] = useState(props.pointInfo.title);

  const cancel = () => {
    setPointName('');
    props.setVisible(false);
  }

  const done = () => {
    if(props.pointInfo.newPoint) {
      saveNewPoint();
    } else {
      saveEditPoint();
    }
    setPointName('');
    props.setVisible(false);
  }

  const getName = () => {
    if(pointName === null || pointName.trim() === '' || pointName.trim().length <= 0) {
      return props.pointInfo.title;
    } else {
      return pointName;
    }
  }

  const saveNewPoint = async() => {
    /*
    let token = await AsyncStorage.getItem("@token")
    let success = false
    let res = null

    // Save the new point
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
              //title: getName() // TODO
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
      // update list of sub Areas (This has to be done by just updating the project)
      let tempArea = {
        _id: 0, // TODO: need to get this from the response if sub area is created
        area: props.tempArea,
      }
      let tempSubareas = [...props.project.subareas];
      tempSubareas[props.areaInfo.index] = tempArea;
      let tempProject = {...props.project};
      tempProject.subareas = tempSubareas;
      props.setProject(tempProject);
    }//*/
  }

    const saveEditPoint = async() => {
        /*
        let token = await AsyncStorage.getItem("@token")
        let success = false
        let res = null

        // Save the new area
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
                  //title: getName() // TODO
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
            _id: props.areaInfo._id,
            area: props.tempArea,
          }
          let tempSubareas = [...props.project.subareas];
          tempSubareas[props.areaInfo.index] = tempArea;
          let tempProject = {...props.project};
          tempProject.subareas = tempSubareas;
          props.setProject(tempProject);
        } //*/
    }

    const deletePoint = async() => {
      /*
      // do not delete a newPoint
      if(!props.areaInfo.newPoint) {
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
          console.log("response ", res);

          if (success) {
            // update list of subAreas
            let tempSubareas = [...props.project.subareas];
            tempSubareas.splice(props.areaInfo.index, 1);
            let tempProject = {...props.project};
            tempProject.subareas = tempSubareas;
            props.setProject(tempProject);
          }
      }//*/

      props.setVisible(false);
    }

  const setMarker = (coords) => {
    let temp = {...props.pointInfo};
    temp.location = coords;
    props.setPointInfo(point => temp);
  }

  return (
    <ModalContainer {...props} visible={props.visible}>
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
            areas={props.subareas}
            marker={props.pointInfo.location}
            setMarker={setMarker}
          >
          </MapAddOne>
        </View>
      </View>

      <View style={{flexDirection:'row', justifyContent: 'space-between', margin:5}}>
        <Button
          status='danger'
          onPress={() => deletePoint()}
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
