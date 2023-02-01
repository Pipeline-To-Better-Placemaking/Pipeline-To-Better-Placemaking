import { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate} from 'react-router-dom';

export default function UnityPage() {
  const loc = useLocation();
  
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
  } = useUnityContext({
    // This is just to make sure the file path is correct when loading Unity inside the website
    // Build loads in the activity path without ../ needs to load inside website root
    loaderUrl: "../../../../../../../../../Build/IdentifyingProgram.loader.js", 
    dataUrl: "../../../../../../../../../Build/IdentifyingProgram.data",
    frameworkUrl: "../../../../../../../../../Build/IdentifyingProgram.framework.js",
    codeUrl: "../../../../../../../../../Build/IdentifyingProgram.wasm",
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

  function handleExtrude() 
  {
    // points.Add(new Vector3(-10,5,0));
    //     points.Add(new Vector3(-20,10,0));
    //     points.Add(new Vector3(-30,5,0));
    //     points.Add(new Vector3(-20,5,0));
    const obj = {
      numFloors: loc.state.numFloors,
      points: loc.state.buildingArea,
    }
    
    const myJSON = JSON.stringify(obj)
    // console.log(myJSON);
    sendMessage("Building", "GetPoints", myJSON);
  }
  handleExtrude();

  return (
    <div>
        <h1>Identifying Program</h1>
        {/* state={{userToken:loc.state.userToken, team: loc.state.team}} <-- this is a parameter for the button component if you need it later*/}
        <Button className='resetButton' component={Link} size='lg' variant='filledTonal' color='error' to='../activities/identifying_program' 
            state={{...loc.state}} >
            Reset Model
        </Button>
        <Button className='continueButton' component={Link} size='lg' variant='filledTonal' color='success' to='../activities/times' 
            state={{...loc.state}}>
            Accept and Continue
        </Button>
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
