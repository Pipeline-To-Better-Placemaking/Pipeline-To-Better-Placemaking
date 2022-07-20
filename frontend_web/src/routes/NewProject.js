import * as React from 'react';
import { useLocation } from 'react-router-dom';

import Map from '../components/Map';

function NewProject() {
    const location = useLocation();
    const center = { lat:28.537215742007234, lng:-81.38455963599586 };

    return(
        <div id='newProject'>
            {/* Empty New Project page, Google map component w/ searchable locations for new projects */}
            <Map team={ location.state } center={ center } type={ 0 } zoom={ 16 }/>
        </div>
    );
}

export default NewProject;