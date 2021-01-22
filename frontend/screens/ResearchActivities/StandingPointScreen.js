import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import MyHeader from '../components/MyHeader.js'
import styles from './standingPointStyles.js';
import MapAreaWithPoints from '../components/Maps/MapAreaWithPoints.js';

class StandingPointScreen extends Component {

    constructor(props){
        super(props);

        this.state = {

            location: props.route.params.location,
            area: props.route.params.area,
            markers: []
        }

        this.addMarker = this.addMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    addMarker(coordinates) {

        let point = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        };

        let markers = this.state.markers

        markers.push(point)

        this.setState({
            markers: markers
        });
    }

    removeMarker(marker, index) {
    
        let markers = this.state.markers
        markers.splice(index, 1)

        this.setState({
            markers: markers
        })
    }

    onConfirm() {
        
    }

    render() {

        const CancelIcon = (props) => (
            <Icon {...props} name='close-outline'/>
        );

        const CreateIcon = (props) => (
            <Icon {...props} name='checkmark-outline'/>
        );


        return(
            
            <View style={styles.container}>

                <MyHeader myHeaderText={"Create Standing Points"}/>

                <MapAreaWithPoints
                    location={this.state.location}
                    area={this.state.area}
                    addMarker={this.addMarker}
                    removeMarker={this.removeMarker}
                    markers={this.state.markers}
                />

                <View style={styles.buttonContainer}>

                    <Button 
                        status='danger'
                        accessoryLeft={CancelIcon}>
                        Cancel
                    </Button>

                        <Button
                            status='success'
                            accessoryLeft={CreateIcon}>
                            Confrim
                        </Button>

                </View>

            </View>
        );
    }
}

export default StandingPointScreen;
