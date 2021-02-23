import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../../components/headers.component';
import { MapAddArea, ShowMarkers , getRegionForCoordinates } from '../../components/Maps/mapPoints.component';
import { ModalContainer} from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { styles } from './createProjectModal.styles';

export function CreateProject(props) {

  const [location, setLocation] = useState({latitude:28.60275207150067, longitude:-81.20052214711905}); //useState(props.location.coords); doesn'twork
  const [markers, setMarkers] = useState([]);
  const [projectName, setProjectName] = useState('');

  const confirmCreateProject = async () => {
    let success = false
    let projectDetails = null
    let centerPoint = getRegionForCoordinates(markers);
    //console.log("description: ", getLocationName(markers[0]));
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
                title: projectName,
                description: "description",
                points: markers,
                team: props.team,
                standingPoints:[{latitude: centerPoint.latitude, longitude: centerPoint.longitude, title: "center"}]
            })
        })
        projectDetails = await response.json()
        success = true
    } catch (error) {
        console.log("error", error)
    }
    console.log("created Project: ", projectDetails);
    if (projectDetails.success === undefined){
      success = false;
    }
    // if successfully created project info, Update
    if(success) {
      props.setVisible(false);
      props.openProjectPage(projectDetails);
      /*
      //console.log("created Project: ", projectDetails);
      props.setProjects(projects => [...projects,projectDetails]);
      // set selected project page information
      props.setProject(projectDetails)
      props.setActivities(projectDetails.activities);

      //push the team info
      let selectedTeam = {...props.team};
      let tempProjects = [...props.team.projects];
      tempProjects.push(projectDetails);
      selectedTeam.projects = tempProjects;
      props.setProjects(tempProjects);
      props.setTeam(team => selectedTeam);
      await AsyncStorage.setItem("@projects", JSON.stringify(tempProjects));

      // open project page
      close();
      props.create();//*/
    }
  };

  const getLocationName = async (loc) => {
      let retVal = "Turn on Location Services to load";
      // Check for permission
      let enabled = await Location.hasServicesEnabledAsync();
      if (enabled)
      {
          let locationInfo = await Location.reverseGeocodeAsync(loc);
          retVal = locationInfo[0].name;
      }
      return retVal;
  }

  const close = () => {
    setMarkers(markers => []);
    setProjectName('');
    props.setVisible(false);
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
          />
          <Button
            status='info'
            accessoryLeft={SearchIcon}
            style={{marginLeft:10}}
            />
      </View>

      <View style={styles.mapHeight}>
        <MapAddArea
          location={location}
          markers={markers}
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
