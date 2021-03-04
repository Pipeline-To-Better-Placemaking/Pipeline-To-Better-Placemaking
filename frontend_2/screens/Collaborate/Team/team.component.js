import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Modal, TouchableOpacity } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem } from '@ui-kitten/components';
import { HeaderBackEdit, HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer, PopUpContainer } from '../../components/content.component';
import { CreateProject } from './createProjectModal.component';
import { EditTeamPage } from './editTeam.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './team.styles';

export function TeamPage(props) {

  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [inviteVisible, setInviteVisible] = useState(false);
  const [editMenuVisible, setEditMenuVisible] = useState(false);
  const [editTeamVisible, setEditTeamVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    async function getTokens() {
      let projectList = await AsyncStorage.getItem("@projects");
      projectList = JSON.parse(projectList);
      props.setProjects(projectList);
    }

    getTokens()
	  isTeamOwner(props.team.users, props.userID)
  }, []);

  const isTeamOwner = (members, userID) => {
    let userIndex = members.findIndex(element => element.role == "owner")
    if (members[userIndex]._id == userID) {
      setOwner(true);
    }
  }

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
      // set selected project page information
      if(projectDetails.stationaryCollections !== null) {
        projectDetails.stationaryCollections.map(collection => {
          collection.test_type = 'stationary';
          // set area
          let areaIndex = projectDetails.subareas.findIndex(element => element._id === collection.area);
          collection.area = projectDetails.subareas[areaIndex];
          collection.date = new Date(collection.date)
        })
      }

      props.setProject(projectDetails);
      props.setActivities(projectDetails.stationaryCollections);
      console.log("Selected Project: ", projectDetails);

      // open project page
      props.navigation.navigate('ProjectPage');
    } else {
      // set fake data because *cries*
      projectDetails = {
        _id:'0',
        title:'Project Sad',
        description:"cries",
        subareas:[{
          _id:'0',
          points:[
            {latitude:28.60275207150067, longitude:-81.20052214711905},
            {latitude:28.602640803731394, longitude:-81.19969569146633},
            {latitude:28.601981731115934, longitude:-81.2004641443491},
          ],
        }]
      };

      props.setProject(projectDetails);
      props.setActivities([]);
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
    let res  = null;

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

  //console.log("Am I the owner of this team? answer: "+owner);
  return (
    <ViewableArea>
      {owner ? 
        <HeaderBackEdit {...props} text={props.team.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
        <MenuItem title='Edit Team' onPress={() => {setEditMenuVisible(false); setEditTeamVisible(true)}}/>
        </HeaderBackEdit> :
        <HeaderBack {...props} text={props.team.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
        </HeaderBack>
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
                {owner && <Button status='primary' appearance='outline' onPress={() => setCreateProjectVisible(true)}>
                    Create New
                </Button>}
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
                {owner && <Button status='primary' appearance='outline' onPress={() => setInviteVisible(true)}>
                    Invite
                </Button>}
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
