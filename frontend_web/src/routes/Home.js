import * as React from 'react';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link } from 'react-router-dom';

function Home(props) {
    // props.passToken jwt token 
    // holds passed token from App.js
    // token should be held in local storage to pull if user navigates to other pages in a different order
    const teams = props.passToken.user?.teams

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
            <DisplayCards type={ 2 } teams={ teams } />
        </div>
    );

}

export default Home;