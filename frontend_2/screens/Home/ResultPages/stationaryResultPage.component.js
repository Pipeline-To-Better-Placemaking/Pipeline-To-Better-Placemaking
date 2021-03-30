import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBack, HeaderBackEdit } from '../../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer, ConfirmDelete } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { helperGetResult, deleteTimeSlot, getProject, getAllResults, isUserTeamOwner } from '../../components/apiCalls';
import { formatStationaryGraphData } from '../../components/helperFunctions';
import { MyBarChart } from '../../components/charts.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../projectResult.styles';

export function StationaryResultPage(props) {

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
                           "stationary_maps/",
                           "stationary",
                           props.selectedResult.sharedData,
                           props.project
                         );
      result = await formatStationaryGraphData(result);
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
      success = await deleteTimeSlot("stationary_maps/", props.selectedResult._id);
    }
    if (success) {
      await refreshProjectPageDetails();
      await setConfirmDeleteVisible(false);
      props.navigation.goBack();
    }
  }

  if (props.selectedResult === null ||
      !props.selectedResult.success ||
      props.selectedResult.graph === undefined
    ) {
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
  let viewMap = true;
  let errorMessage = 'Error: \n';

  // error checking for area
  if (props.selectedResult.sharedData.area === undefined ||
      props.selectedResult.sharedData.area === null ||
      props.selectedResult.sharedData.area.length <= 0
    ) {
      areaTitle = 'unknown';
      viewMap = false;
      errorMessage += '- Area information has been deleted\n';
  } else {
    areaTitle = (props.selectedResult.sharedData.area.title === undefined ? 'Project Perimeter' : props.selectedResult.sharedData.area.title)
  }

  // error checking for standing points
  if (props.selectedResult.standingPoints === undefined ||
      props.selectedResult.standingPoints === null ||
      props.selectedResult.standingPoints.length <= 0
    ) {
      viewMap = false;
      errorMessage += '- Standing point information has been deleted\n';
  }
  errorMessage += '\n\t Unable to Load Map View';

  let startTime = new Date(props.selectedResult.date);
  let day = new Date(props.selectedResult.sharedData.date);

  let researchers = props.selectedResult.researchers.map(user => {
    return "\n\t" + user.firstname + ' ' + user.lastname;
  });

  const chartWidth = Dimensions.get('window').width*0.95;
  const chartHeight = 210;

  const color = '#006FD6';

  const ageFill = color;
  const genderFill = color;
  const postureFill = color;
  const activityFill = color;

  const viewMapResults = () => {
    props.navigation.navigate("StationaryActivityResultView");
  }

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

          <Text category={'h5'}>Stationary Result Information</Text>
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

          {viewMap
            ?
              <View style={{ marginBottom:10, flexDirection:'row', justifyContent:'center'}}>
                <Button
                  style={{flex:1}}
                  status={'info'}
                  appearance={'outline'}
                  accessoryRight={MapIcon}
                  onPress={viewMapResults}
                >
                  View Map
                </Button>
              </View>
            :
              <View style={{margin:15, borderWidth:4, borderColor:'red'}}>
                <Text status='danger' category='s1' style={{padding:5}}>
                  {errorMessage}
                </Text>
              </View>
          }

          <MyBarChart
            {...props}
            title={"Age"}
            rotation={'0deg'}
            dataValues={props.selectedResult.graph.ageData}
            dataLabels={props.selectedResult.graph.ageLabels}
            barColor={ageFill}
            width={chartWidth}
            height={chartHeight}
          />

          <MyBarChart
            {...props}
            title={"Gender"}
            rotation={'0deg'}
            dataValues={props.selectedResult.graph.genderData}
            dataLabels={props.selectedResult.graph.genderLabels}
            barColor={genderFill}
            width={chartWidth}
            height={chartHeight}
          />

          <MyBarChart
            {...props}
            title={"Posture"}
            rotation={'0deg'}
            dataValues={props.selectedResult.graph.postureData}
            dataLabels={props.selectedResult.graph.postureLabels}
            barColor={postureFill}
            width={chartWidth}
            height={chartHeight}
          />

          <MyBarChart
            {...props}
            title={"Activity"}
            rotation={'-90deg'}
            dataValues={props.selectedResult.graph.activityData}
            dataLabels={props.selectedResult.graph.activityLabels}
            barColor={activityFill}
            width={chartWidth}
            height={chartHeight}
          />

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
