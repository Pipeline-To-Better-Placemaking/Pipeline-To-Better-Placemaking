import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps'
import { View } from 'react-native';
import { Text, Button, Input, Icon, Divider, List, ListItem} from '@ui-kitten/components';

class SubAreasMap extends Component {

    constructor(props){
        super(props);

        this.state = {
        }
    }

    render() {

        const ShowPolygons = () => {
            return (this.props.subareas.map((item, index) => (
                <MapView.Polygon
                    key={index}
                    coordinates={item.area}
                    strokeWidth={3}
                    strokeColor={'rgba(255,0,0,0.5)'}
                    fillColor={'rgba(0,0,0,0.5)'}
               />
            )));

        };

        return(
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{height:'100%'}}
                    initialCamera ={{
                        center:{
                            latitude: this.props.location.latitude,
                            longitude: this.props.location.longitude
                        },
                        pitch: 10,
                        heading: -1,
                        altitude: -1,
                        zoom: 17
                    }}
                >
                    <ShowPolygons />

                </MapView>
            </View>
        );
    }
}

export default SubAreasMap;
