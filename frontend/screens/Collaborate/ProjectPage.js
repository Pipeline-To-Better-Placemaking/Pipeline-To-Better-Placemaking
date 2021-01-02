import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import BackHeader from '../components/BackHeader.js';
import HomeMapView from '../Home/HomeMapView.js'; // using this for now, just to get the visual

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './collaborateStyles.js';

class ProjectPage extends Component {

    constructor(props){
        super(props);

        this.state = {
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
            locName: "Tap to Load: University of Central Florida"
        }
        this.openPrevPage = this.openPrevPage.bind(this);
        this.getLocationName = this.getLocationName.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("TeamPage");
    }

    getLocationName = async () => {
        let retVal = "Temp Loc: University of Central Florida";
        // Check for permission
        let enabled = await Location.hasServicesEnabledAsync();
        if (enabled)
        {
            let locationInfo = await Location.reverseGeocodeAsync(this.state.location.coords);
            retVal = locationInfo[0].name;
        }
        this.setState({
            locName: retVal
        });
    }

    render() {

        return(
            <View style={styles.container}>
                <BackHeader headerText={this.props.getSelectedProject().title} prevPage={this.openPrevPage}/>

                <View style={{height:'45%'}}>
                    <HomeMapView location={this.state.location}/>
                </View>



                <View style={styles.teamTextView}>
                    <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                        <Text style={styles.teamText}> Sign Up </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end',marginRight:30}}>
                        <Text onPress={this.getLocationName}>{this.state.locName}</Text>
                    </View>
                </View>
                <Divider style={{marginTop: 5}} />
            </View>
        );
    }
}

export default ProjectPage;
