import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from '../api/axios';
import Map from '../components/Map';

export default function EditPointMap(){
    const loc = useLocation();
    const nav = useNavigate();
    const point = loc?.state?.point ? loc.state.point : {}
    const [name, setName] = React.useState(point.title);
    var conv = { '_id': point._id, lat: point.latitude, lng: point.longitude }
    var updatedPoint = {};

    const updatePoint = (point) => async (e) => {
        e.preventDefault();
        updatedPoint = {title: name, latitude: point.lat, longitude: point.lng};
        //console.log(point);
        //console.log(conv._id);
        //console.log(loc.pathname.split('/')[5]);
        console.log(updatedPoint);

        try {
            const response = axios.put(`/${loc.pathname.split('/')[5]}/standing_points/${conv._id}`, JSON.stringify(updatedPoint), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${loc.state.userToken.token}`
                },
                withCredentials: true
            });

            nav(`../edit/${loc.pathname.split('/')[5]}`, { replace: true, state: { project: loc.state.project, team: loc.state.team, userToken: loc.state.userToken }});

        } catch (error) {
            console.log('ERROR: ', error);
            return;
        }
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