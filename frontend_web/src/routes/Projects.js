import * as React from 'react';
import axios from '../api/axios.js';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link, useLocation } from 'react-router-dom';

import './routes.css';

function Projects(props){

    const teamTitle = useLocation();
    const teamId = teamTitle.pathname.split('/')[3];

    //id from url
    console.log(teamId);
    //const teams = props.passToken.user?.teams;
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

    const [teamInfo, setTeamInfo] = React.useState({
        projects: []
    });

    const teamPull = async() => {

        //console.log("teams")
        //console.log(typeof(props.passToken.user.teams))
        //console.log(props.passToken.user.teams)
        //console.log("teams id")
        //console.log(typeof(props.passToken.user.teams._id))
        //console.log(props.passToken.user.teams._id)
        try {
            console.log("makes it to try")
            const response = await axios.get(`/teams/${teamId}`,{ 
                headers: { 
                    // 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', 
                    'Authorization': `Bearer ${props.passToken.token}` 
                },

                withCredentials: true
            });
            console.log(JSON.stringify(response.data));
            const info = response.data;
            setTeamInfo(info);
            //setProjects(info.projects);
        } catch(error){
            //teams api get error
            console.log("directly to catch")
            console.log('ERROR: ', error);
            return;
        }
    }

    /*const teamProjects = async() => {
        // There can be multiple projects
        let projectIds = teamInfo?.projects;

        try {
            const response = await axios.get({
                url: `https://p2bp.herokuapp.com/api/projects/${projectId._id}`, 
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.passToken.token },
                    params: {
                        _id: projectId._id
                    },
                    withCredentials: true
            });
            console.log(project info)
            console.log(JSON.stringify(response.data));
            const proj = projects;
            proj.push(response.data);
            setProjects(proj);
            
        } catch(error){
            //proget api get error
            console.log('ERROR: ', error);
            return;
        }
    }*/

    React.useEffect(() => {
        teamPull()
        //teamProjects()
    });

    return(
        <div id='teamHome'>
            <div id='newProjectButtonBox'>
                <Button 
                    id='newProjectButton' 
                    variant='contained' 
                    component={ Link } 
                    state={ teamTitle.state }
                    to='new'
                >
                    New Project
                </Button>
            </div>
            {/* type = 1 implies the project style cards */}
            {
               teamInfo?.projects.map((project, index)=>(
                    <DisplayCards key={project._id+index}type={ 1 } project={ project }/>
                ))
            }
        </div>
    );
}

export default Projects;