import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Callout } from 'react-native-maps'
import { View, ScrollView } from 'react-native';
import { Text, Button, Input, Icon, Divider, List, ListItem, Radio, RadioGroup } from '@ui-kitten/components';

/* This needs:
location={}
markers={}
setMarkers={}
mapHeight={}
listHeight={}
*/
export function MapAdd({children, ...props}) {

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

    return(
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{height:props.mapHeight}}
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
          {children}
        </MapView>

        <View style={{height:props.listHeight, marginTop:20}}>
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

export const SelectArea = ({areas, selectedIndex, setSelectedIndex}) => {

  return (
    <View style={{flex:1, flexDirection:'column'}}>
      <MapWrapper location={areas[selectedIndex].area[0]} mapHeight={'80%'}>
        <ShowArea area={areas[selectedIndex].area}/>
      </MapWrapper>
      <ScrollView style={{maxheight:'30%', marginTop:-100}}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}>
          {areas.map((area, index) => (
                <Radio key={index}><Text style={{fontSize:20}}>Area {index+1} </Text></Radio>
            ))}
        </RadioGroup>
      </ScrollView>
    </View>
  )
};

export const MapWrapper = ({children, location, mapHeight}) => {
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height:mapHeight}}
        initialCamera ={{
          center:{
              latitude: location.latitude,
              longitude: location.longitude
          },
          pitch: 10,
          heading: -1,
          altitude: -1,
          zoom: 17
        }}
      >
        {children}
      </MapView>
    </View>)
  };

  export const ShowArea = ({area}) => {
    return (
        <MapView.Polygon
          coordinates={area}
          strokeWidth={3}
          strokeColor={'rgba(255,0,0,0.5)'}
          fillColor={'rgba(0,0,0,0.5)'}
        />
        )
    };

export const ShowAreas = ({areas}) => {
  return (areas.map((area, index) => (
      <MapView.Polygon
        coordinates={area.area}
        strokeWidth={3}
        strokeColor={'rgba(255,0,0,0.5)'}
        fillColor={'rgba(0,0,0,0.5)'}
        key={index}
      />
      )))
  };

export const ShowMarkers = ({markers}) => {
  if(markers === null) {
    return (null);
  }
  else {
    return (markers.map((coord, index) => (
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

const DeleteIcon = (props) => (
  <Icon {...props} name='trash-2-outline'/>
);
