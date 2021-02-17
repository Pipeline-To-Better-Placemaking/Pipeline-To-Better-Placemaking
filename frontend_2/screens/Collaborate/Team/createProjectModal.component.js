import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert,SafeAreaView, Modal } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../../components/headers.component';
import { MapAdd, ShowMarkers } from '../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Location from 'expo-location';
import { styles } from './createProjectModal.styles';

export function CreateProject(props) {

  const [location, setLocation] = useState({latitude:28.60275207150067, longitude:-81.20052214711905}); //useState(props.location.coords); doesn'twork
  const [markers, setMarkers] = useState([]);
  const [projectName, setProjectName] = useState('');
  const theme = useTheme();
  const statusBarHeight = getStatusBarHeight();

  const confirmCreateProject = async () => {
    let success = false
    let projectDetails = null
    console.log("description: ", getLocationName(markers[0]));
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
                team: props.team
            })
        })
        projectDetails = await response.json()
        success = true
    } catch (error) {
        console.log("error", error)
    }
    console.log("created Project: ", projectDetails);
    if (projectDetails.success == false){
      success = false;
    }
    // if successfully created project info, Update
    if(success) {
      //console.log("created Project: ", projectDetails);
      props.setProjects(projects => [...projects,projectDetails]);
      // set selected project page information
      props.setProject(projectDetails)
      props.setActivities(projectDetails.activities);

      // open project page
      close();
      props.create();
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
    <Modal
      animationType='slide'
      visible={props.visible}
    >
      <View style={{flex: 1, backgroundColor:theme['background-basic-color-1']}}>
        <SafeAreaView style={{flex: 1, backgroundColor:theme['background-basic-color-1'], marginTop:statusBarHeight,margin:20}}>

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
            <MapAdd
              location={location}
              markers={markers}
              setMarkers={setMarkers}
              mapHeight={'55%'}
              listHeight={'40%'}
            >
              <ShowMarkers markers={markers}/>
            </MapAdd>
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

        </SafeAreaView>
      </View>
    </Modal>
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
