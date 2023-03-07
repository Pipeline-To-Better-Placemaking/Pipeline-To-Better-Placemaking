import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';

import { styles } from './compare.styles'
import { soundStyles } from './soundCompare.styles';

//comparing 2 sound tests
export function SoundCompare(props) {
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

  // used to find the most common predominant sound type
  const mostCommon = (arr) =>{
    // used as a dictonary to store word and its frequency
    let hm = {};
    // iterate over the whole array
    for(let i = 0; i < arr.length; i++){
      // if the string already exists in hm then increase it's value by 1
      if(hm.hasOwnProperty(arr[i])) hm[arr[i]] = hm[arr[i]] + 1;
      // else add it in hm by giving it a value
      else hm[arr[i]] = 1;
    }

    let ret = '';
    let val = 0;
    // iterate over the dictonary looking for the highest frequency, then return that string
    for(const [word, value] of Object.entries(hm)){
      // if the value of the word in hm is larger than our current value
      if(value > val){
        // update the current value and the string
        val = value;
        ret = word;
      }
    }
    return ret;
  }
  
  // packages the data for each test for ease of use
  let test1 = {
    data: results[0].data,
    standingPoints: results[0].standingPoints,
    info: results[0].resultName,
    color: results[0].color,
    title: results[0].title
  }

  let test2 = {
    data: results[1].data,
    standingPoints: results[1].standingPoints,
    info: results[1].resultName,
    color: results[1].color,
    title: results[1].title
  }
  
  // returns an array of strings
  const soundsArray = (arr, ind) =>{
    let sounds = [
      arr[ind].decibel_1.predominant_type,
      arr[ind].decibel_2.predominant_type,
      arr[ind].decibel_3.predominant_type,
      arr[ind].decibel_4.predominant_type,
      arr[ind].decibel_5.predominant_type
    ]
    return sounds;
  }
  
  // used to display both tests depending on which 1 was passed as a prop
  const DisplayTest = (props) =>{
    let jsxObj = [[]];
    let test = props.test;
    for(let i = 0; i < test.data.length; i++){
      let sounds = soundsArray(test.data, i);
      let predominant = mostCommon(sounds);
      let data = "Sound Decibel: " + test.data[i].average.toFixed(1) + " dB\t\t" + "Main Sound: " + predominant;
      jsxObj[i] = (
        <View key={i.toString()} >

          <Text category={'h4'}>{test.standingPoints[i].title}</Text>

          <View style={soundStyles.dataView}>
            <Text>{data}</Text>
          </View>
          
        </View>
      )
    }
    return(
      <View>
        {jsxObj}
          
          <View style={soundStyles.topSpacing}>
            <Text category={'s2'}>Data From: </Text>
            <Text style={{color: test.color}}>{test.title}</Text>
            <Text style={{color: test.color}}>{test.info}</Text>
          </View>
      
      </View>
    )
  }
    
  return (
    <ViewableArea>
      <HeaderBack {...props} text={"Compare"}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Acoustical Profile Results</Text>
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
          
          <View style={soundStyles.bottomSpacing}>
            <DisplayTest
              test={test1}
            />
          </View>
          
          <Divider style={soundStyles.separator} />

          <View style={soundStyles.topSpacing}>
            <DisplayTest
              test={test2}
            />
          </View>
          
        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
}