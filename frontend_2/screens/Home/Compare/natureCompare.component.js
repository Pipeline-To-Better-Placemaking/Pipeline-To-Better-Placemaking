import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { CompareBarChart } from '../../components/charts.component';

import { styles } from './compare.styles';

export function NatureCompare(props) {
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

  // searches through the passed in array to see if that string exists in it
  const conDescSearch = (arr, str)=>{
    // search through formatted array to see if that description is in it
    for(let i = 0; i < arr.length; i++){
      // if it is there, return its index
      if(arr[i] === str) return i;
    }
    // otherwise return -1
    return -1;
  }

  const formatForIndividual = (obj)=>{
    let graph = {
      animalData: [],
      animalLabels: [],
      vegetationData: [],
      vegetationLabels: [],
      waterData: [],
      waterLabels: [],
      weather: {},
    };
    for(let i = 0; i < obj.length; i++){
      let data = obj[i]
      //console.log(data)
      let index = -1;
      // format the points object (of each data object)
      for(let j = 0; j < data.points.length; j++){
        // the current data point is for vegetation
        if(data.points[j].kind === "Vegetation"){
          index = conDescSearch(graph.vegetationLabels, data.points[j].description)
          // that description is already formatted, so increase its count
          if(index !== -1){
            graph.vegetationData[index] += 1;
          }
          // otherwise add that description into the labels and increase its count
          else{
            graph.vegetationLabels.push(data.points[j].description)
            graph.vegetationData.push(1);
          }
        }
        // otherwise, its an animal data point
        else{
          let type = data.points[j].kind
          if(type === "Domesticated") type = "Domestic"
          let string = type.concat("\n", data.points[j].description)
          index = conDescSearch(graph.animalLabels, string)
          // that description is already formatted, so increase its count
          if(index !== -1){
            graph.animalData[index] += 1;
          }
          // otherwise add that description into the labels and increase its count
          else{
            graph.animalLabels.push(string)
            graph.animalData.push(1);
          }
        
        }
      }
      // format the water array (of each data object)
      for(let j = 0; j < data.water.length; j++){
        index = conDescSearch(graph.waterLabels, data.water[j].description)
        // that description is already formatted, so increase its count
        if(index !== -1){
          let num = graph.waterData[index] + data.water[j].area;
          let string = num.toFixed(2)
          graph.waterData[index] = parseFloat(string)
        }
        // otherwise add that description into the labels and increase its count
        else{
          graph.waterLabels.push(data.water[j].description)
          graph.waterData.push(data.water[j].area)
        }
      }
    }
    // set the weather info as the 1st data's weather only if it is a thing
    if(obj[0] !== undefined) graph.weather = obj[0].weather;
    else graph.weather = false
    return graph;
  }
  
  // returns fully formatted array of data objects that the compare barchart needs
  const formatForCompare = (obj1, obj2, type) =>{
    let resObj = {
      labels: [],
      graph: []
    }
    // push the needed 2 graph objects into the return object's graph array
    resObj.graph.push({data: [], svg: {}, title: []})
    resObj.graph.push({data: [], svg: {}, title: []})
    // formatting for the animal data
    if(type === "Animal"){
      // if both animal arrays are empty, there is nothing to compare so return false
      if(obj1.animalData.length === 0 && obj2.animalData.length === 0) return false;
      // if the 1st animal data array has more in it, use that as the base
      if(obj1.animalData.length > obj2.animalData.length){
        // loop through the entire array formatting the data for both data objects in graph
        for(let i = 0; i < obj1.animalData.length; i++){
          // push that label onto the labels array
          resObj.labels.push(obj1.animalLabels[i])
          // push the data for that label onto its graph object
          resObj.graph[0].data.push(obj1.animalData[i])
          // search the other format object array for the same label
          let cond = conDescSearch(obj2.animalLabels, obj1.animalLabels[i])
          // that label doesn't exist so push a 0
          if(cond === -1){
            resObj.graph[1].data.push(0)
          }
          // otherwise that label does exist, so push its value
          else{
            resObj.graph[1].data.push(obj2.animalData[cond])
          }
        }
        // check the other format object array for any labels not accounted for
        for(let i = 0; i < obj2.animalData.length; i++){
          let cond = conDescSearch(resObj.labels, obj2.animalLabels[i])
          // that label doesn't exist in labels so add it in
          if(cond === -1){
            // push that label onto the labels array
            resObj.labels.push(obj2.animalLabels[i])
            // push the data for that label onto its graph object
            resObj.graph[1].data.push(obj2.animalData[i])
            // this label wasn't in the formatted object above, so its value is 0
            resObj.graph[0].data.push(0)
          }
        }
        // add the other information into the return object graph array
        resObj.graph[0].svg = {
          fill: results[0].color,
          opacity: 0.5
        }
        resObj.graph[1].svg={
          fill: results[1].color,
          opacity: 0.5
        }
        resObj.graph[0].title = results[0].resultName
        resObj.graph[1].title = results[1].resultName
      }
      // otherwise use the 2nd animal data array as the base
      else{
        // loop through the entire array formatting the data for both data objects in graph
        for(let i = 0; i < obj2.animalData.length; i++){
          // push that label onto the labels array
          resObj.labels.push(obj2.animalLabels[i])
          // push the data for that label onto its graph object
          resObj.graph[0].data.push(obj2.animalData[i])
          // search the other format object array for the same label
          let cond = conDescSearch(obj1.animalLabels, obj2.animalLabels[i])
          // that label doesn't exist so push a 0
          if(cond === -1){
            resObj.graph[1].data.push(0)
          }
          // otherwise that label does exist, so push its value
          else{
            resObj.graph[1].data.push(obj1.animalData[cond])
          }
        }
        // check the other format object array for any labels not accounted for
        for(let i = 0; i < obj1.animalData.length; i++){
          let cond = conDescSearch(resObj.labels, obj1.animalLabels[i])
          // that label doesn't exist in labels so add it in
          if(cond === -1){
            // push that label onto the labels array
            resObj.labels.push(obj1.animalLabels[i])
            // push the data for that label onto its graph object
            resObj.graph[1].data.push(obj1.animalData[i])
            // this label wasn't in the formatted object above, so its value is 0
            resObj.graph[0].data.push(0)
          }
        }
        // add the other information into the return object graph array
        resObj.graph[0].svg = {
          fill: results[1].color,
          opacity: 0.5
        }
        resObj.graph[1].svg={
          fill: results[0].color,
          opacity: 0.5
        }
        resObj.graph[0].title = results[1].resultName
        resObj.graph[1].title = results[0].resultName
      }
    }
    // formatting for the vegetation data
    else if(type === "Vegetation"){
      // if both vegetation arrays are empty, there is nothing to compare so return false
      if(obj1.vegetationData.length === 0 && obj2.vegetationData.length === 0) return false;
      // if the 1st vegetation data array has more in it, use that as the base
      if(obj1.vegetationData.length > obj2.vegetationData.length){
        // loop through the entire array formatting the data for both data objects in graph
        for(let i = 0; i < obj1.vegetationData.length; i++){
          // push that label onto the labels array
          resObj.labels.push(obj1.vegetationLabels[i])
          // push the data for that label onto its graph object
          resObj.graph[0].data.push(obj1.vegetationData[i])
          // search the other format object array for the same label
          let cond = conDescSearch(obj2.vegetationLabels, obj1.vegetationLabels[i])
          // that label doesn't exist so push a 0
          if(cond === -1){
            resObj.graph[1].data.push(0)
          }
          // otherwise that label does exist, so push its value
          else{
            resObj.graph[1].data.push(obj2.vegetationData[cond])
          }
        }
        // check the other format object array for any labels not accounted for
        for(let i = 0; i < obj2.vegetationData.length; i++){
          let cond = conDescSearch(resObj.labels, obj2.vegetationLabels[i])
          // that label doesn't exist in labels so add it in
          if(cond === -1){
            // push that label onto the labels array
            resObj.labels.push(obj2.vegetationLabels[i])
            // push the data for that label onto its graph object
            resObj.graph[1].data.push(obj2.vegetationData[i])
            // this label wasn't in the formatted object above, so its value is 0
            resObj.graph[0].data.push(0)
          }
        }
        // add the other information into the return object graph array
        resObj.graph[0].svg = {
          fill: results[0].color,
          opacity: 0.5
        }
        resObj.graph[1].svg={
          fill: results[1].color,
          opacity: 0.5
        }
        resObj.graph[0].title = results[0].resultName
        resObj.graph[1].title = results[1].resultName
      }
      // otherwise use the 2nd vegetation data array as the base
      else{
        // loop through the entire array formatting the data for both data objects in graph
        for(let i = 0; i < obj2.vegetationData.length; i++){
          // push that label onto the labels array
          resObj.labels.push(obj2.vegetationLabels[i])
          // push the data for that label onto its graph object
          resObj.graph[0].data.push(obj2.vegetationData[i])
          // search the other format object array for the same label
          let cond = conDescSearch(obj1.vegetationLabels, obj2.vegetationLabels[i])
          // that label doesn't exist so push a 0
          if(cond === -1){
            resObj.graph[1].data.push(0)
          }
          // otherwise that label does exist, so push its value
          else{
            resObj.graph[1].data.push(obj1.vegetationData[cond])
          }
        }
        // check the other format object array for any labels not accounted for
        for(let i = 0; i < obj1.vegetationData.length; i++){
          let cond = conDescSearch(resObj.labels, obj1.vegetationLabels[i])
          // that label doesn't exist in labels so add it in
          if(cond === -1){
            // push that label onto the labels array
            resObj.labels.push(obj1.vegetationLabels[i])
            // push the data for that label onto its graph object
            resObj.graph[1].data.push(obj1.vegetationData[i])
            // this label wasn't in the formatted object above, so its value is 0
            resObj.graph[0].data.push(0)
          }
        }
        // add the other information into the return object graph array
        resObj.graph[0].svg = {
          fill: results[1].color,
          opacity: 0.5
        }
        resObj.graph[1].svg={
          fill: results[0].color,
          opacity: 0.5
        }
        resObj.graph[0].title = results[1].resultName
        resObj.graph[1].title = results[0].resultName
      }
    }
    // formatting for the water data
    else{
      // if both object's data arrays are empty, there is no data to compare
      if(obj1.waterData.length === 0 && obj2.waterData.length === 0) return false
      // if the 1st water data array has more in it, use that as the base
      if(obj1.waterData.length > obj2.waterData.length){
        // loop through the entire array formatting the data for both data objects in graph
        for(let i = 0; i < obj1.waterData.length; i++){
          // push that label onto the labels array
          resObj.labels.push(obj1.waterLabels[i])
          // push the data for that label onto its graph object
          resObj.graph[0].data.push(obj1.waterData[i])
          // search the other format object array for the same label
          let cond = conDescSearch(obj2.waterLabels, obj1.waterLabels[i])
          // that label doesn't exist so push a 0
          if(cond === -1){
            resObj.graph[1].data.push(0)
          }
          // otherwise that label does exist, so push its value
          else{
            resObj.graph[1].data.push(obj2.waterData[cond])
          }
        }
        // check the other format object array for any labels not accounted for
        for(let i = 0; i < obj2.waterData.length; i++){
          let cond = conDescSearch(resObj.labels, obj2.waterLabels[i])
          // that label doesn't exist in labels so add it in
          if(cond === -1){
            // push that label onto the labels array
            resObj.labels.push(obj2.waterLabels[i])
            // push the data for that label onto its graph object
            resObj.graph[1].data.push(obj2.waterData[i])
            // this label wasn't in the formatted object above, so its value is 0
            resObj.graph[0].data.push(0)
          }
        }
        // add the other information into the return object graph array
        resObj.graph[0].svg = {
          fill: results[0].color,
          opacity: 0.5
        }
        resObj.graph[1].svg={
          fill: results[1].color,
          opacity: 0.5
        }
        resObj.graph[0].title = results[0].resultName
        resObj.graph[1].title = results[1].resultName
      }
      // otherwise use the 2nd water data array as the base
      else{
        // loop through the entire array formatting the data for both data objects in graph
        for(let i = 0; i < obj2.waterData.length; i++){
          // push that label onto the labels array
          resObj.labels.push(obj2.waterLabels[i])
          // push the data for that label onto its graph object
          resObj.graph[0].data.push(obj2.waterData[i])
          // search the other format object array for the same label
          let cond = conDescSearch(obj1.waterLabels, obj2.waterLabels[i])
          // that label doesn't exist so push a 0
          if(cond === -1){
            resObj.graph[1].data.push(0)
          }
          // otherwise that label does exist, so push its value
          else{
            resObj.graph[1].data.push(obj1.waterData[cond])
          }
        }
        // check the other format object array for any labels not accounted for
        for(let i = 0; i < obj1.waterData.length; i++){
          let cond = conDescSearch(resObj.labels, obj1.waterLabels[i])
          // that label doesn't exist in labels so add it in
          if(cond === -1){
            // push that label onto the labels array
            resObj.labels.push(obj1.waterLabels[i])
            // push the data for that label onto its graph object
            resObj.graph[1].data.push(obj1.waterData[i])
            // this label wasn't in the formatted object above, so its value is 0
            resObj.graph[0].data.push(0)
          }
        }
        // add the other information into the return object graph array
        resObj.graph[0].svg = {
          fill: results[1].color,
          opacity: 0.5
        }
        resObj.graph[1].svg={
          fill: results[0].color,
          opacity: 0.5
        }
        resObj.graph[0].title = results[1].resultName
        resObj.graph[1].title = results[0].resultName
      }
    }
    return resObj;
  }
  
  const formatTest1 = formatForIndividual(results[0].data)
  const formatTest2 = formatForIndividual(results[1].data)
  const animalFormat = formatForCompare(formatTest1, formatTest2, "Animal")
  const vegeFormat = formatForCompare(formatTest1, formatTest2, "Vegetation")
  const waterFormat = formatForCompare(formatTest1, formatTest2, "Water")

  return (
    <ViewableArea>
      <HeaderBack {...props} text={"Compare"}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Nature Prevalence Results</Text>
          <Divider style={styles.metaDataTitleSep} />

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
                  <Divider style={styles.metaDataSep} />
                </View>
              )
            })
          }

          <Divider style={styles.metaDataEndSep} />
          
          {/* this is only false when one of the tests has no data submitted for it (the test was never started) */}
          {formatTest1.weather && formatTest2.weather ?
            <View>
              <Text category={'h4'}>Weather Data</Text>
                <View style={styles.dataRow}>
                  <Text>Temperature: {formatTest1.weather.temperature} °F</Text>
                  <Text>Condition: {formatTest1.weather.description}</Text>
                </View>
                <View style={styles.legendView}>
                  <Text category={'s2'}>Legend: </Text>
                  <Text style={{flex:1, color: results[0].color}} category={'s2'}>{results[0].resultName}</Text>
                </View>
            
                <View style={styles.dataRow}>
                  <Text>Temperature: {formatTest2.weather.temperature} °F</Text>
                  <Text>Condition: {formatTest2.weather.description}</Text>
                </View>
                <View style={styles.legendView}>
                  <Text category={'s2'}>Legend: </Text>
                  <Text style={{color: results[1].color}} category={'s2'}>{results[1].resultName}</Text>
                </View>
           
              <View style={styles.chartSpacing} />

              {animalFormat ? 
                <CompareBarChart
                  {...props}
                  title={"Animal Data"}
                  rotation={'0deg'}
                  dataValues={animalFormat.graph}
                  dataLabels={animalFormat.labels}
                  barColor={color}
                  width={chartWidth}
                  height={chartHeight}
                />
              :
                null
              }
                        
              {vegeFormat ?
                <CompareBarChart
                  {...props}
                  title={"Vegetation Data"}
                  rotation={'0deg'}
                  dataValues={vegeFormat.graph}
                  dataLabels={vegeFormat.labels}
                  barColor={color}
                  width={chartWidth}
                  height={chartHeight}
                />
              :
                null
              }
          
              {waterFormat ? 
                <CompareBarChart
                  {...props}
                  title={"Water Data"}
                  rotation={'0deg'}
                  dataValues={waterFormat.graph}
                  dataLabels={waterFormat.labels}
                  barColor={color}
                  width={chartWidth}
                  height={chartHeight}
                />
              : 
                null
              }
            </View>
          :
            <View>
              <Text category={'s1'}>At least one of the result's data is blank; there is nothing to compare to</Text>
            </View>
          }

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
}