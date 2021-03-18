import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, Card, useTheme} from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { LinearGradient, Stop, Defs, Text as TextSVG } from 'react-native-svg'
import * as scale from 'd3-scale'

/* This needs:
title={}
rotation={}
dataLabels={}
dataValues={}
barColor={}
width={}
height={}
*/
export function MyBarChart({children, ...props}) {

  if(props.dataLabels === null || props.dataLabels.length <= 0) {
    return null;
  }

  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  let textColor = (themeContext.theme === "light" ? 'black' : 'white');
  let fontSize = 10;

  let ticks = Math.max.apply(Math, props.dataValues)%5 + 1;
  let contentInset = {top: 20, bottom: 20};

  const Gradient = () => (
        <Defs key={'gradient'}>
          <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
            <Stop offset={'0%'} stopColor={props.barColor}/>
            <Stop offset={'100%'} stopColor={'rgb(255, 255, 255)'}/>
          </LinearGradient>
        </Defs>
      )

  const CUT_OFF = 20
  const Labels = ({ x, y, bandwidth, data }) => (
      data.map((value, index) => (
          <TextSVG
            key={ index }
            x={ x(index) + (bandwidth / 2) }
            y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
            fontSize={fontSize}
            fill={textColor}
            alignmentBaseline={ 'middle' }
            textAnchor={ 'middle' }
          >
              {value}
          </TextSVG>
      ))
  )

  const xAxisLabels = (label, index) => {
    return (
      <Text
        key={index}
        style={{
          fontSize: fontSize,
          textAlign: 'center',
          width: (props.width / (props.dataLabels.length)),
          flex: 1,
          transform:[{rotate:props.rotation}],
        }}
      >
        {label}
      </Text>
    )
  }

  return (
    <View style={{marginBottom:15}}>
      <Text category={'h4'}> {props.title} </Text>
      <View style={{height:props.height, width:props.width, flexDirection:'row'}}>
        <YAxis
          data={props.dataValues}
          contentInset={contentInset}
          svg={{fontSize:fontSize, fill:textColor}}
          min={0}
          numberOfTicks={ticks}
        />
        <View style={{ flex: 1, marginLeft: 5 }}>
          <BarChart
            style={{flex:1}}
            data={props.dataValues}
            gridMin={0}
            spacing={0.2}
            svg={{fill:'url(#gradient)', opacity:.5}}
            contentInset={contentInset}
            numberOfTicks={ticks}
            >
              <Grid />
              <Gradient />
              <Labels />
          </BarChart>
          <View
            style={{
              flexDirection:'row',
              maxWidth:props.width - 5,
              justifyContent:'flex-start',
            }}
          >
            {props.dataLabels.map((value, index) => {return xAxisLabels(value, index)})}
          </View>
        </View>
      </View>

    </View>
  );
};

export function CompareBarChart({children, ...props}) {

  if(props.dataLabels === null || props.dataLabels.length <= 0) {
    return null;
  }

  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  var randomColor = require('randomcolor');
  let textColor = (themeContext.theme === "light" ? 'black' : 'white');
  let fontSize = 10;

  let ticks = Math.max.apply(Math, props.dataValues)%5 + 1;

  /*const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
          <Stop offset={'0%'} stopColor={'rgb(0, 214, 111)'}/>
          <Stop offset={'100%'} stopColor={'rgb(255, 255, 255)'}/>
        </LinearGradient>
      </Defs>
    )*/

  const Labels = ({ x, y, bandwidth, data }) => (
    data.map((item, resultIndex) => (
      item.data.map((value, index) => {
        let xVal = x(index);
        let segWidth = (bandwidth / (data.length*2));
        xVal += segWidth*(resultIndex*2+1)
        return (
          <TextSVG
            key={resultIndex*10 +index}
            x={xVal}
            y={y(value) - 5}
            fontSize={fontSize}
            fill={textColor}
            alignmentBaseline={ 'middle' }
            textAnchor={ 'middle' }
          >
              {value}
          </TextSVG>
        )
      })
    ))

  )

  const xAxisLabels = (label, index) => {
    return (
      <Text
        key={index}
        style={{
          fontSize: fontSize,
          textAlign: 'center',
          width: (props.width / (props.dataLabels.length)),
          flex: 1,
          transform:[{rotate:props.rotation}],
        }}
      >
        {label}
      </Text>
    )
  }

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

  let maxValue = data.map(item => {return Math.max.apply(null, item.data)})
  maxValue = Math.max.apply(null, maxValue)
  let yData = [...data[0].data]
  yData[0] = maxValue

  let titles = data.map(value => {return value.title});

  return (
    <View style={{marginBottom:15}}>
      <Text category={'h4'}> {props.title} </Text>
      <View style={{height:props.height, width:props.width, flexDirection:'row'}}>
        <YAxis
          data={yData}
          contentInset={{top: 20, bottom: 20}}
          svg={{fontSize:fontSize, fill:textColor}}
          min={0}
          numberOfTicks={ticks}
        />
        <View style={{ flex: 1, marginLeft: 5 }}>
          <BarChart
            style={{flex:1}}
            data={data}
            gridMin={0}
            spacing={0.2}
            contentInset={{top: 20, bottom: 20, right:20}}
            numberOfTicks={ticks}
            >
              <Grid />
              <Labels />

          </BarChart>
          <View
            style={{
              flexDirection:'row',
              maxWidth:props.width - 5,
              justifyContent:'flex-start',
            }}
          >
            {props.dataLabels.map((value, index) => {return xAxisLabels(value, index)})}
          </View>
        </View>
      </View>
      <Text category={'s2'}>Order: {titles.join(', ')}</Text>
    </View>
  );
};
