import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { CreateProject } from './createProjectModal.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './team.styles';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export function TeamPage(props) {

  const [visible, setVisible] = useState(false);

  const openProjectPage = async (item) => {
    let success = false
    let projectDetails = null
    // Get the team information
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
      console.log("Project Team: ", projectDetails);
      // set selected project page information
      props.setProject(projectDetails)
      props.setActivities(projectDetails.activities);

      // open project page
      props.navigation.navigate('ProjectPage')
    } else {
      // set fake data because *cries*
      projectDetails = {
        _id:'0',
        title:'Project Sad',
        description:"cries",
        subareas:[{
          _id:'0',
          area:[
            {latitude:28.60275207150067, longitude:-81.20052214711905},
            {latitude:28.602640803731394, longitude:-81.19969569146633},
            {latitude:28.601981731115934, longitude:-81.2004641443491},
          ],
        }]
      }

      props.setProject(projectDetails)
      props.setActivities(projectDetails.activities);
      props.navigation.navigate('ProjectPage')
    }
  };

  const navigateProjectPage = () => {
    props.navigation.navigate('ProjectPage');
  }

  const projectItem = ({ item, index }) => (
      <ListItem
        title={
              <Text style={{fontSize:20}}>
                  {`${item.title}`}
              </Text>}
        accessoryRight={ForwardIcon}
        onPress={() => openProjectPage(item)}
      />
  );

  return (
    <ViewableArea>
      <Header text={props.team.title}/>
      <ContentContainer>
        <CreateProject
          visible={visible}
          setVisible={setVisible}
          create={navigateProjectPage}
          token={props.token}
          team={props.team}
          project={props.project}
          setProject={props.setProject}
          projects={props.projects}
          setProjects={props.setProjects}
          setActivities={props.setActivities}
          location={props.location}
        />

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}>Projects </Text>
            </View>
            <View style={styles.createTeamButtonView}>
                <Button status='primary' appearance='outline' onPress={() => setVisible(true)}>
                    Create New
                </Button>
            </View>
        </View>
        <Divider style={{marginTop: 5}} />

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'50%', marginTop:15}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%'}}
            data={props.projects}
            ItemSeparatorComponent={Divider}
            renderItem={projectItem}
          />
        </View>

      </ContentContainer>
    </ViewableArea>
  );
};
