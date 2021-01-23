import React, { Component } from 'react';
import { View, ScrollView, Pressable, Modal, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import MyHeader from '../components/MyHeader.js'
import styles from './standingPointStyles.js';
import MapAreaPointList from '../components/Maps/MapAreaPointList.js';

class StandingPointScreen extends Component {

    constructor(props){
        super(props);

        this.state = {

            location: props.location,
            area: props.area,
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

    onConfirm = () => {
        this.props.setData(this.state.markers)

        this.setState({
            markers: []
        })
    }

    onCancel = () => {

        this.props.cancel()
    }

    render() {

        const CancelIcon = (props) => (
            <Icon {...props} name='close-outline'/>
        );

        const CreateIcon = (props) => (
            <Icon {...props} name='checkmark-outline'/>
        );

        return(

            <Modal
                animationType='slide'
                visible={this.props.visible}
            >
            
                <View style={styles.container}>

                    <MyHeader myHeaderText={"Create Standing Points"}/>

                    <MapAreaPointList
                        location={this.state.location}
                        area={this.state.area}
                        addMarker={this.addMarker}
                        removeMarker={this.removeMarker}
                        markers={this.state.markers}
                    />

                    <View style={styles.buttonContainer}>

                        <Button 
                            status='danger'
                            accessoryLeft={CancelIcon}
                            onPress={this.onCancel}>
                            Cancel
                        </Button>

                        <Button
                            status='success'
                            accessoryLeft={CreateIcon}
                            onPress={this.onConfirm}>
                            Confrim
                        </Button>

                    </View>

                </View>
            </Modal>
        );
    }
}

export default StandingPointScreen;
