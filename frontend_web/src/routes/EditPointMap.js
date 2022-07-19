import * as React from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Map from '../components/Map';

export default function EditPointMap(){
    const loc = useLocation();
    const point = loc?.state?.point ? loc.state.point : {}
    const [name, setName] = React.useState(point.title);
    var conv = { '_id': point._id, lat: point.latitude, lng: point.longitude }

    const updatePoint = (point) => (e) => {
        e.preventDefault();
        //point._id
        //name
    }

    // Return value needs to be reconverted to an obj with latitude longitude
    return(
        <div id='editPointMap'>
            {/* Empty New Project page, Google map component w/ searchable locations for new projects */}
            <TextField
                style={{ position: 'fixed', top: '70px', zIndex: '9999', backgroundColor: 'white', width: '30vw', margin: '5px', alignSelf: 'center', borderRadius: '5px', left: '35vw' }}
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Map center={conv} type={7} zoom={16} update={updatePoint}/>
        </div>
    );
}