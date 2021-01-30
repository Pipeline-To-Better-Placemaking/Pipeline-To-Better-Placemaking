import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import ViewProjectMap from '../../components/Maps/ViewProjectMap.js'
import BackHeader from '../../components/Headers/BackHeader.js';
import BackEditHeader from '../../components/Headers/BackEditHeader.js'
import styles from '../../CompareResults/compareStyles.js';
import StationaryActivityMap from '../../components/Maps/StationaryActivityMap.js';
import TimeHeader from '../../components/Activities/Stationary/TimeHeader.js';
import DataEntryModal from '../../components/Activities/Stationary/DataEntryModal.js';

class StationaryActivity extends Component {

    constructor(props){
        super(props);

        this.state = {

            location: this.props.route.params.activityDetails.location,
            area: this.props.route.params.activityDetails.area,
            position: [this.props.route.params.position],
            start: true,
            dataPopover: false,
            tempMarker: [],
            data: [{}],
            markers: []
        }

        this.openPrevPage = this.openPrevPage.bind(this);
        this.setStart = this.setStart.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("SignUpPage");
    }

    onPointCreate = async (marker) => {

        if (this.state.start) {

            await this.setState({
                dataPopover: true,
                tempMarker: marker
            })
        }
    }

    closeData = (data) => {

        if (data.ageIndex > -1 && data.genderIndex > -1 && data.activityIndex > -1) {

            let pointData = {
                age: data.age,
                gender: data.gender,
                activity: data.activity,
                location: this.state.tempMarker
            }

            let currentData = this.state.data
            currentData.push(pointData)

            let markers = this.state.markers
            markers.push(this.state.tempMarker)

            this.setState({
                data: currentData,
                dataPopover: false,
                markers: markers
            })
        }
    }

    setStart() {
        this.setState({
            start: true
        })
    }

    render() {


        const TimeBar = () => {
            return (
                <TimeHeader setStart={this.setStart} time={this.props.route.params.time}/>
            )
        }

        return(                
            <View style={styles.container}>

                <BackHeader headerText={"Stationary Activity"} prevPage={this.openPrevPage}/>

                <TimeBar/>

                <DataEntryModal
                    visible={this.state.dataPopover}
                    anchor={TimeBar}
                    closeData={this.closeData}
                />
                
                <View style={styles.mapContainer}>
                    <StationaryActivityMap
                        location={this.state.location}
                        area={this.state.area}
                        position={this.state.position}
                        markers={this.state.markers}
                        addMarker={this.onPointCreate}
                    />
                </View>

            </View>
        );
    }
}

export default StationaryActivity;
