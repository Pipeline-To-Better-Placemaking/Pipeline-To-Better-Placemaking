import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { ModalContainer, ConfirmDelete } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditTeamPage(props) {

	const [teamTitleText, setTeamTitleText] = useState("");
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

	useEffect(()=>{
		setTeamTitleText(props.team.title)
	}, [])

  const close = () => {
    props.setVisible(false);
		setTeamTitleText(props.team.title)
  }

	// Removes the team matching the ID from the local list of teams
	const removeTeamFromList = async (teamID, teams) => {

    // Find index
    let teamIndex = teams.findIndex(element => element._id === teamID)

    // update the home results page and remove any projects from this team
    if (teamIndex >= 0 && teams[teamIndex].projects !== undefined && teams[teamIndex].projects !== null) {
      for(let i = 0; i < teams[teamIndex].projects.length; i++) {
  			await props.removeProject(teams[teamIndex].projects[i]._id);
  		}
    }

    // remove team from local list
    teams.splice(teamIndex, 1);

		// Update async storage and props
		await props.setVisible(false)
		await props.setTeams(teams)
		await AsyncStorage.setItem('@teams', JSON.stringify(teams))
    props.navigation.navigate('Collaborate')
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

	const updateTeamsList = async (teams, updatedTeam) => {

		// remove team from local list
		for(let i = 0; i < teams.length; i++) {
			if(teams[i]._id == updatedTeam._id){
				teams[i] = updatedTeam
			}
		}

		// Update async storage and props
		props.setTeams(teams)
		await AsyncStorage.setItem('@teams', JSON.stringify(teams))
	}

	const updateTeam = async () => {
		let updatedTeam = props.team
		let updatedTeamTitle = teamTitleText
		let success = false
		let result = null

		if(updatedTeamTitle == "" || updatedTeamTitle == null)
			updatedTeamTitle = props.team.title

		updatedTeam.title = updatedTeamTitle

		try {
      console.log("Trying to update a team")

      const response = await fetch('https://measuringplacesd.herokuapp.com/api/teams/' + props.team._id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + props.token
        },

        body: JSON.stringify({
          title: updatedTeamTitle
        })
      })

      result = await response.text()
      console.log(result)
      success = true
    } catch (error) {
        console.log("ERROR: " + error)
    }

		// Update team state, and the teams list
		if(success) {
			props.setTeam(updatedTeam)
			updateTeamsList(props.teams, updatedTeam)
			props.setVisible(false)
		}
	}

  return (
    <ModalContainer {...props} visible={props.visible}>
      <View>
        <ConfirmDelete 
          visible={confirmDeleteVisible} 
          setVisible={setConfirmDeleteVisible} 
          dataType={"team"} 
          deleteFunction={deleteTeam}
        />
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
          <Text category='s1'>Team Title: </Text>
					<Input
						placeholder = 'Team Title'
						value={teamTitleText}
						onChangeText={nextValue => setTeamTitleText(nextValue)}
					/>
        </View>

        <View style={{marginBottom:30, flexDirection:'row', justifyContent:'space-between'}}>
          <Button status={'danger'} onPress={()=>{setConfirmDeleteVisible(true)}}>Delete</Button>
          <Button status={'success'} onPress={updateTeam}>Update!</Button>
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
