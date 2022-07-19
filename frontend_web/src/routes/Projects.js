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
    const [selected, setSelected] = React.useState();
    const user = teamAndUser.state ? teamAndUser.state.userToken : {};

    const openConfirmation = (title, id) => (e) => {
        const popup = document.getElementById('deleteWindow');
        const inner = document.getElementById('popUpText');
        setSelected(id);
        // version 0 & 2 === spatial boundaries (constructed = polyline, shelter and material boundary)
        inner.innerHTML = '';
        inner.innerHTML = `<h6>Are you sure you would like to delete '${title}' project?<br/> This cannot be undone.</h6>`
        popup.style.display = 'flex';
    }

    //Called from pop up window below
    const deleteProject = (id) => (e) => {
        e.preventDefault();
        console.log('delete');

        //on success  
        closeWindow(e);
    }

    const closeWindow = (e) => {
        e.preventDefault();
        console.log('close');
        const popup = document.getElementById('deleteWindow');
        const inner = document.getElementById('popUpText');
        popup.style.display = 'none';
        inner.innerHTML = '';
        setSelected();
    }
    //const temp = [{title: 'Lake', description: 'test', _id: 'Dnui438q94qh73f8h7f43q'}]

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
                    {teamInfo ? teamInfo?.title : null}
                </h1>
                <Button component={Link} to={`/home/edit/${teamId}`} state={teamAndUser.state ? teamAndUser.state : null} style={{ width: '40vw' }}>Edit Team</Button>
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
                    <DisplayCards key={(project._id + index)} type={1} project={project} user={user} team={teamAndUser.state ? teamAndUser.state.team : null} open={openConfirmation}/>
                ))
            }
            <div id='deleteWindow' style={{ display: 'none', position: 'fixed', justifyContent: 'center', alignItems: 'center' }}>
                <div id='popUpBlock'>
                    <div id='popUpText'></div>
                    <Button id='deleteButton' onClick={deleteProject(selected)}>Confirm</Button>
                    <Button id='cancelButton' onClick={closeWindow}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default Projects;