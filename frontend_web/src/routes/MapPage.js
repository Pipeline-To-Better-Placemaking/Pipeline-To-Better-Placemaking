import * as React from 'react';

import MapDrawers from '../components/MapDrawers';
import './routes.css';

function Map(){
    return (
        <div id='Map'>
            <MapDrawers />
            {/* Google Maps Component */}
            {/*<div className='testBox'><br />Hey</div>*/}
            
        </div>
    );
}

export default Map;