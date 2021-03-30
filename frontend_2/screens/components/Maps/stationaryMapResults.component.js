import React from 'react';
import MapView, { Callout } from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';

export function StationaryMapResults(props) {

    // Color constants for the data points
    const colors = ["blue", "red", "yellow", "green"]

    // Custom colored data pin
    const DataPin = (props) => {

        return(
            <View style={{backgroundColor: colors[props.index % 4], borderRadius: 150/2, borderWidth: 1, width: 15, height: 15}}/>
        )
    }

    const DataCallout = (props) => {

        //console.log("Age: " + JSON.stringify(props.point))

        return (
            <View style={{flexDirection: 'column', margin:10}}>
              <Text style={{color:"black"}}>
                  Age: {'\t' + props.point.age}
              </Text>

              <Text style={{color:"black"}}>
                  Gender: {' ' + props.point.gender}
              </Text>

              <Text style={{color:"black"}}>
                  Activity: {' ' + props.point.activity}
              </Text>

              <Text style={{color:"black"}}>
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
                    <DataPin index={index}/>
                    <Callout style={{position: 'relative'}}>
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
                    fillColor={'rgba(0,0,0,0.5)'}
                />

                <ShowPolygon/>

            </PressMapAreaWrapper>
        </View>
    )
};
