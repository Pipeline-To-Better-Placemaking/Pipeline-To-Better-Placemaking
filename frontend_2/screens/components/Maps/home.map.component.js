import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { View } from 'react-native';
import styles from './homeMapViewStyles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeMapView = async () => {

    let location = await AsyncStorage.getItem("@location");
    console.log("Location in map: " + location)
    console.log("Location Coords: " + location.coords)

    return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                initialCamera ={{
                    center:{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    },
                    pitch: 10,
                    heading: location.coords.heading,
                    altitude: location.coords.altitude,
                    zoom: 17
                }}
            >
                <Marker
                    coordinate = {{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }}
                />

            </MapView>
    );
}
