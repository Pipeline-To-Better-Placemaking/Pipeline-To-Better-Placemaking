import * as React from 'react';
import { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import axios from '../api/axios';

export default function UnityPage() {
  const loc = useLocation();
  const [message, setMessage] = React.useState('');
  
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
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

  async function handleSurveyors() 
  {
    try {
      const response = await axios.get(`/program_maps/63f8fdf8ac6cf91a9c1cb2e9`, {
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${loc.state.userToken.token}`
          },
          withCredentials: true
      });
      console.log(response.data);

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
