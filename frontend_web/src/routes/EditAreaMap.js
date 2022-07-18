import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Map from '../components/Map';

export default function EditAreaMap() {
    const loc = useLocation();
    const area = loc?.state?.area ? loc.state.area : []

    return (
        <div id='editAreaMap'>
            {/* Empty New Project page, Google map component w/ searchable locations for new projects */}
            <Map center={area[0]} area={area} type={6} zoom={16} />
        </div>
    );
}