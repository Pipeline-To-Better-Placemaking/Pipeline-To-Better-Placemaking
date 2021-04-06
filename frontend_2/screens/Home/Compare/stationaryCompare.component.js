import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBack } from '../../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { CompareBarChart } from '../../components/charts.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './compare.styles'

export function StationaryCompare(props) {
  if (props.results === null) {
    return (
      <ViewableArea>
        <HeaderBack {...props} text={"No results"}/>
        <ContentContainer>
          <ScrollView style={styles.margins}>

            <Text category={'h5'}>No result information to compare</Text>

          </ScrollView>
        </ContentContainer>
      </ViewableArea>
    );
  }

  let results = props.results;

  const color = '#006FD6';
  results.map((result, index) => {
    result.graph = {}
    result.resultName = getTimeStr(result.date) + ' - ' + getDayStr(result.sharedData.date) + ' - ' + result.sharedData.projectName + ' - ' + result.sharedData.teamName;
    if (index%2 === 0) {
      result.color = 'rgb(0, 111, 214)';
    } else {
      result.color = 'rgb(0, 214, 111)';
    }
    result.information = result.title + '\n' + result.resultName + '\nLocation: ' + result.sharedData.location;
  });

  const chartWidth = Dimensions.get('window').width*0.95;
  const chartHeight = 210;

  var randomColor = require('randomcolor');

  // format Stationary data
  let labels = {
    ageLabels: [],
    genderLabels: [],
    postureLabels: [],
    activityLabels: [],
  };
  let dataset = [];

  for (let i = 0; i < results.length; i++) {
    if (results[i].data === undefined || results[i].data === null) { continue; }
    let result = [...results[i].data];
    // null entry
    dataset.push({
      ageData: [],
      genderData: [],
      postureData: [],
      activityData: [],
    });
    // zero out previously made categories
    labels.ageLabels.map(label => {
      dataset[i].ageData.push(Number(0))
    });
    labels.genderLabels.map(label => {
      dataset[i].genderData.push(Number(0))
    });
    labels.postureLabels.map(label => {
      dataset[i].postureData.push(Number(0))
    });
    labels.activityLabels.map(label => {
      dataset[i].activityData.push(Number(0))
    });

    // for each data point, increase count
    for (let j = 0; j < result.length; j++) {
      let dataPoint = result[j];
      let label = undefined;
      let labelIndex = -1;

      // Age
      label = dataPoint.age;
      if (label !== undefined) {
        labelIndex = labels.ageLabels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (labelIndex < 0) {
          labelIndex = labels.ageLabels.length;
          labels.ageLabels = [...labels.ageLabels, label];
          dataset.map(entry => entry.ageData.push(Number(0)));
        }
        // increase count
        dataset[i].ageData[labelIndex] += 1;
      } // end age

      // gender
      label = dataPoint.gender;
      if (label !== undefined) {
        labelIndex = labels.genderLabels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (labelIndex < 0) {
          labelIndex = labels.genderLabels.length;
          labels.genderLabels = [...labels.genderLabels, label];
          dataset.map(entry => entry.genderData.push(Number(0)));
        }
        // increase count
        dataset[i].genderData[labelIndex] += 1;
      } // end gender

      // posture
      label = dataPoint.posture;
      if (label !== undefined) {
        labelIndex = labels.postureLabels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (labelIndex < 0) {
          labelIndex = labels.postureLabels.length;
          labels.postureLabels = [...labels.postureLabels, label];
          dataset.map(entry => entry.postureData.push(Number(0)));
        }
        // increase count
        dataset[i].postureData[labelIndex] += 1;
      } // end posture

      // activity
      label = dataPoint.activity;
      if (label !== undefined) {
        labelIndex = labels.activityLabels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (labelIndex < 0) {
          labelIndex = labels.activityLabels.length;
          labels.activityLabels = [...labels.activityLabels, label];
          dataset.map(entry => entry.activityData.push(Number(0)));
        }
        // increase count
        dataset[i].activityData[labelIndex] += 1;
      } // end activity

    } // end for j loop
  } // end for i loop

  // add the graph information here
  //console.log('graph results...');
  for (let i = 0; i < results.length; i++) {
    results[i].graph = dataset[i];
    //results[i].labels = labels;
    //console.log('i:', i, '\n', results[i].graph);
  }

  let ageValues = results.map(result => {
    return {
      data: result.graph.ageData,
      svg: {fill: result.color, opacity:.5},
      title: result.resultName,
    }
  });

  let genderValues = props.results.map(result => {
    return {
      data: result.graph.genderData,
      svg: {fill: result.color, opacity:.5},
      title: result.resultName,
    }
  });

  let postureValues = results.map(result => {
    return {
      data: result.graph.postureData,
      svg: {fill: result.color, opacity:.5},
      title: result.resultName,
    }
  });

  let activityValues = results.map(result => {
    return {
      data: result.graph.activityData,
      svg: {fill: result.color, opacity:.5},
      title: result.resultName,
    }
  });

  return (
    <ViewableArea>
      <HeaderBack {...props} text={"Compare"}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Stationary Result Information</Text>
          <Divider style={{marginTop:5, marginBottom:10, borderWidth:0.5}} />

          {
            results.map((result, index) => {
              if (index === results.length - 1) {
                return (
                  <Text key={index}>
                    {result.information}
                  </Text>
                )
              }
              return (
                <View key={index}>
                  <Text>
                    {result.information}
                  </Text>
                  <Divider style={{marginTop:10, marginBottom:10}} />
                </View>
              )
            })
          }

          <Divider style={{marginTop:10, marginBottom:10, borderWidth:0.5}} />

          <CompareBarChart
            {...props}
            title={"Age"}
            rotation={'0deg'}
            dataValues={ageValues}
            dataLabels={labels.ageLabels}
            barColor={color}
            width={chartWidth}
            height={chartHeight}
          />

          <CompareBarChart
            {...props}
            title={"Gender"}
            rotation={'0deg'}
            dataValues={genderValues}
            dataLabels={labels.genderLabels}
            barColor={color}
            width={chartWidth}
            height={chartHeight}
          />

          <CompareBarChart
            {...props}
            title={"Posture"}
            rotation={'0deg'}
            dataValues={postureValues}
            dataLabels={labels.postureLabels}
            barColor={color}
            width={chartWidth}
            height={chartHeight}
          />

          <CompareBarChart
            {...props}
            title={"Activity"}
            rotation={'-90deg'}
            dataValues={activityValues}
            dataLabels={labels.activityLabels}
            barColor={color}
            width={chartWidth}
            height={chartHeight}
          />

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );


}

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
