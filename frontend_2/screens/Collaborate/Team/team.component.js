import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Modal, TouchableOpacity } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem } from '@ui-kitten/components';
import { HeaderBackEdit, HeaderBack } from '../../components/headers.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component';
import { ViewableArea, ContentContainer, PopUpContainer } from '../../components/content.component';
import { CreateProject } from './createProjectModal.component';
import { EditTeamPage } from './editTeam.component';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './team.styles';

export function TeamPage(props) {

  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [inviteVisible, setInviteVisible] = useState(false);
  const [editMenuVisible, setEditMenuVisible] = useState(false);
  const [editTeamVisible, setEditTeamVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function getTokens() {
      let projectList = await AsyncStorage.getItem("@projects");
      projectList = JSON.parse(projectList);
      props.setProjects(projectList);
    }

    getTokens()
  }, []);

  const openProjectPage = async (item) => {
    let success = false
    let projectDetails = null
    // Get the project information
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
    if(projectDetails.success !== undefined){
      success = projectDetails.success
      console.log("success: ", success);
    }
    // if successfully retrieved project info, Update
    if(success) {
      let today = new Date();

      let pastStationaryCollections = [];
      if(projectDetails.stationaryCollections !== null) {
        for(let i = 0; i < projectDetails.stationaryCollections.length; i++) {
          let collection = projectDetails.stationaryCollections[i];
          collection.test_type = 'stationary';
          // set area
          let areaIndex = projectDetails.subareas.findIndex(element => element._id === collection.area);
          collection.area = projectDetails.subareas[areaIndex];
          // handle date
          collection.date = new Date(collection.date);
          if (moment(today).isAfter(collection.date, 'day')) {
            pastStationaryCollections.push(collection);
          }
          projectDetails.stationaryCollections[i] = collection;
        }
      }
      // remove collections from the list that are in the past
      for(let i = 0; i < pastStationaryCollections.length; i++) {
        let removeIndex = projectDetails.stationaryCollections.findIndex(element => element._id === pastStationaryCollections[i]._id);
        projectDetails.stationaryCollections.splice(removeIndex, 1);
      }

      let pastMovingCollections = [];
      if(projectDetails.movingCollections !== null) {
        for(let i = 0; i < projectDetails.movingCollections.length; i++) {
          let collection = projectDetails.movingCollections[i];
          collection.test_type = 'moving';
          // set area
          let areaIndex = projectDetails.subareas.findIndex(element => element._id === collection.area);
          collection.area = projectDetails.subareas[areaIndex];
          // handle date
          collection.date = new Date(collection.date);
          if (moment(today).isAfter(collection.date, 'day')) {
            pastMovingCollections.push(collection);
          }
          projectDetails.movingCollections[i] = collection;
        }
      }
      // remove collections from the list that are in the past
      for(let i = 0; i < pastMovingCollections.length; i++) {
        let removeIndex = projectDetails.movingCollections.findIndex(element => element._id === pastMovingCollections[i]._id);
        projectDetails.movingCollections.splice(removeIndex, 1);
      }

      let pastSurveyCollections = [];
      if(projectDetails.surveyCollections !== null) {
        for(let i = 0; i < projectDetails.surveyCollections.length; i++) {
          let collection = projectDetails.surveyCollections[i];
          collection.test_type = 'survey';
          // set area
          let areaIndex = projectDetails.subareas.findIndex(element => element._id === collection.area);
          collection.area = projectDetails.subareas[areaIndex];
          // handle date
          collection.date = new Date(collection.date);
          if (moment(today).isAfter(collection.date, 'day')) {
            pastSurveyCollections.push(collection);
          }
          projectDetails.surveyCollections[i] = collection;
        }
      }
      // remove collections from the list that are in the past
      for(let i = 0; i < pastSurveyCollections.length; i++) {
        let removeIndex = projectDetails.surveyCollections.findIndex(element => element._id === pastSurveyCollections[i]._id);
        projectDetails.surveyCollections.splice(removeIndex, 1);
      }

      // set selected project page information
      await props.setProject(projectDetails);
      await props.setActivities([...projectDetails.stationaryCollections, ...projectDetails.movingCollections, ...projectDetails.surveyCollections]);
      await props.setPastActivities([...pastStationaryCollections, ...pastMovingCollections, ...pastSurveyCollections]);
      console.log("Selected Project: ", projectDetails);

      // open project page
      props.navigation.navigate('ProjectPage');
    }
  };

  const navigateProjectPage = () => {
    props.navigation.navigate('ProjectPage');
  }

  const closePopUp = () => {
    setInviteVisible(false);
    setEmail('');
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

  const memberItem = ({ item, index }) => {
    let owner = item.role === 'owner';
    let ownerMe = item.user === props.userId;

    return (
      <ListItem style={{justifyContent:'space-between'}}>
        <Text style={{fontSize:20}}>
            {`${item.firstname}`} {`${item.lastname}`}
        </Text>
        <View style={{flexDirection:'row'}}>
        {(owner ?
          <Button
            appearance='ghost'
            disabled={true}
            accessoryRight={(ownerMe ? MyAwardIcon : AwardIcon)}
          />
        :
          null
        )}
        </View>
      </ListItem>
    );
  };

  const sendInvite = async () => {
    let success = false;
    let res = null;

    // Send invite by user email
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/teams/'+ props.team._id +'/invites', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
        },
        body: JSON.stringify({
            userEmail: email,
        })
      })
      res = await response
      success = true
    } catch (error) {
      console.log("error inviting user: ", error)
    }
    //console.log("status: ", res.status);
    console.log("ok: ", res.ok);
    //console.log("response: ", JSON.stringify(res));
    success = res.ok
    // reset states
    setInviteVisible(false)
    setEmail('')

    if(success) {
      console.log("success, sent user an invite");
    } else {
      console.log("success false, didn't invite user");
    }

  };

  return (
    <ViewableArea>
      {props.teamOwner() ?
        <HeaderBackEdit {...props} text={props.team.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
          <MenuItem title='Edit Team' onPress={() => {setEditMenuVisible(false); setEditTeamVisible(true)}}/>
        </HeaderBackEdit>
      :
        <HeaderBack {...props} text={props.team.title}/>
      }
      <EditTeamPage
        {...props}
        visible={editTeamVisible}
        setVisible={setEditTeamVisible}
      />
      <PopUpContainer
        {...props}
        visible={inviteVisible}
        closePopUp={closePopUp}
      >
        <Text>Enter a user Email: </Text>
        <Input
            placeholder='Type Here...'
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
            autoCapitalize='none'
            keyboardType="email-address"
        />
        <Button style={{marginTop:10}} onPress={() => sendInvite()}>
          Invite!
        </Button>
      </PopUpContainer>
      <CreateProject
        {...props}
        visible={createProjectVisible}
        setVisible={setCreateProjectVisible}
        openProjectPage={openProjectPage}
      />
      <ContentContainer>
        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}>Projects </Text>
            </View>
            <View style={styles.createTeamButtonView}>
              {props.teamOwner() ?
                <Button status='primary' appearance='outline' onPress={() => setCreateProjectVisible(true)}>
                  Create New
                </Button>
              :
                null
              }
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

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}>Team Members </Text>
            </View>
            <View style={styles.createTeamButtonView}>
              {props.teamOwner() ?
                <Button status='primary' appearance='outline' onPress={() => setInviteVisible(true)}>
                  Invite
                </Button>
              :
                null
              }
            </View>
        </View>
        <Divider style={{marginTop: 5}} />

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'50%', marginTop:15}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%'}}
            data={props.team.users}
            ItemSeparatorComponent={Divider}
            renderItem={memberItem}
          />
        </View>

      </ContentContainer>
    </ViewableArea>
  );
};

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);
const AwardIcon = (props) => (
  <Icon {...props} name='award-outline'/>
);
const MyAwardIcon = (props) => (
  <Icon {...props} fill='#DEBD07' name='award'/>
);
