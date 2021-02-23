import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBackEdit } from '../../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { EditSubAreas } from './viewSubareas.component';
import { EditStandingPoints } from './viewStandingPoints.component';
import { EditActivityInfo } from './editActivityInfo.component';
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
  const [editActivityVisible, setEditActivityVisible] = useState(false);
  const [editStandingPointsVisible, setEditStandingPointsVisible] = useState(false);

  const openActivityPage = async (item) => {
    let success = false
    let activityDetails = null
    console.log("activity: ", item);
    if(item.test_type === 'stationary') {
      // Get the activity information
      try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/' + item.activity, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        activityDetails = await response.json();
        console.log("response activity: ", activityDetails);
        success = true
      } catch (error) {
          console.log("error", error)
      }

    } else {
      activityDetails = item;
    }

    if(activityDetails.success !== undefined){
      success = activityDetails.success
      console.log("success: ", success);
    }
    // if successfully retrieved activity info, Update
    if(success) {
      console.log("selected activity: ", activityDetails);
      activityDetails.test_type = item.test_type;
      // set selected activity
      props.setActivity(activityDetails)

      // open activity page
      props.navigation.navigate('ActivitySignUpPage')
    }//*/

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
      <HeaderBackEdit {...props} text={props.project.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
        <MenuItem title='Edit Project' onPress={() => {setEditMenuVisible(false); setEditProjectVisible(true)}}/>
        <MenuItem title='Area(s)' onPress={() => {setEditMenuVisible(false); setEditAreasVisible(true)}}/>
        <MenuItem title='Standing Points' onPress={() => {setEditMenuVisible(false); setEditStandingPointsVisible(true)}}/>
        <MenuItem title='Activity Information' onPress={() => {setEditMenuVisible(false); setEditActivityVisible(true)}}/>
      </HeaderBackEdit>
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
        standingPoints={[]}
        visible={editStandingPointsVisible}
        setVisible={setEditStandingPointsVisible}
      />
      <EditActivityInfo
        {...props}
        visible={editActivityVisible}
        setVisible={setEditActivityVisible}
      />
      <ContentContainer>

        <View style={{height:'45%'}}>
          <MapAreaWrapper area={props.project.subareas[0].points} mapHeight={'100%'}>
            <ShowArea area={props.project.subareas[0].points} />
          </MapAreaWrapper>
        </View>

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
        <Divider style={{marginTop: 5}} />

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
