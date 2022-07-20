import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useLocation } from 'react-router-dom';
import Map from '../components/Map';
import axios from '../api/axios.js';

function ProjectForm() {
    //Form for creating a NEW Project
    const loc = useLocation();
    const [message, setMessage] = React.useState('');
    const response = React.useRef(null);
    //receives location data from New Project Points, add center to point array
    const pointTitles = [];
    pointTitles.push({ ...loc.state.center, title: 'Center'})
    if( loc && loc.state && loc.state.points ){ 
        loc.state.points.map((point, index)=>(
            pointTitles.push({...point, title: `Point ${index+1}`})
        ))
    }

    const [values, setValues] = React.useState({
        center: (loc && loc.state ? loc.state.center : {}),
        title: (loc && loc.state ? loc.state.title : ''),
        area: (loc && loc.state ? {title: 'Project Perimeter', points: loc.state.area}: []),
        points: (loc && loc.state ? pointTitles : []),
        zoom: (loc && loc.state ? loc.state.zoom : []),
        description: ''
    });

    const [dBPoints, setDBPoints] = React.useState([]);

    const handleChange = (index) => (e) => {
        var points = values.points;
        points[index].title = e.target.value;
       setValues({ ...values, points: points }, console.log(values));
    };

    const handleCreate = (e) => {
        // Stop page reload
        e.preventDefault();
        // Check for title
        if(values.title === ''){
            setMessage('Please provide a project Title')
            response.current.style.display = 'inline-block';
            return;
        } 
        // Clear any messages and Move points to obj with latitude and longitude
        response.current.style.display = 'none';
        var temp = [];
        // Cant change values.points from .lat and lng because state and google maps js
        // So put it in a new variable for submission to DB
        values.points.map((point, index)=>(
            temp.push({title: point.title, latitude: point.lat, longitude: point.lng})
        ))
        //set DBPoints and then call create Project
        setDBPoints(temp, createProject(e));
    }

    const createProject = async (e) => {

        try{
            const response = await axios.post('/projects', JSON.stringify({ 
                title: values.title,
                description: values.description,
                area: values._id,
                subareas: [values._id],
                //DB points also contains center point and all points above
                standingPoints: dBPoints,
                team: values.team
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            let project = response.data;

        } catch (error) {

            setMessage(error.response.data?.message);
            response.current.style.display = 'inline-block';
            return;
        }
    }

    return (
        <div id='projectCreate'>
            <Card id='createCard' style={{marginTop: '20px'}}>
                <h1>Create Project</h1>
                <Card.Body>
                    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <span ref={response} style={{ display: 'none', color: 'red' }}>{message}</span>
                        <TextField
                            className='nonFCInput'
                            id='outlined-input'
                            label='Project Name'
                            type='text'
                            value={values.title}
                            onChange={ e => setValues({...values, title: e.target.value})}
                        />
                        <TextField
                            className='nonFCInput'
                            id='outlined-input'
                            label='Description'
                            type='text' 
                            multiline={true}
                            value={values.description}
                            maxRows={2}
                            onChange={e => setValues({ ...values, description: e.target.value })}/>
                        <TextField 
                            className='nonFCInput'
                            id='outlined-input'
                            label='Area Title'
                            type='text'
                            value={values.area.title}
                            onChange={ e => setValues({...values, area: {...values.area, title: e.target.value}})}
                        />
                        { values.points.map((obj, index)=>(
                            <TextField
                                key={index}
                                className='nonFCInput'
                                id='outlined-input'
                                label={index === 0 ? 'Center Title' : `Point ${index} Title`}
                                type='text'
                                value={values.points[index].title}
                                onChange={handleChange(index)}
                            />
                        ))}
                        <Map center={values.center} area={values.area.points} points={values.points} zoom={values.zoom} type={5} />
                        <Button
                            className='scheme'
                            type='submit'
                            size='lg'
                            id='createProjectButton'
                            onClick={handleCreate}
                        >
                            Create
                        </Button>
                        <Button className='cancelButton' component={Link} size='lg' to='../'>
                            Cancel
                        </Button>
                    </Box>
                </Card.Body>
            </Card>
            <br />
        </div>
    );
}
export default ProjectForm;