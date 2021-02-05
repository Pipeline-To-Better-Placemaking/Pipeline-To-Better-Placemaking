import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button, Input, Icon, Divider, Card, List, ListItem } from '@ui-kitten/components';
import * as Location from 'expo-location';

import EditAreaMap from '../../components/Maps/EditAreaMap.js';
import SubAreasMap from '../../components/Maps/SubAreasMap.js';

import styles from './createProjectViewStyles.js';

class EditProject extends Component {

    constructor(props){
        super(props);

        let project = props.getSelectedProject();

        this.state = {
            project: project,
            projName: project.title,
            locName: project.description,
            subareas: project.subareas,
        }

        this.cancelEditProject = this.cancelEditProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.updateProjectName = this.updateProjectName.bind(this);
        this.onDeleteProject = this.onDeleteProject.bind(this);
    }

    cancelEditProject() {
        this.props.viewEditPage();
    }

    async updateProject() {
        let name = this.state.projName.trim();
        let goodName = name.length !== 0;
        if (goodName) {
           this.updateProjectName(name);
        }
        this.props.viewEditPage();
    }

    async updateProjectName(projectName) {
        let token = await AsyncStorage.getItem("@token")
        let success = false

        // Change the info
        await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + this.state.project._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                title: projectName
            })
        })
        .then((response) => (response.json()))
        .then(async (res) => (
            console.log("response to UpdateName\n", res)
        ))
        .catch((error) => (console.log("error\n", error), success = false))

        // Update
        let tempProject = this.state.project;
        tempProject.title = projectName;
        await this.props.setSelectedProject(tempProject);

        // update Project name on previous Team Page
        let selectedTeam = this.props.getSelectedTeam();
        let projects = selectedTeam.projects;
        let changeIndex = projects.findIndex(element => element._id === this.state.project._id);
        const newProjects = [...projects];
        newProjects[changeIndex] = tempProject; // set the new name
        selectedTeam.projects = newProjects;
        await this.props.setSelectedTeam(selectedTeam);
    }

    async onDeleteProject() {
        // should probs have something for comfirm Delete first
        let token = await AsyncStorage.getItem("@token")
        let success = false

        // Delete
        await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + this.state.project._id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => (response.json()))
        .then(async (res) => (
            console.log(res)
        ))
        .catch((error) => (console.log(error), success = false))

        // Update
        // Turn off the Modal view
        this.props.viewEditPage();
        // Adjust the local list of Projects on the selectedTeam
        let selectedTeam = this.props.getSelectedTeam();
        let projects = selectedTeam.projects;
        let changeIndex = projects.findIndex(element => element._id === this.state.project._id);
        const newProjects = [...projects];
        newProjects.splice(changeIndex, 1); // remove project from list
        selectedTeam.projects = newProjects;
        await this.props.setSelectedTeam(selectedTeam);
        await AsyncStorage.setItem("@projects", JSON.stringify(newProjects));
        await this.props.setSelectedProject({title:''});
        // Open previous page
        this.props.exit();
    }

    render() {

        const CancelIcon = (props) => (
          <Icon {...props} name='close-outline'/>
        );

        const CreateIcon = (props) => (
          <Icon {...props} name='checkmark-outline'/>
        );

        const PlusIcon = (props) => (
          <Icon {...props} name='plus-outline'/>
        );

        const EditIcon = (props) => (
          <Icon {...props} name='edit-outline'/>
        );

        const DeleteIcon = (props) => (
          <Icon {...props} name='trash-2-outline'/>
        );

        return(
            <Modal
              animationType='slide'
              visible={this.props.editProject}
              >
                <View style={styles.container}>

                  <View style={styles.projName}>
                      <Text>Edit Project Name: </Text>
                      <Input
                          style={{flex:1}}
                          placeholder={this.state.projName}
                          onChangeText={(value) => this.setState({projName:value})}
                      />
                  </View>

                  <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:40}}>
                      <Button onPress={this.onDeleteProject}
                              status='danger'
                              accessoryLeft={DeleteIcon}>
                        Delete Project
                      </Button>
                  </View>

                  <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:40}}>
                      <Button onPress={this.cancelEditProject}
                              status='danger'
                              accessoryLeft={CancelIcon}>
                        Cancel
                      </Button>
                      <Button onPress={this.updateProject}
                              status='success'
                              accessoryLeft={CreateIcon}>
                        Update
                      </Button>
                  </View>

                </View>
            </Modal>
        );
    }
}

export default EditProject;
