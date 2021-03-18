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

            <Text category={'h5'}>No result information to comapre</Text>

          </ScrollView>
        </ContentContainer>
      </ViewableArea>
    );
  }

  let areaTitle = 'area Title'
  let startTime = new Date();
  let day = new Date();

  let researchers = 'researchers...';

  const chartWidth = Dimensions.get('window').width*0.95;
  const chartHeight = 210;

  const color = '#006FD6';
  var randomColor = require('randomcolor');

  let data = [
    {
      data: [2,3,4,5,6],
      svg: {fill: randomColor(), opacity:.5},
      title: "dataaaaaaSet1",
    },
    {
      data: [6,7,8,9,10],
      svg: {fill: randomColor(), opacity:.5},
      title: "dataSet2",
    },
    {
      data: [5,4,3,6,7],
      svg: {fill: randomColor(), opacity:.5},
      title: "dataSet3",
    },
  ]
  let dataLabels = ['a', 'b', 'c', 'd', 'e'];

  return (
    <ViewableArea>
      <HeaderBack {...props} text={"Compare"}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Stationary Result Information</Text>
          <Divider style={{marginTop:5, marginBottom:10, borderWidth:0.5}} />

          <Text>Team: </Text>
          <Text>Admin: </Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Location: </Text>
          <Text>Area: {areaTitle}</Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Day: {getDayStr(day)}</Text>
          <Text>Start Time: {getTimeStr(startTime)} </Text>
          <Text>End Time: </Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Researcher(s): {researchers} </Text>

          <Divider style={{marginTop:10, marginBottom:10, borderWidth:0.5}} />

          <CompareBarChart
            {...props}
            title={"Age"}
            rotation={'0deg'}
            dataValues={data}
            dataLabels={dataLabels}
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
