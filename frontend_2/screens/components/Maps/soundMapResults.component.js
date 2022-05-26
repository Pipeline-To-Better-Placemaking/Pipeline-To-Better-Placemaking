import React from 'react';
import MapView, { Callout } from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { Text } from '@ui-kitten/components';

import { styles } from './sharedMap.styles';

export function SoundMapResults(props) {

    // Color constant for the data points
    const color = '#C665E9'

    // Custom colored data pin, need to format these data pins to be data proportion pins
    const DataPin = (props) => {
        return(
            <View style={[ styles.dataPin, {backgroundColor: color}]}/>
        )
    }

    const DataCallout = (props) => {

        return (
            <View style={styles.dataCallOutView}>
              
              {/* need to determine wha the point's data for decibel reading is */}
              <Text style={styles.dataText}>
                  Sound Decibel: {'\t' + props.point.decibel}
              </Text>

            </View>
        )
    }

    // Shows the project area, along with the plotted points
    const ShowPolygon = () => {
        if(props.dataMarkers === null) {
            return (null);
        }
        else {
            return (
                props.dataMarkers.map((data, index) => (
                <MapView.Marker
                    key={index}
                    coordinate = {{
                        latitude: data.location.latitude,
                        longitude: data.location.longitude
                    }}
                >
                    <DataPin />
                    <Callout style={styles.callout}>
                        <DataCallout point={data}/>
                    </Callout>
                </MapView.Marker>
             )))
         }
    }

    return(

        <View>
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={'100%'}
                onPress={() => null}
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