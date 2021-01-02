import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import BackHeader from '../components/BackHeader.js';
import ViewProjectMap from '../components/Maps/ViewProjectMap.js';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './collaborateStyles.js';

class ProjectPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            projName: props.getSelectedProject().title,
            location: props.getSelectedProject().location,
            locName: "Tap to Load: University of Central Florida",
            area: props.getSelectedProject().area
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
                <BackHeader headerText={this.state.projName} prevPage={this.openPrevPage}/>

                <View style={{height:'45%'}}>
                    <ViewProjectMap
                        location={this.state.location}
                        area={this.state.area}
                    />
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
