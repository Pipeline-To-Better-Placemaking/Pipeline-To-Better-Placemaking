import React from 'react';
import MapView, { Marker, Polygon, Polyline, Callout } from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { Text } from '@ui-kitten/components';

import { styles } from './sharedMap.styles';

export function OrderMapResults(props) {

    // data pins
    const DataPin = (props) => {
        return(
            <View style={[styles.orderTriangle, styles.orderArrowUp, {borderBottomColor: props.color}]}/>
        )
    }

    // displays information about the DataPin
    const DataCallout = (props) => {
        let descriptionFormat = []; 

        // formats the description array for a cleaner display
        props.desc.forEach(element =>{ 
            // if we are not at the last element, concat with comma and a whitespace
            if(element.localeCompare(props.desc[props.desc.length - 1]) !== 0) descriptionFormat.push(element.concat(", "));
            // when we are at the last element, concat with nothing
            else descriptionFormat.push(element.concat(''));
        })

        return (
            <View style={styles.soundDataCallOutView}>
                <View style={styles.spacing} >
                    <Text style={styles.dataText}>Type: {props.type}</Text>
                </View>

                <Text style={styles.dataText}>Description(s): {descriptionFormat}</Text>
            </View>
        )
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
                    // set as color for the maintenance type
                    let color = "#FFE371";
                    // change its color if it is for the behavior type
                    if(pointArr[j].kind === "Behavior") color = "#FF9933"
                    // add the marker to the rendered JSX array
                    objData.push(
                        <View key={keySum}>
                            <Marker
                                coordinate = {{
                                    latitude: pointArr[j].location.latitude,
                                    longitude: pointArr[j].location.longitude
                                }}
                            >
                                <DataPin color={color}/>

                                <Callout style={styles.callout}>
                                    <DataCallout 
                                        type={pointArr[j].kind}
                                        desc={pointArr[j].description}
                                    />
                                </Callout>
                        
                            </Marker>
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
                <Polygon
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