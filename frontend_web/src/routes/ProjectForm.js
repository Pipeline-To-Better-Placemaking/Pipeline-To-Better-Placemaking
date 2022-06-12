import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useLocation } from 'react-router-dom';
import Map from '../components/Map';

function ProjectForm() {
    const loc = useLocation();

    const [values, setValues] = React.useState({
        center: (loc && loc.state ? loc.state.center : {}),
        title: (loc && loc.state ? loc.state.title : ''),
        area: (loc && loc.state ? loc.state.area: []),
        points: (loc && loc.state ? loc.state.points : [])
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const createProject = () => { }

    return (
        <div id='projectCreate'>
            <h1>Create Project</h1>
            <Card id='createCard'>
                <Card.Body>
                    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField
                            className='nonFCInput'
                            id='outlined-search'
                            label='Project Name'
                            type='text'
                            value={values.title}
                            onChange={handleChange('projectName')}
                        />
                        {values.points.map((obj, index)=>(
                            <TextField
                                key={index}
                                className='nonFCInput'
                                id='outlined-search'
                                label={`Point ${index}`}
                                type='text'
                            />
                        ))}
                        <Map center={values.center} area={values.area} points={values.points} zoom={16} type={5} />
                        <Button
                            className='scheme'
                            type='submit'
                            size='lg'
                            id='createProjectButton'
                            onClick={createProject}
                        >
                            Create
                        </Button>
                        <br />
                        <Button component={Link} type='submit' size='lg' to='/home'>
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