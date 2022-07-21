import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';

export default function EditAreas(){

    const loc = useLocation();
    const areas = loc.state ? loc?.state?.areas : []

    const areaCards = (areas) => (
        areas.map((obj, index) => (
            <Card key={index} className='areaCards'>
                <Card.Body>
                    <h4>{obj.title}</h4>
                    <Button component={Link} to='area_map' state={{...loc?.state, area: obj}}>Edit</Button>
                    <Button onClick={deleteArea(obj._id)}>Delete</Button>
                </Card.Body>
            </Card>
        ))
    );

    const deleteArea = (id) => (e) => {
        e.preventDefault();
    }


    return (
        <div id='editAreas'>
            <Card id='editAreaCard'>
                <Card.Header >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h1>{loc?.state?.project}</h1>
                    </div>
                </Card.Header>
                <Card.Body id='areaCardContent'>
                    <Button id='addNewArea'component={Link} to='area_map' state={loc?.state}>New Area</Button>
                    {areaCards(areas)}
                    <Button component={Link} to={`../edit/${loc.pathname.split('/')[5]}`} state={{ project: loc.state.project, team: loc.state.team, userToken: loc.state.useToken }}>Cancel</Button>
                </Card.Body>
            </Card>
        </div>
    );

}