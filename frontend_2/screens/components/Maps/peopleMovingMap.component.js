import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

export function PeopleMovingMap(props) {

    // Color constants for the data points
    const colors = ["blue", "red", "yellow", "green"]

    // Custom colored data pin
    const DataPin = (props) => {

        return(
            <View style={{backgroundColor: colors[props.index % 4], borderRadius: 150/2, borderWidth: 1, width: 15, height: 15}}/>
        )
    }

    const CreatePolyline = () => {

        console.log("Creating poly line")
        console.log("MARKERS: " + JSON.stringify(props.markers))

        if(props.markers === null || props.markers.length == 0) {
            console.log("Empty path")
            return (null);
        }

        else if (props.markers.length == 1) {

            console.log("First point added")


            return (props.markers.map((coord, index) => (
                <MapView.Marker
                    key={index}
                    coordinate = {props.markers[0]}
            />
        )));

        }
        else if (props.markers.length > 1) {

            console.log("Drawning line")

            return (
                <MapView.Polyline
                    coordinates={props.markers}
                    strokeWidth={3}
                    strokeColor={'rgba(255,0,0,0.5)'}
                />
            );
        }
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
                        latitude: coord.latitude,
                        longitude: coord.longitude
                    }}
                >
                    <DataPin index={index}/>
                </MapView.Marker>
             )))
         }
    }

    return(

        <View>
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={props.lineTools ? '93%' : '100%'}
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
                    fillColor={'rgba(0,0,0,0.5)'}
                />

                <ShowPolygon/>
                
                <CreatePolyline/>

            </PressMapAreaWrapper>
        </View>
    )
};
