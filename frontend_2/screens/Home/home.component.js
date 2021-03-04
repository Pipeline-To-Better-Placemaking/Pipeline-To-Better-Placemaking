import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button, List, ListItem } from '@ui-kitten/components';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { DummyResult } from '../components/dummyResult.component.js';
import { HomeMapView } from '../components/Maps/home.map.component.js';
import { HomeResultView } from './homeResult.component.js';
import { ConfirmCompare } from '../components/Compare/confrimCompare.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './home.styles';

export const HomeScreen = ( props ) => {

  const [compare, setCompare] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState(props.selectedProjects)

  var location = props.location

  const onComparePress = () => {
    setCompare(!compare)
  }

  const addToSelectedProjects = async (name) => {

    let selectedProjectsArray = selectedProjects

    selectedProjectsArray.push(name)

    await setSelectedProjects(selectedProjectsArray)

    await props.setProjects(selectedProjectsArray)
  }

  const inSelectedProject = (name) => {

    if (selectedProjects.includes(name)) {
      return true
    }
    else {
      return false
    }
  }

  const openResultPage = async(item) => {
    let success = false
    let projectDetails = null
    // Get the Project information
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + item._id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        projectDetails = await response.json();
        success = true
    } catch (error) {
        console.log("error", error)
    }
    // if successfully retrieved project info, Update
    if(success) {
      console.log("Project: ", projectDetails);
      // set selected project page information
      props.setSelectedProject(projectDetails);
      props.setSelectedTeam(item.team);

      // open results page
      props.navigation.navigate('ProjectResultPage');
    }
  }

  const resultItem = ({ item, index }) => (
      <ListItem
        onPress={() => openResultPage(item)}
      >
        <DummyResult
          {...props}
          key={index}
          inList={inSelectedProject}
          compare={compare}
          addProject={addToSelectedProjects}
          removeProject={props.removeFromSelectedProjects}
          projectArea={item.title}
          projectComment={item.description}
        />
      </ListItem>
  );

  return (
    <ViewableArea>
      <Header text={'Home Page'}/>
      <ContentContainer>

        <View style={{height:'35%'}}>
          <HomeMapView location={location}/>
        </View>

        <HomeResultView {...props} onComparePress={onComparePress} compare={compare}/>

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'55%', marginTop:15}}>
          <List
            data={props.allProjects}
            ItemSeparatorComponent={Divider}
            renderItem={resultItem}
          />
        </View>

      </ContentContainer>
    </ViewableArea>
  );
};
