import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button, Input, Icon, Divider, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';

import styles from '../Project/createProjectViewStyles.js';

class EditTeam extends Component {

    constructor(props){
        super(props);

        let team = props.getSelectedTeam();

        this.state = {
            team: team,
            teamName: team.title,
        }

        this.onDismissTeam = this.onEditTeam.bind(this, false);
        this.onUpdateTeam = this.onEditTeam.bind(this, true);
        this.comfirmEditTeam = this.comfirmEditTeam.bind(this);

        this.onDeleteTeam = this.onDeleteTeam.bind(this);
    }

    async onEditTeam(submit) {
        if (submit) {
            let goodName = this.state.teamName.trim().length !== 0;
            if (goodName){
               this.comfirmEditTeam(this.state.teamName.trim());
            }
        }
        this.props.viewEditPage();
    }

    async comfirmEditTeam(teamName) {
        let token = await AsyncStorage.getItem("@token")
        let success = false

        // Change the info
        await fetch('https://measuringplacesd.herokuapp.com/api/teams/' + this.state.team._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                title: teamName
            })
        })
        .then((response) => (response.json()))
        .then(async (res) => (
            console.log(res)
        ))
        .catch((error) => (console.log(error), success = false))

        // Update
        let tempTeam = this.state.team;
        tempTeam.title = teamName;
        await this.props.setSelectedTeam(tempTeam);

        let teams = await AsyncStorage.getItem("@teams");
        teams = JSON.parse(teams);
        let changeIndex = teams.findIndex(element => element._id === tempTeam._id);
        const newTeams = [...teams];
        newTeams[changeIndex].title = teamName;
        await AsyncStorage.setItem("@teams", JSON.stringify(newTeams));
        await this.props.updateTeams(newTeams);
    }

    async onDeleteTeam() {
        // should probs have something for comfirm Delete first
        /*let token = await AsyncStorage.getItem("@token")
        let success = false

        // Delete
        await fetch('https://measuringplacesd.herokuapp.com/api/teams/' + this.state.team._id, {
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
        let teams = await AsyncStorage.getItem("@teams");
        teams = JSON.parse(teams);
        let changeIndex = teams.findIndex(element => element._id === tempTeam._id);
        const newTeams = [...teams];
        newTeams.splice(changeIndex, 1);
        await AsyncStorage.setItem("@teams", JSON.stringify(newTeams));
        await this.props.updateTeams(newTeams);
        await this.props.setSelectedTeam(null);
        // this.props.viewEditPage();
        this.props.navigation.navigate("Collaborate");*/
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
              visible={this.props.editTeam}
              >
                <View style={styles.container}>

                  <View style={styles.projName}>
                      <Text>Edit Team Name: </Text>
                      <Input
                          style={{flex:1}}
                          placeholder={this.state.teamName}
                          onChangeText={(value) => this.setState({teamName:value})}
                      />
                  </View>

                  <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:40}}>
                      <Button onPress={this.onDeleteTeam}
                              status='danger'
                              accessoryLeft={DeleteIcon}>
                        Delete
                      </Button>
                  </View>

                  <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:40}}>
                      <Button onPress={this.onDismissTeam}
                              status='danger'
                              accessoryLeft={CancelIcon}>
                        Cancel
                      </Button>
                      <Button onPress={this.onUpdateTeam}
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

export default EditTeam;
