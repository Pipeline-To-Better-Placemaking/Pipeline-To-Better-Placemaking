
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
  // search through formatted array to see if that description is in it
  for(let i = 0; i < arr.length; i++){
    // if it is there, return its index
    if(arr[i] === str) return i;
  }
  // otherwise return -1
  return -1;
}

// nothing in it, will need to set this up when I know what the data looks like
export async function formatNatureGraphData(result){
  if (result === null ||
      result.data === undefined ||
      result.data === null ||
      result.data.length <= 0 ||
      result.graph !== undefined
    ) {
    return result;
  }
  // each object in data are submitted results for that test
  console.log(result);
  let tempResult = {...result};
  let graph = {
    animalData: [],
    animalLabels: [],
    vegetationData: [],
    vegetationLabels: [],
    waterData: [],
    waterLabels: [],
    weather: {}
  };
  for(let i = 0; i < result.data.length; i++){
    let data = result.data[i]
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
      let index = conDescSearch(graph.waterLabels, data.water[j].description)
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
  // set the weather info as the 1st data's weather
  graph.weather = result.data[0].weather;

  // console.log("resulting graph data: ", graph);
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
  // it should never enter this else
  else{
    console.log('error getting test type');
    testType = 'N/A';
  }
  return testType;
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
  // fix the percision to the 2nd decimal place
  let tempString = feet.toFixed(2);
  // return the parsed float of the fixed number
  return parseFloat(tempString);
}