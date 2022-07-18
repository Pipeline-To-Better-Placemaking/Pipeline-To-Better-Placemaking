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
    const segment = loc.pathname.split('/');
    //console.log(segment[3]);

    const [values, setValues] = React.useState({
        projectName: loc.state.project
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //update submission (title) function (delete ?), redirect to TeamHome (project listings)
    const updateProject = () => {
    }

    return(
        <div id='projectEdit'>
            <Card id='editCard'>
                <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
                    <h1>Edit Project</h1>
                    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField 
                            className='nonFCInput' 
                            id='outlined-input' 
                            label='Project Name' 
                            type='text' 
                            value={ values.projectName } 
                            onChange={ handleChange('projectName') } 
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '10px', padding: '5px', border: '1px solid #BEBEBE', borderRadius: '5px', justifyContent: 'center'}}>
                            <h6 style={{alignSelf: 'center'}}>Project Map</h6>
                            <Map center={ center } zoom={ 16 } type={ 2 }/>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Button
                                    component={Link}
                                    className='scheme'
                                    type='submit'
                                    size='lg'
                                    id='updateAreas'
                                    state={loc.state ? loc.state : ''}
                                    to='areas'
                                >
                                    Edit Areas
                                </Button>
                                <Button
                                    component={Link}
                                    className='scheme'
                                    type='submit'
                                    size='lg'
                                    id='updatePoints'
                                    state={loc.state ? loc.state : ''}
                                    to='points'
                                >
                                    Edit Points
                                </Button>
                            </div>
                        </div>
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
                        <Button component={Link} state={{ team: loc.state && loc.state.team ? loc.state.team : '', userToken: loc.state && loc.state.userToken ? loc.state.userToken : '' }} type='submit' size='lg' to={`/home/teams/${segment[3]}`}>
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