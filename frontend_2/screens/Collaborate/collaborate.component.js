import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
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

  useEffect(() => {
    async function getTeams() {
      let teamsList = await AsyncStorage.getItem('@teams');
      teamsList = JSON.parse(teamsList);
      setTeams(teamsList)
    }

    getTeams()
  }, []);

  const openTeamPage = async (item) => {
    //setTeam(item)
    props.navigation.navigate('TeamPage')
  };

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
      <View>
        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}> Teams </Text>
            </View>
            <View style={styles.createTeamButtonView}>
                <Button status='primary' appearance='outline'>
                    Create New
                </Button>
            </View>
        </View>
        <Divider style={{marginTop: 5}} />

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
      </View>
      </ContentContainer>
    </ViewableArea>
  );
};
