import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Modal, TouchableOpacity, RefreshControl } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem } from '@ui-kitten/components';
import { HeaderBackEdit, HeaderBack } from '../../components/headers.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component';
import { ViewableArea, ContentContainer, PopUpContainer } from '../../components/content.component';
import { CreateProject } from './createProjectModal.component';
import { EditTeamPage } from './editTeam.component';
import { getTeam, getFilteredProjectDetails } from '../../components/apiCalls';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './team.styles';

export function TeamPage(props) {

  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [inviteVisible, setInviteVisible] = useState(false);
  const [sentMsgVisible, setSentMsgVisible] = useState(false);
  const [msg, setMsg] = useState('');
  const [editMenuVisible, setEditMenuVisible] = useState(false);
  const [editTeamVisible, setEditTeamVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [refreshingProjects, setRefreshingProjects] = useState(false);
  const [refreshingUsers, setRefreshingUsers] = useState(false);

  useEffect(() => {
    async function getTokens() {
      let projectList = await AsyncStorage.getItem("@projects");
      projectList = JSON.parse(projectList);
      props.setProjects(projectList);
    }

    getTokens()
  }, []);

  const onRefreshProjects = React.useCallback(() => {
    setRefreshingProjects(true);
    refreshDetails();
    setRefreshingProjects(false);
  }, []);

  const onRefreshUsers = React.useCallback(() => {
    setRefreshingUsers(true);
    refreshDetails();
    setRefreshingUsers(false);
  }, []);

  const refreshDetails = async () => {
    let success = false
    let teamDetails = await getTeam(props.team);
    if(teamDetails != null) {
      await props.setTeam(teamDetails);
      await props.setProjects(teamDetails.projects);
      await AsyncStorage.setItem("@projects", JSON.stringify(teamDetails.projects));
    }
  };

  const openProjectPage = async (item) => {
    let projectDetails = await getFilteredProjectDetails(item);
    // if successfully retrieved project info, Update
    if(projectDetails !== null) {
      // set selected project page information
      await props.setActivities([...projectDetails.activities]);
      await props.setPastActivities([...projectDetails.pastActivities]);
      projectDetails.activities = [];
      projectDetails.pastActivities = [];
      await props.setProject(projectDetails);
      console.log("Selected Project: ", projectDetails);

      // open project page
      props.navigation.navigate('ProjectPage');
    }
  };

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
    if (res.ok !== undefined) {
      success = res.ok
    }
    // reset states
    await setInviteVisible(false);
    await setEmail('');

    if(success) {
      await setMsg("Success, sent user an invite!");
    } else {
      await setMsg("Failure, didn't find user :(");
    }
    await setSentMsgVisible(true);
    wait(2000).then(() => setSentMsgVisible(false));
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
      <PopUpContainer
        {...props}
        visible={sentMsgVisible}
        closePopUp={() => setSentMsgVisible(false)}
      >
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text category={'s1'}>{msg}</Text>
        </View>
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
            style={{maxHeight:'100%', maxWidth:'90%', minHeight:100, backgroundColor: 'rgba(0, 0, 0, 0)'}}
            data={props.projects}
            ItemSeparatorComponent={Divider}
            renderItem={projectItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshingProjects}
                onRefresh={onRefreshProjects}
              />
            }
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
            refreshControl={
              <RefreshControl
                refreshing={refreshingUsers}
                onRefresh={onRefreshUsers}
              />
            }
          />
        </View>

      </ContentContainer>
    </ViewableArea>
  );
};

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);
const AwardIcon = (props) => (
  <Icon {...props} name='award-outline'/>
);
const MyAwardIcon = (props) => (
  <Icon {...props} fill='#DEBD07' name='award'/>
);
