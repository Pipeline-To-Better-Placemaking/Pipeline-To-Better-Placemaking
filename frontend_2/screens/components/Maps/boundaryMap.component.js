import React, { useRef } from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function BoundaryMap(props) {
    const mapRef = useRef();
    const conRef = useRef();
    const matRef = useRef();
    const sheRef = useRef();

    const colors = ['rgba(255, 0, 255, 1)', 'rgba(255, 227, 113, 1)', 'rgba(255, 166, 77, 1)'];
    const fills = ['rgba(255, 227, 113, 0.5)', 'rgba(255, 166, 77, 0.5)']

    // Custom colored data pin
    const DataPin = () =>{
        return(
            <View style={styles.redDataPin} />
        )
    }

    const CreatePoly = () => {
        let color = 'pink';
        // if the type of boundary is a construction boundary (polyline)
        if(props.type === 0){
            if(props.markers === null || props.markers.length == 0) {
                return (null);
            }

            else if (props.markers.length == 1) {
                return (props.markers.map((coord, index) => (
                    <MapView.Marker
                        key={index}
                        coordinate={props.markers[0]}
                    >
                        <DataPin/>
                    </MapView.Marker>
            )));

            }
            else if (props.markers.length > 1) {

                return (
                    <MapView.Polyline
                        coordinates={props.markers}
                        strokeWidth={3}
                        strokeColor={colors[0]}
                    />
                );
            }
        }
        // otherwise, it is a material or shelter boundary (polygon)
        else{
            let fill;
            if(props.type === 1){
                color = colors[1];
                fill = fills[0];
            }
            else{
                color = colors[2];
                fill = fills[1];
            }

            if(props.markers === null || props.markers.length == 0) {
                return (null);
            }

            else if (props.markers.length == 1) {

                return (props.markers.map((coord, index) => (
                    <MapView.Marker
                        key={index}
                        coordinate = {props.markers[0]}
                    >
                        <DataPin/>
                    </MapView.Marker>
            )));

            }
            else if (props.markers.length === 2) {

                return (
                    <MapView.Polyline
                        coordinates={props.markers}
                        strokeWidth={3}
                        strokeColor={color}
                    />
                );
            }
            else if (props.markers.length > 2){
                return(
                    <MapView.Polygon 
                        coordinates={props.markers}
                        strokeWidth={3}
                        strokeColor={color}
                        fillColor={fill}
                    />
                )
            }
        }
    }

    const ConstructBounds = () =>{
        return(    
            props.linePaths.map((obj, index) => (
                <MapView.Polyline
                    ref={conRef}
                    coordinates={obj}
                    strokeWidth={3}
                    strokeColor={colors[0]}
                    key={index}
                />
            ))
        )
    }

    const MaterialBounds = () =>{
        return(
            props.matPaths.map((obj, index) => (
                <MapView.Polygon
                    ref={matRef}
                    coordinates={obj}
                    strokeWidth={3}
                    strokeColor={colors[1]}
                    fillColor={fills[0]}
                    key={index}
                />
            ))
        )
    }

    const ShelterBounds = () =>{
        return(
            props.shePaths.map((obj, index) => (
                <MapView.Polygon
                    ref={sheRef}
                    coordinates={obj}
                    strokeWidth={3}
                    strokeColor={colors[2]}
                    fillColor={fills[1]}
                    key={index}
                />
            ))
        )
    }

    const AllBounds = () => {
        if (props.viewAll) {
            //console.log("Drawing boundaries")
            return (
                <View>
                    <ConstructBounds />
                    <MaterialBounds />
                    <ShelterBounds />
                </View>
            )
        }
        else return null
    }

    return(
        
        <View>
            {/* main mapview container */}
            <PressMapAreaWrapper
                ref={mapRef}
                area={props.area}
                mapHeight={'95%'}
                onPress={props.addMarker}
                recenter={props.recenter}
            >
                {/* shows the project area on the map */}
                <MapView.Polygon
                    coordinates={props.area}
                    strokeWidth={3}
                    strokeColor={'rgba(255,0,0,0.5)'}
                    fillColor={'rgba(0,0,0,0.2)'}
                />

                <CreatePoly />
                
                {props.viewAll ?
                    <View>
                        <ConstructBounds />
                        <MaterialBounds />
                        <ShelterBounds />
                    </View>
                :
                    null
                }
                {props.lineBool ?
                    <ConstructBounds />
                :
                    null
                }
                {props.matBool ?
                    <MaterialBounds />
                :
                    null
                }
                {props.sheBool ?
                    <ShelterBounds />
                :
                    null
                }

            </PressMapAreaWrapper>
        </View>
    )
}