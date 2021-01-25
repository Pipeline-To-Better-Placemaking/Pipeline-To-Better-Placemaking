import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps'
import { View } from 'react-native';
import { Text, Button, Input, Icon, Divider, List, ListItem} from '@ui-kitten/components';

class ViewProjectMap extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
            area: props.area
        }
    }

    render() {

        return(
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{height:'100%'}}
                    initialCamera ={{
                        center:{
                            latitude: this.state.location.latitude,
                            longitude: this.state.location.longitude
                        },
                        pitch: 10,
                        heading: -1,
                        altitude: -1,
                        zoom: 17
                    }}
                >
                    <MapView.Polygon
                     coordinates={this.state.area}
                     strokeWidth={3}
                     strokeColor={'rgba(255,0,0,0.5)'}
                     fillColor={'rgba(0,0,0,0.5)'}
                   />
                </MapView>
            </View>
        );
    }
}

export default ViewProjectMap;
