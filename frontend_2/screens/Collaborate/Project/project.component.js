import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './project.styles';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export function ProjectPage(props) {

  const [createNewActivityVisible, setCreateNewActivityVisible] = useState(false);

  const openActivityPage = async (item) => {
    props.setActivity(item)
    props.navigation.navigate('ActivitySignUpPage')
    /*
    let success = false
    let activityDetails = null
    // Get the activity information
    try {
        // TODO: this will probably change later to get any of the activity types (or we do a GET for each type)
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/' + item._id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        activityDetails = await response.json();
        success = true
    } catch (error) {
        console.log("error", error)
    }
    // if successfully retrieved activity info, Update
    if(success) {
      console.log("Activity: ", activityDetails);
      // set selected activity
      props.setActivity(activityDetails)

      // open activity page
      props.navigation.navigate('ActivitySignUpPage')
    }*/
  };

  const activityItem = ({ item, index }) => (
      <ListItem
        title={
              <Text style={{fontSize:20}}>
                  {`${item.title}`}
              </Text>}
        accessoryRight={ForwardIcon}
        onPress={() => openActivityPage(item)}
      />
  );

  return (
    <ViewableArea>
      <Header text={props.project.title}/>
      <ContentContainer>


        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}>Sign Up</Text>
            </View>
            <View style={styles.createTeamButtonView}>
                <Button status='primary' appearance='outline' onPress={() => props.navigation.navigate('CreateActivityStack')}>
                    Create Research Activity
                </Button>
            </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'50%', marginTop:15}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%'}}
            data={props.activities}
            ItemSeparatorComponent={Divider}
            renderItem={activityItem}
          />
        </View>

      </ContentContainer>
    </ViewableArea>
  );
};
