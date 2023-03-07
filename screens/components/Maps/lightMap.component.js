import React from 'react';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function LightMap(props) {

    // Custom colored data pin
    const DataPin = (props) =>{
        return(
            <View style={[styles.lightDataPinCircle, {backgroundColor: props.colorFill, borderColor: props.color}]}>
                <View style={[styles.lightDataPin, {backgroundColor: props.color}]} />
            </View>
        )
    }

    // offsets the data circle to have its center appear at the exact location of the marker
    let offsetPoint = {
        x: 0.5,
        y: 0.69
    }
    
    // renders current data point being placed
    const AddPoint = () =>{        
        if(props.marker == undefined || props.marker.length === 0) {
            return (null);
        }

        else{
            return(
                <Marker coordinate={props.marker} anchor={offsetPoint}>
                    <DataPin color={'#FD0000'} colorFill={'rgba(253, 0, 0, .5)'} />
                </Marker>
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
                let color;
                let colorFill;
                // only change color if its for the Vegetation type
                if(props.dataPoints[i].light_description === "Rhythmic"){
                    color = "#FFE371"
                    colorFill = 'rgba(255, 227, 113, .5)'
                }
                else if(props.dataPoints[i].light_description === "Building"){
                    color = "#FF9933"
                    colorFill = 'rgba(255, 153, 51, .5)'
                }
                else{
                    color = '#FF00FF'
                    colorFill = 'rgba(255, 0, 255, .5)'
                }
                obj[i] = (
                    <View key={i.toString()}>
                        <Marker
                            coordinate={props.dataPoints[i].location}
                            anchor={offsetPoint}
                            // sloves problem of not being able to delete points for android
                            onPress={(e) => checkPoint(e.nativeEvent.coordinate)}
                        >
                            <DataPin
                                color={color}
                                colorFill={colorFill}
                            />
                        </Marker>
                    </View>
                )
            }
            return(
                <View>
                    {obj}
                </View>
            )
        }
    }
    
    // checks if a data point already exists at that location
    const checkPoint = (marker) =>{
        let index = -1;
        // loops through all the data points checking to see if its lat and long values are the same
        for(let i = 0; i < props.dataPoints.length; i++){
            if(props.dataPoints[i].location.latitude === marker.latitude && props.dataPoints[i].location.longitude === marker.longitude){
                // if so set the index to its index in the data array
                index = i
            }
        }
        // if the index is still -1, there is no point at that location so begin to add a marker
        if(index === -1) props.addMarker(marker)
        // otherwise, a point exists at that location so begin to delete the marker
        else props.deleteMarker(index)
    }

    return(
        <View>
            {/* main mapview container */}
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={'97%'}
                onPress={checkPoint}
            >
                {/* shows the project area on the map */}
                <Polygon
                    coordinates={props.area}
                    strokeWidth={3}
                    strokeColor={'rgba(255,0,0,0.5)'}
                    fillColor={'rgba(0,0,0,0.2)'}
                />

                <AddPoint />

                <PlotPoints />

            </PressMapAreaWrapper>
        </View>
    )
}