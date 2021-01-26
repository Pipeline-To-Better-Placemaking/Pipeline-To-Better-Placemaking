import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button, Input, Icon, Divider, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';

import CreateNewProjectMap from '../../components/Maps/CreateNewProjectMap.js';

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

        this.onDismissProject = this.onCreateProject.bind(this, false);
        this.onUpdateProject = this.onCreateProject.bind(this, true);
        this.comfirmEditProject = this.comfirmEditProject.bind(this);

        this.onDeleteProject = this.onDeleteProject.bind(this);

        this.addMarker = this.addMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    addMarker(coordinates) {
        let temp = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
         };
        /*this.state.tempArea.push(temp);
        this.setState({
          tempArea: this.state.tempArea
      });*/
    }

    removeMarker(marker, index) {
      /*this.state.tempArea.splice(index, 1);
      this.setState({
        tempArea: this.state.tempArea
    });*/
    }

    async onCreateProject(submit) {
        if (submit) {
            let goodName = this.state.projName.trim().length !== 0;
            //let goodArea = this.state.tempArea.length > 2;
            if (goodName){
               this.comfirmEditProject(this.state.projName.trim(), this.state.area);
               this.props.viewEditPage();
            }
        } else {
            this.props.viewEditPage();
        }
        this.props.viewEditPage();
    }

    async comfirmEditProject(projectName, subareas) {
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
            console.log(res)
        ))
        .catch((error) => (console.log(error), success = false))

        // Update
        let tempProject = this.state.project;
        tempProject.title = projectName;
        await this.props.setSelectedProject(tempProject);
    }

    async onDeleteProject() {
        // should probs have something for comfirm Delete first
        /*let token = await AsyncStorage.getItem("@token")
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

        // Update*/
    }

    render() {

        const CancelIcon = (props) => (
          <Icon {...props} name='close-outline'/>
        );

        const CreateIcon = (props) => (
          <Icon {...props} name='checkmark-outline'/>
        );

        const SearchIcon = (props) => (
          <Icon {...props} name='search-outline'/>
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
                        Delete
                      </Button>
                  </View>

                  <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:40}}>
                      <Button onPress={this.onDismissProject}
                              status='danger'
                              accessoryLeft={CancelIcon}>
                        Cancel
                      </Button>
                      <Button onPress={this.onUpdateProject}
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
