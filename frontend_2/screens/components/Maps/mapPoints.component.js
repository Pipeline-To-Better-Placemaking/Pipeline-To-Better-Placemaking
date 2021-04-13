import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Polyline, Callout } from 'react-native-maps'
import { View, ScrollView } from 'react-native';
import { Text, Button, Input, Icon, Divider, List, ListItem, Radio, RadioGroup } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useEffect } from 'react';

// get center point
// https://github.com/react-native-maps/react-native-maps/issues/505
export function getRegionForCoordinates(points) {

    if(points === null && points.length <= 0){
      return {
        latitude: 28.60275207150067,
        longitude: -81.20052214711905,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      };
    }
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;

    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX) + 0.001; // 0.001 adds some buffer space
    const deltaY = (maxY - minY) + 0.001; // 0.001 adds some buffer space

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
}

export const getAreaName = async (area) => {
    let centerPoint = await getRegionForCoordinates(area);
    let retVal = await getLocationName(centerPoint);
    return retVal;
}

export const getLocationName = async (loc) => {
    let retVal = "location";
    let locationInfo = await Location.reverseGeocodeAsync(loc);
    if (locationInfo !== null && locationInfo.length >= 1){
      retVal = locationInfo[0].name;
    }
    return retVal;
}

export const getLocationAddress = async (address) => {
  let retVal = null;

  let locationAddress = await Location.geocodeAsync(address);

  if (locationAddress != null && locationAddress.length >= 1){
    // console.log("The geolocation for " + address + " is this: " + locationAddress[0].longitude);
    retVal = locationAddress[0];
  }

  return retVal;
}

/* This needs:
location={}
markers={}
setMarkers={}
mapHeight={}
listHeight={}
*/
export function MapAdd({children, ...props}) {

  const [mapConfig, setMapConfig] = useState("standard")

  useEffect(() => {
      async function fetchConfig() {
          setMapConfig(await AsyncStorage.getItem("@mapConfig"))
      }
      fetchConfig()
  })

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

  // This is basically a default zoom level
  let location = {
    latitude: props.location.latitude,
    longitude: props.location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // If we have markers, then we can calculate the zoom level
  if (props.markers !== null && props.markers.length >= 2) {
    location = getRegionForCoordinates(props.markers);
  }

  return(
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height:props.mapHeight}}
        zoomEnabled
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        }}
        onPress={event => addMarker(event.nativeEvent.coordinate)}
        mapType={mapConfig}
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
      <MapAreaWrapper area={areas[selectedIndex].points} mapHeight={'80%'}>
        <ShowArea area={areas[selectedIndex].points}/>
      </MapAreaWrapper>
      <ScrollView style={{maxheight:'30%', marginTop:-100}}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}>
          {areas.map((area, index) => (
            <Radio key={index}>
              <Text style={{fontSize:20}}>
                {(index === 0 ? 'Project Perimeter' : area.title)}
              </Text>
            </Radio>
          ))}
        </RadioGroup>
      </ScrollView>
    </View>
  )
};

export const MapAreaWrapper = ({children, area, mapHeight}) => {

  const [mapConfig, setMapConfig] = useState("standard")

  useEffect(() => {
      async function fetchConfig() {
          setMapConfig(await AsyncStorage.getItem("@mapConfig"))
      }
      fetchConfig()
  })

  const location = getRegionForCoordinates(area);
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height:mapHeight}}
        zoomEnabled
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        }}
        mapType={mapConfig}
      >
        {children}
      </MapView>
    </View>)
 };

 export const PressMapAreaWrapper = ({children, area, mapHeight, onPress, recenter }) => {

  const [region, setRegion] = useState(getRegionForCoordinates(area));
  const [defaultRegion] = useState(getRegionForCoordinates(area))
  const [mapConfig, setMapConfig] = useState("standard")

  useEffect(() => {
      async function fetchConfig() {
          setMapConfig(await AsyncStorage.getItem("@mapConfig"))
      }
      fetchConfig()
  })

  const regionChange = (newRegion) => {
    setRegion(newRegion)
  }

    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{height:mapHeight}}
          zoomEnabled
          initialRegion={region}
          region={recenter ? defaultRegion : region}
          mapType={mapConfig}
          onRegionChangeComplete={(newRegion) => regionChange(newRegion)}
          onPress={event => onPress(event.nativeEvent.coordinate)}
        >
          {children}
        </MapView>
      </View>
      )

  };

