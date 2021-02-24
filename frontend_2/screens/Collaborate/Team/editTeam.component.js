import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { ModalContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditTeamPage(props) {

  const close = () => {
    props.setVisible(false);
  }

	// Removes the team matching the ID from the local list of teams
	const removeTeamFromList = async (teamID, teams) => {

		// remove team from local list
		for(let i = 0; i < teams.length; i++) {
			if(teams[i]._id == teamID){
				teams.splice(i, 1)
			}
		}

		// Update async storage and props		
		props.setVisible(false)
    props.navigation.navigate('Collaborate')
		props.setTeams(teams)
		await AsyncStorage.setItem('@teams', JSON.stringify(teams))
	}

  const deleteTeam = async () => {
        // should probably have something for confirm Delete first
        let token = props.token
        let success = false
        let res = null
				let deleteTeamID = props.team._id

				// Delete Team from backend
        try {
          const response = await fetch('https://measuringplacesd.herokuapp.com/api/teams/' + deleteTeamID, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
          res = await response.json();
          console.log("delete team", res);
          success = true
        } catch (error) {
            console.log("error", error)
        }

        // Local Updates
        if (success) {
					removeTeamFromList(deleteTeamID, props.teams)         
        }
    }

  return (
    <ModalContainer {...props} visible={props.visible}>
      <View>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text category='h5' style={{fontSize:25}}>Team Information</Text>
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
          <Text category='s1'>Team Name: </Text>
        </View>

        <View style={{marginBottom:30, flexDirection:'row', justifyContent:'space-between'}}>
          <Button status={'danger'} onPress={deleteTeam}>Delete</Button>
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
