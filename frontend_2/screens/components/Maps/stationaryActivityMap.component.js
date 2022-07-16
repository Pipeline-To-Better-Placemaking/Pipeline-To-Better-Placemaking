import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function StationaryActivityMap(props) {

    // Color constants for the data points
    const colors = ["blue", "red", "yellow", "green"]

    // Custom colored data pin
    const DataPin = (props) => {

        return(
            <View style={[ styles.dataPin, {backgroundColor: colors[props.index]}]}/>
        )
    }

    // Shows the project area, along with the plotted points
    const ShowPolygon = () => {
        if(props.markers === null) {
            return (null);
        }
        else {
            return (
                props.markers.map((coord, index) => (
                <MapView.Marker
                    key={index}
                    coordinate = {{
                        latitude: coord.marker.latitude,
                        longitude: coord.marker.longitude
                    }}
                >
                    <DataPin index={coord.colorIndex}/>
                </MapView.Marker>
             )))
         }
    }
    // offsets the default marker slightly to have its point appear in a precise location
    let offsetPoint = {
        x: 0.5,
        y: 1.1
    }
    return(

        <View>
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={'97.5%'}
                onPress={props.addMarker}
                recenter={props.recenter}
            >
                <MapView.Marker
                    coordinate={props.position}
                    anchor={offsetPoint}
                />

                <MapView.Polygon
                    coordinates={props.area}
                    strokeWidth={3}
                    strokeColor={'rgba(255,0,0,0.5)'}
                    fillColor={'rgba(0,0,0,0.2)'}
                />

                <ShowPolygon/>

            </PressMapAreaWrapper>
        </View>
    )
}