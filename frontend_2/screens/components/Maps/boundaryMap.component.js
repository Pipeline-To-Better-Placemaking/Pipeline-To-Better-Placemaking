import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function BoundaryMap(props) {

    const colors = ['rgba(255, 0, 255, 1)', 'rgba(255, 227, 113, 1)', 'rgba(255, 166, 77, 1)'];
    // const fills = ['rgba(255, 227, 113, 0.5)', 'rgba(255, 166, 77, 0.5)']

    // Custom colored data pin
    const DataPin = () =>{
        return(
            <View style={styles.redDataPin} />
        )
    }

    const CreatePoly = () => {
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
            // let fill;
            let color;
            if(props.type === 1){
                color = colors[1];
                // fill = fills[0];
            }
            else{
                color = colors[2];
                // fill = fills[1];
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
            // don't render colors with polygons as they don't stay consistent (flashes between set colors and default)
            else if (props.markers.length > 2){
                return(
                    <MapView.Polygon 
                        coordinates={props.markers}
                        strokeWidth={0}
                        // strokeColor={color}
                        // fillColor={fill}
                    />
                )
            }
        }
    }

    // with polygons there is a glitch with the strokeColor and fillColor that causes the colors to flicker (likely due to the filter and setInterval as it happens on ticks down)
    // going with using enclosed polylines intstead for a consistent apperance during the test (the result map will use polygons and the colors shouldn't glitch)
    
    
    const ConstructBounds = () =>{
        if(props.lineBool){
            return(    
                props.linePaths.map((obj, index) => (
                    <MapView.Polyline
                        coordinates={obj}
                        strokeWidth={3}
                        strokeColor={colors[0]}
                        key={index}
                    />
                ))
            )
        }
        else return null
    }

    const MaterialBounds = () =>{
        if(props.matBool){
            // return(
            //     props.matPaths.map((obj, index) => (
            //         <MapView.Polygon
            //             coordinates={obj}
            //             strokeWidth={3}
            //             strokeColor={colors[1]}
            //             fillColor={fills[0]}
            //             key={index}
            //         />
            //     ))
            // )
            // used to convert polygon arrays into enclosed line arrays
            let paths = props.matPaths;
            let linePaths = [];
            let len = props.matPaths.length;
            // adds the 1st point to the end of each path object
            for(let i = 0; i < len; i++) linePaths[i] = paths[i].concat(paths[i][0]);

            return(
                linePaths.map((obj, index) => (
                    <MapView.Polyline
                        coordinates={obj}
                        strokeWidth={3}
                        strokeColor={colors[1]}
                        key={index}
                    />
                ))
            )
        }
        else return null
    }

    const ShelterBounds = () =>{
        if(props.sheBool){
            // return(
            //     props.shePaths.map((obj, index) => (
            //         <MapView.Polygon
            //             coordinates={obj}
            //             strokeWidth={3}
            //             strokeColor={colors[2]}
            //             fillColor={fills[1]}
            //             key={index}
            //         />
            //     ))
            // )
            // used to convert polygon arrays into enclosed line arrays
            let paths = props.shePaths;
            let linePaths = [];
            let len = props.shePaths.length;
            // adds the 1st point to the end of each path object
            for(let i = 0; i < len; i++) linePaths[i] = paths[i].concat(paths[i][0]);

            return(
                linePaths.map((obj, index) => (
                    <MapView.Polyline
                        coordinates={obj}
                        strokeWidth={3}
                        strokeColor={colors[2]}
                        key={index}
                    />
                ))
            )
        }
        else return null
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
                
                {/* draws polyline/polygon that the user is making */}
                <CreatePoly />
                
                {/* renders submitted drawn boundaries during test collection */}
                <AllBounds />

            </PressMapAreaWrapper>
        </View>
    )
}