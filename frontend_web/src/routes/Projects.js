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
    const user = teamAndUser.state ? teamAndUser.state.userToken.user : {};

    console.log(user);
    console.log(user.token);
    //const [loaded, setLoaded] = React.useState(false);

    //id from url
    //console.log(teamId);

    // Template Projects
    const [projects, setProjects] = React.useState([
        {
            title: 'Lake Eola',
            description: 'A template project',
            _id: 'p23e32duew'
        },
        {
            title: 'Lake Underhill Park',
            description: 'Another template project',
            _id: 'p4343rfi43f'
        },
        {
            title: 'University of Central Florida',
            description: 'The third template project, hard coded project data matches this',
            _id: 'p984f92hdeq'
        }
    ]);

    const teamPull = async () => {
        //console.log("teams")
        //console.log(typeof(props.passToken.user.teams))
        //console.log(props.passToken.user.teams)
        //console.log("teams id")
        //console.log(typeof(props.passToken.user.teams._id))
        //console.log(props.passToken.user.teams._id)
        try {
            console.log("makes it to try");
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
            //teams api get error
            console.log("directly to catch")
            console.log('ERROR: ', error);
            return;
        }
    }

    React.useEffect(() => {
        teamPull();
        //setLoaded(true)
        //teamProjects()
    },[]);

    return(
        <div id='teamHome'>
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
                /*projects.map((project, index) => (
                        <DisplayCards key={(project._id + index)} type={ 1 } project={ project } user={ {} } team={ {} }/>
                )) */
            }
        </div>
    );
}

export default Projects;