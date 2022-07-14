import React from 'react';
import MapView, { Callout } from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { Text } from '@ui-kitten/components';

import { styles } from './sharedMap.styles';

export function LightMapResults(props) {

    // light data pin
    const DataPin = (props) => {
        return(
            <View style={[styles.lightDataPinCircle, {backgroundColor: props.colorFill, borderColor: props.color}]}>
                <View style={[styles.lightDataPin, {backgroundColor: props.color}]} />
            </View>
        )
    }

    // displays information about the DataPin
    const DataCallout = (props) => {
        return (
            <View style={styles.soundDataCallOutView}>
                <Text style={styles.dataText}>Light: {props.desc}</Text>
            </View>
        )
    }

    // offsets the data circle to have its center appear at the exact location of the marker
    let offsetPoint = {
        x: 0.5,
        y: 0.69
    }

    // renders the project data that was collected
    const ShowData = () =>{
        
        if(props.dataMarkers === null) {
            return (null);
        }
        else{
            // keySum is so it doesn't complain about there being duplicate keys for the objData View's
            let keySum = 0;
            let objData = [[]];
            // loop through all the data objects and add the appropriate rendered object only if that filter is true
            for(let i = 0; i < props.dataMarkers.length; i++){
                let pointArr = props.dataMarkers[i].points;
                // loop through the points array and plot those data points
                for(let j = 0; j < pointArr.length; j++){
                    // gets the color based on the light_description
                    let color;
                    let colorFill;
                    // only change color if its for the Vegetation type
                    if(pointArr[j].light_description === "Rhythmic"){
                        color = "#FFE371"
                        colorFill = 'rgba(255, 227, 113, .5)'
                    }
                    else if(pointArr[j].light_description === "Building"){
                        color = "#FF9933"
                        colorFill = 'rgba(255, 153, 51, .5)'
                    }
                    else{
                        color = '#FF00FF'
                        colorFill = 'rgba(255, 0, 255, .5)'
                    }
                    // add the marker to the rendered JSX array
                    objData.push(
                        <View key={keySum}>
                            <MapView.Marker
                                coordinate = {{
                                    latitude: pointArr[j].location.latitude,
                                    longitude: pointArr[j].location.longitude
                                }}
                                anchor={offsetPoint}
                            >
                                <DataPin color={color} colorFill={colorFill}/>

                                <Callout style={styles.callout}>
                                    <DataCallout desc={pointArr[j].light_description}/>
                                </Callout>
                        
                            </MapView.Marker>
                        </View>
                    )
                    keySum++;
                }
            }
            // return that array of JSX in a view (for it to render)
            return(
                <View>
                    {objData}
                </View>
            )
        }
    }

    return(

        <View>
            
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={'100%'}
                onPress={() => null}
            >
                {/* project perimeter render */}
                <MapView.Polygon
                    coordinates={props.area}
                    strokeWidth={3}
                    strokeColor={'rgba(255,0,0,0.5)'}
                    fillColor={'rgba(0,0,0,0.2)'}
                />
                    
                {/* project data render */}
                <ShowData/>

            </PressMapAreaWrapper>
        </View>
    )
}