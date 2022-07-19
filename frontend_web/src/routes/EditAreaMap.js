import * as React from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Map from '../components/Map';

export default function EditAreaMap() {
    const loc = useLocation();
    var temp = [];
    const area = loc?.state?.area ? loc.state.area : {}
    const [name, setName] = React.useState(area.title);

    area.points.forEach((point, index)=>(
        temp.push({'_id': point._id, lat: point.latitude, lng: point.longitude})
    ))

    const updateArea = (area) => (e) => {
        e.preventDefault();
        //area id = area._id
        //new name = name
    }

    // Return area point values need to be reconverted to objects with latitude longitude keys 
    return (
        <div id='editAreaMap'>
            {/* Empty New Project page, Google map component w/ searchable locations for new projects */}
            <TextField 
                style={{ position: 'fixed', top: '70px', zIndex: '9999', backgroundColor: 'white', width: '30vw', margin: '5px', alignSelf: 'center', borderRadius: '5px', left: '35vw'}}
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Map center={temp[0]} area={temp} type={6} zoom={16} update={updateArea}/>
        </div>
    );
}