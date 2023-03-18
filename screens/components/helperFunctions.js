import {format as prettyFormat} from 'pretty-format';

export async function formatStationaryGraphData(result) {
  if (result === null ||
      result.data === undefined ||
      result.data === null ||
      result.data.length <= 0 ||
      result.graph !== undefined
    ) {
    return result;
  }
  let tempResult = {...result};
  let graph = {
    ageData: [],
    ageLabels: [],
    genderData: [],
    genderLabels: [],
    postureData: [],
    postureLabels: [],
    activityData: [],
    activityLabels: [],
  };
  let index = -1;
  let label = '';
  for (let i = 0; i < result.data.length; i++) {
    let dataPoint = result.data[i];
    label = dataPoint.age;
    if (label !== undefined) {
      if (graph.ageLabels !== null && graph.ageLabels.length > 0) {
        index = graph.ageLabels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (index < 0) {
          index = graph.ageLabels.length;
          graph.ageLabels = [...graph.ageLabels, label];
          graph.ageData = [...graph.ageData, Number(0)];
        }
      } else { // first entry
        index = 0;
        graph.ageLabels = [label];
        graph.ageData = [Number(0)];
      }
      // increase count
      graph.ageData[index] = graph.ageData[index] + 1;
    }
    label = dataPoint.gender;
    if (label !== undefined) {
      if (graph.genderLabels !== null && graph.genderLabels.length > 0) {
        index = graph.genderLabels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (index < 0) {
          index = graph.genderLabels.length;
          graph.genderLabels = [...graph.genderLabels, label];
          graph.genderData = [...graph.genderData, Number(0)];
        }
      } else { // first entry
        index = 0;
        graph.genderLabels = [label];
        graph.genderData = [Number(0)];
      }
      // increase count
      graph.genderData[index] = graph.genderData[index] + 1;
    }
    label = dataPoint.posture;
    if (label !== undefined) {
      if (graph.postureLabels !== null && graph.postureLabels.length > 0) {
        index = graph.postureLabels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (index < 0) {
          index = graph.postureLabels.length;
          graph.postureLabels = [...graph.postureLabels, label];
          graph.postureData = [...graph.postureData, Number(0)];
        }
      } else { // first entry
        index = 0;
        graph.postureLabels = [label];
        graph.postureData = [Number(0)];
      }
      // increase count
      graph.postureData[index] = graph.postureData[index] + 1;
    }
    label = dataPoint.activity;
    if (label !== undefined) {
      if (graph.activityLabels !== null && graph.activityLabels.length > 0) {
        index = graph.activityLabels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (index < 0) {
          index = graph.activityLabels.length;
          graph.activityLabels = [...graph.activityLabels, label];
          graph.activityData = [...graph.activityData, Number(0)];
        }
      } else { // first entry
        index = 0;
        graph.activityLabels = [label];
        graph.activityData = [Number(0)];
      }
      // increase count
      graph.activityData[index] = graph.activityData[index] + 1;
    }
  }
  //console.log("resulting graph data: ", graph);
  tempResult.graph = {...graph};
  return tempResult;
}

export async function formatMovingGraphData(result) {
  if (result === null ||
      result.data === undefined ||
      result.data === null ||
      result.data.length <= 0 ||
      result.graph !== undefined
    ) {
    return result;
  }
  let tempResult = {...result};
  let graph = {
    data: [],
    labels: [],
  };
  let index = -1;
  let label = '';
  for (let i = 0; i < result.data.length; i++) {
    let dataPoint = result.data[i];
    label = dataPoint.mode;
    if (label !== undefined) {
      if (graph.labels !== null && graph.labels.length > 0) {
        index = graph.labels.findIndex(element => element === label);
        // add category if it's not currently in the list
        if (index < 0) {
          index = graph.labels.length;
          graph.labels = [...graph.labels, label];
          graph.data = [...graph.data, Number(0)];
        }
      } else { // first entry
        index = 0;
        graph.labels = [label];
        graph.data = [Number(0)];
      }
      // increase count
      graph.data[index] = graph.data[index] + 1;
    }
  }
  //console.log("resulting graph data: ", graph);
  tempResult.graph = {...graph};
  return tempResult;
}

