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
            lat: 0,
            long: 0
        }
    }

    render() {

        return(
            <View>
                 <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapStyle}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                />
            </View>
        );

    }
}

export default Home;