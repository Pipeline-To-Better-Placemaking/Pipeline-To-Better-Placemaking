import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';

export default function EditPoints(){
    const loc = useLocation();
    const standingPoints = loc?.state?.points

    const pointCards = (points) => (
        points.map((value, index) => (
            <Card key={index} className='pointCards'>
                <Card.Body>
                    <h4>{value.title}</h4>
                    <Button component={Link} to='point_map' state={{ ...loc?.state, point: value }}>Edit</Button>
                    <Button onClick={deletePoint}>Delete</Button>
                </Card.Body>
            </Card>
        ))
    );

    const updatePoints = (e) => {
        e.preventDefault();


    }

    const deletePoint = (e) => {
        e.preventDefault();

    }

    return(
        <div id='editPoints'>
            <Card id='pointCard'>
                <Card.Header >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h1>{loc?.state?.project}</h1>
                    </div>
                </Card.Header>
                <Card.Body id='pointCardContent'>
                    <Button id='addNewPoint' component={Link} to='point_map' state={loc.state}>New Standing Point</Button>
                    {pointCards(standingPoints)}
                </Card.Body>
            </Card>
        </div>
    );
}