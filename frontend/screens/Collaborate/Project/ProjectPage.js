import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import ProjectHeader from './ProjectHeader.js';
import ViewProjectMap from '../../components/Maps/ViewProjectMap.js';
import CreateActivity from '../../ResearchActivities/CreateActivity.js';

import { Text, Button, Input, Icon, Popover, Divider,
         List, ListItem, Card, Drawer, DrawerItem, OverflowMenu, MenuItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './projectStyles.js';

class ProjectPage extends Component {

    constructor(props){
        super(props);

        let project = props.getSelectedProject();
        let activityTypes = props.getActivityTypes();
        let time = new Date();

        this.state = {
            projName: project.title,
            location: project.location,
            locName: project.locName,
            area: project.area,
            menuVisible: false,
            createActivity: false,
            data: [{
                title: activityTypes[0],
                date: time,
                type: activityTypes[0],
                signUpSlots: [{ // offset by 1
                    timeVal: time,
                    timeString: time.toLocaleTimeString(),
                }]
              },
              {
                title: activityTypes[1],
                date: time,
                type: activityTypes[1],
                signUpSlots: [{
                    timeVal: time,
                    timeString: time.toLocaleTimeString(),
                }]
              },
              {
                title: activityTypes[2],
                date: time,
                type: activityTypes[2],
                signUpSlots: [{
                    timeVal: time,
                    timeString: time.toLocaleTimeString(),
                }]
              }
            ]
        }

        this.openPrevPage = this.openPrevPage.bind(this);
        this.openMenu = this.openMenu.bind(this);

        this.addActivity = this.addActivity.bind(this);
        this.openActivityPage = this.openActivityPage.bind(this);
        this.setCreateActivity = this.setCreateActivity.bind(this);
    }

    addActivity(activity) {
        this.state.data.push(activity);
        this.setState({
           data: this.state.data
        });
    }

    openPrevPage() {
        this.props.navigation.navigate("TeamPage");
    }

    openMenu() {
        this.setState({
            menuVisible: !this.state.menuVisible
        });
    }

    setCreateActivity(value) {
        this.setState({
            createActivity: value
        });
    }

    openActivityPage(item) {
        this.props.setSelectedActivity(item);
        this.props.navigation.navigate("SignUpPage");
    }

    render() {

        const BackIcon = (props) => (
          <Icon {...props} name='arrow-back'/>
        );

        const MenuIcon = (props) => (
          <Icon {...props} name='more-vertical-outline'/>
        );

        const ForwardIcon = (props) => (
          <Icon {...props} name='arrow-ios-forward'/>
        );

        const myHeader = () => (
            <ProjectHeader headerText={this.state.projName}
                           prevPage={this.openPrevPage}
                           openMenu={this.openMenu}/>
        );

        const myMenu = () => (
            <OverflowMenu
              anchor={myHeader}
              visible={this.state.menuVisible}
              onBackdropPress={this.openMenu}
              placement={'bottom end'}
              style={styles.menu}
              >
                  <MenuItem title='Edit Project'/>
              </OverflowMenu>
        );

        const LocationInfo = () => (
            <View style={styles.teamTextView}>
                <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                    <Text>Loaction: {this.state.locName}</Text>
                </View>
            </View>
        );

        const SignUpView = () => (
            <View style={styles.teamTextView}>
                <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                    <Text style={styles.teamText}> Sign Up </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end',marginRight:30}}>
                    <Button onPress={() => this.setCreateActivity(true)} appearance='outline'>
                        Create Research Activity
                    </Button>
                </View>
            </View>
        );

        const activityItem = ({ item, index }) => (
            <ListItem
              title={<Text style={{fontSize:20}}>
                        {`${item.title}`}
                    </Text>}
              description={`${item.date.toLocaleDateString()}`}
              accessoryRight={ForwardIcon}
              onPress={() => this.openActivityPage(item)}
            />
        );

        return(
            <View style={styles.container}>

                <CreateActivity
                    createActivity={this.state.createActivity}
                    setCreateActivity={this.setCreateActivity}
                    addActivity={this.addActivity}
                    getActivityTypes={this.props.getActivityTypes}
                    anchor={myMenu}
                    navigation={this.props.navigation}
                    location={this.state.location}
                    area={this.state.area}
                />

                <View style={{height:'45%'}}>
                    <ViewProjectMap
                        location={this.state.location}
                        area={this.state.area}
                    />
                </View>

                <LocationInfo />

                <SignUpView />
                <Divider style={{marginTop: 5}} />

                <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'30%', marginTop:15}}>
                    <List
                      style={{maxHeight:'100%', maxWidth:'90%'}}
                      data={this.state.data}
                      ItemSeparatorComponent={Divider}
                      renderItem={activityItem}
                    />
                </View>

            </View>
        );
    }
}

export default ProjectPage;
