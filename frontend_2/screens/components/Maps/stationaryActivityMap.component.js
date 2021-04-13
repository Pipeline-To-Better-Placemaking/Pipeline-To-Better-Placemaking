import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

export function StationaryActivityMap(props) {

    // Color constants for the data points
    const colors = ["blue", "red", "yellow", "green"]

    // Custom colored data pin
    const DataPin = (props) => {

        return(
            <View style={{backgroundColor: colors[props.index], borderRadius: 150/2, borderWidth: 1, width: 15, height: 15}}/>
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

    return(

        <View>
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={'100%'}
                onPress={props.addMarker}
                recenter={props.recenter}
            >
                <MapView.Marker
                    coordinate = {props.position}
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
};
