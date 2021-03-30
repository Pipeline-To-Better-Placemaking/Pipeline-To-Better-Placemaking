import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, MenuItem} from '@ui-kitten/components';
import { HeaderBack, HeaderBackEdit } from '../../components/headers.component';
import { ViewableArea, ContentContainer, ConfirmDelete } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { helperGetResult, isUserTeamOwner, deleteTimeSlot, getProject, getAllResults } from '../../components/apiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../projectResult.styles';

export function SurveyResultPage(props) {

  const [refreshing, setRefreshing] = useState(false);
  const [editMenuVisible, setEditMenuVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshDetails();
    setRefreshing(false);
  }, []);

  const refreshDetails = async () => {
    if (props.selectedResult !== null && props.selectedResult.sharedData !== undefined) {
      let result = await helperGetResult(
                           props.selectedResult._id,
                           "surveys/",
                           "survey",
                           props.selectedResult.sharedData,
                           props.project
                         );
      await props.setSelectedResult(result);
      await refreshProjectPageDetails();
    }
  };

  // refreshes previous page
  const refreshProjectPageDetails = async () => {
    let proj = await getProject(props.project);
    if (proj !== null) {
      let results = await getAllResults(proj);
      await props.setResults(results);
    }
  };

  const deleteResult = async () => {
    let success = false;
    if (props.selectedResult !== null) {
      success = await deleteTimeSlot("surveys/", props.selectedResult._id);
    }
    if (success) {
      await refreshProjectPageDetails();
      await setConfirmDeleteVisible(false);
      props.navigation.goBack();
    }
  }

  if (props.selectedResult === null || !props.selectedResult.success) {
    return (
      <ViewableArea>
        {isUserTeamOwner(props.team, props.userId)
          ?
          <HeaderBackEdit {...props} text={"No results"} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
            <MenuItem title='Delete Result' onPress={() => {setEditMenuVisible(false); setConfirmDeleteVisible(true)}}/>
          </HeaderBackEdit>
          :
          <HeaderBack {...props} text={"No results"}/>
        }
        <ConfirmDelete
          visible={confirmDeleteVisible}
          setVisible={setConfirmDeleteVisible}
          dataType={"result"}
          deleteFunction={deleteResult}
        />
        <ContentContainer>
          <ScrollView
            style={styles.margins}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >

            <Text category={'h5'}>No result information for this activity</Text>

          </ScrollView>
        </ContentContainer>
      </ViewableArea>
    );
  }

  let areaTitle = '';

  // error checking for area
  if (props.selectedResult.sharedData.area === undefined ||
      props.selectedResult.sharedData.area === null ||
      props.selectedResult.sharedData.area.length <= 0
    ) {
      areaTitle = 'unknown';
  } else {
    areaTitle = (props.selectedResult.sharedData.area.title === undefined ? 'Project Perimeter' : props.selectedResult.sharedData.area.title)
  }

  let startTime = new Date(props.selectedResult.date);
  let day = new Date(props.selectedResult.sharedData.date);

  let researchers = props.selectedResult.researchers.map(user => {
    return "\n\t" + user.firstname + ' ' + user.lastname;
  });

  return (
    <ViewableArea>
      {isUserTeamOwner(props.team, props.userId)
        ?
        <HeaderBackEdit {...props}
          text={props.project.title + ": " + props.selectedResult.sharedData.title}
          editMenuVisible={editMenuVisible}
          setEditMenuVisible={setEditMenuVisible}
        >
          <MenuItem title='Delete Result' onPress={() => {setEditMenuVisible(false); setConfirmDeleteVisible(true)}}/>
        </HeaderBackEdit>
        :
        <HeaderBack {...props} text={props.project.title + ": " + props.selectedResult.sharedData.title}/>
      }
      <ConfirmDelete
        visible={confirmDeleteVisible}
        setVisible={setConfirmDeleteVisible}
        dataType={"result"}
        deleteFunction={deleteResult}
      />
      <ContentContainer>
        <ScrollView
          style={styles.margins}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >

          <Text category={'h5'}>Moving Result Information</Text>
          <Divider style={{marginTop:5, marginBottom:10, borderWidth:0.5}} />

          <Text>Team: {props.team.title}</Text>
          <Text>Admin: {props.team.users[0].firstname} {props.team.users[0].lastname}</Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Location: {props.project.description}</Text>
          <Text>Area: {areaTitle}</Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Day: {getDayStr(day)}</Text>
          <Text>Start Time: {getTimeStr(startTime)} </Text>
          <Text>Duration: {props.selectedResult.sharedData.duration} min</Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Researcher(s): {researchers} </Text>

          <Divider style={{marginTop:10, marginBottom:10, borderWidth:0.5}} />

          <Text>Survey Code: {props.selectedResult.key} </Text>

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
};

// compass-outline
// pin-outline
const MapIcon = (props) => (
  <Icon {...props} name='compass-outline'/>
);

// file-text-outline
// pie-chart-outline
const ChartIcon = (props) => (
  <Icon {...props} name='file-text-outline'/>
);
