import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { CompareBarChart } from '../../components/charts.component';

import { styles } from './compare.styles';

export function OrderCompare(props) {
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
    let graph = {};
    console.log(obj);
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
    
    return resObj;
  }
  
  const formatTest1 = formatForIndividual(results[0].data)
  const formatTest2 = formatForIndividual(results[1].data)

  return (
    <ViewableArea>
      <HeaderBack {...props} text={"Compare"}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>AoO Locator Results</Text>
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
          
          <Text>Compare Charts go here</Text>

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
}