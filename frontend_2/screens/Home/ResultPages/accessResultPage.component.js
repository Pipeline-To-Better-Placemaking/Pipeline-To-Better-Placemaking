import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Text, Button, Icon, Divider, MenuItem } from '@ui-kitten/components';
import { HeaderBack, HeaderBackEdit } from '../../components/headers.component';
import { ViewableArea, ContentContainer, ConfirmDelete, LoadingSpinner } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { helperGetResult, deleteTimeSlot, getProject, getAllResults, isUserTeamOwner } from '../../components/apiCalls';
import { formatAccessGraphData, calcArea } from '../../components/helperFunctions';
import { MyPieChartCounts, MyPieChartArea, MyBarChart } from '../../components/charts.component';
import {format as prettyFormat} from 'pretty-format';
import tinycolor from 'tinycolor2';


import { styles } from './resultPage.styles';

//quantitative data screen
export function AccessResultPage(props) {

  console.log("🚀 ~ file: accessResultPage.component.js ~ line 18 ~ AccessResultPage ~ props.selectedResult.graph", prettyFormat(props.selectedResult.graph));

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [editMenuVisible, setEditMenuVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  // random colors for pie charts
  const colors = ["#2A6EA3", "#4C9F8B", "#847457", "#7F62E9", "#F1CEF6"]

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshDetails();
    setRefreshing(false);
  }, []);

  const refreshDetails = async () => {
    if (props.selectedResult !== null && props.selectedResult.sharedData !== undefined) {
      let result = await helperGetResult(
                           props.selectedResult._id,
                           "access_maps/",
                           "access",
                           props.selectedResult.sharedData,
                           props.project
                         );
      result = await formatAccessGraphData(result);
      await props.setSelectedResult(result);
      await refreshProjectPageDetails();
    }
  };

  // refreshes previous page
  const refreshProjectPageDetails = async () => {
    let proj = await getProject(props.project);
    if (proj !== null) {
      let results = await getAllResults(proj);
      await props.setResults(results);
    }
  };

  const deleteResult = async () => {
    setLoading(true);
    let success = false;
    if (props.selectedResult !== null) {
      success = await deleteTimeSlot("access_maps", props.selectedResult._id);
    }
    if (success) {
      await refreshProjectPageDetails();
      setLoading(false);
      props.navigation.goBack();
    }
  }

  if (props.selectedResult === null ||
      !props.selectedResult.success ||
      props.selectedResult.graph === undefined) {
    return (
      <ViewableArea>
        {isUserTeamOwner(props.team, props.userId)
          ?
          <HeaderBackEdit {...props} text={"No results"} editMenuVisible={editMenuVisible} setEditMenuVisible={setEditMenuVisible}>
            <MenuItem title='Delete Result' onPress={() => {setEditMenuVisible(false); setConfirmDeleteVisible(true)}}/>
          </HeaderBackEdit>
          :
          <HeaderBack {...props} text={"No results"}/>
        }
        <ConfirmDelete
          visible={confirmDeleteVisible}
          setVisible={setConfirmDeleteVisible}
          dataType={"result"}
          deleteFunction={deleteResult}
        />

        <ContentContainer>
          
          <LoadingSpinner loading={loading} />

          <ScrollView
            style={styles.margins}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >

            <Text category={'h5'}>No result information for this activity</Text>

          </ScrollView>
        </ContentContainer>
      </ViewableArea>
    );
  }

  let areaTitle = '';
  let viewMap = true;
  let errorMessage = 'Error: \n';

  // error checking for area
  if (props.selectedResult.sharedData.area === undefined ||
      props.selectedResult.sharedData.area === null ||
      props.selectedResult.sharedData.area.length <= 0
    ) {
      areaTitle = 'unknown';
      viewMap = false;
      errorMessage += '- Area information has been deleted\n';
  } else {
    areaTitle = (props.selectedResult.sharedData.area.title === undefined ? 'Project Perimeter' : props.selectedResult.sharedData.area.title)
  }

  errorMessage += '\n\t Unable to Load Map View';

  let startTime = new Date(props.selectedResult.date);
  let day = new Date(props.selectedResult.sharedData.date);

  let researchers = props.selectedResult.researchers.map(user => {
    return "\n\t" + user.firstname + ' ' + user.lastname;
  });

  const viewMapResults = () => {
    props.navigation.navigate("AccessMapResultsView");
  }

  // total project area (in feet squared)
  const totalArea = calcArea(props.selectedResult.sharedData.area.points)

  const calcPercent = (value, total) =>{
    // times 100 to convert the decimal to a percentage
    let ret = ((value / total) * 100)
    const decimalPlaces = (ret.toString().split('.')[1] || '').length;
    let tempString = decimalPlaces > 2 ? ret.toFixed(2) : ret;
    return parseInt(tempString)
  }

  // calculates total sum of the access type (not access description)
  const calcSum = (obj, type) =>{
    let sum = 0;
    let tempString;
    for(let j = 0; j < Object.keys(obj).length; j++){
      if(obj[j].type === type) sum += obj[j].value;
    }
    // enforces decimal rounding to 2nd decimal
    tempString = sum.toFixed(2)
    sum = parseFloat(tempString);
    return sum;
  }

  // searches to see if we already formatted an entry for that description 
  const descSearch = (obj, str) =>{
    // 1st entry into the graph obj
    if(obj[0].value === undefined) return 0;
    // search through the formatted graph object to see if that string is already in it
    for(let i = 0; i < Object.keys(obj).length; i++){
      // if that string already exists, return -1
      if(obj[i].legend === str) return -1;
    }
    return 0;
  }

  // does same as above desc search, but needs a different format for arguments
  const conDescSearch = (arr, str)=>{
    let len = arr.length
    // 1st entry
    if(len === 0) return 0;
    // search through label array to see if that description is already there
    for(let i = 0; i < len; i++){
      // if it is there, return -1
      if(arr[i] === str) return -1;
    }
    return 0;
  }

  // Fucntions generate random colors folowing AAA standars however runs too slow to be called on every load
  // function generateColorPalette(numColors, minLightness) {
  //   const colors = [];
  //   const hueIncrement = 360 / numColors;
  
  //   for (let i = 0; i < numColors; i++) {
  //     const hue = hueIncrement * i;
  //     const saturation = 100;
  //     let lightness = minLightness;
  //     let contrastRatio = 0;
  
  //     // increase the lightness until the contrast ratio is at least 4.5:1
  //     while (contrastRatio < 4.5) {
  //       const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  //       const textColor = "#ffffff"; // white text color
  //       contrastRatio = getContrastRatio(backgroundColor, textColor);
  //       lightness += 1;
  //     }
  
  //     colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  //   }
  
  //   return colors;
  // }
  
  // // get the contrast ratio between two colors
  // function getContrastRatio(backgroundColor, textColor) {
  //   const bg = tinycolor(backgroundColor);
  //   const text = tinycolor(textColor);
  //   const contrast = tinycolor.readability(bg, text);
  //   return contrast;
  // }
  

  const formatCountPie = (obj) => {

    const totalCount = obj.data.reduce((acc, val) => acc + val, 0)
    const palette = ["#73cfff", "#256eff", "#004bad", "#0029aa", "#00cc00", "#2ebd33", "#00b300", "#009900"]

    return obj.labels.map((label, index) => {
      return {
        key: index + 1,
        value: obj.data[index],
        svg: {fill: palette[index]},
        legend: label,
        percent: calcPercent(obj.data[index], totalCount)
      };
    });
  }

  const formatAreaPie = (obj) => {

    const palette = ["#73cfff", "#256eff", "#004bad", "#0029aa", "#00cc00", "#2ebd33", "#00b300", "#009900"]

    const areas = obj.labels.map((label, index) => {
      return {
        key: index + 1,
        value: obj.areas[index],
        svg: {fill: palette[index]},
        legend: label,
        percent: calcPercent(obj.areas[index], totalArea)
      };
    });

    const remainingArea = totalArea - obj.areas.reduce((sum, area) => sum + area, 0);
  
    areas.push({
      key: areas.length + 1,
      value: remainingArea,
      svg: { fill: '#cccccc' },
      legend: 'Project Area',
      percent: calcPercent(remainingArea, totalArea)
    });

    return areas
    
  }
  
  const formatForTotalPie = (obj) =>{

    console.table("🚀 ~ file: accessResultPage.component.js:192 ~ formatForTotalPie ~ obj", obj);

    let ret = [{}];
    let sum;
    let currentType = "Area";
    let svg = {fill: "#00FFC1"};
    let tempString;

    for(let i = 0; i < 3; i ++){
      // for open horizontal space, value and percent set to 0 for now
      if(i === 0){
        ret[i] = {
          key: i + 1,
          value: 0,
          svg: {fill: "#C4C4C4"},
          legend: "Free Space",
          percent: 0
        }
        continue
      }
      
      sum = calcSum(obj, currentType);

      ret[i] = {
        key: i + 1,
        value: sum,
        svg: svg,
        legend: currentType,
        percent: calcPercent(sum, totalArea)
      }
      // change the variables for the next type of access
      currentType = "Area";
      svg = {fill: "#FFA64D"};
    }
    // now compute the free space value since we have the sums of the other 2 Access Area
    let areaLeft = totalArea - (ret[1].value + ret[2].value);
    // ensures the decimal is rounded to the 2nd place
    tempString = areaLeft.toFixed(2)
    areaLeft = parseFloat(tempString);
    let areaPercent = calcPercent(areaLeft, totalArea)
    ret[0].value = areaLeft;
    ret[0].percent = areaPercent;

    return ret;
  }

  const formatForIndividual = (obj, type) =>{
    // console.log(obj)
    let ret = [{}];
    let index = 0;
    for(let i = 0; i < Object.keys(obj).length; i++){
      // if the access is the type we're formatting
      if(obj[i].type === type){
        let desc = obj[i].description
        // only add the next object if that description is not already in the format object
        if(descSearch(ret, desc) !== -1){
          let sum  = obj[i].value;
          // look for all instances of that access description to sum its values together
          for(let j = i + 1; j < Object.keys(obj).length; j ++){
            if(desc === obj[j].description) sum += obj[j].value
          }
          
          // enforces decimal rounding to 2nd decimal
          let tempString = sum.toFixed(2)
          sum = parseFloat(tempString);

          let total = 0;
          if(type === "Path") total = calcSum(obj, "Path");
          else total = calcSum(obj, "Area");

          ret[index] ={
            key: i + 1,
            value: sum,
            svg: { fill: colors[index] },
            legend: obj[i].description,
            percent: calcPercent(sum, total)
          }
          // increase index after adding the access
          index++;
        }
      }
    }
    return ret;
  }

  const formatForPoint = (obj) =>{
    // console.log(obj);
    let ret = {};
    let values = [];
    let labels = [];
    for(let i = 0; i < Object.keys(obj).length; i++){
      if(obj[i].type === "Point"){
        let desc = obj[i].description        
        // only add the next object if that description is not already in the format object
        if(conDescSearch(labels, desc) !== -1){
          let sum  = obj[i].value;
          // look for all instances of that access description to sum its values together
          for(let j = i + 1; j < Object.keys(obj).length; j++){
            if(desc === obj[j].description) sum += obj[j].value
          }
          
          // enforces decimal rounding to 2nd decimal
          let tempString = sum.toFixed(2)
          sum = parseFloat(tempString);
          
          values.push(sum);
          labels.push(desc)
        }
      }
    }
    ret = {
      data: values,
      label: labels
    }
    return ret;
  }

  const chartWidth = Dimensions.get('window').width*0.95;
  const chartHeight = 210;

  const color = '#006FD6';
  
  //const conGraph = formatForPoint(props.selectedResult.graph);

  return (
    <ViewableArea>
      {isUserTeamOwner(props.team, props.userId)
        ?
        <HeaderBackEdit {...props}
          text={props.project.title + ": " + props.selectedResult.sharedData.title}
          editMenuVisible={editMenuVisible}
          setEditMenuVisible={setEditMenuVisible}
        >
          <MenuItem title='Delete Result' onPress={() => {setEditMenuVisible(false); setConfirmDeleteVisible(true)}}/>
        </HeaderBackEdit>
        :
        <HeaderBack {...props} text={props.project.title + ": " + props.selectedResult.sharedData.title}/>
      }
      <ConfirmDelete
        visible={confirmDeleteVisible}
        setVisible={setConfirmDeleteVisible}
        dataType={"result"}
        deleteFunction={deleteResult}
      />
      <ContentContainer>

        <LoadingSpinner loading={loading} />

        <ScrollView
          style={styles.margins}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >

          <Text category={'h5'}>Identifying Access Results</Text>
          <Divider style={styles.metaDataTitleSep} />

          <Text>Team: {props.team.title}</Text>
          <Text>Admin: {props.team.users[0].firstname} {props.team.users[0].lastname}</Text>

          <Divider style={styles.metaDataSep} />

          <Text>Location: {props.project.description}</Text>
          <Text>Area: {areaTitle}</Text>

          <Divider style={styles.metaDataSep} />

          <Text>Day: {getDayStr(day)}</Text>
          <Text>Start Time: {getTimeStr(startTime)} </Text>
          <Text>Duration: {props.selectedResult.sharedData.duration} min</Text>

          <Divider style={styles.metaDataSep} />

          <Text>Researcher(s): {researchers} </Text>

          <Divider style={styles.metaDataEndSep} />

          {viewMap
            ?
              <View style={styles.mapButton}>
                <Button
                  style={styles.button}
                  status={'info'}
                  appearance={'outline'}
                  accessoryRight={MapIcon}
                  onPress={viewMapResults}
                >
                  View Map
                </Button>
              </View>
            :
              <View style={styles.errorMsgView}>
                <Text status='danger' category='s1' style={styles.errorMsgText}>
                  {errorMessage}
                </Text>
              </View>
          }

          <View style={styles.spacing}>
            <MyBarChart
              {...props}
              title={"Access Point Counts"}
              rotation={'0deg'}
              dataValues={props.selectedResult.graph.pointGraph.data}
              dataLabels={props.selectedResult.graph.pointGraph.labels}
              barColor={color}
              width={chartWidth}
              height={chartHeight}
            />
          </View>

          <View style={styles.spacing}>
            <MyBarChart
              {...props}
              title={"Access Path Counts"}
              rotation={'0deg'}
              dataValues={props.selectedResult.graph.pathGraph.data}
              dataLabels={props.selectedResult.graph.pathGraph.labels}
              barColor={color}
              width={chartWidth}
              height={chartHeight}
            />
          </View>

          <View style={styles.spacing}>
            <MyBarChart
              {...props}
              title={"Access Area Counts"}
              rotation={'0deg'}
              dataValues={props.selectedResult.graph.areaGraph.data}
              dataLabels={props.selectedResult.graph.areaGraph.labels}
              barColor={color}
              width={chartWidth}
              height={chartHeight}
            />
          </View>
          
          <View style={styles.spacing}>
            <MyPieChartCounts
              title={'Percentage Point Count'}
              graph={formatCountPie(props.selectedResult.graph.pointGraph)}
              cond={false}
              height={200}
            />
          </View>

          <View style={styles.spacing}>
            <MyPieChartCounts
              title={'Percentage Path Count'}
              graph={formatCountPie(props.selectedResult.graph.pathGraph)}
              cond={false}
              height={200}
            />
          </View>

          <View style={styles.spacing}>
            <MyPieChartCounts
              title={'Percentage Access Area'}
              graph={formatCountPie(props.selectedResult.graph.areaGraph)}
              cond={false}
              height={200}
            />
          </View>

          <View style={styles.spacing}>
            <MyPieChartArea
              title={'Percentage Total Path'}
              graph={formatAreaPie(props.selectedResult.graph.pathGraph)}
              cond={false}
              height={200}
            />
          </View>

          <View style={styles.spacing}>
            <MyPieChartArea
              title={'Percentage Total Area'}
              graph={formatAreaPie(props.selectedResult.graph.areaGraph)}
              cond={false}
              height={200}
            />
          </View>

          {/*
          <View style={styles.spacing}>
            <MyPieChart
              title={'Path Areas'}
              graph={formatForIndividual(props.selectedResult.graph, "Path")}
              cond={false}
              height={200}
            />
          </View>

          <View style={styles.spacing}>
            <MyPieChart
              title={'Area Areas'}
              graph={formatForIndividual(props.selectedResult.graph, "Area")}
              cond={false}
              height={200}
            />
          </View> 

          <View style={styles.spacing}>
            <MyBarChart
              {...props}
              title={"Point Distances\n(linear feet)"}
              rotation={'0deg'}
              dataValues={conGraph.data}
              dataLabels={conGraph.label}
              barColor={color}
              width={chartWidth}
              height={chartHeight}
            />
          </View>
          */}
        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
};

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