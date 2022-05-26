import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function SoundMap(props) {

    // Color constant for the proportional data points
    const color = '#C665E9';

    // Custom colored data pin
    const DataPin = (props) => {

        return(
            <View style={[ styles.dataPin, {backgroundColor: color}]}/>
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
                    {/* not sure what this coord.colorIndex is supposed to be */}
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
}