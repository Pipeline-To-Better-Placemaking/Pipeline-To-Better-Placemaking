import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { View } from 'react-native';
import styles from './homeMapViewStyles.js';

class HomeMapView extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location
        }
    }

    render() {

        return(
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
                >
                    <Marker
                        coordinate = {{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude
                        }}
                    />

                </MapView>
            </View>
        );
    }
}

export default HomeMapView;
