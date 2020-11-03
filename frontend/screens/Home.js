import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'; 
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './styles/homeStyles.js'; 

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location
        }

        console.log(this.state.location);
    }

    render() {

        return(
            <View style={[{backgroundColor: '#FFFFFF'}]}>
                <View style={[{backgroundColor: '#006FD6'}]}>
                    <Text category='h5' style={styles.header}>
                        Home
                    </Text>
                </View>

                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.mapStyle}
                        initialCamera ={{
                            center:{
                                latitude: this.state.location.coords.latitude,
                                longitude: this.state.location.coords.longitude
                            },
                            pitch: 10,
                            heading: this.state.location.coords.heading,
                            altitude: this.state.location.coords.altitude,
                            zoom: 17
                        }}
                    />
                </View>

                <View>

                </View>


            </View>
        );

    }
}

export default Home;