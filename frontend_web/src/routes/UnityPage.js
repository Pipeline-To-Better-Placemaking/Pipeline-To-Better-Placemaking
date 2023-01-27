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
  } = useUnityContext({
    loaderUrl: "./build/Builds.loader.js",
    dataUrl: "./build/webgl.data",
    frameworkUrl: "./build/Builds.framework.js",
    codeUrl: "./build/Builds.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

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
