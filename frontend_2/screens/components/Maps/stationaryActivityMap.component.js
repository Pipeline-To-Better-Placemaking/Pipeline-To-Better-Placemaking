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
                    // sloves problem of not being able to delete points for android
                    onPress={(e) => checkPoint(e.nativeEvent.coordinate)}
                >
                    <DataPin index={coord.colorIndex}/>
                </MapView.Marker>
             )))
         }
    }

    // checks if a data point already exists at that location
    const checkPoint = (marker) =>{
        let index = -1;
        // loops through all the data points checking to see if its lat and long values are the same
        for(let i = 0; i < props.markers.length; i++){
            if(props.markers[i].marker.latitude === marker.latitude && props.markers[i].marker.longitude === marker.longitude){
                // if so set the index to its index in the data array
                index = i
            }
        }
        // if the index is still -1, there is no point at that location so begin to add a marker
        if(index === -1) props.addMarker(marker)
        // otherwise, a point exists at that location so begin to delete the marker
        else props.deleteMarker(index)
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
                mapHeight={'97%'}
                onPress={checkPoint}
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