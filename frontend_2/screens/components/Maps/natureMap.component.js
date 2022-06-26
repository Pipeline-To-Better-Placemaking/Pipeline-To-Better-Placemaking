import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function NatureMap(props) {

    // Custom colored data pin
    const DataPin = (props) =>{
        return(
            <View style={[styles.natureDataPin, {backgroundColor: props.color}]} />
        )
    }
    
    // renders current data point being placed
    const AddPoint = () =>{        
        if(props.marker == undefined || props.marker.length === 0) {
            return (null);
        }

        else{
            return(
                <MapView.Marker coordinate={props.marker} >
                    <DataPin color={'red'} />
                </MapView.Marker>
            )
        }
    }

    // renders submitted data points
    const PlotPoints = () =>{
        if(props.dataPoints === null || props.dataPoints.length == 0) {
            return (null);
        }

        else{
            //console.log(props.dataPoints)
            let obj = [];
            for(let i = 0; i < props.dataPoints.length; i++){
                // set as color for the animal type
                let color = "#B06A24";
                // only change color if its for the landscape type
                if(props.dataPoints[i].type === "Landscape") color = "#00FF00"
                obj[i] = ( 
                    <MapView.Marker
                        key={i.toString()}
                        coordinate={props.dataPoints[i].marker}
                    >
                        <DataPin
                            color={color}
                        />
                    </MapView.Marker>
                )
            }
            return(
                <View>
                    {obj}
                </View>
            )
        }
    }

    // renders current body of water being drawn
    const CreatePoly = () => {
        if(props.markers === null || props.markers.length == 0) {
            return (null);
        }

        else if (props.markers.length == 1) {
            return (props.markers.map((coord, index) => (
                <MapView.Marker
                        key={index}
                        coordinate = {props.markers[0]}
                    >
                        <DataPin color={'red'} />
                    </MapView.Marker>
            )));

        }
        else if (props.markers.length === 2) {

            return (
                <MapView.Polyline
                    coordinates={props.markers}
                    strokeWidth={3}
                    strokeColor={'red'}
                />
            );
        }
        else if (props.markers.length > 2){
            return(
                <MapView.Polygon 
                    coordinates={props.markers}
                    strokeWidth={0}
                />
            )
        }
    }
    
    // renders submitted bodies of water
    const BodyOfWater = () =>{
        // if there is a truthy value in the 1st water path then render the water boundary
        if(props.water[0]){
            return(
                props.water.map((obj, index) => (
                    <MapView.Polygon
                        coordinates={obj}
                        strokeWidth={0}
                        key={index}
                    />
                ))
            )
        }
        // otherwise return null
        else return null

    }

    return(
        <View>
            {/* main mapview container */}
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={props.cond ? '94%' : '94.8%'}
                onPress={props.cond ? props.addShape : props.addMarker}
            >
                {/* shows the project area on the map */}
                <MapView.Polygon
                    coordinates={props.area}
                    strokeWidth={3}
                    strokeColor={'rgba(255,0,0,0.5)'}
                    fillColor={'rgba(0,0,0,0.2)'}
                />
                
                <CreatePoly />
                
                <BodyOfWater />

                <AddPoint />

                <PlotPoints />

            </PressMapAreaWrapper>
        </View>
    )
}