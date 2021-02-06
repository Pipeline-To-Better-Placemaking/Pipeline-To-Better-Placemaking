import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../components/headers.component';
import { TeamPage } from './Team/team.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './collaborate.styles';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export function Collaborate(props) {

  const [teams, setTeams] = useState(null);
  const [teamName, setTeamName] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    async function getTeams() {
      let teamsList = await AsyncStorage.getItem('@teams');
      teamsList = JSON.parse(teamsList);
      setTeams(teamsList)
    }

    getTeams()
  }, []);

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
      teams.push({
         _id: newTeam._id,
         title: newTeam.title
      });
      setTeams(teams)
      await AsyncStorage.setItem("@teams", JSON.stringify(teams))
      openTeamPage(newTeam)
    }
  };

  const openTeamPage = async (item) => {
    props.setTeam(item)
    props.navigation.navigate('TeamPage')
  };

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

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'50%', marginTop:15}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%'}}
            data={teams}
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
      </ContentContainer>
    </ViewableArea>
  );
};
