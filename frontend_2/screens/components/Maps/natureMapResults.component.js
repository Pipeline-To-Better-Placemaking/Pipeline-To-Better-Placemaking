import React, { useState } from 'react';
import MapView, { Callout } from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { Text } from '@ui-kitten/components';
import { InfoModal } from '../Activities/Nature/infoModal.component';

import { styles } from './sharedMap.styles';

export function NatureMapResults(props) {

    const [infoModal, setInfoModal] = useState(false);
    const [title, setTitle] = useState();
    const [info, setInfo] = useState();

    // data pins for vegetation and animal data
    const DataPin = (props) => {
        return(
            <View style={styles.natureDataPin}/>
        )
    }

    // displays information about the DataPin
    const DataCallout = (props) => {
        let title = props.type
        // if the type is an animal marker, change its title
        title = "Animal: " + title;
        return (
            <View style={styles.soundDataCallOutView}>
                <View style={styles.spacing} >
                    <Text style={styles.dataText}>{title}</Text>
                </View>
                <Text style={styles.dataText}>Description: {props.desc}</Text>
            </View>
        )
    }

    // pulls up the information modal of the body of water that was touched
    const dataCallout = (data, name) =>{
        setInfoModal(true);
        setInfo(data);
        setTitle(name);
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
            // keySum is so it doesn't complain about there being duplicate keys for the objData View's
            let keySum = 0;
            let objData = [[]];
            // loop through all the data objects and add the appropriate rendered object only if that filter is true
            for(let i = 0; i < props.dataMarkers.length; i++){
                let pointArr = props.dataMarkers[i].animal;
                // loop through the points array and plot those data points
                for(let j = 0; j < pointArr.length; j++){
                    // add the marker to the rendered JSX array
                    objData.push(
                        <View key={keySum}>
                            <MapView.Marker
                                coordinate = {{
                                    latitude: pointArr[j].marker.latitude,
                                    longitude: pointArr[j].marker.longitude
                                }}
                            >
                                <DataPin />

                                <Callout style={styles.callout}>
                                    <DataCallout 
                                        type={pointArr[j].kind}
                                        desc={pointArr[j].description}
                                    />
                                </Callout>
                        
                            </MapView.Marker>
                        </View>
                    )
                    keySum++;
                }
                let vegeArr = props.dataMarkers[i].vegetation;
                // loop through the water arrays and plot those polygons
                for(let j = 0; j < vegeArr.length; j++){
                    objData.push(
                        <View key={keySum}>
                            <MapView.Polygon
                                    coordinates={vegeArr[j].location}
                                    strokeWidth={2}
                                    strokeColor={'#00FF00'}
                                    fillColor={'rgba(0, 255, 0, .5)'}
                                    tappable={true}
                                    onPress={()=> dataCallout(vegeArr[j], "Vegetation")}
                            />
                        </View>
                    )
                    keySum++;
                }
                let waterArr = props.dataMarkers[i].water;
                // loop through the water arrays and plot those polygons
                for(let j = 0; j < waterArr.length; j++){
                    objData.push(
                        <View key={keySum}>
                            <MapView.Polygon
                                    coordinates={waterArr[j].location}
                                    strokeWidth={2}
                                    strokeColor={'#8CFFFF'}
                                    fillColor={'rgba(140, 255, 255, .3)'}
                                    tappable={true}
                                    onPress={()=> dataCallout(waterArr[j], "Body of Water")}
                            />
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

            <View>
                <InfoModal
                    visible={infoModal}
                    data={info}
                    title={title}
                    close={closeModal}
                />
            </View>
            
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