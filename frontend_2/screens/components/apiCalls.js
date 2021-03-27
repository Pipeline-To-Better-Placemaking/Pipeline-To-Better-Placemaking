import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export async function getProject(token, project) {
  let success = false
  let projectDetails = null
  // Get the project information
  try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + project._id, {
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
    return projectDetails;
  } else {
    return null;
  }
};

export async function getFilteredProjectDetails(token, project) {
  let projectDetails = await getProject(token, project);
  if(projectDetails !== null) {
    let today = new Date();

    let pastStationaryCollections = [];
    if(projectDetails.stationaryCollections !== null) {
      for(let i = 0; i < projectDetails.stationaryCollections.length; i++) {
        let collection = projectDetails.stationaryCollections[i];
        collection.test_type = 'stationary';
        // set area
        let areaIndex = projectDetails.subareas.findIndex(element => element._id === collection.area);
        collection.area = projectDetails.subareas[areaIndex];
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
        // set area
        let areaIndex = projectDetails.subareas.findIndex(element => element._id === collection.area);
        collection.area = projectDetails.subareas[areaIndex];
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
        // set area
        let areaIndex = projectDetails.subareas.findIndex(element => element._id === collection.area);
        collection.area = projectDetails.subareas[areaIndex];
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

    // set selected project page information
    projectDetails.activities = [...projectDetails.stationaryCollections, ...projectDetails.movingCollections, ...projectDetails.surveyCollections];
    projectDetails.pastActivities = [...pastStationaryCollections, ...pastMovingCollections, ...pastSurveyCollections];
    return projectDetails;
  } else {
    return null;
  }
};

export async function getTeam(token, team) {
  let success = false
  let teamDetails = null
  try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/teams/' + team._id, {
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
};

// Accept/Decline Team Invites
export async function postInvite(token, id, claim) {
  let success = false;
  let result = null;
  try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/users/invites/', {
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
};

export async function getUserInfo(token) {
  let success = false;
  let userInfo = null;
  try {
      const response = await fetch('https://measuringplacesd.herokuapp.com/api/users/', {
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
    return userInfo;
  } else {
    return null;
  }
};

export async function getTimeSlot(token, route, id) {
  let success = false
  let timeSlotDetails = null
  try {
    const response = await fetch('https://measuringplacesd.herokuapp.com/api/' + route + id, {
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
};

export async function getCollection(token, route, collection) {
  let success = false
  let collectionDetails = null
  try {
    const response = await fetch('https://measuringplacesd.herokuapp.com/api/collections/' +
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
};

export async function getAllCollectionInfo(token, collectionDetails) {
  let success = false
  let timeSlots = [];

  if(collectionDetails.test_type === 'stationary') {
    // get the collection info
    collectionDetails = await getCollection(token, 'stationary/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
      for (let i = 0; i < collectionDetails.maps.length; i++) {
        let item = collectionDetails.maps[i];
        let timeSlot = await getTimeSlot(token, 'stationary_maps/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }

  } else if(collectionDetails.test_type === 'moving') {
    // get the collection info
    collectionDetails = await getCollection(token, 'moving/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.maps !== undefined && collectionDetails.maps.length >= 1) {
      for (let i = 0; i < collectionDetails.maps.length; i++) {
        let item = collectionDetails.maps[i];
        let timeSlot = await getTimeSlot(token, 'moving_maps/', item._id);
        success = (timeSlot !== null)
        if (success)
          timeSlots.push(timeSlot);
      }
      success = true
    }

  } else if(collectionDetails.test_type === 'survey') {
    // get the collection info
    collectionDetails = await getCollection(token, 'survey/', collectionDetails);
    success = (collectionDetails !== null);
    // get the timeSlot info
    if (success && collectionDetails.surveys !== undefined && collectionDetails.surveys.length >= 1) {
      for (let i = 0; i < collectionDetails.surveys.length; i++) {
        let item = collectionDetails.surveys[i];
        let timeSlot = await getTimeSlot(token, 'surveys/', item._id);
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

};
