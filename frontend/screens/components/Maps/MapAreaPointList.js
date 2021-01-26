import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps'
import { View } from 'react-native';
import { Text, Button, Input, Icon, Divider, List, ListItem} from '@ui-kitten/components';
import styles from '../../ResearchActivities/standingPointStyles.js';

class MapAreaPointList extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
            markers: props.markers,
        }
    }

    render() {

        const DeleteIcon = (props) => (
          <Icon {...props} name='trash-2-outline'/>
        );

        const renderItem = ({ item, index }) => (
            <ListItem
              title={`Point ${index+1}: `}
              description={`${item.latitude}, ${item.longitude}`}
              accessoryRight={DeleteIcon}
              onPress={() => this.props.removeMarker(item, index)}
            />
        );

        const ShowPolygon = () => {
            if(this.props.markers === null) {
                return (null);
            }
            else {//if(this.props.markers.length < 3) {
                return (this.props.markers.map((coord, index) => (
                    <MapView.Marker
                        key={index}
                        coordinate = {{
                            latitude: coord.latitude,
                            longitude: coord.longitude
                        }}
                    />
                    )))
                }
            }

        return(
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{height:'40%'}}
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
                    onPress={event => this.props.addMarker(event.nativeEvent.coordinate)}
                >
                    <MapView.Polygon
                     coordinates={this.props.area}
                     strokeWidth={3}
                     strokeColor={'rgba(255,0,0,0.5)'}
                     fillColor={'rgba(0,0,0,0.5)'}
                    />

                    <ShowPolygon/>

                </MapView>

                <View style={styles.pointList}>
                    <List
                        style={styles.list}
                        data={this.state.markers}
                        ItemSeparatorComponent={Divider}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        );
    }
}

export default MapAreaPointList;
