import * as React from 'react';
import axios from '../api/axios.js';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link, useParams, useLocation } from 'react-router-dom';

import './routes.css';

function Projects(props){
    // We just need project titles and ids on this page.
    // depending on selection on this page, we load the entire project and its results on ProjectPage.js
    const teamTitle = useLocation();
    const teams = props.passToken.user?.teams;
    let projectInfo = [];
    let teamInfo = [];

    const teamPull = async() => {
        // There can be multiple projects

        try {
            const response = await axios.post('/teams/:id', JSON.stringify({ teams }), {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });
            console.log(JSON.stringify(response));
            teamInfo = response.data;
            
        } catch(error){
            //user login error
            console.log('ERROR: ', error);
            return;
        }
    }

    const teamProjects = async() => {
        // There can be multiple projects
        let projectId = teamInfo?.projects;

        try {
            const response = await axios.post('/projects/:id', JSON.stringify({ projectId }), {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });
            console.log(JSON.stringify(response));
            projectInfo = response.data;
            
        } catch(error){
            //user login error
            console.log('ERROR: ', error);
            return;
        }
    }

    React.useEffect(() => {
        teamPull()
        teamProjects()
    });

    // Project array structure hardcoded on template -- leave Template to match structures
    // Data needed project name/title, id
    const projects = [
        {
            title: 'Lake Eola',
            id: 'p23e32duew'
        },
        {
            title: 'Lake Underhill Park',
            id: 'p4343rfi43f'
        },
        {
            title: 'University of Central Florida',
            id: 'p984f92hdeq'
        }
    ]

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
            <DisplayCards type={ 1 } projects={ projectInfo.length > 0 ? projectInfo : projects}/>
        </div>
    );
}
export default Projects;