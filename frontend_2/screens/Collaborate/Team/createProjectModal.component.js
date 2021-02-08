import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Modal } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../../components/headers.component';
import { MapAddArea } from '../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './createProjectModal.styles';

export function CreateProject(props) {

  const location = {latitude:28.60275207150067, longitude:-81.20052214711905}; //prop.location.coords doesn't wprk

  const [markers, setMarkers] = useState([]);
  const [projectName, setProjectName] = useState('');

  const confirmCreateProject = async () => {
    let success = false
    let projectDetails = null
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
                description: 'location',
                points: markers,
                team: props.team
            })
        })
        projectDetails = await response.json()
        success = true
    } catch (error) {
        console.log("error", error)
    }
    // if successfully created project info, Update
    if(success) {
      props.setProjects(projects => [...projects,projectDetails]);
      // set selected project page information
      props.setProject(projectDetails)
      props.setActivities(projectDetails.activities);

      // open project page
      props.setVisible(false);
      props.create();
    }
  };

  return (
    <Modal
      animationType='slide'
      visible={props.visible}
    >
      <View style={styles.container}>

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
          />
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'30%'}}>
            <Button onPress={() => props.setVisible(false)}
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
