import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import BackHeader from '../components/Headers/BackHeader.js';
import MapAreaWithPoints from '../components/Maps/MapAreaPointList.js'

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './activitySignUpStyles.js';
import MapAreaWithStandingPoints from '../components/Maps/MapAreaWithStandingPoints.js';
import SignUpCard from '../components/ActivitySignUp/SignUpCard.js'

class ActivitySignUp extends Component {

    constructor(props){
        super(props);

        let project = props.getSelectedProject();
        let activity = props.getSelectedActivity();
        let nameArray= this.createPositionNameArray(activity.standingPointData);

        // console.log("Project: " + JSON.stringify(project))
        // console.log("Activity: " + JSON.stringify(activity))

         = {
            title: activity.title,
            type: activity.type,
            date: activity.date,
            signUpSlots: activity.signUpSlots.listOfTimes,
            signUpSlotsTimeLimits: activity.signUpSlots.listOfTimeLimits,
            standingPoints: activity.standingPointData,

            location: project.subareas[0].area[0], // pick the first point for now
            area: project.subareas[0].area,
            positionNameArray: nameArray,
        }

        this.openPrevPage = this.openPrevPage.bind(this);
        this.openActivityPage = this.openActivityPage.bind(this);
    }

    createPositionNameArray(markers) {

        let nameArray = []

        for (let i = 0; i < markers.length; i++){
            
            nameArray.push(i+1)
        }

        return nameArray;
    }

    openPrevPage() {
        this.props.navigation.navigate("ProjectPage");
    }

    openActivityPage() {
        let activity = this.props.getActivityTypes();
        switch (.type) {
            case activity[0]:
                this.props.navigation.navigate("StationaryActivity");
                break;
            case activity[1]:
                this.props.navigation.navigate("PeopleActivity");
                break;
            case activity[2]:
                this.props.navigation.navigate("SurveyActivity");
                break;
            default:
                //console.log("nope");
        }
    }

    render() {

        const signUpCard = ({item, index}) => (

            <SignUpCard 
                navigation={this.props.navigation}
                item={item}
                names={.positionNameArray}
                timeLimit={.signUpSlotsTimeLimits[index]}
                index={index}
                activityDetails={({
                    location: .location,
                    area: .area,
                    markers: .standingPoints
                })}
                setStartTime={this.props.setStartTime}
                />
        );

        return(
            <View style={styles.container}>

                <BackHeader headerText={.title} prevPage={this.openPrevPage}/>

                <View style={styles.mapContainer}>
                    <MapAreaWithStandingPoints
                        location={.location}
                        area={.area}
                        markers={.standingPoints}
                    />
                </View>

                <View>
                    <Text style={{textAlign:'center'}}>
                        Type: {.type}
                    </Text>
                    <Text style={{textAlign:'center', marginBottom: 10}}>
                        Date: {.date.toLocaleDateString()}
                    </Text>
                    <List
                    style={{maxHeight:400}}
                    data={.signUpSlots}
                    ItemSeparatorComponent={Divider}
                    renderItem={signUpCard}
                    />
                </View>
            </View>
        );
    }
}

export default ActivitySignUp;
