import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, RefreshControl } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, useTheme } from '@ui-kitten/components';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer, PopUpContainer } from '../components/content.component';
import { getTeam, postInvite, getUserInfo } from '../components/apiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './collaborate.styles';

export function Collaborate(props) {

  const [teamName, setTeamName] = useState('');
  const [visible, setVisible] = useState(false);
  const [refreshingInvites, setRefreshingInvites] = useState(false);
  const [refreshingTeams, setRefreshingTeams] = useState(false);
  const theme = useTheme();

  const onRefreshInvites = React.useCallback(() => {
    setRefreshingInvites(true);
    refreshDetails();
    setRefreshingInvites(false);
  }, []);

  const onRefreshTeams = React.useCallback(() => {
    setRefreshingTeams(true);
    refreshDetails();
    setRefreshingTeams(false);
  }, []);

  const refreshDetails = async () => {
    let token = await AsyncStorage.getItem("@token");
    let userInfo = await getUserInfo();

    if(userInfo !== null && userInfo.invites !== undefined && userInfo.invites !== null) {
      //console.log("success");
      const newInvites = [...userInfo.invites];
      await AsyncStorage.setItem("@invites", JSON.stringify(newInvites));
      await props.setInvites(newInvites);
    }

    if(userInfo !== null && userInfo.teams !== undefined && userInfo.teams !== null) {
      //console.log("success");
      const newTeams = [...userInfo.teams];
      await AsyncStorage.setItem("@teams", JSON.stringify(newTeams));
      await props.setTeams(newTeams);
    }
  }

  const createTeam = async () => {

    if (teamName == "") {
      return
    }

    let success = false;
    let newTeam = null;
    // Save the new team
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/teams/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
                title: teamName,
                description: "description"
            })
        })
        newTeam = await response.json();
        success = true
    } catch (error) {
        console.log("error", error)
    }

    // reset states
    setVisible(false)
    setTeamName('')

    // if successful post, update
    if(success) {
      console.log("created Team: ", newTeam);
      // Update local list info
      props.teams.push(newTeam);
      props.setTeams(props.teams);
      await AsyncStorage.setItem("@teams", JSON.stringify(props.teams));

      // Open team page
      openTeamPage(newTeam);
    }
  };

  const openTeamPage = async (item) => {
    let success = false
    let teamDetails = await getTeam(item);
    if(teamDetails != null) {
      console.log("Selected Team: ", teamDetails);
      // set selected team
      await props.setTeam(teamDetails)

      // set list of projects
      await AsyncStorage.setItem("@projects", JSON.stringify(teamDetails.projects));
      await props.setProjects(teamDetails.projects)

      // open team page
      props.navigation.navigate('TeamPage')
    }
  };

  const acceptInvite = async (invite) => {
    let success = await postInvite(invite._id, true);
    if(success) {
      //console.log("success, accepted invite");
      // Add the new team to the list of teams
      props.teams.push({
         _id: invite._id,
         title: invite.title
      });
      props.setTeams(props.teams)
      await AsyncStorage.setItem("@teams", JSON.stringify(props.teams))

      // Remove the invite from the local list of invites
      let changeIndex = props.invites.findIndex(element => element._id === invite._id);
      const newInvites = [...props.invites];
      newInvites.splice(changeIndex, 1);
      await AsyncStorage.setItem("@invites", JSON.stringify(newInvites));
      await props.setInvites(newInvites);
    } else {
      console.log("success false, didn't accept invite");
    }
  }

  const declineInvite = async (invite) => {
    let success = await postInvite(invite._id, false);

    if(success) {
      //console.log("success, declined invite");
      // Remove the invite from the local list of invites
      let changeIndex = props.invites.findIndex(element => element._id === invite._id);
      const newInvites = [...props.invites];
      newInvites.splice(changeIndex, 1);
      await AsyncStorage.setItem("@invites", JSON.stringify(newInvites));
      await props.setInvites(newInvites);
    } else {
      console.log("success false, didn't decline invite");
    }
  }

  const closePopUp = () => {
    setVisible(false);
    setTeamName('');
  }

  const renderAnchor = () => (
    <Divider style={{marginTop: 5}} />
  );

  const teamItem = ({ item, index }) => (
      <ListItem
        title={
              <Text style={{fontSize:20}}>
                  {`${item.title}`}
              </Text>}
        accessoryRight={ForwardIcon}
        onPress={() => openTeamPage(item)}
      />
  );

  const inviteItem = ({ item, index }) => (
      <ListItem style={{flex:1, justifyContent:'space-between', flexDirection:'row'}}>
        <View style={{flex:1, flexDirection:'column', justifyContent:'flex-start'}}>
          <Text style={{fontSize:20}}>
              {`${item.title}`}
          </Text>
          <Text style={{color:theme['text-hint-color']}}>
              {"From: "+ item.firstname + " " + item.lastname}
          </Text>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
          <Button
            status='success'
            accessoryRight={CreateIcon}
            onPress={() => acceptInvite(item)}
          />
          <Button
            style={{marginLeft:15}}
            status='danger'
            accessoryRight={CancelIcon}
            onPress={() => declineInvite(item)}
          />
        </View>
      </ListItem>
  );

  return (
    <ViewableArea>
      <Header text={'Collaborate'}/>
      <PopUpContainer
        {...props}
        visible={visible}
        closePopUp={closePopUp}
      >
        <Text>Enter Team Name </Text>
        <Input
            placeholder='Type Here...'
            value={teamName}
            onChangeText={nextValue => setTeamName(nextValue)}
        />
        <Button onPress={() => createTeam()}>
          Create New Team!
        </Button>
      </PopUpContainer>
      <ContentContainer>
        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}> Teams </Text>
            </View>
            <View style={styles.createTeamButtonView}>
                <Button status='primary' appearance='outline' onPress={() => setVisible(true)}>
                    Create New
                </Button>
            </View>
        </View>
        <Divider style={{marginTop: 5}} />

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'40%', marginTop:15}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%'}}
            data={props.teams}
            ItemSeparatorComponent={Divider}
            renderItem={teamItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshingTeams}
                onRefresh={onRefreshTeams}
              />
            }
          />
        </View>

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}> Invites </Text>
            </View>
        </View>

        <Divider style={{marginTop: 5}} />
        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'40%', marginTop:15}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%', minHeight:150, backgroundColor: 'rgba(0, 0, 0, 0)'}}
            data={props.invites}
            ItemSeparatorComponent={Divider}
            renderItem={inviteItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshingInvites}
                onRefresh={onRefreshInvites}
              />
            }
          />
        </View>

      </ContentContainer>
    </ViewableArea>
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
