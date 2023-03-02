import * as React from 'react';
import { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function UnityPage() {
  const loc = useLocation();
  const nav = useNavigate();
  const [message, setMessage] = React.useState('');
  const [programJSON, setProgramJSON] = React.useState();

  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
    addEventListener,
    removeEventListener
  } = useUnityContext({
    // This is just to make sure the file path is correct when loading Unity inside the website
    // Build loads in the activity path without ../ needs to load inside website root
    loaderUrl: "../../../../../../../../Build/IPSurveyors.loader.js",
    dataUrl: "../../../../../../../../Build/IPSurveyors.data",
    frameworkUrl: "../../../../../../../../Build/IPSurveyors.framework.js",
    codeUrl: "../../../../../../../../Build/IPSurveyors.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  // This useEffect makes sure Unity doesn't explode when 
  // you want to switch to a different screen in the website
  useEffect(() => {
    return () => {
      detachAndUnloadImmediate().catch((reason) => {
        console.log(reason);
      });
    };
  }, [detachAndUnloadImmediate]);

  useEffect(() => {
    handleSurveyors();
  }, [isLoaded])

  const handleSetProgramJSON = useCallback((programJSON) => {
    // handle the JSON sent from Unity here
    console.log(programJSON);
    const obj = JSON.parse(programJSON);

    let newFloors = [];

    // create empty arrays for each floor
    for (let i = 0; i < loc.state.data.data[0].numFloors; i++) {
      newFloors.push([]);
    }

    // looping through the programs
    for (let i = 0; i < obj.length; i++) {

      console.log(obj[i]);

      const newProgram = {
        points: obj[i].points,
        programType: obj[i].programType
      };

      console.log(newProgram);

      // push newProgram into the appropriate floor array
      newFloors[obj[i].floorNum].push(newProgram);

    }

    console.log(newFloors);

    for (let i = 0; i < newFloors.length; i++) {
      try {
        const response = axios.put(`/program_floors/${loc.state.data.data[0].floors[i]}`, JSON.stringify({
          programs: newFloors[i]

        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${loc.state.userToken.token}`
          },
          withCredentials: true
        });

        // activityDetails = response.data;

      } catch (error) {
        console.log('ERROR: ', error);
        // setMessage(error.response.data?.message);
        // response.current.style.display = 'inline-block';
        return;
      }
    }






    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MIGHT WANT TO CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Where should we go after the surveyor submits a program? right now it goes back to the main
    // project map page... which is probably where we should go back anyways.....



    // nav('../', { replace: true, state: {team: loc.state.team, project: loc.state.project, userToken: loc.state.userToken} });

  }, []);

  useEffect(() => {
    addEventListener("ReceiveProgramData", handleSetProgramJSON);
    return () => {
      removeEventListener("ReceiveProgramData", handleSetProgramJSON);
    };
  }, [addEventListener, removeEventListener, handleSetProgramJSON]);

  async function handleSurveyors() {
    try {
      console.log(loc.state.data);
      const response = await axios.get(`/program_maps/${loc.state.data._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${loc.state.userToken.token}`
        },
        withCredentials: true
      });

      // console.log(response.data.programs.length);





      const obj = {
        numFloors: response.data.data[0].numFloors,
        points: response.data.data[0].perimeterPoints
      }
      const myJSON = JSON.stringify(obj);

      sendMessage("Building", "SurveyorProgram", myJSON);

    } catch (error) {
      console.log('ERROR: ', error);
      setMessage(error.response.data?.message);
      // response.current.style.display = 'inline-block';
      return;
    }

    // const obj = {
    //   numFloors: loc.state.numFloors,
    //   points: loc.state.buildingArea,
    // }

    // const myJSON = JSON.stringify(obj)
    // // console.log(myJSON);
    // sendMessage("Building", "GetPoints", myJSON);

  }

  return (
    <div>
      <h1>Identifying Program</h1>
      {/* state={{userToken:loc.state.userToken, team: loc.state.team}} <-- this is a parameter for the button component if you need it later*/}

      <div>
        {!isLoaded && (
          <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
        )}
        <Unity
          unityProvider={unityProvider}
          style={{ width: 1600, height: 900, visibility: isLoaded ? "visible" : "hidden" }}
        />

      </div>
    </div>
  );
};
