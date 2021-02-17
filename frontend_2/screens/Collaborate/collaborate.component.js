import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './collaborate.styles';

export function Collaborate(props) {

  const [teamName, setTeamName] = useState('');
  const [visible, setVisible] = useState(false);

  const createTeam = async () => {
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
      props.teams.push({
         _id: newTeam._id,
         title: newTeam.title
      });
      props.setTeams(props.teams)
      await AsyncStorage.setItem("@teams", JSON.stringify(props.teams))
      // clear Projects
      props.setProjects(null)
      // set the selected Team
      props.setTeam(newTeam)
      // open Team Page
      props.navigation.navigate('TeamPage')
    }
  };

  const openTeamPage = async (item) => {
    let success = false
    let teamDetails = null
    // Get the team information
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/teams/' + item._id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        teamDetails = await response.json();
        success = true
    } catch (error) {
        console.log("error getting team\n", error)
    }
    // if successfully retrieved team info, Update
    if(success) {
      console.log("Selected Team: ", teamDetails);
      // set selected team
      props.setTeam(teamDetails)

      // set list of projects
      await AsyncStorage.setItem("@projects", JSON.stringify(teamDetails.projects));
      props.setProjects(teamDetails.projects)

      // open team page
      props.navigation.navigate('TeamPage')
    } else {
      // set fake data because *cries*
      teamDetails = {
        _id:'0',
        projects:[{
          _id:'0',
          title:'Project Sad',
          description:"cries"
        }],
        title:'Team Crying',
        description:"sad"
      }

      props.setTeam(teamDetails)
      await AsyncStorage.setItem("@projects", JSON.stringify(teamDetails.projects));
      props.setProjects(teamDetails.projects)
      props.navigation.navigate('TeamPage')
    }
  };

  const acceptInvite = async (invite) => {
    let success = false;
    let res = null;
    // Accept Invite
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/users/invites/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
                responses:
                [{
                  team: invite._id,
                  accept: true
                  }]
            })
        })
        res = await response.json();
        success = true
    } catch (error) {
        console.log("error accepting invite: ", error)
    }
    //console.log("response", res);
    if(success) {
      console.log("success, accepted invite");
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
    let success = false;

    // Decline Invite
    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/users/invites/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
              responses:
              [{
                team: invite._id,
                accept: false
                }]
            })
        })
        success = true
    } catch (error) {
        console.log("error declining invite: ", error)
    }

    if(success) {
      console.log("success, declined invite");
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
      <ListItem style={{justifyContent:'space-between'}}>
        <Text style={{fontSize:20}}>
            {`${item.title}`}
        </Text>
        <View style={{flexDirection:'row'}}>
          <Button
            status='success'
            accessoryRight={CreateIcon}
            onPress={() => acceptInvite(item)}
          />
          <Button
          style={{marginLeft:5}}
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
        <Popover
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => {setVisible(false); setTeamName('');}}
          anchor={renderAnchor}
        >
          <View style={styles.modalBackgroundStyle}>
            <Card disabled={true}>
              <Text>Enter Team Name </Text>
              <Input
                  placeholder='Type Here...'
                  value={teamName}
                  onChangeText={nextValue => setTeamName(nextValue)}
              />
              <Button onPress={() => createTeam()}>
                Create New Team
              </Button>
            </Card>
          </View>

        </Popover>

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'40%', marginTop:15}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%'}}
            data={props.teams}
            ItemSeparatorComponent={Divider}
            renderItem={teamItem}
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
            style={{maxHeight:'100%', maxWidth:'90%'}}
            data={props.invites}
            ItemSeparatorComponent={Divider}
            renderItem={inviteItem}
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
