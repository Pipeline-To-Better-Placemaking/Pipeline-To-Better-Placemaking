import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import ViewProjectMap from '../../components/Maps/ViewProjectMap.js'
import BackHeader from '../../components/Headers/BackHeader.js';
import BackEditHeader from '../../components/Headers/BackEditHeader.js'
import styles from '../../CompareResults/compareStyles.js';
import StationaryActivityMap from '../../components/Maps/StationaryActivityMap.js';
import TimeHeader from '../../components/Activities/Stationary/TimeHeader.js';
import DataEntryPopover from '../../components/Activities/Stationary/DataEntryPopover.js';

class StationaryActivity extends Component {

    constructor(props){
        super(props);

        this.state = {

            location: this.props.route.params.activityDetails.location,
            area: this.props.route.params.activityDetails.area,
            position: [this.props.route.params.position],
            dataPopover: false,
            tempMarker: [],
            data: [{
                location: [],
                gender: {},
                age: {},
                action: {}
            }]
        }

        this.openPrevPage = this.openPrevPage.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("SignUpPage");
    }

    onPointCreate = async (marker) => {
        console.log("Opening Modal.")

        console.log("DataEntry Modal: " + this.state.dataPopover)

        await this.setState({
            dataPopover: true,
            tempMarker: marker
        })

        console.log("DataEntry Modal: " + this.state.dataPopover)
    }

    closeData = () => {

        this.setState({
            dataPopover: false
        })
    }

    render() {

        const Map = () => {
            return(<View style={styles.mapContainer}>

                <StationaryActivityMap
                    location={this.state.location}
                    area={this.state.area}
                    markers={this.state.position}
                    addMarker={this.onPointCreate}
                />

            </View>)
        }

        const TimeBar = () => {
            return (
                <TimeHeader time={this.props.route.params.time}/>
            )
        }

        return(                
            <View style={styles.container}>

                <BackHeader headerText={"Stationary Activity"} prevPage={this.openPrevPage}/>

                <TimeBar/>

                <DataEntryPopover
                    visible={this.state.dataPopover}
                    anchor={TimeBar}
                    closeData={this.closeData}
                />
                
                <View style={styles.mapContainer}>
                    <StationaryActivityMap
                        location={this.state.location}
                        area={this.state.area}
                        markers={this.state.position}
                        addMarker={this.onPointCreate}
                    />
                </View>



            </View>
        );
    }
}

export default StationaryActivity;
