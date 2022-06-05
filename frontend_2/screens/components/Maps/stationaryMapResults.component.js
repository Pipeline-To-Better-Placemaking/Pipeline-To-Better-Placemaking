import React from 'react';
import MapView, { Callout } from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { Text } from '@ui-kitten/components';

import { styles } from './sharedMap.styles';

export function StationaryMapResults(props) {

    // Color constants for the data points
    const colors = ["blue", "red", "yellow", "green"]

    const get_colorIndex = (posture) => {
        if (posture == "Standing"){
            return 0
        }
        else if (posture == "Sitting") {
            return 1
        }
        else if (posture == "Laying") {
            return 2
        }
        else {
            return 3
        }
    }

    // Custom colored data pin
    const DataPin = (props) => {

        let colorIndex = get_colorIndex(props.index)

        return(
            <View style={[ styles.dataPin, {backgroundColor: colors[colorIndex]}]}/>
        )
    }

    const DataCallout = (props) => {

        return (
            <View style={styles.dataCallOutView}>
              <Text style={styles.dataText}>
                  Age: {'\t' + props.point.age}
              </Text>

              <Text style={styles.dataText}>
                  Gender: {' ' + props.point.gender}
              </Text>

              <Text style={styles.dataText}>
                  Activity: {' ' + props.point.activity}
              </Text>

              <Text style={styles.dataText}>
                  Posture: {' ' + props.point.posture}
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
                    <DataPin index={data.posture}/>
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