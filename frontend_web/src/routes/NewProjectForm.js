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
    const registerResponse = React.useRef(null);
    const [message, setMessage] = React.useState('');
    //recieves location data from New Project Points

    const [values, setValues] = React.useState({
        center: (loc && loc.state ? loc.state.center : {}),
        title: (loc && loc.state ? loc.state.title : ''),
        area: (loc && loc.state ? loc.state.area: []),
        points: (loc && loc.state ? loc.state.points : []),
        zoom: (loc && loc.state ? loc.state.zoom : [])
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const createProject = async (e) => {

        try{
            const response = await axios.post('/projects', JSON.stringify({ 
                title: values.title,
                description: values.description,
                area: values._id,
                subareas: [values._id],
                standingPoints: values.points,
                team: values.team
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            let project = response.data;

        } catch (error) {

            setMessage(error.response.data?.message);
            registerResponse.current.style.display = 'inline-block';
            return;
        }
     }

    return (
        <div id='projectCreate'>
            <h1>Create Project</h1>
            <Card id='createCard'>
                <Card.Body>
                    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField
                            className='nonFCInput'
                            id='outlined-input'
                            label='Project Name'
                            type='text'
                            value={values.title}
                            onChange={handleChange('projectName')}
                        />
                        { values.points.map((obj, index)=>(
                            <TextField
                                key={index}
                                className='nonFCInput'
                                id='outlined-input'
                                label={`Point ${index}`}
                                type='text'
                                //value={values.points[index].title}
                            />
                        ))}
                        <Map center={values.center} area={values.area} points={values.points} zoom={values.zoom} type={5} />
                        <Button
                            className='scheme'
                            type='submit'
                            size='lg'
                            id='createProjectButton'
                            onClick={createProject}
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