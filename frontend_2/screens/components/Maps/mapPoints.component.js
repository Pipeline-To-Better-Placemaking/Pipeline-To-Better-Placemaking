import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Callout } from 'react-native-maps'
import { View } from 'react-native';
import { Text, Button, Input, Icon, Divider, List, ListItem} from '@ui-kitten/components';

/*
  MapAddPoints:
    - Displays at location, 1 sub area, and a List of points
    - Lets the user add and delete points from markers
    Need:
    location={}
    area={}
    markers={}
    setMarkers={}

  MapViewPoints:
    - Displays at location, 1 sub area, and markers on the Map
    Need:
    location={}
    area={}
    markers={}
*/

export function MapAddPoints(props) {

  const removeMarker = (item, index) => {
    props.markers.splice(index, 1);
    props.setMarkers(markers => [...markers]);
  };

  const addMarker = (coordinates) => {
    let point = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    };
    props.setMarkers(markers => [...markers,point]);
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`Point ${index+1}: `}
      description={`${item.latitude}, ${item.longitude}`}
      accessoryRight={DeleteIcon}
      onPress={() => removeMarker(item, index)}
    />
  );

  const ShowPolygon = () => {
    if(props.markers === null) {
      return (null);
    }
    else {
      return (props.markers.map((coord, index) => (
          <MapView.Marker
              key={index}
              coordinate = {{
                  latitude: coord.latitude,
                  longitude: coord.longitude
              }}
          >
            <Callout>
              <Text>Position {index+1}</Text>
            </Callout>
          </MapView.Marker>
          )))
      }
    };

    return(
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{height:'40%'}}
          initialCamera ={{
            center:{
                latitude: props.location.latitude,
                longitude: props.location.longitude
            },
            pitch: 10,
            heading: -1,
            altitude: -1,
            zoom: 17
          }}
          onPress={event => addMarker(event.nativeEvent.coordinate)}
        >
          <MapView.Polygon
           coordinates={props.area}
           strokeWidth={3}
           strokeColor={'rgba(255,0,0,0.5)'}
           fillColor={'rgba(0,0,0,0.5)'}
          />
          <ShowPolygon/>
        </MapView>

        <View style={{height:'40%', marginTop:20}}>
          <List
            style={{marginBottom: -100}}
            data={props.markers}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
        </View>
      </View>
    );
}

export function MapViewPoints(props) {

  const ShowPolygon = () => {
    if(props.markers === null) {
      return (null);
    }
    else {
      return (props.markers.map((coord, index) => (
          <MapView.Marker
              key={index}
              coordinate = {{
                  latitude: coord.latitude,
                  longitude: coord.longitude
              }}
          />
          )))
      }
    };

    return(
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{height:'100%'}}
          initialCamera ={{
            center:{
                latitude: props.location.latitude,
                longitude: props.location.longitude
            },
            pitch: 10,
            heading: -1,
            altitude: -1,
            zoom: 17
          }}
        >
          <MapView.Polygon
           coordinates={props.area}
           strokeWidth={3}
           strokeColor={'rgba(255,0,0,0.5)'}
           fillColor={'rgba(0,0,0,0.5)'}
          />
          <ShowPolygon/>
        </MapView>
      </View>
    );
}

const DeleteIcon = (props) => (
  <Icon {...props} name='trash-2-outline'/>
);
