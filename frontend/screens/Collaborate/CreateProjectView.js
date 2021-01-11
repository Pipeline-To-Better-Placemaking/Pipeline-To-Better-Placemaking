import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { Text, Button, Input, Icon, Divider, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';

import CreateNewProjectMap from '../components/Maps/CreateNewProjectMap.js';

import styles from './createProjectViewStyles.js';

class CreateProjectView extends Component {

    constructor(props){
        super(props);

        this.state = {
            tempProjectName: ' ',
            tempLocation: {
                "timestamp": 0,
                "coords": {
                  "accuracy": -1,
                  "altitude": -1,
                  "altitudeAccuracy": -1,
                  "heading": -1,
                  "latitude": 28.602413253152307,
                  "longitude": -81.20019937739713,
                  "speed": 0
                }
            },
            tempArea: []
        }

        this.onDismissCreateProject = this.onCreateProject.bind(this, false);
        this.onCreateNewProject = this.onCreateProject.bind(this, true);
        this.addNewProject = this.addNewProject.bind(this);
        this.setTempProjectName = this.setTempProjectName.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.getLocationName = this.getLocationName.bind(this);
    }

    setTempProjectName(event) {
        this.setState({
            tempProjectName: event
        });
    }

    addMarker(coordinates) {
        let temp = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
         };
        this.state.tempArea.push(temp);
        this.setState({
          tempArea: this.state.tempArea
        });
    }

    removeMarker(marker, index) {
      this.state.tempArea.splice(index, 1);
      this.setState({
        tempArea: this.state.tempArea
      });
    }

    onCreateProject(submit) {
        if (submit) {
            let goodName = this.state.tempProjectName.trim().length !== 0;
            let goodArea = this.state.tempArea.length > 2;
            if (goodName && goodArea) {
               this.addNewProject(this.state.tempProjectName.trim(),
                                  this.state.tempArea);
               this.setState({
                   tempProjectName: ' ',
                   tempArea: []
               });
               this.props.setCreateProject(false);
            }
            if(!goodName){
                console.log("CreateProjectView.js: Need to enter a Project Name");
            }
            if(!goodArea){
                console.log("CreateProjectView.js: Need at least 3 points");
            }
        } else {
            this.setState({
                tempProjectName: ' ',
                tempArea: []
            });
            this.props.setCreateProject(false);
        }
    }

    getLocationName = async (loc) => {
        let retVal = "Turn on Location Services to load";
        // Check for permission
        let enabled = await Location.hasServicesEnabledAsync();
        if (enabled)
        {
            let locationInfo = await Location.reverseGeocodeAsync(loc.coords);
            retVal = locationInfo[0].name;
        }
        return retVal;
    }

    addNewProject = async (projectName, projArea) => {
        // This just takes the first point, should probably calculate center point of projArea
        let tempLoc = {
                "coords":{
                    "latitude": projArea[0].latitude,
                    "longitude":projArea[0].longitude,
                    "altitude": -1,
                    "heading": -1}
                };
        let tempLocationName = await this.getLocationName(tempLoc);
        console.log("TeamPage.js: tempLocationName: ", tempLocationName);
        let temp = {
            title: projectName,
            locName: tempLocationName,
            location: tempLoc,
            area: projArea
        };
        this.props.setProjectData(temp);
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
                visible={this.props.createProject}
                >
                  <View style={styles.container}>

                      <View style={styles.projName}>
                          <Text>Enter a Project Name: </Text>
                          <Input
                              style={{flex:1}}
                              placeholder='Type Here...'
                              onChangeText={this.setTempProjectName}
                          />
                      </View>

                      <Text style={{marginTop:20}}>Search: </Text>

                      <View style={styles.searchView}>
                          <Input
                              style={{flex:1}}
                              placeholder='Enter a Location...'

                          />
                          <Button
                                  status='info'
                                  accessoryLeft={SearchIcon}
                                  style={{marginLeft:10}}/>
                      </View>

                      <View style={styles.mapHeight}>
                        <CreateNewProjectMap
                            location={this.state.tempLocation}
                            markers={this.state.tempArea}
                            addMarker={this.addMarker}
                            removeMarker={this.removeMarker}
                        />
                      </View>

                      <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:40}}>
                          <Button onPress={this.onDismissCreateProject}
                                  status='danger'
                                  accessoryLeft={CancelIcon}>
                            Cancel
                          </Button>
                          <Button onPress={this.onCreateNewProject}
                                  status='success'
                                  accessoryLeft={CreateIcon}>
                            Create
                          </Button>
                      </View>
                </View>
            </Modal>
        );
    }
}

export default CreateProjectView;
