import React from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function NatureMapResults(props) {
    // is mostly a copy of the boundaryMapResults, will need to change a lot here

    // renders the project data that was collected
    const ShowData = () =>{
        if(props.dataMarkers === null) {
            return (null);
        }
        else{
            let objData = [[]];
            // loop through all the data objects and add the appropriate rendered object only if that filter is true
            for(let i = 0; i < props.dataMarkers.length; i++){
                // filter for construction boundaries
                if(constructBool){
                    // if the boundary is a construction boundary, add a polyline
                    if(props.dataMarkers[i].kind === "Constructed"){
                        objData[i] = (
                            <View key={i.toString()}>
                                <MapView.Polyline
                                    coordinates={props.dataMarkers[i].path}
                                    strokeWidth={3}
                                    strokeColor={colors[0]}
                                    tappable={true}
                                    onPress={()=> dataCallout(props.dataMarkers[i])}
                                />
                            </View>
                        )
                    }
                }
                // filter for material boundaries
                if(materialBool){
                    // if the boundary is a material boundary, add a polygon
                    if(props.dataMarkers[i].kind === "Material"){
                        objData[i] = (
                            <View key={i.toString()}>
                                <MapView.Polygon
                                    coordinates={props.dataMarkers[i].path}
                                    strokeWidth={3}
                                    strokeColor={colors[1]}
                                    fillColor={fills[0]}
                                    tappable={true}
                                    onPress={()=> dataCallout(props.dataMarkers[i])}
                                />
                            </View>
                        )
                    }
                }
                // filter for shelter boundaries
                if(shelterBool){
                    // if the boundary is a shelter boundary, add a polygon
                    if(props.dataMarkers[i].kind === "Shelter"){
                        objData[i] = (
                            <View key={i.toString()}>
                                <MapView.Polygon
                                    coordinates={props.dataMarkers[i].path}
                                    strokeWidth={3}
                                    strokeColor={colors[2]}
                                    fillColor={fills[1]}
                                    tappable={true}
                                    onPress={()=> dataCallout(props.dataMarkers[i])}
                                />
                            </View>
                        )
                    }
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
                mapHeight={'97%'}
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