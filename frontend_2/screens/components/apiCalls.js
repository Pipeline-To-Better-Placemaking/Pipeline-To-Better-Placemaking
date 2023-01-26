import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_SERVER } from '@env';
import moment from 'moment';

export async function getProject(project) {
  let token = await AsyncStorage.getItem("@token");
  let success = false
  let projectDetails = null
  // Get the project information
  try {
      const response = await fetch(LOCAL_SERVER+'/projects/' + project._id, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
          }
      })
      projectDetails = await response.json();
      success = true
    } catch (error) {
      console.log("error getting project", error)
  }
  if(projectDetails.success !== undefined){
    success = projectDetails.success
    console.log("success: ", success);
  }
  // if successfully retrieved project info, Update
  if(success) {
    // get Team Name
    let team = await getTeam({_id: projectDetails.team});
    if (team === null) {
      projectDetails.teamName = 'unknown';
    } else {
      projectDetails.team = team;
      projectDetails.teamName = team.title;
    }

    return projectDetails;
  } else {
    return null;
  }
}

// merge sorts props.activities to have earliest date tests come 1st
const mergeSortEarlyDate = (arr) =>{
  const half = arr.length / 2
  // base case
  if(arr.length < 2){
    return arr
  }
  const left = arr.splice(0, half)
  const res = mergeEarly(mergeSortEarlyDate(left), mergeSortEarlyDate(arr)) 
  // gets rid of the last element from props.activities (otherwise, it'll render a duplicate test at the end)
  arr.shift();
  return res
}

// helper funct of mergeSort, is where the objects are compared
const mergeEarly = (left, right)=>{
  let arr = [];
  // while they are both NOT empty
  while(left.length && right.length){
    // we want the array to be sorted by earliest date 1st
    if(left[0].date < right[0].date) arr.push(left.shift())
    else arr.push(right.shift())
  }
  // concat the leftover elements
  return [...arr, ...left, ...right]
}

