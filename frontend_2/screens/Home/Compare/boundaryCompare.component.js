import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { CompareBarChart } from '../../components/charts.component';

import { styles } from './compare.styles';

export function BoundaryCompare(props) {
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

  // searches to see if that description exists in the object 
  const descSearch = (obj, str) =>{
    // search through the formatted graph object to see if that string is already in it
    for(let i = 0; i < Object.keys(obj).length; i++){
      // if that description exists, return the index
      if(obj[i].description === str) return i;
    }
    // otherwise return -1
    return -1;
  }

  // does same as above desc search, but needs a different format for arguments
  const conDescSearch = (arr, str)=>{
    // search through formatted array to see if that description is in it
    for(let i = 0; i < arr.length; i++){
      // if it is there, return its index
      if(arr[i] === str) return i;
    }
    // otherwise return -1
    return -1;
  }

  const formatForIndividual = (obj, type) =>{
    let ret = [{}];
    let index = 0;
    for(let i = 0; i < Object.keys(obj).length; i++){
      // if the boundary is the type we're formatting
      if(obj[i].kind === type){
        let desc = obj[i].description
        // only add the next object if that description is not already in the format object
        if(descSearch(ret, desc) === -1){
          let sum  = obj[i].value;
          // look for all instances of that boundary description to sum its values together
          for(let j = i + 1; j < Object.keys(obj).length; j ++){
            if(desc === obj[j].description) sum += obj[j].value
          }
          
          // enforces decimal rounding to 2nd decimal
          let tempString = sum.toFixed(2)
          sum = parseFloat(tempString);
          
          ret[index] ={
            key: i + 1,
            value: sum,
            description: obj[i].description 
          }
          // increase index after adding the boundary
          index++;
        }
      }
    }
    return ret;
  }

  const formatForConstruction = (obj) =>{
    let ret = {};
    let values = [];
    let label = [];
    for(let i = 0; i < Object.keys(obj).length; i++){
      if(obj[i].kind === "Construction"){
        let desc = obj[i].description        
        // only add the next object if that description is not already in the format object
        if(conDescSearch(label, desc) === -1){
          let sum  = obj[i].value;
          // look for all instances of that boundary description to sum its values together
          for(let j = i + 1; j < Object.keys(obj).length; j++){
            if(desc === obj[j].description) sum += obj[j].value
          }
          
          // enforces decimal rounding to 2nd decimal
          let tempString = sum.toFixed(2)
          sum = parseFloat(tempString);
          
          values.push(sum);
          label.push(desc)
        }
      }
    }
    ret = {
      data: values,
      label: label
    }
    return ret;
  }

  // formats the results from each test, what is returned is the total values for each description of that test
  const matFormat1 = formatForIndividual(results[0].data, "Material");
  const matFormat2 = formatForIndividual(results[1].data, "Material");

  const sheFormat1 = formatForIndividual(results[0].data, "Shelter");
  const sheFormat2 = formatForIndividual(results[1].data, "Shelter");

  const conFormat1 = formatForConstruction(results[0].data);
  const conFormat2 = formatForConstruction(results[1].data);

  let labels = {
    materialLabel: [],
    shelterLabel: [],
    constructionLabel: []
  }
  
  // stores result[0] in the 1 arrays, and result[1] in the 2 arrays
  let data = {
    materialData1: [],
    materialData2: [],
    shelterData1: [],
    shelterData2: [],
    constructionData1: [],
    constructionData2: []
  }

  // package material info only if one of the formatted objects has something in it
  if(matFormat1[0].description !== undefined || matFormat2[0].description !== undefined){
    // if the 1st format object is larger and its 1st description exists, use that as the base
    if(Object.keys(matFormat1).length >= Object.keys(matFormat2).length && matFormat1[0].description !== undefined){
      for(let i = 0; i < Object.keys(matFormat1).length; i++){
        labels.materialLabel.push(matFormat1[i].description);
        data.materialData1.push(matFormat1[i].value);
        let con = descSearch(matFormat2, matFormat1[i].description)
        // if that description doesn't exists in the other object, push a 0 as its data
        if(con === -1){
          data.materialData2.push(0);
        }
        // if it does exist
        else data.materialData2.push(matFormat2[con].value);
      }
    }
    // otherwise the 2nd format object is larger, so use it as the base
    else{
      for(let i = 0; i < Object.keys(matFormat2).length; i++){
        labels.materialLabel.push(matFormat2[i].description);
        data.materialData2.push(matFormat2[i].value);
        let con = descSearch(matFormat1, matFormat2[i].description)
        // if that description doesn't exists in the other object, push a 0 as its data
        if(con === -1){
          data.materialData1.push(0);
        }
        // if it does exist
        else data.materialData1.push(matFormat1[con].value);
      }
    }
  }
  // if there was nothing in both formatted objects, set its data to false (to conditional render the barcharts)
  else{
    data.materialData1 = false
    data.materialData2 = false
  }

  // package shelter info only if one of the formatted objects has something in it
  if(sheFormat1[0].description !== undefined || sheFormat2[0].description !== undefined){
    // if the 1st format object is larger and its 1st description exists, use that as the base
    if(Object.keys(sheFormat1).length >= Object.keys(sheFormat2).length && sheFormat1[0].description !== undefined){
      for(let i = 0; i < Object.keys(sheFormat1).length; i++){
        labels.shelterLabel.push(sheFormat1[i].description);
        data.shelterData1.push(sheFormat1[i].value);
        let con = descSearch(sheFormat2, sheFormat1[i].description)
        // if that description doesn't exists in the other object, push a 0 as its data
        if(con === -1){
          data.shelterData2.push(0);
        }
        // if it does exist
        else data.shelterData2.push(sheFormat2[con].value);
      }
    }
    // otherwise the 2nd format object is larger, so use it as the base
    else{
      for(let i = 0; i < Object.keys(sheFormat2).length; i++){
        labels.shelterLabel.push(sheFormat2[i].description);
        data.shelterData2.push(sheFormat2[i].value);
        let con = descSearch(sheFormat1, sheFormat2[i].description)
        // if that description doesn't exists in the other object, push a 0 as its data
        if(con === -1){
          data.shelterData1.push(0);
        }
        // if it does exist
        else data.shelterData1.push(sheFormat1[con].value);
      }
    }
  }
  // if there was nothing in both formatted objects, set its data to false (to conditional render the barcharts)
  else{
    data.shelterData1 = false
    data.shelterData2 = false
  }
  
  // package construction info only if one of the formatted objects has something in it
  if(conFormat1.data.length !== 0 || conFormat2.data.length !== 0){
    // if the 1st format object is larger, use that as the base
    if(conFormat1.label.length > conFormat2.label.length){
      for(let i = 0; i < conFormat1.label.length; i++){
        labels.constructionLabel.push(conFormat1.label[i]);
        data.constructionData1.push(conFormat1.data[i]);
        let con = conDescSearch(conFormat2.label, conFormat1.label[i])
        // if that description doesn't exists in the other object, push a 0 as its data
        if(con === -1){
          data.constructionData2.push(0);
        }
        // if it does exist
        else data.constructionData2.push(conFormat2.data[con]);
      }
    }
    // otherwise the 2nd format object is larger (or same size), so use it as the base
    else{
      for(let i = 0; i < conFormat2.label.length; i++){
        labels.constructionLabel.push(conFormat2.label[i]);
        data.constructionData2.push(conFormat2.data[i]);
        let con = conDescSearch(conFormat1.label, conFormat2.label[i])
        // if that description doesn't exists in the other object, push a 0 as its data
        if(con === -1){
          data.constructionData1.push(0);
        }
        // if it does exist
        else data.constructionData1.push(conFormat1.data[con]);
      }
    }
  }
  // if there was nothing in both formatted objects, set its data to false (to conditional render the barcharts)
  else{
    data.constructionData1 = false
    data.constructionData2 = false
  }
  
  // final formatting for data to be used by compare bar charts
  let materialData = [{}]
  let shelterData = [{}]
  let constructionData = [{}]
  for(let i = 0; i < 2; i ++){
    if(i === 0){
      materialData[i] = {
        data: data.materialData1,
        svg: {fill: results[i].color, opacity: 0.5},
        title: results[i].resultName
      }
      shelterData[i] = {
        data: data.shelterData1,
        svg: {fill: results[i].color, opacity: 0.5},
        title: results[i].resultName
      }
      constructionData[i] = {
        data: data.constructionData1,
        svg: {fill: results[i].color, opacity: 0.5},
        title: results[i].resultName
      }
    }
    else{
      materialData[i] = {
        data: data.materialData2,
        svg: {fill: results[i].color, opacity: 0.5},
        title: results[i].resultName
      }
      shelterData[i] = {
        data: data.shelterData2,
        svg: {fill: results[i].color, opacity: 0.5},
        title: results[i].resultName
      }
      constructionData[i] = {
        data: data.constructionData2,
        svg: {fill: results[i].color, opacity: 0.5},
        title: results[i].resultName
      }
    }
  }

  return (
    <ViewableArea>
      <HeaderBack {...props} text={"Compare"}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Spatial Boundaries Results</Text>
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
          
          { materialData[0].data ?
            <CompareBarChart
              {...props}
              title={"Material Areas"}
              rotation={'0deg'}
              dataValues={materialData}
              dataLabels={labels.materialLabel}
              barColor={color}
              width={chartWidth}
              height={chartHeight}
            />
          :
            null
          }
          { shelterData[0].data ?
            <CompareBarChart
              {...props}
              title={"Shelter Areas"}
              rotation={'0deg'}
              dataValues={shelterData}
              dataLabels={labels.shelterLabel}
              barColor={color}
              width={chartWidth}
              height={chartHeight}
            />
          :
            null
          }
          
          <CompareBarChart
            {...props}
            title={"Construction Distances"}
            rotation={'0deg'}
            dataValues={constructionData}
            dataLabels={labels.constructionLabel}
            barColor={color}
            width={chartWidth}
            height={chartHeight}
          />

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
}
