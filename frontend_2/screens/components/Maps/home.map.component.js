import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { View } from 'react-native';
import styles from './home.map.styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HomeMapView(props) {

    var location = props.location

    return (
            <View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                initialCamera ={{
                    center:{
                        latitude: location.latitude,
                        longitude: location.longitude
                    },
                    pitch: 10,
                    heading: -1,
                    altitude: -1,
                    zoom: 17
                }}
            >
                <Marker
                    coordinate = {{
                        latitude: location.latitude,
                        longitude: location.longitude
                    }}
                />

            </MapView>
            </View>
    );
}
