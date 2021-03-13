import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBackEdit, HeaderBack } from '../../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { EditSubAreas } from './viewSubareas.component';
import { EditStandingPoints } from './viewStandingPoints.component';
import { EditProjectPage } from './editProjectPage.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './project.styles';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export function ProjectPage(props) {

  const [createNewActivityVisible, setCreateNewActivityVisible] = useState(false);
  const [editMenuVisible, setEditMenuVisible] = useState(false);
  const [editProjectVisible, setEditProjectVisible] = useState(false);
  const [editAreasVisible, setEditAreasVisible] = useState(false);
  const [editStandingPointsVisible, setEditStandingPointsVisible] = useState(false);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
	  isTeamOwner(props.team.users, props.userId)
  }, []);

  const isTeamOwner = (members, userID) => {
    let userIndex = members.findIndex(element => element.role == "owner")
    if (members[userIndex].user == userID) {
      setOwner(true);
    }
  }

  const openActivityPage = async (collectionDetails) => {
    let success = false

    console.log("selected collection: ", collectionDetails);
    await props.setTimeSlots([]);

    if(collectionDetails.test_type === 'stationary') {
      // get the collection info
      collectionDetails = await getCollection(collectionDetails, 'stationary/');

      // get the timeSlot info
      if (collectionDetails !== null && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
        collectionDetails.maps.map(item => {
          getTimeSlots(item._id, 'stationary_maps/');
        })
        success = true
      }

    } else if(collectionDetails.test_type === 'moving') {
      // get the collection info
      collectionDetails = await getCollection(collectionDetails, 'moving/');

      // get the timeSlot info
      if (collectionDetails !== null && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
        collectionDetails.maps.map(item => {
          getTimeSlots(item._id, 'moving_maps/');
        })
        success = true
      }

    } else if(collectionDetails.test_type === 'survey') {
      success = true;
      props.setTimeSlots([...collectionDetails.timeSlots]);
    }

    // if successfully retrieved activity info, Update
    if(success) {

      // set selected activity
      props.setActivity(collectionDetails);

      // open activity page
      props.navigation.navigate('ActivitySignUpPage')
    }//*/

  };

  const getCollection = async (item, collectionName) => {
    let success = false
    let collectionDetails = null

    // Get the activity information
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/collections/' +
                                                    collectionName + item._id, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + props.token
          }
      })
      collectionDetails = await response.json();
      console.log("response collection: ", collectionDetails);
      success = true
    } catch (error) {
        console.log("error", error)
    }

    if (collectionDetails.success !== undefined) {
      success = collectionDetails.success
      console.log("success: ", success);
    }
    // if successfully retrieved collection info, get maps
    if (success) {
      collectionDetails.test_type = item.test_type;
      collectionDetails.date = new Date(collectionDetails.date)
      //let areaIndex = props.project.subareas.findIndex(element => element._id === collectionDetails.area);
      //collectionDetails.area = props.project.subareas[areaIndex];
      console.log("returning collection: ", collectionDetails);
      return collectionDetails;
    } else {
      return null;
    }
  };

  const getTimeSlots = async (timeId, routeName) => {
    let success = false
    let timeSlotDetails = null

    // Get the activity information
    try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/' + routeName + timeId, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + props.token
          }
      })
      timeSlotDetails = await response.json();
      success = true
    } catch (error) {
        console.log("error", error)
    }
    if (timeSlotDetails.success !== undefined) {
      success = timeSlotDetails.success
      console.log("success: ", success);
    }
    if (success) {
      // set selected timeSlots
      timeSlotDetails.date = new Date(timeSlotDetails.date)
      console.log("time slot: ", timeSlotDetails);
      props.setTimeSlots(slots => [...slots,timeSlotDetails]);
    }
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
      {owner ?
        <HeaderBackEdit {...props} text={props.project.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
          <MenuItem title='Edit Project' onPress={() => {setEditMenuVisible(false); setEditProjectVisible(true)}}/>
          <MenuItem title='Area(s)' onPress={() => {setEditMenuVisible(false); setEditAreasVisible(true)}}/>
          <MenuItem title='Standing Points' onPress={() => {setEditMenuVisible(false); setEditStandingPointsVisible(true)}}/>
        </HeaderBackEdit> :
        <HeaderBack {...props} text={props.team.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
        </HeaderBack>
      }
      <EditProjectPage
        {...props}
        visible={editProjectVisible}
        setVisible={setEditProjectVisible}
      />
      <EditSubAreas
        {...props}
        subareas={props.project.subareas}
        visible={editAreasVisible}
        setVisible={setEditAreasVisible}
      />
      <EditStandingPoints
        {...props}
        subareas={props.project.subareas}
        standingPoints={props.project.standingPoints}
        visible={editStandingPointsVisible}
        setVisible={setEditStandingPointsVisible}
      />
      <ContentContainer>

        <View style={{height:'45%'}}>
          <MapAreaWrapper area={props.project.subareas[0].points} mapHeight={'100%'}>
            <ShowArea area={props.project.subareas[0].points} />
          </MapAreaWrapper>
        </View>

        <View style={styles.teamTextView}>
          <Text >Location: {props.project.description}</Text>
        </View>

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}>Sign Up</Text>
            </View>
            <View style={styles.createTeamButtonView}>
                {owner && <Button status='primary' appearance='outline' onPress={() => props.navigation.navigate('CreateActivityStack')}>
                    Create Research Activity
                </Button>}
            </View>
        </View>
        <Divider style={{marginTop: 5}} />

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'42%', marginTop:15}}>
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
