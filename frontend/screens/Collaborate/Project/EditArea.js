import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button, Input, Icon, Divider, Card, List, ListItem } from '@ui-kitten/components';
import * as Location from 'expo-location';

import EditAreaMap from '../../components/Maps/EditAreaMap.js';
import SubAreasMap from '../../components/Maps/SubAreasMap.js';

import styles from './createProjectViewStyles.js';

class EditArea extends Component {

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
            areaIndex: 0,
            newArea: false,
            areaItem: null
        }

        this.onClosePage = this.onClosePage.bind(this);

        // Edit Sub Areas
        this.addMarker = this.addMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.editArea = this.editArea.bind(this);
        this.newSubArea = this.newSubArea.bind(this);
        this.saveArea = this.saveArea.bind(this);
        this.saveNewArea = this.saveNewArea.bind(this);
        this.saveEditArea = this.saveEditArea.bind(this);
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
            newArea: false,
            areaItem: item
        });
    }

    newSubArea() {
        this.setState({
            location: this.state.subareas[0].area[0],
            areaToEdit: [],
            areaName: "New Area " + (this.state.subareas.length + 1),
            areaIndex: this.state.subareas.length,
            editAreaVisible: true,
            newArea: true,
        });
    }

    async saveArea() {
        if(this.state.newArea) {
            this.saveNewArea();
            let tempArea = {
              //_id: I need the id from the new area that was created
              area: this.state.areaToEdit
            };
            this.state.subareas.push(tempArea);
        } else {
            this.saveEditArea();
            let tempArea = {
                _id: this.state.areaItem._id,
              area: this.state.areaToEdit
            };
            this.state.subareas[this.state.areaIndex] = tempArea;
        }
        this.setState({
            editAreaVisible: false,
            subareas: this.state.subareas
        });
    }

    async saveNewArea() {
        let token = await AsyncStorage.getItem("@token")
        let success = false
        let res = null

        // Save the new area
        try {
            const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                          this.state.project._id +
                                          '/areas', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    area: this.state.areaToEdit
                })
            })
            res = await response.json()
        } catch (error) {
            console.log("error ", error)
        }
        //console.log("response ", res);
    }

    async saveEditArea() {
        let token = await AsyncStorage.getItem("@token")
        let success = false
        let res = null

        // Save the new area
        try {
            const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                          this.state.project._id +
                                          '/areas/' +
                                          this.state.areaItem._id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    area: this.state.areaToEdit
                })
            })
            res = await response.json()
        } catch (error) {
            console.log("error ", error)
        }
        //console.log("response ", res);
    }

    async deleteArea() {
        /*if(this.state.areaIndex !== 0 && this.state.subareas.length > this.state.areaIndex) {
            this.state.subareas.splice(this.state.areaIndex, 1);
            let token = await AsyncStorage.getItem("@token")
            let success = false
            let res = null

            console.log("deleteing area with id:", this.state.areaItem._id);
            // Delete area
            try {
                const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' +
                                              this.state.project._id +
                                              '/areas/' +
                                              this.state.areaItem._id, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                    }
                })
                res = await response.json()
            } catch (error) {
                console.log("error ", error)
            }
            console.log("response ", res);
        }*/
        this.setState({
            editAreaVisible: false,
            //subareas: this.state.subareas
        });
    }

    cancelEditArea() {
        this.setState({
            editAreaVisible: false
        });
    }

    async onClosePage() {
        this.props.viewEditPage();
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
                      <Button
                        onPress={this.onClosePage}
                        status='danger'
                      >
                        Close
                      </Button>
                  </View>

                </View>
            </Modal>
        );
    }
}

export default EditArea;
