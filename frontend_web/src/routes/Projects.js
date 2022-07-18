import * as React from 'react';
import axios from '../api/axios.js';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link, useLocation } from 'react-router-dom';

import './routes.css';

function Projects(props){
    const teamAndUser = useLocation();
    const teamId = teamAndUser.pathname.split('/')[3];
    const [teamInfo, setTeamInfo] = React.useState();
    const user = teamAndUser.state ? teamAndUser.state.userToken : {};

    const teamPull = async () => {
        
        try {
            const response = await axios.get(`/teams/${teamId}`, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${user.token}`
                },
                withCredentials: true
            });
            //console.log(JSON.stringify(response.data));
            setTeamInfo(response.data);
            //console.log(response.data);

        } catch (error) {
            console.log('ERROR: ', error);
            return;
        }
    }

    React.useEffect(() => {
        teamPull();
    },[]);
    //console.log(teamInfo);

    return(
        <div id='teamHome'>
            <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <h1 style={{margin: '20px 0px 20px 0px', textAlign: 'center'}}>
                    {teamAndUser.state ? teamAndUser.state.team : null}
                </h1>
                <Button component={Link} to={`/home/edit/${teamId}`} state={teamAndUser.state} style={{ width: '40vw' }}>Edit Team</Button>
            </div>
            <div id='newProjectButtonBox'>
                <Button 
                    id='newProjectButton' 
                    variant='contained'
                    component={ Link } 
                    state={ teamAndUser.state }
                    to='new'
                >
                    New Project
                </Button>
            </div>
            {/* type = 1 implies the project style cards */}
            {
                teamInfo?.projects?.map((project, index) => (
                    <DisplayCards key={(project._id + index)} type={ 1 } project={ project } user={ user } team={ teamAndUser.state.team }/>
                ))
            }
        </div>
    );
}

export default Projects;