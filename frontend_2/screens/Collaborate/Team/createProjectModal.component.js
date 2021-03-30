import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../../components/headers.component';
import { MapAddArea, ShowMarkers , getAreaName, getRegionForCoordinates, getLocationAddress } from '../../components/Maps/mapPoints.component';
import { ModalContainer} from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { styles } from './createProjectModal.styles';

export function CreateProject(props) {

  const [location, setLocation] = useState(props.location);
  const [markers, setMarkers] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [region, setRegion] = useState(null);
  const [markerError, setMarkerError] = useState(true);
  const [attemptedCreation, setAttemptedCreation] = useState(false);

  useEffect(() => {
    if (markers.length >= 3)
      setMarkerError(false);
    else
      setMarkerError(true);
  }, [markers])

  const confirmCreateProject = async () => {
    setAttemptedCreation(true);
    if(markerError)
      return;

    let success = false
    let projectDetails = null
    let centerPoint = getRegionForCoordinates(markers);
    let description = await getAreaName(markers);
    let name = projectName;

    if (name == '')
      name = 'Project'

    // Save the new project
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
                title: name,
                description: description,
                points: markers,
                team: props.team,
                standingPoints:[{latitude: centerPoint.latitude, longitude: centerPoint.longitude, title: "Center"}]
            })
        })
        projectDetails = await response.json()
        success = true
    } catch (error) {
        console.log("ERROR: ", error)
    }

    if (projectDetails.success !== undefined){
      success = projectDetails.success;
    }
    // if successfully created project info, Update
    if(success) {
      console.log("created Project: ", projectDetails);
      // Update local information
      let selectedTeam = {...props.team};
      let tempProjects = [...props.team.projects];
      tempProjects.push(projectDetails);
      selectedTeam.projects = tempProjects;
      await props.setProjects(tempProjects);
      await props.addProject(projectDetails, props.team); // for home results page
      await props.setTeam(team => selectedTeam);
      await AsyncStorage.setItem("@projects", JSON.stringify(tempProjects));

      // open project page
      close();
      props.openProjectPage(projectDetails);
    }
  };

  const close = () => {
    setMarkers(markers => []);
    setProjectName('');
    setAttemptedCreation(false);
    setMarkerError(true);
    setSearchText('');
    setRegion(null);
    props.setVisible(false);
  }

  const searchLocation = async () => {
    console.log("These are the coordinates");
    const coords = await getLocationAddress(searchText);
    if(coords != null){
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      });
    }
  }

  return (
    <ModalContainer {...props} visible={props.visible}>
      <View style={styles.projName}>
          <Text>Enter a Project Name: </Text>
          <Input
            value={projectName}
            style={{flex:1}}
            placeholder='Type Here...'
            onChangeText={setProjectName}
          />
      </View>

      <Text style={{marginTop:20}}>Search: </Text>

      <View style={styles.searchView}>
          <Input
              style={{flex:1}}
              placeholder='Enter a Location...'
              value={searchText}
              onChangeText={nextValue => setSearchText(nextValue)}
          />
          <Button
            status='info'
            accessoryLeft={SearchIcon}
            onPress = {searchLocation}
            style={{marginLeft:10}}
            />
      </View>

      {markerError && attemptedCreation &&
      <Text style={{color: '#FF3D71'}}>
        Invalid area: an area needs at least 3 points
      </Text>}

      <View style={styles.mapHeight}>
        <MapAddArea
          location={location}
          markers={markers}
          region={region}
          setRegion={setRegion}
          setMarkers={setMarkers}
          mapHeight={'55%'}
          listHeight={'40%'}
        >
        </MapAddArea>
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'30%'}}>
          <Button onPress={() => close()}
                  status='danger'
                  accessoryLeft={CancelIcon}>
            Cancel
          </Button>
          <Button onPress={confirmCreateProject}
                  status='success'
                  accessoryLeft={CreateIcon}>
            Create
          </Button>
      </View>
    </ModalContainer>
  );
};

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

const CancelIcon = (props) => (
  <Icon {...props} name='close-outline'/>
);

const CreateIcon = (props) => (
  <Icon {...props} name='checkmark-outline'/>
);

const SearchIcon = (props) => (
  <Icon {...props} name='search-outline'/>
);
