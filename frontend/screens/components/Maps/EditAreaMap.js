import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon} from 'react-native-maps'
import { View, Modal} from 'react-native';
import { Text, Button, Input, Icon, Divider, List, ListItem} from '@ui-kitten/components';

class EditAreaMap extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {

        const DeleteIcon = (props) => (
          <Icon {...props} name='trash-2-outline'/>
        );

        const CancelIcon = (props) => (
          <Icon {...props} name='close-outline'/>
        );

        const CreateIcon = (props) => (
          <Icon {...props} name='checkmark-outline'/>
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
            return (this.props.area.map((item, index) => (
                <MapView.Marker
                    key={index}
                    coordinate = {{
                        latitude: item.latitude,
                        longitude: item.longitude
                    }}
                />
            )));

        };

        return(
        <Modal
          animationType='slide'
          visible={this.props.editAreaVisible}
          >
            <View style={{flex:1,justifyContent: 'flex-start',flexDirection:'column',margin:20,marginTop:50}}>
                <View style={{flexDirection:'row', justifyContent:'space-between',margin:5}}>
                  <Text style={{fontSize:25}}>{this.props.areaName}</Text>
                  <Button
                      onPress={this.props.onDelete}
                      status='danger'
                      accessoryRight={DeleteIcon}>
                    Delete
                  </Button>
                </View>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{height:'50%'}}
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
                    onPress={event => this.props.addMarker(event.nativeEvent.coordinate)}
                >
                    <ShowPolygon />
                </MapView>

                <View style={{flexDirection:'row', justifyContent:'center', height:'35%', marginTop:15}}>
                    <List
                      data={this.props.area}
                      ItemSeparatorComponent={Divider}
                      renderItem={renderItem}
                    />
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
                    <Button
                        onPress={this.props.onCancel}
                        status='danger'
                        accessoryLeft={CancelIcon}>
                      Cancel
                    </Button>
                    <Button
                        onPress={this.props.onSave}
                        status='success'
                        accessoryLeft={CreateIcon}>
                      Save
                    </Button>
                </View>
            </View>
        </Modal>
        );
    }
}

export default EditAreaMap;
