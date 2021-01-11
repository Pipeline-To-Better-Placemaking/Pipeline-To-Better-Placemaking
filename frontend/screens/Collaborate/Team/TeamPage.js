import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from 'react-native';

import BackHeader from '../../components/BackHeader.js';
import CreateProjectView from '../Project/CreateProjectView.js';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from '../collaborateStyles.js';

class TeamPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: [{ // these values are for example
                title: 'Project Name',
                locName: 'Example Loc Name',
                location: {
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
                area: [
                  {
                    "latitude": 28.60281064892976,
                    "longitude": -81.20062004774809,
                  },
                  {
                    "latitude": 28.601854567009166,
                    "longitude": -81.2006676569581,
                  },
                  {
                    "latitude": 28.60175654457185,
                    "longitude": -81.19934029877186,
                  },
                ]
            }],
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

    openProjectPage(item) {
        this.props.setSelectedProject(item);
        this.props.navigation.navigate("ProjectPage");
    }

    setProjectData(data) {
        this.state.data.push(data);
        this.setState({
            data: this.state.data
        });
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
              title=<Text style={{fontSize:20}}>
                        {`${item.title}`}
                    </Text>
              accessoryRight={ForwardIcon}
              onPress={() => this.openProjectPage(item)}
            />
        );

        return(
            <View style={styles.container}>
                <BackHeader headerText={this.props.getSelectedTeam().title} prevPage={this.openPrevPage}/>

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
