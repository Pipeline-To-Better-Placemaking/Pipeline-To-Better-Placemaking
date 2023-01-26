import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { InfoModal } from '../Activities/Boundary/infoModal.component';
import DropDownPicker from 'react-native-dropdown-picker';

import { styles } from './sharedMap.styles';

export function BoundaryMapResults(props) {

    // filter controls
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [filter, setFilter] = useState([
        {label: "Show All", value: 1}, 
        {label: "Constructed", value: 2},
        {label: "Material", value: 3}, 
        {label: "Shelter", value: 4}
    ]);
    const [constructBool, setConstructBool] = useState(true);
    const [materialBool, setMaterialBool] = useState(true);
    const [shelterBool, setShelterBool] = useState(true);

    const [infoModal, setInfoModal] = useState(false);
    const [boundInfo, setBoundInfo] = useState();


    const colors = ['rgba(255, 0, 255, 1)', 'rgba(0, 255, 193, 1)', 'rgba(255, 166, 77, 1)'];
    const fills = ['rgba(0, 255, 193, 0.5)', 'rgba(255, 166, 77, 0.5)'];

    // controls which boundaries show on the map during data collection
    const filterControl = (item) =>{
        let type = item.value; 
        // Show All
        if(type === 1){
            setConstructBool(true);
            setMaterialBool(true);
            setShelterBool(true);
        }
        // Construction
        else if(type === 2){
            setConstructBool(true);
            setMaterialBool(false);
            setShelterBool(false);
        }
        // Material
        else if(type === 3){
            setConstructBool(false);
            setMaterialBool(true);
            setShelterBool(false);
        }
        // Shelter
        else if(type === 4){
            setConstructBool(false);
            setMaterialBool(false);
            setShelterBool(true);
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