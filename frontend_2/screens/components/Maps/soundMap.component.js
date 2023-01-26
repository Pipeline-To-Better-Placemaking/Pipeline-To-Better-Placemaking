import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { SoundMapAreaWrapper } from './mapPoints.component';

export function SoundMap(props) {
    // offsets the default marker slightly to have its point appear in a precise location
    let offsetPoint = {
        x: 0.5,
        y: 1.1
    }
    return(
        
        <View>
            <SoundMapAreaWrapper
                area={props.area}
                mapHeight={'97%'}
                recenter={props.recenter}
            >
                <MapView.Marker
                    coordinate = {props.position}
                    anchor={offsetPoint}
                />

                <MapView.Polygon
                    coordinates={props.area}
                    strokeWidth={3}
                    strokeColor={'rgba(255,0,0,0.5)'}
                    fillColor={'rgba(0,0,0,0.2)'}
                />
                                
            </SoundMapAreaWrapper>
        </View>
    )
}