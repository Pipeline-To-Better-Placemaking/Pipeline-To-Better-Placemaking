import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { InfoModal } from '../Activities/Access/infoModal.component';
import DropDownPicker from 'react-native-dropdown-picker';

import { styles } from './sharedMap.styles';

export function BoundaryMapResults(props) {

    // filter controls
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [filter, setFilter] = useState([
        {label: "Show All", value: 1}, 
        {label: "Point", value: 2},
        {label: "Path", value: 3}, 
        {label: "Area", value: 4}
    ]);
    const [pointBool, setPointBool] = useState(true);
    const [pathBool, setPathBool] = useState(true);
    const [areaBool, setAreaBool] = useState(true);

    const [infoModal, setInfoModal] = useState(false);
    const [boundInfo, setBoundInfo] = useState();


    const colors = ['rgba(255, 0, 255, 1)', 'rgba(0, 255, 193, 1)', 'rgba(255, 166, 77, 1)'];
    const fills = ['rgba(0, 255, 193, 0.5)', 'rgba(255, 166, 77, 0.5)'];

    // controls which access show on the map during data collection
    const filterControl = (item) =>{
        let type = item.value; 
        // Show All
        if(type === 1){
            setPointBool(true);
            setPathBool(true);
            setAreaBool(true);
        }
        // Point
        else if(type === 2){
            setPointBool(true);
            setPathBool(false);
            setAreaBool(false);
        }
        // Path
        else if(type === 3){
            setPointBool(false);
            setPathBool(true);
            setAreaBool(false);
        }
        // Area
        else if(type === 4){
            setPointBool(false);
            setPathBool(false);
            setAreaBool(true);
        }
    }
    
    // pulls up the information modal of the boundary that was touched
    const dataCallout = (bound) =>{
        setInfoModal(true);
        setBoundInfo(bound);
    }
    
    // closes the information modal
    const closeModal = () =>{
        setInfoModal(false);
    }

    // renders the project data that was collected
    const ShowData = () =>{
        if(props.dataMarkers === null) {
            return (null);
        }
        else{
            let objData = [[]];
            // loop through all the data objects and add the appropriate rendered object only if that filter is true
            for(let i = 0; i < props.dataMarkers.length; i++){
                // filter for point access
                if(pointBool){
                    // if the access is a point access, add a marker
                    if(props.dataMarkers[i].kind === "Point"){
                        objData[i] = (
                            <View key={i.toString()}>
                                <MapView.Marker
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
                // filter for path access
                if(pathBool){
                    // if the access is a path access, add a polyline
                    if(props.dataMarkers[i].kind === "Path"){
                        objData[i] = (
                            <View key={i.toString()}>
                                <MapView.Polyline
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
                // filter for area access
                if(areaBool){
                    // if the access is a area access, add a polygon
                    if(props.dataMarkers[i].kind === "Area"){
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
            <View>
                <InfoModal
                    visible={infoModal}
                    data={boundInfo}
                    close={closeModal}
                />
            </View>

            <View style={styles.filterView}>
                <View>
                    <DropDownPicker
                        style={styles.filterSelect}
                        open={open}
                        setOpen={setOpen}
                        value={value}
                        setValue={setValue}
                        onSelectItem={ item => filterControl(item)}
                        items={filter}
                        setItems={setFilter}
                    />
                </View>
            </View>
            {/* zIndex allows the dropdown menu to render over the map */}
            <View style={{zIndex: -1}}>
                <PressMapAreaWrapper
                    area={props.area}
                    mapHeight={'96.5%'}
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
        </View>
    )
}