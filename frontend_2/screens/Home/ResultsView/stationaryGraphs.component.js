import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyBarChart } from '../../components/charts.component';

export function SMGraphResultPage(props) {

  if (props.result.graph === undefined) {
    return (
      <ViewableArea>
        <HeaderBack {...props} text={props.result.title}/>
        <ContentContainer>
          <ScrollView style={{margin:5, marginLeft:20, marginRight:20}}>
            <Text category={'h5'}>No result information for this activity</Text>
          </ScrollView>
        </ContentContainer>
      </ViewableArea>
    );
  }

  const chartWidth = Dimensions.get('window').width*0.95;
  const chartHeight = Dimensions.get('window').height/5;

  const color = '#006FD6';//'rgb(134, 65, 244)'; // '#006FD6'

  const ageFill = color;
  const genderFill = color;
  const postureFill = color;
  const activityFill = color;

  return (
    <ViewableArea>
      <HeaderBack {...props} text={props.result.title}/>
      <ContentContainer>
        <ScrollView>
          <MyBarChart
            {...props}
            title={"Age"}
            rotation={0}
            dataValues={props.result.graph.ageData}
            dataLabels={props.result.graph.ageLabels}
            barColor={ageFill}
            width={chartWidth}
            height={chartHeight}
          />

          <MyBarChart
            {...props}
            title={"Gender"}
            rotation={0}
            dataValues={props.result.graph.genderData}
            dataLabels={props.result.graph.genderLabels}
            barColor={genderFill}
            width={chartWidth}
            height={chartHeight}
          />

          <MyBarChart
            {...props}
            title={"Posture"}
            rotation={0}
            dataValues={props.result.graph.postureData}
            dataLabels={props.result.graph.postureLabels}
            barColor={postureFill}
            width={chartWidth}
            height={chartHeight}
          />

          <MyBarChart
            {...props}
            title={"Activity"}
            rotation={-90}
            dataValues={props.result.graph.activityData}
            dataLabels={props.result.graph.activityLabels}
            barColor={activityFill}
            width={chartWidth}
            height={chartHeight}
          />

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
};

// file-text-outline
// pie-chart-outline
const ChartIcon = (props) => (
  <Icon {...props} name='file-text-outline'/>
);
