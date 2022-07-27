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
                        <MapView.Marker 
                            coordinate={props.dataPoints[i].location} 
                            // sloves problem of not being able to delete points for android
                            onPress={(e) => checkPoint(e.nativeEvent.coordinate)}
                        >
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