export async function formatSoundGraphData(result){
  if (result === null ||
      result.data === undefined ||
      result.data === null ||
      result.data.length <= 0 ||
      result.graph !== undefined
    ) {
    return result;
  }
  
  let tempResult = {...result};
  let graph = [];
  let decString = "Reading";
  
  for(let i = 0; i < result.data.length; i++){
    let data = result.data[i];
    // push a graph object for the every standing point (# standing point === result.data.length always)
    graph.push({data: [], labels:[[]], predominant: [[]], average: 0});

    // set the predominant sound for each graph object
    graph[i].predominant[0] = data.decibel_1.predominant_type;
    graph[i].predominant[1] = data.decibel_2.predominant_type;
    graph[i].predominant[2] = data.decibel_3.predominant_type;
    graph[i].predominant[3] = data.decibel_4.predominant_type;
    graph[i].predominant[4] = data.decibel_5.predominant_type;
    
    // create labels for the 5 decibel recordings for each graph object
    for(let j = 0; j < 5; j++){
      let numString = (j + 1).toString();
      let temp = decString.concat(" ", numString);
      graph[i].labels[j] = temp + "\n" + graph[i].predominant[j];
    }

    
    // set the data for each graph object
    graph[i].data[0] = data.decibel_1.recording;
    graph[i].data[1] = data.decibel_2.recording;
    graph[i].data[2] = data.decibel_3.recording;
    graph[i].data[3] = data.decibel_4.recording;
    graph[i].data[4] = data.decibel_5.recording;

    // set the graph object's average
    graph[i].average = data.average;
  }

  // console.log("resulting graph data: ", graph);
  tempResult.graph = {...graph};
  return tempResult;
}

export async function formatBoundaryGraphData(result){
  if (result === null ||
      result.data === undefined ||
      result.data === null ||
      result.data.length <= 0 ||
      result.graph !== undefined
    ) {
    return result;
  }
  
  let tempResult = {...result};
  let graph = [];
  
  for(let i = 0; i < result.data.length; i++){
    let data = result.data[i];
    // push a graph object for the every data object and pull out the relevant information the chart needs
    graph.push({key: 0, value: 0, description: [[]], type: [[]]});
    graph[i].key = i + 1;
    graph[i].value = data.value;
    graph[i].description = data.description;
    graph[i].type = data.kind;    
  }

  //console.log("resulting graph data: ", graph);
  tempResult.graph = {...graph};
  return tempResult;
}

// searches to see if that description exists in the array (helper for formatNatureGraphData)
const conDescSearch = (arr, str)=>{
  if(arr == undefined) return -1;
  // search through formatted array to see if that description is in it
  for(let i = 0; i < arr.length; i++){
    // if it is there, return its index
    if(arr[i] === str) return i;
  }
  // otherwise return -1
  return -1;
}

// searches to see if that description exists in the array (helper for formatNatureGraphData)
const objDescSearch = (objArr, str)=>{
  for(let i = 0; i < objArr.length; i++){
    if(objArr[i].legend === str) return i
  }
  return -1;
}

const calcPercent = (value, total) =>{
  // times 100 to convert the decimal to a percentage
  let ret = (value / total) * 100
  let tempString = ret.toFixed(0)
  return parseInt(tempString)
}

