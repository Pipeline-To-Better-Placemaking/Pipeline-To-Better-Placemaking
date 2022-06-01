import React from 'react';
import MapView from 'react-native-maps'
import { View } from 'react-native';
import { SoundMapAreaWrapper } from './mapPoints.component';

import { styles } from './sharedMap.styles';

export function SoundMap(props) {

    return(
        
        <View>
            <SoundMapAreaWrapper
                area={props.area}
                mapHeight={'100%'}
                recenter={props.recenter}
            >
                <MapView.Marker
                    coordinate = {props.position}
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