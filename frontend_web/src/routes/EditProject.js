import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useLocation } from 'react-router-dom';
import Map from '../components/Map';

function EditProject() {
    //load project coords and area(?)
    const center = { lat: 28.602846550128262, lng: -81.20006526689143 };
    const loc = useLocation();

    const [values, setValues] = React.useState({
        projectName: loc.state
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //update submission function, redirect to TeamHome (project listings)
    const updateProject = () => {
    }

    return(
        <div id='projectEdit'>
            <h1>Edit Project</h1>
            <Card id='editCard'>
                <Card.Body>
                    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField 
                            className='nonFCInput' 
                            id='outlined-input' 
                            label='Project Name' 
                            type='text' 
                            value={ values.projectName } 
                            onChange={ handleChange('projectName') } 
                        />
                        <Map center={ center } zoom={ 16 } type={ 2 }/>
                        <Button 
                            className='scheme' 
                            type='submit' 
                            size='lg' 
                            id='updateProjectButton' 
                            onClick={ updateProject }
                        >
                            Update
                        </Button>
                        <br/>
                        <Button component={ Link } type='submit' size='lg' to='/u'>
                            Cancel
                        </Button>
                    </Box>
                </Card.Body>
            </Card>
            <br />
        </div>
    );
}
export default EditProject;