export async function formatNatureGraphData(result){
  
  // random colors for pie chart
  const colors = ["#2A6EA3", "#4C9F8B", "#7F62E9", "#847457"]

  // total project area (in feet squared)
  const totalArea = calcArea(result.sharedData.area.points)

  if (result === null ||
      result.data === undefined ||
      result.data === null ||
      result.data.length <= 0 ||
      result.graph !== undefined
    ) {
    return result;
  }
  // each object in data are submitted results for that test
  let tempResult = {...result};
  let graph = {
    animalData: [],
    animalLabels: [],
    vegetation: [],
    water: [],
    weather: {}
  };
  // used so there are no duplicate keys
  let totalIndex = 0;
  // used for setting colors across the data object (if more than 1 data object is submitted for the test)
  let vegeColorIndex = 0;
  let waterColorIndex = 0;

  for(let i = 0; i < result.data.length; i++){
    let data = result.data[i]
    let index = -1;
    // format the animal object array (of each data object)
    for(let j = 0; j < data.animal.length; j++){
      let type = data.animal[j].kind
      if(type === "Domesticated") type = "Domestic"
      let string = type.concat("\n", data.animal[j].description)
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

    let vegetationData = []
    let vegetationLabels = []
    // format the vegetation array (of each data object)
    for(let j = 0; j < data.vegetation.length; j++){
      index = conDescSearch(vegetationLabels, data.vegetation[j].description)
      // that description is already formatted, so increase its count
      if(index !== -1){
        let num = vegetationData[index] + data.vegetation[j].area;
        let string = num.toFixed(2)
        vegetationData[index] = parseFloat(string)
      }
      // otherwise add that description into labels and it's area into data
      else{
        vegetationLabels.push(data.vegetation[j].description)
        vegetationData.push(data.vegetation[j].area)
      }
    }

    // now with the arrays of vegetation area sums, format the data in the vegetation graph object
    for(let j = 0; j < vegetationData.length; j++){
      // check to see if this label is already formatted (from a previous data index)
      index = objDescSearch(graph.vegetation, vegetationLabels[j])
      // that entry already exists, so update it with the new data
      if(index !== -1){
        let num = graph.vegetation[index].value + vegetationData[j]
        let string = num.toFixed(2)
        graph.vegetation[index].value = parseFloat(string)
        graph.vegetation[index].percent = calcPercent(graph.vegetation[index].value, totalArea)
      }
      // that entry did not exist so add it to the end
      else{
        graph.vegetation.push({
            key: totalIndex,
            value: vegetationData[j],
            svg: { fill: colors[vegeColorIndex] },
            legend: vegetationLabels[j],
            percent: calcPercent(vegetationData[j], totalArea)
        })
        totalIndex++;
        vegeColorIndex++;
      }
    }
    
    let waterData = []
    let waterLabels = []
    // format the water array (of each data object)
    for(let j = 0; j < data.water.length; j++){
      index = conDescSearch(waterLabels, data.water[j].description)
      // that description is already formatted, so increase its count
      if(index !== -1){
        let num = waterData[index] + data.water[j].area;
        let string = num.toFixed(2)
        waterData[index] = parseFloat(string)
      }
      // otherwise add that description into the labels and increase its count
      else{
        waterLabels.push(data.water[j].description)
        waterData.push(data.water[j].area)
      }
    }
    // now with the arrays of water area sums, format the data in the water graph object
    for(let j = 0; j < waterData.length; j++){
      // check to see if this label is already formatted (from s previous data index)
      index = objDescSearch(graph.water, waterLabels[j])
      // that entry already exists, so update it with the new data
      if(index !== -1){
        let num = graph.water[index].value + waterData[j]
        let string = num.toFixed(2)
        graph.water[index].value = parseFloat(string)
        graph.water[index].percent = calcPercent(graph.water[index].value, totalArea)
      }
      else{
        graph.water.push({
          key: totalIndex,
          value: waterData[j],
          svg: { fill: colors[waterColorIndex] },
          legend: waterLabels[j],
          percent: calcPercent(waterData[j], totalArea)
        })
        totalIndex++;
        waterColorIndex++;
      }
    }
  }
  // set the weather info as the 1st data's weather
  graph.weather = result.data[0].weather;

  // console.log("resulting graph data: ", graph);
  tempResult.graph = {...graph};
  return tempResult;
}

export async function formatLightGraphData(result){
  if (result === null ||
      result.data === undefined ||
      result.data === null ||
      result.data.length <= 0 ||
      result.graph !== undefined
    ) {
    return result;
  }

  // each object in data are submitted results for that test
  let tempResult = {...result};
  let graph = {
    data: [],
    labels: []
  };
  let index;
  // loop through the entire data array to format each points array for the barchart
  for(let i = 0; i < result.data.length; i++){
    let data = result.data[i].points;
    // loop through the entire points array and format its data into the graph object
    for(let j = 0; j < data.length; j++){
      index = conDescSearch(graph.labels, data[j].light_description)
      // if that description already exists in graph's labels
      if(index !== -1){
        // increase the count of that index
        graph.data[index] += 1;
      }
      // otherwise, that description does not exist in graph's labels
      else{
        // so push the description to the end of graph's labels and a 1 onto the end of data labels
        graph.labels.push(data[j].light_description);
        graph.data.push(1);
      }
      
    }
  }
  // console.log("resulting graph data: ", graph);
  tempResult.graph = {...graph};
  return tempResult;
}

export async function formatOrderGraphData(result){
  if (result === null ||
      result.data === undefined ||
      result.data === null ||
      result.data.length <= 0 ||
      result.graph !== undefined
    ) {
    return result;
  }

  // each object in data are submitted results for that test
  let tempResult = {...result};
  let graph = {
    data: [],
    labels: []
  };
  let index;
  // loop through the entire data array to format each points array for the barchart
  for(let i = 0; i < result.data.length; i++){
    let data = result.data[i].points;
    // loop through the entire points array and format its data into the graph object
    for(let j = 0; j < data.length; j++){
      index = conDescSearch(graph.labels, data[j].kind)
      // if that description already exists in graph's labels
      if(index !== -1){
        // increase the count of that index
        graph.data[index] += 1;
      }
      // otherwise, that description does not exist in graph's labels
      else{
        // so push the description to the end of graph's labels and a 1 onto the end of data labels
        graph.labels.push(data[j].kind);
        graph.data.push(1);
      }
      
    }
  }
  // console.log("resulting graph data: ", graph);
  tempResult.graph = {...graph};
  return tempResult;
}

export async function formatAccessGraphData(result){
  if (result === null ||
      result.data === undefined ||
      result.data === null ||
      result.data.length <= 0 ||
      result.graph !== undefined
    ) {
    return result;
  }

  //console.log("🚀 ~ file: helperFunctions.js:487 ~ formatAccessGraphData ~ result", prettyFormat(result));

  
  let index;
  let tempResult = {...result};
  let graph = {
      key: 0, 
      pointGraph: {
        labels: [],
        data: [],
      },
      pathGraph: {
        labels: [],
        data: [],
        areas: [],
        lengthBar: [],
      },
      areaGraph: {
        labels: [],
        data: [],
        areas: [],
      }
    };
  
  for(let i = 0; i < result.data.length; i++){
    let data = result.data[i];

    // Count point access occurrances
    if(data.accessType == "Access Point") {
      index = conDescSearch(graph.pointGraph.labels, result.data[i].description)

      // if that description already exists in graph's labels
      if(index !== -1){
        // increase the count of that index
        graph.pointGraph.data[index] += 1;
      }
      // otherwise, that description does not exist in graph's labels
      else{
        // so push the description to the end of graph's labels and a 1 onto the end of data labels
        graph.pointGraph.labels.push(result.data[i].description);

        graph.pointGraph.data.push(1);
      }
    }    
    // Count path access occurrances
    else if(data.accessType == "Access Path") {
      index = conDescSearch(graph.pathGraph.labels, result.data[i].description)

      // if that description already exists in graph's labels
      if(index !== -1){
        // increase the count of that index
        graph.pathGraph.data[index] += 1;
        graph.pathGraph.areas[index] += result.data[i].area;
        result.data[i].inPerimeter ? graph.pathGraph.lengthBar[index] += result.data[i].area : null;
      }
      // otherwise, that description does not exist in graph's labels
      else{
        // so push the description to the end of graph's labels and a 1 onto the end of data labels
        graph.pathGraph.labels.push(result.data[i].description);
        graph.pathGraph.areas.push(result.data[i].area);
        result.data[i].inPerimeter ? graph.pathGraph.lengthBar.push(parseFloat(result.data[i].area.toFixed(1))) : graph.pathGraph.lengthBar.push(0);        
        graph.pathGraph.data.push(1);
      }
    }   
    // Count area access occurrances
    else if(data.accessType == "Access Area") {
      index = conDescSearch(graph.areaGraph.labels, result.data[i].description)

      // if that description already exists in graph's labels
      if(index !== -1){
        // increase the count of that index
        graph.areaGraph.data[index] += 1;
        graph.pathGraph.areas[index] += parseFloat(result.data[i].area.toFixed(1));
      }
      // otherwise, that description does not exist in graph's labels
      else{
        // so push the description to the end of graph's labels and a 1 onto the end of data labels
        graph.areaGraph.labels.push(result.data[i].description);
        graph.areaGraph.areas.push(parseFloat(result.data[i].area.toFixed(1)));
        graph.areaGraph.data.push(1);
      }
    }    
  }

  //console.log("🚀 ~ file: helperFunctions.js:526 ~ formatAccessGraphData ~ graph", prettyFormat(graph));

  tempResult.graph = {...graph};
  return tempResult;
}

export function retrieveTestName(str){
  let lowerStr = str.toLowerCase();
  
  //console.log(lowerStr);

  let testType;
  if(lowerStr.localeCompare('stationary') === 0 || lowerStr.localeCompare('stationary map') === 0){
    //console.log('stationary activity');
    testType = 'People in Place';
  }
  else if(lowerStr.localeCompare('moving') === 0 || lowerStr.localeCompare('people moving') === 0){
    //console.log('moving activity');
    testType = 'People in Motion';
  }
  else if(lowerStr.localeCompare('survey') === 0 ){
    //console.log('survey activity');
    testType = 'Community Survey';
  }
  // security activties
  else if(lowerStr.localeCompare('sound') === 0){
    //console.log('sound test');
    testType = 'Acoustical Profile';
   }
  else if(lowerStr.localeCompare('boundary') === 0){
    //console.log('boundary test');
    testType = 'Spatial Boundaries';
  }
  else if(lowerStr.localeCompare('nature') === 0){
    //console.log('nature test');
    testType = 'Nature Prevalence';
   }
  else if(lowerStr.localeCompare('light') === 0){
    //console.log('light test');
    testType = 'Lighting Profile';
  }
  else if(lowerStr.localeCompare('order') === 0){
    //console.log('absence of order test');
    testType = 'Absence of Order Locator';
   }
  else if(lowerStr.localeCompare('access') === 0){
    //console.log('Identifying Access');
    testType = 'Identifying Access';
  }
  // it should never enter this else
  else{
    console.log('error getting test type');
    testType = 'N/A';
  }
  return testType;
}

// converts a string to have only the 1st character capitalized (used to format the 'Other' input fields data for consistency)
export function stringCase(str){
  // 1st convert the whole string to lowercase
  let tempString = str.toLowerCase();
  // isolate the 1st character, then capitalize it
  let capChar = str.charAt(0);
  capChar = capChar.toUpperCase();
  // return the capitalized 1st character concated with the rest of the string (that doesn't include 1st character)
  return capChar + tempString.slice(1);
}

// calculates the area of a drawn polygon (value returned is in feet squared)
export function calcArea(markers){
  //hard coded radius is the approximate (its rounded down) radius of the earth in meters
  let radius = 6371000;
  
  const diameter = radius * 2;
  const circumference = diameter * Math.PI;
  const listY = [];
  const listX = [];
  const listArea = [];

  // calculate segment x and y in degrees for each point
  const latitudeRef = markers[0].latitude;
  const longitudeRef = markers[0].longitude;
  for (let i = 1; i < markers.length; i++) {
    let latitude = markers[i].latitude;
    let longitude = markers[i].longitude;
    listY.push(calculateYSegment(latitudeRef, latitude, circumference));
  
    listX.push(calculateXSegment(longitudeRef, longitude, latitude, circumference));
  }
  
  // calculate areas for each triangle segment
  for (let i = 1; i < listX.length; i++) {
    let x1 = listX[i - 1];
    let y1 = listY[i - 1];
    let x2 = listX[i];
    let y2 = listY[i];
    listArea.push(calculateAreaInSquareMeters(x1, x2, y1, y2));
  
  }
  
  // sum areas of all triangle segments
  let areaSum = 0;
  listArea.forEach(tarea => areaSum = areaSum + tarea)

  // get abolute value of area (which is in meters squared); area can't be negative
  let metersSqr = Math.abs(areaSum);
  // convert it to feet squared
  let feetSqr = metersSqr * 10.76391042;
  // fix the percision to the 2nd decimal place
  let tempString = feetSqr.toFixed(2);
  // return the parsed float of the fixed number
  return parseFloat(tempString);
}

export function calcPolygonArea(markers){
  // Use the earth's radius in feet
  const earthRadiusFeet = 20902231.76;
  let area = 0;
  for(let i = 0; i < markers.length; i++) {
    let j = (i + 1) % markers.length;
    area += markers[i].longitude * markers[j].latitude - markers[j].longitude * markers[i].latitude;
  }
  area = parseFloat((Math.abs(area) / 2.0).toFixed(1))
  return (area * earthRadiusFeet * earthRadiusFeet)
}
  
// helpers for calcArea
function calculateAreaInSquareMeters(x1, x2, y1, y2) {return (y1 * x2 - x1 * y2) / 2}
function calculateYSegment(latitudeRef, latitude, circumference) {return (latitude - latitudeRef) * circumference / 360.0}
function calculateXSegment(longitudeRef, longitude, latitude, circumference) {return (longitude - longitudeRef) * circumference * Math.cos((latitude * (Math.PI / 180))) / 360.0}

// calulates the distance of a drawn line (value returned is in feet)
export function haverSine(coords1, coords2) {
  const R = 6371000; // approx. of radius of the earth in metres
  const phi1 = coords1.latitude * Math.PI/180; // φ, λ in radians
  const phi2 = coords2.latitude * Math.PI/180;
  const deltaPhi = (coords2.latitude-coords1.latitude) * Math.PI/180;
  const deltaLambda = (coords2.longitude-coords1.longitude) * Math.PI/180;
  
  const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
  const C = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  let meters = R * C;
  // convert it to feet
  let feet = meters * 3.28084;
  // fix the percision to 1 decimal place
  let tempString = feet.toFixed(1);
  // return the parsed float of the fixed number
  return parseFloat(tempString);
}