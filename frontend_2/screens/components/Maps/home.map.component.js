import React, { Component, useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { View } from 'react-native';
import styles from './home.map.styles.js';
import { getRegionForCoordinates } from './mapPoints.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HomeMapView(props) {

    const [mapConfig, setMapConfig] = useState("standard")

    useEffect(() => {
        async function fetchConfig() {
            setMapConfig(await AsyncStorage.getItem("@mapConfig"))
        }
        fetchConfig()
    })

    let point = [{
        latitude: props.location.latitude,
        longitude: props.location.longitude
    }]

    let location = getRegionForCoordinates(point)

    return (
            <View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                initialRegion={location}
                mapType={mapConfig}
            >
                <Marker
                    coordinate = {{
                        latitude: props.location.latitude,
                        longitude: props.location.longitude
                    }}
                />

            </MapView>
            </View>
    );
}
