
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
