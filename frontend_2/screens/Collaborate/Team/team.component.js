import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Modal, TouchableOpacity } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { CreateProject } from './createProjectModal.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './team.styles';

export function TeamPage(props) {

  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [inviteVisible, setInviteVisible] = useState(false);
  const [email, setEmail] = useState('');

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

  const memberItem = ({ item, index }) => (
      <ListItem style={{justifyContent:'space-between'}}>
        <Text style={{fontSize:20}}>
            {`${item.firstname}`} {`${item.lastname}`}
        </Text>
        <View style={{flexDirection:'row'}}>
        {(item.role ==='owner' ?
          <Button
            appearance='ghost'
            disabled={true}
            accessoryRight={AwardIcon}
          />
          :
          <Text></Text>
        )}
        </View>
      </ListItem>
  );

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
    console.log("status: ", res.status);
    console.log("ok: ", res.ok);
    console.log("response: ", JSON.stringify(res));
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
      <Header text={props.team.title}/>
      <ContentContainer>
        <CreateProject
          visible={createProjectVisible}
          setVisible={setCreateProjectVisible}
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

        <Modal
          style={{width:'80%'}}
          animationType="fade"
          transparent={true}
          visible={inviteVisible}
          backdropStyle={styles.backdrop}
          onRequestClose={() => {setInviteVisible(false); setEmail('');}}
        >
          <TouchableOpacity
              style={styles.modalBackgroundStyle}
              activeOpacity={1}
              onPressOut={() => {setInviteVisible(false); setEmail('');}}
            >
            <Card disabled={true} style={{width:'80%', margin:5}}>
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
            </Card>
          </TouchableOpacity>

        </Modal>

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}>Projects </Text>
            </View>
            <View style={styles.createTeamButtonView}>
                <Button status='primary' appearance='outline' onPress={() => setCreateProjectVisible(true)}>
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

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}>Team Members </Text>
            </View>
            <View style={styles.createTeamButtonView}>
                <Button status='primary' appearance='outline' onPress={() => setInviteVisible(true)}>
                    Invite
                </Button>
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
