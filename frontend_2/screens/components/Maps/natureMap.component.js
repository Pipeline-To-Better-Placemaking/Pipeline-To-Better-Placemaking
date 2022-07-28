import React from 'react';
import MapView from 'react-native-maps'
import { View, Platform } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function NatureMap(props) {

    const plat = Platform.OS;

    // Custom colored data pin
    const DataPin = () =>{
        return(
            <View style={styles.natureDataPin} />
        )
    }
    
    // Custom colored data pin used for plotting polygons
    const TempDataPin = (props) =>{
        return(
            <View style={[styles.dataPin, {backgroundColor: props.color}]} />
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
                    <DataPin />
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
            let obj = [];
            for(let i = 0; i < props.dataPoints.length; i++){
                obj[i] = ( 
                    <MapView.Marker
                        key={i.toString()}
                        coordinate={props.dataPoints[i].marker}
                        // sloves problem of not being able to delete points for android
                        onPress={(e) => checkPoint(e.nativeEvent.coordinate)}
                    >
                        <DataPin />
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

    // renders current polygon being drawn
    const CreatePoly = () => {
        if(props.markers === null || props.markers.length == 0) {
            return (null);
        }

        else if (props.markers.length == 1) {
            // set the color as the vegetation color
            let color = '#00FF00';
            // change it only if it is a body of water
            if(props.polyType === 0) color = 'red'
            return (props.markers.map((coord, index) => (
                <MapView.Marker
                    key={index}
                    coordinate = {props.markers[0]}
                >
                    <TempDataPin color={color} />
                </MapView.Marker>
            )));

        }
        else if (props.markers.length === 2) {
            // set the color as the vegetation color
            let color = '#00FF00';
            // change it only if it is a body of water
            if(props.polyType === 0) color = 'red'
            return (
                <MapView.Polyline
                    coordinates={props.markers}
                    strokeWidth={3}
                    strokeColor={color}
                />
            );
        }
        else if (props.markers.length > 2){
            // set the color as the vegetation color
            let color = '#00FF00';
            let colorFill = 'rgba(0, 255, 0, 0.5)'
            // change it only if it is a body of water
            if(props.polyType === 0){
                color = 'red'
                colorFill = 'rgba(255, 0, 0, 0.5)'
            }
            // android device
            if(plat === 'android'){
                return(
                    <MapView.Polygon 
                        coordinates={props.markers}
                        strokeWidth={2}
                        strokeColor={color}
                        fillColor={colorFill}
                    />
                )
            }
            // ios device
            else{
                return(
                    <MapView.Polygon
                        coordinates={props.markers}
                    />
                )
            }
        }
    }

    // renders markers on the points of the polygon the user is drawing
    const ShowPoints = () => {
        if(props.markers === null) {
            return (null);
        }
        else {
            // set the color as the vegetation color
            let color = '#00FF00';
            // change it only if it is a body of water
            if(props.polyType === 0) color = 'red'
            return (
                props.markers.map((coord, index) => (
                <MapView.Marker
                    key={index}
                    coordinate = {{
                        latitude: coord.latitude,
                        longitude: coord.longitude
                    }}
                >
                    <TempDataPin color={color}/>
                </MapView.Marker>
             )))
         }
    }
    
    // renders submitted bodies of water
    const BodyOfWater = () =>{
        // if there is a truthy value in the 1st water path then render the water boundary
        if(props.water[0]){
            if(plat === 'android'){
                return(
                    props.water.map((obj, index) => (
                        <MapView.Polygon
                            coordinates={obj}
                            key={index}
                            strokeWidth={2}
                            strokeColor={'#8CFFFF'}
                            fillColor={'rgba(140, 255, 255, .3)'}
                        />
                    ))
                )    
            }
            // ios device
            else{
                return(
                    props.water.map((obj, index) => (
                        <MapView.Polygon
                            coordinates={obj}
                            key={index}
                        />
                    ))
                )
            }
        }
        // otherwise return null
        else return null
    }

    // renders submitted vegetation
    const Vegetation = () =>{
        // if there is a truthy value in the 1st vege path then render the vegetation paths
        if(props.vege[0]){
            // android device
            if(plat === 'android'){
                return(
                    props.vege.map((obj, index) => (
                        <MapView.Polygon
                            coordinates={obj}
                            key={index}
                            strokeWidth={2}
                            strokeColor={'#00FF00'}
                            fillColor={'rgba(0, 255, 0, .5)'}
                        />
                    ))
                )    
            }
            // ios device
            else{
                // used to convert polygon arrays into enclosed line arrays (for consistent color)
                let paths = props.vege;
                let linePaths = [];
                let len = props.vege.length;
                // adds the 1st point to the end of each path object
                for(let i = 0; i < len; i++) linePaths[i] = paths[i].concat(paths[i][0]);
                
                return(
                    linePaths.map((obj, index) => (
                        <MapView.Polyline
                            coordinates={obj}
                            strokeWidth={3}
                            strokeColor={'#00FF00'}
                            key={index}
                        />
                    ))
                )
            }
        }
        // otherwise return null
        else return null

    }

    // checks if a data point already exists at that location
    const checkPoint = (marker) =>{
        // if the linetool bar is pulled up, we don't need to try deleting/adding any marker
        if(!props.cond){
            let index = -1;
            // loops through all the data points checking to see if its lat and long values are the same
            for(let i = 0; i < props.dataPoints.length; i++){
                if(props.dataPoints[i].marker.latitude === marker.latitude && props.dataPoints[i].marker.longitude === marker.longitude){
                    // if so set the index to its index in the data array
                    index = i
                }
            }
            // if the index is still -1, there is no point at that location so begin to add a marker
            if(index === -1) props.addMarker(marker)
            // otherwise, a point exists at that location so begin to delete the marker
            else props.deleteMarker(index)
        }
    }

    return(
        <View>
            {/* main mapview container */}
            <PressMapAreaWrapper
                area={props.area}
                mapHeight={'93%'}
                onPress={props.cond ? props.addShape : checkPoint}
            >
                {/* shows the project area on the map */}
                <MapView.Polygon
                    coordinates={props.area}
                    strokeWidth={3}
                    strokeColor={'rgba(255,0,0,0.5)'}
                    fillColor={'rgba(0,0,0,0.2)'}
                />
                
                <CreatePoly />
                
                <ShowPoints />

                <BodyOfWater />

                <Vegetation />

                <AddPoint />

                <PlotPoints />

            </PressMapAreaWrapper>
        </View>
    )
}