export const MapWrapper = ({children, location, mapHeight}) => {

  const [mapConfig, setMapConfig] = useState("standard")

  useEffect(() => {
      async function fetchConfig() {
          setMapConfig(await AsyncStorage.getItem("@mapConfig"))
      }
      fetchConfig()
  })

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height:mapHeight}}
        mapType={mapConfig}
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
          fillColor={'rgba(0,0,0,0.2)'}
        />
        )
    };

export const ShowAreas = ({areas}) => {
  const center = areas.map((area, index) => getRegionForCoordinates(area.points));
  return (areas.map((area, index) => (
    <View key={area._id}>
      <MapView.Polygon
        coordinates={area.points}
        strokeWidth={3}
        strokeColor={(index === 0 ? 'rgba(0,0,255,0.5)' : 'rgba(255,0,0,0.5)')}
        fillColor={(index === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)')}
        key={area._id}
      >
      </MapView.Polygon>
      <MapView.Marker
        key={area.points[0]._id}
        coordinate = {{
            latitude: center[index].latitude,
            longitude: center[index].longitude
        }}
      >
        <View>
          <Text
            status={'control'}
            style={{fontWeight: "bold", backgroundColor:'rgba(0,0,0,0.5)'}}
          >
            {(index === 0 ? '' : area.title)}
          </Text>
        </View>
      </MapView.Marker>
      </View>
  )))
};

export const ShowMarkers = ({markers}) => {
  if(markers === null || markers.length === 0) {
    return (null);
  }
  else {
    return (markers.map((coord, index) => (
        <MapView.Marker
          key={coord._id}
          coordinate = {{
              latitude: coord.latitude,
              longitude: coord.longitude
          }}
        >
          <Callout>
            <Text style={{color:"black"}}>{coord.title}</Text>
          </Callout>
        </MapView.Marker>
        )))
    }
};

/* This needs:
location={}
markers={}
setMarkers={}
mapHeight={}
listHeight={}
*/

export function MapAddArea({children, ...props}) {
  const [region, setRegion] = useState({
    latitude: props.location.latitude,
    longitude: props.location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [mapConfig, setMapConfig] = useState("standard")

  useEffect(() => {
    if(props.region != null) {
      setRegion(props.region)
    }

    async function fetchConfig() {
      setMapConfig(await AsyncStorage.getItem("@mapConfig"))
    }

    fetchConfig()
  }, [props.region])

  // This is basically a default zoom level
  let location = {
    latitude: props.location.latitude,
    longitude: props.location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // If we have markers, then we can calculate the zoom level
  if (props.markers !== null && props.markers.length >= 2) {
    location = getRegionForCoordinates(props.markers);
  }

  const removeMarker = (item, index) => {
    let temp = [...props.markers];
    temp.splice(index, 1);
    props.setMarkers(markers => [...temp]);
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

  const CreatePolygon = ({markers}) => {
    if(markers === null) {
      return (null);
    }
    else if (markers.length <= 1) {
      return (markers.map((coord, index) => (
          <MapView.Marker
            key={index}
            coordinate = {{
                latitude: coord.latitude,
                longitude: coord.longitude
            }}
          />
        )));
    } else if (markers.length === 2) {
      return (
          <MapView.Polyline
            coordinates={markers}
            strokeWidth={3}
            strokeColor={'rgba(255,0,0,0.5)'}
          />
        );
    } else {
      return(
          <MapView.Polygon
            coordinates={markers}
            strokeWidth={3}
            strokeColor={'rgba(255,0,0,0.5)'}
            fillColor={'rgba(0,0,0,0.2)'}
          />
        );
    }
  };

  return(
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height:props.mapHeight}}
        zoomEnabled
        region={region}
        mapType={mapConfig}
        onRegionChangeComplete={newRegion => setRegion(newRegion)}
        onPress={event => addMarker(event.nativeEvent.coordinate)}
      >
        <CreatePolygon {...props} markers={props.markers} />
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

/* This needs:
area={}
marker={}
setMarker={}
*/
export function MapAddOne({children, ...props}) {

  const [mapConfig, setMapConfig] = useState("standard")

  useEffect(() => {
      async function fetchConfig() {
          setMapConfig(await AsyncStorage.getItem("@mapConfig"))
      }
      fetchConfig()
  })


  // This is basically a default zoom level
  let location = getRegionForCoordinates(props.areas[0].points)

  return(
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height:'100%'}}
        zoomEnabled
        mapType={mapConfig}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        }}
        onPress={event => props.setMarker(event.nativeEvent.coordinate)}
      >
        <MapView.Marker
          coordinate={props.marker}
          draggable={true}
        />
        <ShowAreas areas={props.areas}/>
        {children}
      </MapView>
    </View>
  );
}

const DeleteIcon = (props) => (
  <Icon {...props} name='trash-2-outline'/>
);
