import * as React from 'react';
import Button from '@mui/material/Button';
import DisplayCards from '../components/DisplayCards';
import { Link } from 'react-router-dom';

import './routes.css';

function Home(){
    /* Load Viewable Projects */
    const projects = [
        {
            name: 'Lake Eola',
            id: 'p23e32duew'
        },
        {
            name: 'Lake Underhill Park',
            id: 'p4343rfi43f'
        },
        {
            name: 'University of Central Florida',
            id: 'p984f92hdeq'
        }
    ]

    return(
        <div id='Home'>
            <div id='newProjectButtonBox'>
                <Button id='newProjectButton' variant='contained' component={Link} to='new'>New Project</Button>
            </div>
            {/* type = 1 implies the project style cards */}
            <DisplayCards type={1} projects={projects}/>
        </div>
    );
}
export default Home;