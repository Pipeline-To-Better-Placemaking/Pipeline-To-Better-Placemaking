import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, RefreshControl } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBackEdit, HeaderBack } from '../../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component';
import { EditSubAreas } from './viewSubareas.component';
import { EditStandingPoints } from './viewStandingPoints.component';
import { EditProjectPage } from './editProjectPage.component';
import { getFilteredProjectDetails, getAllCollectionInfo } from '../../components/apiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
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
  const [refreshingActivities, setRefreshingActivities] = useState(false);

  const onRefreshActivities = React.useCallback(() => {
    setRefreshingActivities(true);
    refreshDetails();
    setRefreshingActivities(false);
  }, []);

  const refreshDetails = async () => {
    let projectDetails = await getFilteredProjectDetails(props.project);
    // if successfully retrieved project info, Update
    if(projectDetails !== null) {
      // set selected project page information
      await props.setActivities([...projectDetails.activities]);
      await props.setPastActivities([...projectDetails.pastActivities]);
      projectDetails.activities = [];
      projectDetails.pastActivities = [];
      await props.setProject(projectDetails);
    }
  };

  const openActivityPage = async (collectionDetails) => {
    // clear time slots
    await props.setTimeSlots([]);

    // get Info
    collectionDetails = await getAllCollectionInfo(collectionDetails);

    // if successfully retrieved activity info, Update
    if(collectionDetails !== null) {
      await props.setTimeSlots([...collectionDetails.timeSlots]);
      collectionDetails.timeSlots = [];
      await props.setActivity(collectionDetails);
      // open activity page
      props.navigation.navigate('ActivitySignUpPage')
    }
  };

  const activityItem = ({ item, index }) => (
      <ListItem
        title={
          <Text style={{fontSize:20}}>
              {`${item.title}`}
          </Text>
        }
        description={getDayStr(item.date)}
        accessoryRight={ForwardIcon}
        onPress={() => openActivityPage(item)}
      />
  );

  return (
    <ViewableArea>
      {props.teamOwner() ?
        <HeaderBackEdit {...props} text={props.project.title} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
          <MenuItem title='Edit Project' onPress={() => {setEditMenuVisible(false); setEditProjectVisible(true)}}/>
          <MenuItem title='Area(s)' onPress={() => {setEditMenuVisible(false); setEditAreasVisible(true)}}/>
          <MenuItem title='Standing Points' onPress={() => {setEditMenuVisible(false); setEditStandingPointsVisible(true)}}/>
        </HeaderBackEdit>
      :
        <HeaderBack {...props} text={props.team.title}/>
      }
      <EditProjectPage
        {...props}
        visible={editProjectVisible}
        setVisible={setEditProjectVisible}
      />
      <EditSubAreas
        {...props}
        visible={editAreasVisible}
        setVisible={setEditAreasVisible}
      />
      <EditStandingPoints
        {...props}
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
              {props.teamOwner() ?
                <Button status='primary' appearance='outline' onPress={() => {props.setUpdateActivity(false); props.navigation.navigate('CreateActivityStack')}}>
                  Create Research Activity
                </Button>
              :
                null
              }
            </View>
        </View>
        <Divider style={{marginTop: 5}} />

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'42%'}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%', minHeight:150, backgroundColor: 'rgba(0, 0, 0, 0)'}}
            data={props.activities}
            ItemSeparatorComponent={Divider}
            renderItem={activityItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshingActivities}
                onRefresh={onRefreshActivities}
              />
            }
          />
        </View>

      </ContentContainer>
    </ViewableArea>
  );
};
