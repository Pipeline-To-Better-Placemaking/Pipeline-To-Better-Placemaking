import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function OrderMap(props) {

    // Custom colored data pin
    const DataPin = (props) =>{
        return(
            <View style={[styles.orderTriangle, styles.orderArrowUp, {borderBottomColor: props.color}]} />
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
                // set as color for the maintenance type
                let color = "#FFE371";
                // change its color if it is for the behavior type
                if(props.dataPoints[i].kind === "Behavior") color = "#FF9933"
                obj[i] = (
                    <View key={i.toString()}>
                        <MapView.Marker coordinate={props.dataPoints[i].location}>
                            <DataPin color={color} />
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