export async function getFilteredProjectDetails(project) {
  let token = await AsyncStorage.getItem("@token");
  let projectDetails = await getProject(project);
  if(projectDetails !== null) {
    let today = new Date();

    let pastStationaryCollections = [];
    if(projectDetails.stationaryCollections !== null) {
      for(let i = 0; i < projectDetails.stationaryCollections.length; i++) {
        let collection = projectDetails.stationaryCollections[i];
        collection.test_type = 'stationary';
        // handle date
        collection.date = new Date(collection.date);
        if (moment(today).isAfter(collection.date, 'day')) {
          pastStationaryCollections.push(collection);
        }
        projectDetails.stationaryCollections[i] = collection;
      }
    }
    // remove collections from the list that are in the past
    for(let i = 0; i < pastStationaryCollections.length; i++) {
      let removeIndex = projectDetails.stationaryCollections.findIndex(element => element._id === pastStationaryCollections[i]._id);
      projectDetails.stationaryCollections.splice(removeIndex, 1);
    }

    let pastMovingCollections = [];
    if(projectDetails.movingCollections !== null) {
      for(let i = 0; i < projectDetails.movingCollections.length; i++) {
        let collection = projectDetails.movingCollections[i];
        collection.test_type = 'moving';
        // handle date
        collection.date = new Date(collection.date);
        if (moment(today).isAfter(collection.date, 'day')) {
          pastMovingCollections.push(collection);
        }
        projectDetails.movingCollections[i] = collection;
      }
    }
    // remove collections from the list that are in the past
    for(let i = 0; i < pastMovingCollections.length; i++) {
      let removeIndex = projectDetails.movingCollections.findIndex(element => element._id === pastMovingCollections[i]._id);
      projectDetails.movingCollections.splice(removeIndex, 1);
    }

    let pastSurveyCollections = [];
    if(projectDetails.surveyCollections !== null) {
      for(let i = 0; i < projectDetails.surveyCollections.length; i++) {
        let collection = projectDetails.surveyCollections[i];
        collection.test_type = 'survey';
        // handle date
        collection.date = new Date(collection.date);
        if (moment(today).isAfter(collection.date, 'day')) {
          pastSurveyCollections.push(collection);
        }
        projectDetails.surveyCollections[i] = collection;
      }
    }
    // remove collections from the list that are in the past
    for(let i = 0; i < pastSurveyCollections.length; i++) {
      let removeIndex = projectDetails.surveyCollections.findIndex(element => element._id === pastSurveyCollections[i]._id);
      projectDetails.surveyCollections.splice(removeIndex, 1);
    }
    // sound test
    let pastSoundCollections = [];
    if(projectDetails.soundCollections != null) {
      for(let i = 0; i < projectDetails.soundCollections.length; i++) {
        let collection = projectDetails.soundCollections[i];
        collection.test_type = 'sound';
        // handle date
        collection.date = new Date(collection.date);
        if (moment(today).isAfter(collection.date, 'day')) {
          pastSoundCollections.push(collection);
        }
        projectDetails.soundCollections[i] = collection;
        }
      } 
      // remove collections from the list that are in the past
      for(let i = 0; i < pastSoundCollections.length; i++) {
        let removeIndex = projectDetails.soundCollections.findIndex(element => element._id === pastSoundCollections[i]._id);
        projectDetails.soundCollections.splice(removeIndex, 1);
      }
    // boundary test
    let pastBoundariesCollections = [];
    if(projectDetails.boundariesCollections != null) {      
      for(let i = 0; i < projectDetails.boundariesCollections.length; i++) {
        let collection = projectDetails.boundariesCollections[i];
        collection.test_type = 'boundary';        
        // handle date
        collection.date = new Date(collection.date);
        if (moment(today).isAfter(collection.date, 'day')) {
          pastBoundariesCollections.push(collection);
        }
        projectDetails.boundariesCollections[i] = collection;
      }
    }
    // remove collections from the list that are in the past
    for(let i = 0; i < pastBoundariesCollections.length; i++) {
      let removeIndex = projectDetails.boundariesCollections.findIndex(element => element._id === pastBoundariesCollections[i]._id);
      projectDetails.boundariesCollections.splice(removeIndex, 1);
    }    
    // nature test
    let pastNatureCollections = [];
    if(projectDetails.natureCollections != null) {
      for(let i = 0; i < projectDetails.natureCollections.length; i++) {
        let collection = projectDetails.natureCollections[i];
        collection.test_type = 'nature';
        // handle date
        collection.date = new Date(collection.date);
        if (moment(today).isAfter(collection.date, 'day')) {
          pastNatureCollections.push(collection);
        }
        projectDetails.natureCollections[i] = collection;
      }
    }
    // remove collections from the list that are in the past
    for(let i = 0; i < pastNatureCollections.length; i++) {
      let removeIndex = projectDetails.natureCollections.findIndex(element => element._id === pastNatureCollections[i]._id);
      projectDetails.natureCollections.splice(removeIndex, 1);
    }
    // light test
    let pastLightCollections = [];
    if(projectDetails.lightCollections != null) {
      for(let i = 0; i < projectDetails.lightCollections.length; i++) {
        let collection = projectDetails.lightCollections[i];
        collection.test_type = 'light';
        // handle date
        collection.date = new Date(collection.date);
        if (moment(today).isAfter(collection.date, 'day')) {
          pastLightCollections.push(collection);
        }
        projectDetails.lightCollections[i] = collection;
      }
    }
    // remove collections from the list that are in the past
    for(let i = 0; i < pastLightCollections.length; i++) {
      let removeIndex = projectDetails.lightCollections.findIndex(element => element._id === pastLightCollections[i]._id);
      projectDetails.lightCollections.splice(removeIndex, 1);
    }
    // order test
    let pastOrderCollections = [];
    if(projectDetails.orderCollections != null) {
      for(let i = 0; i < projectDetails.orderCollections.length; i++) {
        let collection = projectDetails.orderCollections[i];
        collection.test_type = 'order';
        // handle date
        collection.date = new Date(collection.date);
        if (moment(today).isAfter(collection.date, 'day')) {
          pastOrderCollections.push(collection);
        }
        projectDetails.orderCollections[i] = collection;
      }
    }
    // remove collections from the list that are in the past
    for(let i = 0; i < pastOrderCollections.length; i++) {
      let removeIndex = projectDetails.orderCollections.findIndex(element => element._id === pastOrderCollections[i]._id);
      projectDetails.orderCollections.splice(removeIndex, 1);
    }

    // add new tests here (above and then below)
    
    projectDetails.activities = [
      ...projectDetails.stationaryCollections, 
      ...projectDetails.movingCollections, 
      ...projectDetails.surveyCollections, 
      ...projectDetails.soundCollections, 
      ...projectDetails.boundariesCollections, 
      ...projectDetails.natureCollections, 
      ...projectDetails.lightCollections, 
      ...projectDetails.orderCollections
    ];
    projectDetails.pastActivities = [
      ...pastStationaryCollections, 
      ...pastMovingCollections, 
      ...pastSurveyCollections, 
      ...pastSoundCollections, 
      ...pastBoundariesCollections, 
      ...pastNatureCollections,
      ...pastLightCollections,
      ...pastOrderCollections
    ];

    projectDetails.activities = mergeSortEarlyDate(projectDetails.activities);
    return projectDetails;
  } else {
    return null;
  }
}

