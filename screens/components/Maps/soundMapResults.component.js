import React, { useState } from 'react';
import MapView, { Marker, Polygon, Polyline, Callout } from 'react-native-maps';
import { View } from 'react-native';
import { PressMapAreaWrapper } from './mapPoints.component';
import { Text } from '@ui-kitten/components';

import { styles } from './sharedMap.styles';

export function SoundMapResults(props) {

    const [standingPoints] = useState(props.position);

    // used to find the most common predominant sound type
    const mostCommon = (arr) =>{
        // used as a dictonary to store word and its frequency
        let hm = {};
        // iterate over the whole array
        for(let i = 0; i < arr.length; i++){
        // if the string already exists in hm then increase it's value by 1
        if(hm.hasOwnProperty(arr[i])) hm[arr[i]] = hm[arr[i]] + 1;
        // else add it in hm by giving it a value
        else hm[arr[i]] = 1;
        }

        let ret = '';
        let val = 0;
        // iterate over the dictonary looking for the highest frequency, then return that string
        for(const [word, value] of Object.entries(hm)){
            // if the value of the word in hm is larger than our current value
            if(value > val){
                // update the current value and the string
                val = value;
                ret = word;
            }
        }
        return ret;
    }

    // data proportion pins whose size is based off the decibel average
    const DataPin = (props) => {
        let scale = props.value * .9
        return(
            <View style={[ styles.soundDataPin, { width: scale, height: scale }]}/>
        )
    }
    
    // displays information about the DataPin
    const DataCallout = (props) => {
        let soundsFormat = []; 

        // formats the all sounds array for a cleaner display
        props.sounds.forEach(element =>{ 
            // if we are not at the last element, concat with comma and a whitespace
            if(element.localeCompare(props.sounds[props.sounds.length - 1]) !== 0) soundsFormat.push(element.concat(", "));
            // when we are at the last element, concat with nothing
            else soundsFormat.push(element.concat(''));
        })

        return (
            <View style={styles.soundDataCallOutView}>
              
                <View style={styles.spacing} >
                    <Text style={styles.dataText}>
                        Decibel: {props.value.toFixed(2)} dB
                    </Text>
                </View>
                
                <View style={styles.spacing}>
                    <Text style={styles.dataText}>
                        Main Sound: {props.mainSound}
                    </Text>
                </View>

                <View style={styles.restrict}>
                    <Text style={styles.dataText}>
                        Sounds: {soundsFormat}
                    </Text>
                </View>

            </View>
        )
    }

    // renders the project data that was collected
    const ShowData = () => {
        if(props.dataMarkers === null) {
            return (null);
        }
        else {
            // offsets the data proportion circle to have its center appear at the exact location of the marker
            let offsetPoint = {
                x: 0.48,
                y: 0.625
            }
            let objData = [[]];
            // for each standing point
            for(let i = 0; i < standingPoints.length; i++){
                // collect the information that needs to be rendered for each standing point
                let avg = props.graph[i].average;
                let mainSound = mostCommon(props.graph[i].predominant);
                let allSounds = props.dataMarkers[i].sound_type;
                
                // console.log(avg);
                // console.log(mainSound);
                // console.log(allSounds);
                
                // create an array of JSX objects to be rendered (at each standing point)
                objData[i] = (
                    <View key={i.toString()}>
                        <Marker
                            coordinate = {{
                                latitude: props.position[i].latitude,
                                longitude: props.position[i].longitude
                            }}
                            anchor={offsetPoint}
                        >
                            <DataPin value={avg}/>
                        
                            <Callout style={styles.callout}>
                                <DataCallout 
                                    value={avg}
                                    mainSound={mainSound}
                                    sounds={allSounds}
                                />
                            </Callout>
                        
                        </Marker>
                    </View>
                )
            }

            // return that array of JSX in a view (for it to render)
            return ( 
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