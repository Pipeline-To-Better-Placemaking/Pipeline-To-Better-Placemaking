import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { ModalContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditProjectPage(props) {

  const close = () => {
    props.setVisible(false);
  }

  const deleteProject = async () => {
        // should probs have something for comfirm Delete first
        let token = props.token
        let success = false
        let res = null

        // Delete
        try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
          res = await response.json();
          success = true
        } catch (error) {
            console.log("error", error)
        }

        // Update
        if (success) {

          // Adjust the local list of Projects on the selectedTeam
          let selectedTeam = {...props.team};
          let tempProjects = [...props.team.projects];
          let changeIndex = tempProjects.findIndex(element => element._id === props.project._id);
          tempProjects.splice(changeIndex, 1); // remove project from list
          selectedTeam.projects = tempProjects;
          props.setTeam(team => selectedTeam);
          await AsyncStorage.setItem("@projects", JSON.stringify(tempProjects));
          // this is dumb defualt needed information
          await props.setProject({title:'', subareas:[{area:[{latitude:0, longitude:0},{latitude:0, longitude:0},{latitude:0, longitude:0}]}]});
          props.setVisible(false);
          props.navigation.goBack();
        }
    }

  return (
    <ModalContainer {...props} visible={props.visible}>
      <View>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text category='h5' style={{fontSize:25}}>Project Information</Text>
          <Button
            style={{marginBottom:5}}
            onPress={close}
            status='info'
            appearance={'outline'}
          >
            Done
          </Button>
        </View>

        <View style={{marginTop:10, marginBottom:30}}>
          <Text category='s1'>Project Name: </Text>
        </View>

        <View style={{marginBottom:30, flexDirection:'row', justifyContent:'space-between'}}>
          <Button status={'danger'} onPress={deleteProject}>Delete</Button>
          <Button status={'success'}>Update!</Button>
        </View>
      </View>
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