export async function getTeam(team) {
  let token = await AsyncStorage.getItem("@token");
  let success = false
  let teamDetails = null
  try {
      const response = await fetch(LOCAL_SERVER+'/teams/' + team._id, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
          }
      })
      teamDetails = await response.json();
      //console.log('teamDetails...', teamDetails);
      success = true
  } catch (error) {
      console.log("error getting team\n", error)
  }
  if(teamDetails.success !== undefined){
    success = teamDetails.success
  }
  // if successfully retrieved team info, Update
  if(success) {
    return teamDetails;
  } else {
    return null;
  }
}

export async function getAllUserProjects() {
  let projectList = [];
  let userInfo = await getUserInfo();
  if (userInfo !== null && userInfo.teams !== undefined && userInfo.teams !== null) {
    for (let i = 0; i < userInfo.teams.length; i++) {
      let team = userInfo.teams[i];
      projectList = await helperGetTeamProjects(team, projectList);
    }
  }
  return projectList;
}

async function helperGetTeamProjects(team, projectList) {
  let teamDetails = await getTeam(team);

  if(teamDetails !== null && teamDetails.projects !== undefined && teamDetails.projects !== null) {
    //console.log("teamDetails.projects: ", teamDetails.projects);
    for (let i = 0; i < teamDetails.projects.length; i++){
      let project = teamDetails.projects[i];
      project.info = "Team: " + teamDetails.title + "\nLocation: " + project.description;
      project.teamName = teamDetails.title;
      project.teamId = teamDetails._id;
      projectList.push(project);
    }
  }
  // always return projectList whether it was modified or not.
  return projectList;
}

// Accept/Decline Team Invites
export async function postInvite(id, claim) {
  let token = await AsyncStorage.getItem("@token");
  let success = false;
  let result = null;
  try {
      const response = await fetch(LOCAL_SERVER+'/users/invites/', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              responses:
              [{
                team: id,
                accept: claim
                }]
          })
      })
      result = await response.json();
      //console.log("response", result);
      success = true
  } catch (error) {
      console.log("error accepting invite: ", error)
  }
  if(result.success !== undefined){
    success = result.success
  }
  // if successfully retrieved team info, Update
  if(success) {
    return true;
  } else {
    return false;
  }
}

export async function getUserInfo() {
  let token = await AsyncStorage.getItem("@token");
  let success = false;
  let userInfo = null;
  try {
      const response = await fetch(LOCAL_SERVER+'/users/', {
          method: 'GET',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
          }
      })
      userInfo = await response.json();
      //console.log("response...", userInfo);
      success = true
  } catch (error) {
      console.log("error getting user info: ", error);
  }
  if(userInfo.success !== undefined){
    success = userInfo.success
  }

  if(success) {
    await AsyncStorage.setItem("@id", userInfo._id)
    await AsyncStorage.setItem("@isVerified", JSON.stringify(userInfo.is_verified))
    await AsyncStorage.setItem("@email", userInfo.email)
    await AsyncStorage.setItem("@firstName", userInfo.firstname)
    await AsyncStorage.setItem("@lastName", userInfo.lastname)
    await AsyncStorage.setItem("@teams", JSON.stringify(userInfo.teams))
    await AsyncStorage.setItem("@invites", JSON.stringify(userInfo.invites))

    return userInfo;
  } else {
    return null;
  }
}

export async function getTimeSlot(route, id) {
  let token = await AsyncStorage.getItem("@token");
  let success = false
  let timeSlotDetails = null
  try {
    const response = await fetch(LOCAL_SERVER+'/' + route + id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
        }
    })
    timeSlotDetails = await response.json();
    //console.log("time slot: ", timeSlotDetails);
    success = true
  } catch (error) {
      console.log("error", error)
  }
  if (timeSlotDetails.success !== undefined) {
    success = timeSlotDetails.success
  }
  if (success) {
    timeSlotDetails.date = new Date(timeSlotDetails.date);
    return timeSlotDetails;
  } else {
    return null;
  }
}

