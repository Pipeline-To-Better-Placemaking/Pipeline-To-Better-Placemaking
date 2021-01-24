import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { Text, Button, Input, Icon, Divider, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';

import CreateNewProjectMap from '../../components/Maps/CreateNewProjectMap.js';

import styles from './createProjectViewStyles.js';

class EditProject extends Component {

    constructor(props){
        super(props);

        let project = props.getSelectedProject();

        this.state = {
            projName: project.title,
            location: project.location,
            locName: project.locName,
            area: project.area,
        }

        this.onDismissProject = this.onCreateProject.bind(this, false);
        this.onUpdateProject = this.onCreateProject.bind(this, true);
        this.addNewProject = this.addNewProject.bind(this);
        this.setTempProjectName = this.setTempProjectName.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    setTempProjectName(event) {

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

    onCreateProject(submit) {
        if (submit) {
            let goodName = this.state.projName.trim().length !== 0;
            //let goodArea = this.state.tempArea.length > 2;
            if (goodName){
               this.addNewProject(this.state.projName.trim(),[this.state.area]);
               this.props.viewEditMenu();
            }
        } else {
            this.props.viewEditMenu();
        }
        this.props.viewEditMenu();
    }

    addNewProject(projectName, subareas) {
        let temp = {
            title: projectName,
            location: this.state.location,
            locName: this.state.locName,
            area: subareas,
        };
        this.props.setSelectedProject(temp);
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
