import * as React from 'react';
import axios from '../api/axios.js';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link, useParams, useLocation } from 'react-router-dom';

import './routes.css';

function Projects(props){

    const teamTitle = useLocation();
    //const teams = props.passToken.user?.teams;
    let [projectInfo, setProjectInfo] = React.useState({});
    let [teamInfo, setTeamInfo] = React.useState({});

    const teamPull = async() => {
        // There can be multiple projects

        try {
            const response = await axios.get({
                url: `/teams/${props.passToken.user.teams._id}`, 
                method: 'GET',
                responseType: 'json',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.passToken.token },
                    withCredentials: true
            });
            console.log(JSON.stringify(response.data));
            teamInfo = response.data;
            setTeamInfo(teamInfo);
            
        } catch(error){
            //teams api get error
            console.log('ERROR: ', error);
            return;
        }
    }

    // const teamProjects = async() => {
    //     // There can be multiple projects
    //     let projectId = teamInfo?.projects;

    //     try {
    //         const response = await axios.get({
    //             url: `https://p2bp.herokuapp.com/api/projects/${projectId._id}`, 
    //             method: 'GET',
    //             headers: { 
    //                 Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + props.passToken.token },
    //                 params: {
    //                     _id: projectId._id
    //                 },
    //                 withCredentials: true
    //         });
    //         console.log(JSON.stringify(response.data));
    //         projectInfo = response.data;
    //         setProjectInfo(projectInfo);
            
    //     } catch(error){
    //         //proget api get error
    //         console.log('ERROR: ', error);
    //         return;
    //     }
    // }

    React.useEffect(() => {
        teamPull()
        //teamProjects()
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
            <DisplayCards type={ 1 } projects={ Object.keys(teamInfo).length > 0 ? teamInfo : projects }/>
        </div>
    );
}

export default Projects;