import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Map from '../components/Map';

export default function EditPointMap(){
    const loc = useLocation();
    const point = loc?.state?.point? loc.state.point : {}
    return(
        <div id='editPointMap'>
            {/* Empty New Project page, Google map component w/ searchable locations for new projects */}
            <Map type={7} zoom={16} />
        </div>
    );
}