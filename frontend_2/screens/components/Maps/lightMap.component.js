import React from 'react';
import MapView from 'react-native-maps'
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
                <MapView.Marker coordinate={props.marker} anchor={offsetPoint}>
                    <DataPin color={'#FD0000'} colorFill={'rgba(253, 0, 0, .5)'} />
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
                        <MapView.Marker
                            coordinate={props.dataPoints[i].location}
                            anchor={offsetPoint}
                        >
                            <DataPin
                                color={color}
                                colorFill={colorFill}
                            />
                        </MapView.Marker>
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

    return(
        <View>
            {/* main mapview container */}
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={'97.5%'}
                onPress={props.addMarker}
            >
                {/* shows the project area on the map */}
                <MapView.Polygon
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