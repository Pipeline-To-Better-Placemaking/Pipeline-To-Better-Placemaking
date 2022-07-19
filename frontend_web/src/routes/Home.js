import * as React from 'react';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link, useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const userTeams = location.state && location.state.userToken ? location.state.userToken.user.teams : null;

   /*const teamsTemplate = [
        {
            _id: 'jfgn49wgnh58w9hg5uw4n859hw4g549g',
            title: 'Template Team'
        }
    ]*/

    console.log(location.state);

    return(
        <div id='userHome'>
            <div id='newTeamButtonBox'>
                <Button
                    id='newTeamButton'
                    variant='contained'
                    component={ Link }
                    state={ location.state }
                    to='new'
                >
                    New Team
                </Button>
            </div>
            {/* type = 1 implies the project style cards */}
            <DisplayCards type={2} teams={/*teamsTemplate*/ userTeams} user={location.state ? location.state.userToken : null }/>
        </div>
    );
}

export default Home;