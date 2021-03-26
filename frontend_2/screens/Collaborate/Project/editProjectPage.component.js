import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { ModalContainer, PopUpContainer, ConfirmDelete } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditProjectPage(props) {

  const [projectTitleText, setProjectTitleText] = useState("");
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  useEffect(()=>{
    setProjectTitleText(props.project.title)
  }, [])

  const close = () => {
    setProjectTitleText(props.project.title)
    props.setVisible(false)
  }

  const deleteProjectLocal = async (selectedTeam, tempProjects, deletedProjectID, tempTeams) => {

    // Find indexes
    let projectIndex = tempProjects.findIndex(element => element._id === deletedProjectID)
    let teamIndex = tempTeams.findIndex(element => element._id === selectedTeam._id)

    // Remove project from team, update team and teams
    tempProjects.splice(projectIndex, 1)
    selectedTeam.projects = [...tempProjects]
    tempTeams[teamIndex] = selectedTeam

    // Update the states
    props.setTeam(selectedTeam)
    props.setTeams([...tempTeams])
    props.setProjects([...tempProjects])
    props.removeProject(deletedProjectID); // for home results page

    // Dummy data for the project state
    await props.setProject({
      title:'',
      subareas:[
        {points:[
          {latitude:0, longitude:0},
          {latitude:0, longitude:0},
          {latitude:0, longitude:0}
        ]}
      ],
      standingPoints:[
        {latitude:0, longitude:0}
      ]
    });

    // Update local storage
    await AsyncStorage.setItem("@projects", JSON.stringify(tempProjects))
    await AsyncStorage.setItem("@teams", JSON.stringify(tempTeams))
  }

  const deleteProject = async () => {
    // should probably have something for confirm Delete first
    let success = false
    let result = null

    // Delete
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }
      })
      result = await response.json()
      success = true
    } catch (error) {
      console.log("error", error)
    }

    console.log(result)

    // Update
    if (success) {
      deleteProjectLocal({...props.team}, [...props.team.projects], props.project._id, [...props.teams])
      props.setVisible(false);
      props.navigation.navigate('TeamPage');
    }
  }

  const updateProjectLocal = async (selectedTeam, tempProjects, updatedProject, updatedTitle, tempTeams) => {

    // Find indexes
    let projectIndex = tempProjects.findIndex(element => element._id === updatedProject._id)
    let teamIndex = tempTeams.findIndex(element => element._id === selectedTeam._id)

    // Update teams, team, and project
    updatedProject.title = updatedTitle
    tempProjects[projectIndex] = updatedProject
    selectedTeam.projects = [...tempProjects]
    tempTeams[teamIndex] = selectedTeam

    // Update the states
    props.setProject(updatedProject)
    props.setProjects([...tempProjects])
    props.setTeam(selectedTeam)
    props.setTeams(tempTeams)

    // Update local storage
    await AsyncStorage.setItem("@projects", JSON.stringify(tempProjects))
    await AsyncStorage.setItem("@teams", JSON.stringify(tempTeams))
  }

  const updateProject = async () => {
    let success = false
    let result = null
    let updatedProjectTitle = projectTitleText

    if(updatedProjectTitle == "" || updatedProjectTitle == null)
      updatedProjectTitle = props.project.title

    // Delete
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + props.project._id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + props.token
        },

        body: JSON.stringify({
          title: updatedProjectTitle
        })
      })
      result = await response.json();
      success = true
    } catch (error) {
        console.log("error", error)
    }

    // Update
    if (success) {
      updateProjectLocal({...props.team}, [...props.team.projects], props.project, updatedProjectTitle, [...props.teams])
      props.setVisible(false);
    }
  }

  return (
    <ModalContainer {...props} visible={props.visible}>
      <ConfirmDelete 
        visible={confirmDeleteVisible} 
        setVisible={setConfirmDeleteVisible} 
        dataType={"project"} 
        deleteFunction={deleteProject}
      />
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
          <Text category='s1'>Team Title: </Text>
          <Input
            placeholder = 'Team Title'
            value={projectTitleText}
            onChangeText={nextValue => setProjectTitleText(nextValue)}
          />
        </View>

        <View style={{marginBottom:30, flexDirection:'row', justifyContent:'space-between'}}>
          <Button status={'danger'} onPress={()=>{setConfirmDeleteVisible(true)}}>Delete</Button>
          <Button status={'success'} onPress={updateProject}>Update!</Button>
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
  <Icon {...props} style={{width:10, height:10}} name='plus-outline'/>
);

const DeleteIcon = (props) => (
  <Icon {...props} style={{width:100, height:100, fill:'#FF0000'}} name='trash-2'/>
);
