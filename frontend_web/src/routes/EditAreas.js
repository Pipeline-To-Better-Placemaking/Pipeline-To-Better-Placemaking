import * as React from 'react';
import { useLocation } from 'react-router-dom';

import Map from '../components/Map';

export default function EditAreas(){
    //to a map for editing points
    const editStandingPoints = () => {
    }

    //to a map for editing areas
    const editProjectAreas = () => {
    }

    return(
        <div id='editAreas'>
            {/* Empty New Project page, Google map component w/ searchable locations for new projects */}
            <Map center={''} area={''} type={6} zoom={16} />
        </div>
    );

}