import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation } from 'react-router-dom';

export default function EditTeam(){
    const loc = useLocation();
    const [name, setName] = React.useState(loc.state ? loc.state.team : '')
    const segment = loc.pathname.split('/');
    //console.log(segment[3]);

    const updateTeam = () => {

    }

    const deleteTeam = () => {

    }

    return(
        <div id='teamEdit'>
            <Card id='editCard' style={{width: '40vw'}}>
                <Card.Body>
                    <h1>Edit Team</h1>
                    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField
                            className='nonFCInput'
                            id='outlined-input'
                            label='Team Name'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Button
                            className='scheme'
                            type='submit'
                            size='lg'
                            id='updateTeamButton'
                            onClick={updateTeam}
                        >
                            Update
                        </Button>
                        <Button
                            className='scheme'
                            type='submit'
                            size='lg'
                            id='deleteButton'
                            onClick={deleteTeam}
                        >
                            Delete <DeleteIcon/>
                        </Button>
                        <br />
                        <Button component={Link} state={loc.state ? loc.state : null} type='submit' size='lg' to={`/home/teams/${segment[3]}`}>
                            Cancel
                        </Button>
                    </Box>
                </Card.Body>
            </Card>
            <br />
        </div>
    );

}