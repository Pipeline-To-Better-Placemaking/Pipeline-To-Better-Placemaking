import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { CompareBarChart } from '../../components/charts.component';

import { styles } from './compare.styles';

export function AccessCompare(props) {
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

  // formats each test's data individually for easier formatting to compare
  const formatForIndividual = (obj)=>{
    let graph = {
      data: [],
      labels: []
    };
    let index;
    // loop through the entire data array to format each points array for the barchart
    for(let i = 0; i < obj.length; i++){
      let data = obj[i].points;
      // loop through the entire points array and format its data into the graph object
      for(let j = 0; j < data.length; j++){
        index = conDescSearch(graph.labels, data[j].access_description)
        // if that description already exists in graph's labels
        if(index !== -1){
          // increase the count of that index
          graph.data[index] += 1;
        }
        // otherwise, that description does not exist in graph's labels
        else{
          // so push the description to the end of graph's labels and a 1 onto the end of data labels
          graph.labels.push(data[j].access_description);
          graph.data.push(1);
        }
      }
    }
    return graph;
  }
  
  // returns fully formatted array of data objects that the compare barchart needs
  const formatForCompare = (obj1, obj2) =>{
    let index;
    let resObj = {
      labels: [],
      graph: []
    }
    // push the needed 2 graph objects into the return object's graph array
    resObj.graph.push({data: [], svg: {}, title: []})
    resObj.graph.push({data: [], svg: {}, title: []})
    
    // if both data arrays are empty, there is nothing to compare so return false
    if(obj1.data.length === 0 && obj2.data.length === 0) return false;
    
    // if the 1st formatted data object has more data/labels, then use it as the base
    if(obj1.data.length > obj2.data.length){
      // loop through the data object and format the data
      for(let i = 0; i < obj1.data.length; i++){
        // push the new label onto the end of the labels array
        resObj.labels.push(obj1.labels[i]);
        // add its data to the 1st graph data object
        resObj.graph[0].data.push(obj1.data[i]);
        // search through the other object to see if that label exists in it
        index = conDescSearch(obj2.labels, obj1.labels[i]);
        // that label exists in the other data object
        if(index !== -1){
          // add its data to the 2nd graph data object
          resObj.graph[1].data.push(obj2.data[index])
        }
        // otherwise, that label doesn't exist in the other data object
        else{
          // so add a 0 to the 2nd graph data object
          resObj.graph[1].data.push(0)
        }
      }
      // check the other formatted data object for any labels unaccounted for (is unlikely but possible to happen)
      for(let i = 0; i < obj2.data.length; i++){
        index = conDescSearch(resObj.labels, obj2.labels[i]);
        // if that object does not exist, add it to the end of the formatted graph obj
        if(index === -1){
          resObj.labels.push(obj2.labels[i]);
          resObj.graph[1].data.push(obj2.data[i]);
          // push a 0 onto the 1st graph object as the data didn't exist in obj1 
          resObj.graph[0].data.push(0);
        }
        // otherwise, it already exists in labels and nothing needs to be done
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
    // otherwise they are likely the same size (or the 2nd data object is larger)
    else{
      // loop through the data object and format the data
      for(let i = 0; i < obj2.data.length; i++){
        // push the new label onto the end of the labels array
        resObj.labels.push(obj2.labels[i]);
        // add its data to the 1st graph data object
        resObj.graph[0].data.push(obj2.data[i]);
        // search through the other object to see if that label exists in it
        index = conDescSearch(obj1.labels, obj2.labels[i]);
        // that label exists in the other data object
        if(index !== -1){
          // add its data to the 2nd graph data object
          resObj.graph[1].data.push(obj1.data[index])
        }
        // otherwise, that label doesn't exist in the other data object
        else{
          // so add a 0 to the 2nd graph data object
          resObj.graph[1].data.push(0)
        }
      }
      // check the other formatted data object for any labels unaccounted for (is unlikely but possible to happen)
      for(let i = 0; i < obj1.data.length; i++){
        index = conDescSearch(resObj.labels, obj1.labels[i]);
        // if that object does not exist, add it to the end of the formatted graph obj
        if(index === -1){
          resObj.labels.push(obj1.labels[i]);
          resObj.graph[1].data.push(obj1.data[i]);
          // push a 0 onto the 1st graph object as the data didn't exist in obj1 
          resObj.graph[0].data.push(0);
        }
        // otherwise, it already exists in labels and nothing needs to be done
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
    return resObj;
  }
  
  const formatTest1 = formatForIndividual(results[0].data)
  const formatTest2 = formatForIndividual(results[1].data)
  const compareFormat = formatForCompare(formatTest1, formatTest2)

  return (
    <ViewableArea>
      <HeaderBack {...props} text={"Compare"}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Identifying Access Results</Text>
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
          
          {compareFormat ? 
            <CompareBarChart
              {...props}
              title={"Access Data"}
              rotation={'0deg'}
              dataValues={compareFormat.graph}
              dataLabels={compareFormat.labels}
              barColor={color}
              width={chartWidth}
              height={chartHeight}
            />
          :
            <Text category={'s1'}>Both test's results are blank; there is nothing to compare</Text>
          }

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
}