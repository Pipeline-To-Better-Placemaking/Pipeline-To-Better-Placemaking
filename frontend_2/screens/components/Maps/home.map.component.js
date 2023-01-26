import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { View } from 'react-native';
import { getRegionForCoordinates } from './mapPoints.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './home.map.styles.js';

export function HomeMapView(props) {

    const [mapConfig, setMapConfig] = useState("satellite")

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
    // offsets the default marker slightly to have its point appear in a precise location
    let offsetPoint = {
        x: 0.5,
        y: 1.1
    }
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
                    anchor={offsetPoint}
                />

            </MapView>
            </View>
    );
}
