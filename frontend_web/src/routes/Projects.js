import * as React from 'react';
import axios from '../api/axios.js';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link, useParams, useLocation } from 'react-router-dom';

import './routes.css';

function Projects(props){

    const teamTitle = useLocation();
    const teams = props.passToken.user?.teams;
    let projectInfo = [];

    const teamProjects = async() => {

        let projectId = teams?.projects;

        try {
            const response = await axios.post('/projects', JSON.stringify({ projectId }), {
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
            <DisplayCards type={ 1 } projects={ projectInfo.length > 0 ? projectInfo : projects }/>
        </div>
    );
}

export default Projects;