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

            location: project.subareas[0].area[0],
            areaToEdit: [],
            editAreaVisible: false,
            areaName: "test",
            areaIndex: 0
        }

        this.cancelEditProject = this.cancelEditProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.updateProjectName = this.updateProjectName.bind(this);
        this.updateSubAreas = this.updateSubAreas.bind(this);
        this.onDeleteProject = this.onDeleteProject.bind(this);

        // Edit Sub Areas
        this.addMarker = this.addMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.editArea = this.editArea.bind(this);
        this.newSubArea = this.newSubArea.bind(this);
        this.saveArea = this.saveArea.bind(this);
        this.deleteArea = this.deleteArea.bind(this);
        this.cancelEditArea = this.cancelEditArea.bind(this);
    }

    addMarker(coordinates) {
        let temp = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
         };
        let tempArea = [...this.state.areaToEdit];
        tempArea.push(temp);
        this.setState({
          areaToEdit: tempArea
        });
    }

    removeMarker(marker, index) {
        let tempArea = [...this.state.areaToEdit];
        tempArea.splice(index, 1);
        this.setState({
          areaToEdit: tempArea
        });
    }

    editArea(item, index) {
        this.setState({
            location: item.area[0],
            areaToEdit: item.area,
            areaName: "Area " + (index + 1),
            areaIndex: index,
            editAreaVisible: true,
        });
    }

    newSubArea() {
        this.setState({
            location: this.state.subareas[0].area[0],
            areaToEdit: [],
            areaName: "New Area " + (this.state.subareas.length + 1),
            areaIndex: this.state.subareas.length,
            editAreaVisible: true,
        });
    }

    saveArea() {
        let tempArea = {
          area: this.state.areaToEdit
        };
        if(this.state.subareas.length === this.state.areaIndex) {
            this.state.subareas.push(tempArea);
        } else {
            this.state.subareas[this.state.areaIndex] = tempArea;
        }
        this.setState({
            editAreaVisible: false,
            subareas: this.state.subareas
        });
    }

    deleteArea() {
        if(this.state.areaIndex !== 0 && this.state.subareas.length > this.state.areaIndex) {
            this.state.subareas.splice(this.state.areaIndex, 1);
        }

        this.setState({
            editAreaVisible: false,
            subareas: this.state.subareas
        });
    }

    cancelEditArea() {
        this.setState({
            editAreaVisible: false
        });
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
        //this.updateSubAreas(this.state.subareas);
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

    async updateSubAreas(subareas) {
        let token = await AsyncStorage.getItem("@token")
        let success = false

        // Change the info
        await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + this.state.project._id + '/areas', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                areas: subareas
            })
        })
        .then((response) => (response.json()))
        .then(async (res) => (
            console.log("response to Update Subareas\n", res)
        ))
        .catch((error) => (console.log("error\n", error), success = false))

        // Update
        let tempProject = this.state.project;
        await this.props.setSelectedProject(this.state.project);
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

        const renderListItem = ({ item, index }) => (
            <ListItem
              title={`Area ${index+1} `}
              accessoryRight={EditIcon}
              onPress={() => this.editArea(item, index)}
            />
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

                  <View style={{height:'40%'}}>
                      <SubAreasMap
                        location={this.state.subareas[0].area[0]}
                        subareas={this.state.subareas}
                      />
                  </View>

                  <EditAreaMap
                    location={this.state.location}
                    area={this.state.areaToEdit}
                    addMarker={this.addMarker}
                    removeMarker={this.removeMarker}
                    editAreaVisible={this.state.editAreaVisible}
                    areaName={this.state.areaName}
                    onSave={this.saveArea}
                    onDelete={this.deleteArea}
                    onCancel={this.cancelEditArea}
                  />

                  <View style={{flexDirection:'row', justifyContent: 'space-between', margin:5}}>
                      <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                        <Text style={{fontSize:25}} >Areas </Text>
                      </View>
                      <Button
                          status='info'
                          onPress={this.newSubArea}
                          accessoryLeft={PlusIcon}
                      >
                            Create New Subarea
                      </Button>
                  </View>

                  <List
                    data={this.state.subareas}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderListItem}
                  />

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
