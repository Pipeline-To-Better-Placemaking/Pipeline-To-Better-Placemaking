import * as React from 'react';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link } from 'react-router-dom';

function Home(props){
    let i = 0;

    const token = {
        teams: props.passToken.user?.teams ? props.passToken.user.teams : '605e57007a68230004c01a2d'
    }

    //example format hardcoded on template, restructure the data or pass teams info from DB into <DisplayCards teams={DBTeams}/>
    const teams = [
        {
            _id: token.teams[0], 
            title: token.teams[0].title
        }
    ]

    return(
        <div id='userHome'>
            <div id='newTeamButtonBox'>
                <Button
                    id='newTeamButton'
                    variant='contained'
                    component={Link}
                    to='new'
                >
                    New Team
                </Button>
            </div>
            {/* type = 1 implies the project style cards */}
            <DisplayCards type={2} teams={teams} />
        </div>
    );

}

export default Home;