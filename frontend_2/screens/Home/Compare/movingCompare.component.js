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

export function MovingCompare(props) {
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

  // format moving data
  let labels = [];
  let dataset = [];

  for (let i = 0; i < results.length; i++) {
    if (results[i].data === undefined || results[i].data === null) { continue; }
    let result = [...results[i].data];
    // null entry
    dataset.push({
      data: [],
    });
    // zero out previously made categories
    labels.map(label => {
      dataset[i].data.push(Number(0))
    });

    // for each data point, increase count
    for (let j = 0; j < result.length; j++) {
      let dataPoint = result[j];
      let label = undefined;
      let labelIndex = -1;

      // movement label
      label = dataPoint.mode;
      if (label !== undefined) {
        labelIndex = labels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (labelIndex < 0) {
          labelIndex = labels.length;
          labels.push(label);
          dataset.map(entry => entry.data.push(Number(0)));
        }
        // increase count
        dataset[i].data[labelIndex] += 1;
      } // end movement label

    } // end for j loop
  } // end for i loop

  // add the graph information here
  //console.log('graph results...');
  for (let i = 0; i < results.length; i++) {
    results[i].graph = dataset[i];
    //results[i].labels = labels;
    //console.log('i:', i, '\n', results[i].graph);
  }

  let dataValues = results.map(result => {
    console.log('result..', result);
    return {
      data: result.graph.data,
      svg: {fill: result.color, opacity:.5},
      title: result.resultName,
    }
  });

  return (
    <ViewableArea>
      <HeaderBack {...props} text={"Compare"}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Moving Result Information</Text>
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
            title={"Movement"}
            rotation={'0deg'}
            dataValues={dataValues}
            dataLabels={labels}
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
