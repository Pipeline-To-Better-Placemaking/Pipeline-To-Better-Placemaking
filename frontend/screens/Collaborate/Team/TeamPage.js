import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackHeader from '../../components/Headers/BackHeader.js';
import CreateProjectView from '../Project/CreateProjectView.js';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from '../collaborateStyles.js';

class TeamPage extends Component {

    constructor(props){
        super(props);

        let team = props.getSelectedTeam();

        this.state = {
            team: team,
            data: team.projects,
            createProject: false
        }
        this.openPrevPage = this.openPrevPage.bind(this);
        this.openProjectPage = this.openProjectPage.bind(this);

        this.setProjectData = this.setProjectData.bind(this);
        this.setCreateProject= this.setCreateProject.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("Collaborate");
    }

    async openProjectPage(item) {
        let token = await AsyncStorage.getItem("@token");
        console.log("opening project: ", item);
        let id = item; // TODO: change to this once they update to give us the title: item._id
        let projectDetails = null;
        // Get the team information
        await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => (response.json()))
        .then(async (res) => (
                projectDetails = res
            ))
        .catch((error) => (console.log(error)))
        // Update
        console.log("Selected Project: ", projectDetails);

        this.props.setSelectedProject(projectDetails);
        this.props.navigation.navigate("ProjectPage");
    }

    async setProjectData(data) {
        let token = await AsyncStorage.getItem("@token");
        let projects = this.state.data;
        let project = null;
        // Save the new project
        try {
            const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    points: data.points,
                    team: this.state.team
                })
            })
            project = await response.json()
        } catch (error) {
            console.log("error", error)
        }
        console.log(project);

        // Update
        await this.state.data.push(project._id); // TODO: change once they update to give title: project
        await this.setState({
            data: this.state.data
        });

        // Open Project Page
        await this.props.setSelectedProject(project);
        this.props.navigation.navigate("ProjectPage");
    }

    setCreateProject(value) {
        this.setState({
            createProject: value
        });
    }

    render() {

        const ForwardIcon = (props) => (
          <Icon {...props} name='arrow-ios-forward'/>
        );

        const renderItem = ({ item, index }) => (
            <ListItem
              title={<Text style={{fontSize:20}}>
                        {`${item.title}`}
                    </Text>}
              accessoryRight={ForwardIcon}
              onPress={() => this.openProjectPage(item)}
            />
        );

        return(
            <View style={styles.container}>
                <BackHeader headerText={this.state.team.title} prevPage={this.openPrevPage}/>

                <CreateProjectView
                        createProject={this.state.createProject}
                        setCreateProject={this.setCreateProject}
                        setProjectData={this.setProjectData}
                    />

                <View style={styles.teamTextView}>
                    <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                        <Text style={styles.teamText}> Projects </Text>
                    </View>
                    <View style={styles.createTeamButtonView}>
                        <Button status='primary' appearance='outline' onPress={() => this.setCreateProject(true)}>
                            Create New
                        </Button>
                    </View>
                </View>
                <Divider style={{marginTop: 5}} />

                <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'50%', marginTop:15}}>
                    <List
                      style={{maxHeight:'100%', maxWidth:'90%'}}
                      data={this.state.data}
                      ItemSeparatorComponent={Divider}
                      renderItem={renderItem}
                    />
                </View>


            </View>
        );
    }
}

export default TeamPage;
