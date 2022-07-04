import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function OrderMap(props) {

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
                // only change color if its for the Vegetation type
                if(props.dataPoints[i].kind === "Vegetation") color = "#00FF00"
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

    return(
        <View>
            {/* main mapview container */}
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={'95%'}
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