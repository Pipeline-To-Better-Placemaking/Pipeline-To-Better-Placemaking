import React from 'react';
import { View } from 'react-native';
import { Text, useTheme} from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import { BarChart, Grid, YAxis, PieChart } from 'react-native-svg-charts';
import { LinearGradient, Stop, Defs, Text as TextSVG } from 'react-native-svg';
import {format as prettyFormat} from 'pretty-format';

import { styles } from './charts.styles';

/* This needs:
title={}
rotation={}
dataLabels={}
dataValues={}
barColor={}
width={}
height={}
*/
export function MyBarChart({children, ...props}){

  // console.log("🚀 ~ file: charts.component.js:23 ~ MyBarChart ~ props.dataLabels", props.dataLabels);
  // console.log("🚀 ~ file: charts.component.js:23 ~ MyBarChart ~ props.dataValues", props.dataValues);


  if(props.dataLabels === null || props.dataLabels.length <= 0) {
    return null;
  }

  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  let textColor = (themeContext.theme === "light" ? 'black' : 'white');
  let fontSize = 10;

  let ticks = Math.max.apply(Math, props.dataValues)%5 + 1;
  if(ticks > 10) ticks = 10;

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
    if (props.rotation === '0deg') {
      return (
        <Text
          key={index}
          style={[styles.xaxis0, {
            transform:[{rotate:props.rotation}],
            width: ((props.width-10) / (props.dataLabels.length*2))
          }]}
        >
          {label}
        </Text>
      );
    }

    return (
      <View key={index} style={styles.xaxisView} >
        <Text style={[ styles.xaxis1, {transform:[{rotate:props.rotation}]}]} >
          {label}
        </Text>
      </View>
    )
  }

  return (
    <View style={{marginBottom:15}}>
      <Text category={'h4'}> {props.title} </Text>
      <View style={{height:props.height, width:props.width, flexDirection:'row'}}>
        <YAxis
          
          data={props.dataValues}
          contentInset={{top: 20, bottom: 10}}
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
            contentInset={{top: 20, bottom: 10, right:20}}
            numberOfTicks={ticks}
            >
              <Grid />
              <Gradient />
              <Labels />
          </BarChart>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: 20,
          flexDirection:'row',
          maxWidth:props.width - 40,
          justifyContent:'flex-start',
        }}
      >
        {props.dataLabels.map((value, index) => {return xAxisLabels(value, index)})}
      </View>
    </View>
  );
}

export function MyBarChartLength({children, ...props}){

  // console.log("🚀 ~ file: charts.component.js:23 ~ MyBarChart ~ props.dataLabels", props.dataLabels);
  // console.log("🚀 ~ file: charts.component.js:23 ~ MyBarChart ~ props.dataValues", props.dataValues);


  if(props.dataLabels === null || props.dataLabels.length <= 0) {
    return null;
  }

  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  let textColor = (themeContext.theme === "light" ? 'black' : 'white');
  let fontSize = 10;

  let ticks = Math.max.apply(Math, props.dataValues)%5 + 1;
  if(ticks > 10) ticks = 10;

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
            y={ value < CUT_OFF ? `${y(value) - 10}ft` : `${y(value) + 15}ft` }
            fontSize={fontSize}
            fill={textColor}
            alignmentBaseline={ 'middle' }
            textAnchor={ 'middle' }
          >
              {`${value} ft`}
          </TextSVG>
      ))
  )

  const xAxisLabels = (label, index) => {
    if (props.rotation === '0deg') {
      return (
        <Text
          key={index}
          style={[styles.xaxis0, {
            transform:[{rotate:props.rotation}],
            width: ((props.width-10) / (props.dataLabels.length*2))
          }]}
        >
          {label}
        </Text>
      );
    }

    return (
      <View key={index} style={styles.xaxisView} >
        <Text style={[ styles.xaxis1, {transform:[{rotate:props.rotation}]}]} >
          {label}
        </Text>
      </View>
    )
  }

  return (
    <View style={{marginBottom:15}}>
      <Text category={'h4'}> {props.title} </Text>
      <View style={{height:props.height, width:props.width, flexDirection:'row'}}>
        <YAxis
          
          data={props.dataValues}
          contentInset={{top: 20, bottom: 10}}
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
            contentInset={{top: 20, bottom: 10, right:20}}
            numberOfTicks={ticks}
            >
              <Grid />
              <Gradient />
              <Labels />
          </BarChart>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: 20,
          flexDirection:'row',
          maxWidth:props.width - 40,
          justifyContent:'flex-start',
        }}
      >
        {props.dataLabels.map((value, index) => {return xAxisLabels(value, index)})}
      </View>
    </View>
  );
}