export async function deleteTimeSlot(route, id) {
  let token = await AsyncStorage.getItem("@token");
  let success = false
  let result = null
  try {
    const response = await fetch(LOCAL_SERVER+'/' + route + '/' + id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
        }
    })
    result = await response.json();
    console.log("delete timeslot response:", result);
    success = true
  } catch (error) {
    console.log("ERROR: ", error)
    success = false;
  }
  if (result.success !== undefined) {
    success = result.success
  }
  return success;
}

export async function getCollection(route, collection) {
  let token = await AsyncStorage.getItem("@token");
  let success = false
  let collectionDetails = null
  try {
    const response = await fetch(LOCAL_SERVER+'/collections/' +
                                                  route + collection._id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
        }
    })
    collectionDetails = await response.json();
    //console.log("response collection: ", collectionDetails);
    success = true
  } catch (error) {
      console.log("error", error)
  }
  if (collectionDetails.success !== undefined) {
    success = collectionDetails.success
  }
  if (success) {
    collectionDetails.test_type = collection.test_type;
    collectionDetails.date = new Date(collectionDetails.date)
    return collectionDetails;
  } else {
    return null;
  }
}

export async function getAllCollectionInfo(collectionDetails) {
  let token = await AsyncStorage.getItem("@token");
  let success = false
  let timeSlots = [];

  if(collectionDetails.test_type === 'stationary') {
    // get the collection info
    collectionDetails = await getCollection('stationary/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
      for (let i = 0; i < collectionDetails.maps.length; i++) {
        let item = collectionDetails.maps[i];
        let timeSlot = await getTimeSlot('stationary_maps/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }

  } else if(collectionDetails.test_type === 'moving') {
    // get the collection info
    collectionDetails = await getCollection('moving/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
      for (let i = 0; i < collectionDetails.maps.length; i++) {
        let item = collectionDetails.maps[i];
        let timeSlot = await getTimeSlot('moving_maps/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }

  } else if(collectionDetails.test_type === 'survey') {
    // get the collection info
    collectionDetails = await getCollection('survey/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.surveys !== undefined && collectionDetails.surveys.length >= 1) {
      for (let i = 0; i < collectionDetails.surveys.length; i++) {
        let item = collectionDetails.surveys[i];
        let timeSlot = await getTimeSlot('surveys/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }
  } else if(collectionDetails.test_type === 'sound') {
    // get the collection info
    collectionDetails = await getCollection('sound/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
      for (let i = 0; i < collectionDetails.maps.length; i++) {
        let item = collectionDetails.maps[i];
        let timeSlot = await getTimeSlot('sound_maps/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }
  } else if(collectionDetails.test_type === 'boundary') {
    // get the collection info
    collectionDetails = await getCollection('boundaries/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
      for (let i = 0; i < collectionDetails.maps.length; i++) {
        let item = collectionDetails.maps[i];
        let timeSlot = await getTimeSlot('boundaries_maps/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }
  } else if(collectionDetails.test_type === 'nature'){
    // get the collection info
    collectionDetails = await getCollection('nature/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
      for (let i = 0; i < collectionDetails.maps.length; i++) {
        let item = collectionDetails.maps[i];
        let timeSlot = await getTimeSlot('nature_maps/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }
  } else if(collectionDetails.test_type === 'light'){
    // get the collection info
    collectionDetails = await getCollection('light/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
      for (let i = 0; i < collectionDetails.maps.length; i++) {
        let item = collectionDetails.maps[i];
        let timeSlot = await getTimeSlot('light_maps/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }
  } else if(collectionDetails.test_type === 'order'){
    // get the collection info
    collectionDetails = await getCollection('order/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
      for (let i = 0; i < collectionDetails.maps.length; i++) {
        let item = collectionDetails.maps[i];
        let timeSlot = await getTimeSlot('order_maps/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }
  }

  // if successfully retrieved collection info, Update
  if(success) {
    collectionDetails.timeSlots = timeSlots;
    return collectionDetails;
  } else {
    return null;
  }
}

// This merge sort is used in getAllResults to sort all of the projects
// To have latest date tests come 1st
const mergeSortLateDate = (arr) =>{
  const half = arr.length / 2
  // base case
  if(arr.length < 2){
    return arr
  }
  const left = arr.splice(0, half)
  return mergeLate(mergeSortLateDate(left), mergeSortLateDate(arr))
}

// helper funct of mergeSortLateDate, is where the objects are compared
const mergeLate = (left, right)=>{
  let arr = [];
  // while they are both NOT empty
  while(left.length && right.length){
    // we want the array to be sorted by latest date 1st
    if(left[0].sharedData.date > right[0].sharedData.date) arr.push(left.shift())
    else arr.push(right.shift())
  }
  // concat the leftover elements
  return [...arr, ...left, ...right]
}

export async function getAllResults(projectDetails) {
  if (projectDetails === null) {
    return [];
  }
  // get the results for the project
  let results = [];
  results = await getStationaryResults(projectDetails, results);
  results = await getMovingResults(projectDetails, results);
  results = await getSurveyResults(projectDetails, results);
  // security activities
  results = await getSoundResults(projectDetails, results);
  results = await getBoundaryResults(projectDetails, results);
  results = await getNatureResults(projectDetails, results);
  results = await getLightResults(projectDetails, results);
  results = await getOrderResults(projectDetails, results);
  
  results = mergeSortLateDate(results);
  return  results;
}

export async function getStationaryResults(projectDetails, results) {
  let today = new Date();
  // loop through all Stationary collections and get all of the maps
  for (let i = 0; i < projectDetails.stationaryCollections.length; i++) {
    let collection = projectDetails.stationaryCollections[i];
    for (let j = 0; collection.maps !== null && j < collection.maps.length; j++) {
      let id = collection.maps[j];
      let tempObj = await helperGetResult(id, 'stationary_maps/', "stationary", collection, projectDetails);
      // check if the result object's start date is after today's date
      if(moment(tempObj.sharedData.date).isAfter(today)){
        // if so check if its data is empty, if so continue (so it doesn't show in the project results)
        if(tempObj.data.length === 0) continue
      }
      // this will still have project results that are empty, but only if its start date has passed
      results.push(tempObj);
    }
  }
  return results;
}

export async function getMovingResults(projectDetails, results) {
  let today = new Date();
  // loop through all People Moving collections and get all of the maps
  for (let i = 0; i < projectDetails.movingCollections.length; i++) {
    let collection = projectDetails.movingCollections[i];
    for (let j=0; collection.maps !== null && j < collection.maps.length; j++) {
      let id = collection.maps[j];
      let tempObj = await helperGetResult(id, 'moving_maps/', "moving", collection, projectDetails);
       // check if the result object's start date is after today's date
       if(moment(tempObj.sharedData.date).isAfter(today)){
        // if so check if its data is empty, if so continue (so it doesn't show in the project results)
        if(tempObj.data.length === 0) continue
      }
      // this will still have project results that are empty, but only if its start date has passed
      results.push(tempObj);
    }
  }
  return results;
}

export async function getSurveyResults(projectDetails, results) {
  let today = new Date();
  // loop through all survey collections and get all of the surveys
  for (let i = 0; i < projectDetails.surveyCollections.length; i++) {
    let collection = projectDetails.surveyCollections[i];
    for (let j=0; collection.surveys !== null && j < collection.surveys.length; j++) {
      let id = collection.surveys[j];
      let tempObj = await helperGetResult(id, 'surveys/', "survey", collection, projectDetails);
      // check if the result object's start date is after today's date
      // since there is no way to tell if a survey has been done, just continue if the survey start date is later than today
      if(moment(tempObj.sharedData.date).isAfter(today)) continue
      results.push(tempObj);
    }
  }
  return results;
}

export async function getSoundResults(projectDetails, results) {
  let today = new Date();
  // loop through all Sound Test collections and get all of the maps
  for (let i = 0; i < projectDetails.soundCollections.length; i++) {
    let collection = projectDetails.soundCollections[i];
    for (let j=0; collection.maps !== null && j < collection.maps.length; j++) {
      let id = collection.maps[j];
      let tempObj = await helperGetResult(id, 'sound_maps/', "sound", collection, projectDetails);
      // check if the result object's start date is after today's date
      if(moment(tempObj.sharedData.date).isAfter(today)){
        // if so check if its data is empty, if so continue (so it doesn't show in the project results)
        if(tempObj.data.length === 0) continue
      }
      // this will still have project results that are empty, but only if its start date has passed
      results.push(tempObj);
    }  
  }
  return results;
}

export async function getBoundaryResults(projectDetails, results) {
  let today = new Date();
  // loop through all Boundary Test collections and get all of the maps
  for (let i = 0; i < projectDetails.boundariesCollections.length; i++) {
    let collection = projectDetails.boundariesCollections[i];
    for (let j=0; collection.maps !== null && j < collection.maps.length; j++) {
      let id = collection.maps[j];
      let tempObj = await helperGetResult(id, 'boundaries_maps/', "boundary", collection, projectDetails);
      // check if the result object's start date is after today's date
      if(moment(tempObj.sharedData.date).isAfter(today)){
        // if so check if its data is empty, if so continue (so it doesn't show in the project results)
        if(tempObj.data.length === 0) continue
      }
      // this will still have project results that are empty, but only if its start date has passed
      results.push(tempObj);
    }
  }
  return results;
}

export async function getNatureResults(projectDetails, results) {
  let today = new Date();
  // loop through all Nature Test collections and get all of the maps
  for (let i = 0; i < projectDetails.natureCollections.length; i++) {
    let collection = projectDetails.natureCollections[i];
    for (let j=0; collection.maps !== null && j < collection.maps.length; j++) {
      let id = collection.maps[j];
      let tempObj = await helperGetResult(id, 'nature_maps/', "nature", collection, projectDetails);
      // check if the result object's start date is after today's date
      if(moment(tempObj.sharedData.date).isAfter(today)){
        // if so check if its data is empty, if so continue (so it doesn't show in the project results)
        if(tempObj.data.length === 0) continue
      }
      // this will still have project results that are empty, but only if its start date has passed
      results.push(tempObj);
    }
  }
  return results;
}

export async function getLightResults(projectDetails, results) {
  let today = new Date();
  // loop through all Light Test collections and get all of the maps
  for (let i = 0; i < projectDetails.lightCollections.length; i++) {
    let collection = projectDetails.lightCollections[i];
    for (let j=0; collection.maps !== null && j < collection.maps.length; j++) {
      let id = collection.maps[j];
      let tempObj = await helperGetResult(id, 'light_maps/', "light", collection, projectDetails);
      // check if the result object's start date is after today's date
      if(moment(tempObj.sharedData.date).isAfter(today)){
        // if so check if its data is empty, if so continue (so it doesn't show in the project results)
        if(tempObj.data.length === 0) continue
      }
      // this will still have project results that are empty, but only if its start date has passed
      results.push(tempObj);
    }
  }
  return results;
}

export async function getOrderResults(projectDetails, results) {
  let today = new Date();
  // loop through all Order Test collections and get all of the maps
  for (let i = 0; i < projectDetails.orderCollections.length; i++) {
    let collection = projectDetails.orderCollections[i];
    for (let j=0; collection.maps !== null && j < collection.maps.length; j++) {
      let id = collection.maps[j];
      let tempObj = await helperGetResult(id, 'order_maps/', "order", collection, projectDetails);
      // check if the result object's start date is after today's date
      if(moment(tempObj.sharedData.date).isAfter(today)){
        // if so check if its data is empty, if so continue (so it doesn't show in the project results)
        if(tempObj.data.length === 0) continue
      }
      // this will still have project results that are empty, but only if its start date has passed
      results.push(tempObj);
    }
  }
  return results;
}

export async function helperGetResult(resultId, routePath, type, collection, projectDetails) {
  let day = new Date(collection.date);
  // temp obj if resultInfo is null
  let tempObj = {
    title: collection.title,
    sharedData: {},
    date: day,
    _id: resultId,
    success: false,
  }
  let resultInfo = await helperGetResultDetails(resultId, routePath);
  if (resultInfo !== null) {
    resultInfo.date = new Date(resultInfo.date);
    resultInfo.success = true;
    tempObj = resultInfo;
  }
  // add some helpful information
  tempObj.test_type = type;
  tempObj.sharedData.date = day;
  tempObj.sharedData.projectName = projectDetails.title;
  tempObj.sharedData.location = projectDetails.description;
  tempObj.sharedData.teamName = projectDetails.teamName;
  return tempObj;
}

async function helperGetResultDetails(resultId, routePath) {
  let token = await AsyncStorage.getItem("@token");
  let success = false
  let res = null
  try {
      const response = await fetch(LOCAL_SERVER+'/' + routePath + resultId, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
          }
      })
      res = await response.json();
      success = true
  } catch (error) {
      console.log("error getting result information\n", error)
  }
  if(success) {
    return res;
  } else {
    return null;
  }
}

export function isUserTeamOwner(team, userId) {
  if (team === null || team.users === null) {
    return false;
  }
  let members = team.users;
  let ownerIndex = members.findIndex(element => element.role === "owner");
  // if the owner id and given userId are the same, then this user is the owner
  return (members[ownerIndex].user === userId);
}
