import * as React from 'react';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link, useLocation } from 'react-router-dom';

function Home() {
    // props.passToken jwt token 
    // holds passed token from App.js
    // token should be held in storage or have some persistant location to pull if user navigates to other pages in a different order
    //const teams = props.passToken.user?.teams
    const userToken = useLocation();
    const userTeams = userToken.state.user.teams;
    console.log('Home');
    console.log(userToken.state);
    console.log(userTeams);

    const teamsTemplate = [
        {
            _id: 'jfgn49wgnh58w9hg5uw4n859hw4g549g',
            title: 'Template Team'
        }
    ]

    return(
        <div id='userHome'>
            <div id='newTeamButtonBox'>
                <Button
                    id='newTeamButton'
                    variant='contained'
                    component={ Link }
                    to='new'
                >
                    New Team
                </Button>
            </div>
            {/* type = 1 implies the project style cards */}
            <DisplayCards type={ 2 } teams={ userTeams ? userTeams : teamsTemplate } user={ userToken.state }/>
        </div>
    );

}

export default Home;