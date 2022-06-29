import React, { useState } from 'react';
import MapView, { Callout } from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { Text } from '@ui-kitten/components';
import { InfoModal } from '../Activities/Nature/infoModal.component';

import { styles } from './sharedMap.styles';

export function NatureMapResults(props) {

    const [infoModal, setInfoModal] = useState(false);
    const [info, setInfo] = useState();

    // data pins for vegetation and animal data
    const DataPin = (props) => {
        return(
            <View style={[ styles.natureDataPin, { backgroundColor: props.color }]}/>
        )
    }

    // displays information about the DataPin
    const DataCallout = (props) => {
        let title = props.type
        // if the type is an animal marker, change its title
        if(title === "Domesticated" || title === "Wild") title = "Animal: " + title;
        return (
            <View style={styles.soundDataCallOutView}>
                <View style={styles.spacing} >
                    <Text style={styles.dataText}>{title}</Text>
                </View>
                
                <View style={styles.spacing}>
                    <Text style={styles.dataText}>Description: {props.desc}</Text>
                </View>
            </View>
        )
    }

    // pulls up the information modal of the body of water that was touched
    const dataCallout = (data) =>{
        setInfoModal(true);
        setInfo(data);
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
                let pointArr = props.dataMarkers[i].points;
                // loop through the points array and plot those data points
                for(let j = 0; j < pointArr.length; j++){
                    // set as color for the animal type
                    let color = "#B06A24";
                    // only change color if its for the Vegetation type
                    if(pointArr[j].kind === "Vegetation") color = "#00FF00"
                    // add the marker to the rendered JSX array
                    objData.push(
                        <View key={keySum}>
                            <MapView.Marker
                                coordinate = {{
                                    latitude: pointArr[j].marker.latitude,
                                    longitude: pointArr[j].marker.longitude
                                }}
                            >
                                <DataPin color={color}/>

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
                let waterArr = props.dataMarkers[i].water;
                // loop through the water arrays and plot those polygons
                for(let j = 0; j < waterArr.length; j++){
                    objData.push(
                        <View key={keySum}>
                            <MapView.Polygon
                                    coordinates={waterArr[j].location}
                                    strokeWidth={2}
                                    tappable={true}
                                    onPress={()=> dataCallout(waterArr[j])}
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