export function CompareBarChart({children, ...props}){

  if(props.dataLabels === null || props.dataLabels.length <= 0) {
    return null;
  }

  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  let randomColor = require('randomcolor');
  let textColor = (themeContext.theme === "light" ? 'black' : 'white');
  let fontSize = 10;

  /*const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
          <Stop offset={'0%'} stopColor={'rgb(0, 214, 111)'}/>
          <Stop offset={'100%'} stopColor={'rgb(255, 255, 255)'}/>
        </LinearGradient>
      </Defs>
    )*/

  const Labels = ({ x, y, bandwidth, data }) => (
    props.dataValues.map((item, resultIndex) => (
      item.data.map((value, index) => {
        let xVal = x(index);
        let segWidth = (bandwidth / (props.dataValues.length*2));
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
    if (props.rotation === '0deg') {
      return (
        <Text
          key={index}
          style={[ styles.xaxis0, {
            transform:[{rotate:props.rotation}],
            width: ((props.width-10) / (props.dataLabels.length*2)),
          }]}
        >
          {label}
        </Text>
      );
    }

    return (
      <View key={index} style={styles.xaxisView} >
        <Text style={[styles.xaxis1, {transform:[{rotate:props.rotation}]}]} >
          {label}
        </Text>
      </View>
    )
  }

  let maxValue = props.dataValues.map(item => {return Math.max.apply(null, item.data)})
  maxValue = Math.max.apply(null, maxValue)
  let yData = [...props.dataValues[0].data]
  yData[0] = maxValue

  let ticks = maxValue/2 + 1;
  // needed for boundary compare (otherwise it may try rendering thousands of ticks which crashes the app)
  if(ticks > 10) ticks = 10;

  let titles = props.dataValues.map(value => {return value.title});

  return (
    <View style={styles.mainView}>
      <Text category={'h4'}> {props.title} </Text>
      <View style={{height:props.height, width:props.width, flexDirection:'row'}}>
        <YAxis
          data={yData}
          contentInset={{top: 20, bottom: 10}}
          svg={{fontSize:fontSize, fill:textColor}}
          min={0}
          numberOfTicks={ticks}
        />
        <View style={styles.container}>
          <BarChart
            style={styles.barchart}
            data={props.dataValues}
            gridMin={0}
            spacing={0.2}
            contentInset={{top: 20, bottom: 10, right:20}}
            numberOfTicks={ticks}
            >
              <Grid />
              <Labels />

          </BarChart>
        </View>
      </View>
      <View style={[ styles.labelView, {maxWidth:props.width - 10}]} >
        {props.dataLabels.map((value, index) => {return xAxisLabels(value, index)})}
      </View>
      <View style={styles.legendView}>
        <Text category={'s2'}>Legend: </Text>
        {titles.map((text, index) => {
          //if(index !== props.dataValues.length-1) {text += ', '}
          return(
            <Text key={index} style={{flex:1, color:props.dataValues[index].svg.fill, width:props.width}} category={'s2'}>{text}</Text>
          )
        })}
      </View>
    </View>
  );
}

export function MyPieChart(props){
  // if there are not any values for the passed in object, don't render anything
  if(props.graph[0] !== undefined && props.graph[0].value !== undefined){
    const Legend = () =>{
      let obj = [];
      for(let i = 0; i < Object.keys(props.graph).length; i++){
        // this is mainly for the occupied area chart, if there is no data of that boundary type, don't render anything for it 
        if(props.graph[i].value !== 0){
          obj[i] = (
            <View key={i.toString()} style={styles.pieLegend}>
              <Text style={styles.whiteText}>{props.graph[i].legend}: </Text>
              <Text style={{color: props.graph[i].svg.fill}}>■</Text>
              
              {props.cond ?
                <Text style={styles.whiteText}> {props.graph[i].value.toFixed(2)} ft² ({props.graph[i].percent}% of project area)</Text>
              :
                <Text style={styles.whiteText}> {props.graph[i].value.toFixed(2)} ft² ({props.graph[i].percent}%)</Text>
              }
            
            </View>
          )
        }
      }

      return(
        <View style={styles.pieLegendView}>
          <Text category={'s1'} style={styles.whiteText}>Legend</Text>
          {obj}
        </View>
      )
    }

    return(
      <View style={{flex: 1}}>
        <Text category={'h4'}>{props.title}</Text>
        <PieChart
          style={{ height: props.height }}
          outerRadius={'100%'}
          innerRadius={20}
          padAngle={0}
          data={props.graph}
        />
        
        <Legend />
      
      </View>
    )
  }
  else return null
}

export function MyPieChartCounts(props){
  // if there are not any values for the passed in object, don't render anything
  if(props.graph[0] !== undefined && props.graph[0].value !== undefined){
    const Legend = () =>{
      let obj = [];
      for(let i = 0; i < Object.keys(props.graph).length; i++){
        // this is mainly for the occupied area chart, if there is no data of that boundary type, don't render anything for it 
        if(props.graph[i].value !== 0){
          obj[i] = (
            <View key={i.toString()} style={styles.pieLegend}>
              <Text style={styles.whiteText}>{props.graph[i].legend}: </Text>
              <Text style={{color: props.graph[i].svg.fill}}>■</Text>
              
              {props.cond ?
                <Text style={styles.whiteText}> {props.graph[i].value.toFixed(2)} ({props.graph[i].percent}% of project area)</Text>
              :
                <Text style={styles.whiteText}> {props.graph[i].value.toFixed(2)} ({props.graph[i].percent}%)</Text>
              }
            
            </View>
          )
        }
      }

      return(
        <View style={styles.pieLegendView}>
          <Text category={'s1'} style={styles.whiteText}>Legend</Text>
          {obj}
        </View>
      )
    }

    return(
      <View style={{flex: 1}}>
        <Text category={'h4'}>{props.title}</Text>
        <PieChart
          style={{ height: props.height }}
          outerRadius={'100%'}
          innerRadius={20}
          padAngle={0}
          data={props.graph}
        />
        
        <Legend />
      
      </View>
    )
  }
  else return null
}

export function MyPieChartArea(props){

  // console.log("🚀 ~ file: charts.component.js:357 ~ MyPieChartArea ~ props:", props);

  // if there are not any values for the passed in object, don't render anything
  if(props.graph[0] !== undefined){
    const Legend = () =>{
      let obj = [];
      for(let i = 0; i < Object.keys(props.graph).length; i++){
        // this is mainly for the occupied area chart, if there is no data of that boundary type, don't render anything for it 
        if(props.graph[i].value !== 0){
          // console.log(props.graph[i].value)
          obj[i] = (
            <View key={i.toString()} style={styles.pieLegend}>
              <Text style={styles.whiteText}>{props.graph[i].legend}: </Text>
              <Text style={{color: props.graph[i].svg.fill}}>■</Text>
              
              {props.cond ?
                <Text style={styles.whiteText}> {props.graph[i].value.toLocaleString()} ft² ({props.graph[i].percent}% of project area)</Text>
              :
                <Text style={styles.whiteText}> {props.graph[i].value.toLocaleString()} ft² ({props.graph[i].percent}%)</Text>
              }
            
            </View>
          )
        }
      }

      return(
        <View style={styles.pieLegendView}>
          <Text category={'s1'} style={styles.whiteText}>Legend</Text>
          {obj}
        </View>
      )
    }

    return(
      <View style={{flex: 1}}>
        <Text category={'h4'}>{props.title}</Text>
        <PieChart
          style={{ height: props.height }}
          outerRadius={'100%'}
          innerRadius={20}
          padAngle={0}
          data={props.graph}
        />
        
        <Legend />
      
      </View>
    )
  }
  else return null
}
