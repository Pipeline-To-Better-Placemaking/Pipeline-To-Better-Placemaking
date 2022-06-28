import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import '../routes/routes.css';

function DisplayCards(props) {

    //Surveyor Cards have surveyor name in header
    const surveyorCards = (surveyors) => (
        surveyors.map((surveyor, index) => (
            <Card key={ 's' + index } className='displayCard'>
                <CardHeader title={ surveyor.name } />
                { surveyorActivities(surveyor.activities) }
            </Card>
        ))
    );

    //Activity renders in the body
    const surveyorActivities = (activities) => (
        <CardContent>
            { activities.map((activity, index) => (
                <div key={ 'a' + index } className='cardRow'>
                    <Typography variant='text' component='div'>
                        { activity.activity }
                    </Typography>
                    <Typography variant='text' component='div'>
                        { activity.date }
                    </Typography>
                    <Typography variant='text' component='div'>
                        { activity.time }
                    </Typography>
                </div>
            )) }
        </CardContent>
    );

    //For Better Placemaking projects listed on home page (url)/home
    const projectCards = (projects) => (
        projects.map((project, index) => (
            <Card key={ 'p'+index } className='displayCard'>
                <CardContent>
                    <Typography variant='h5' component='div'>
                        { project.name }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button component={ Link } to='project/:id' state={ project.name }>View</Button>
                    <Button component={ Link } to='edit/:id' state={ project.name }>Edit</Button>
                </CardActions>
            </Card>
        ))
    );

    const teamCards = (teams) => (
        teams.map((team, index)=>(
            <Card key={'p' + index} className='displayCard'>
                <CardContent>
                    <Typography variant='h5' component='div'>
                        {team.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button component={Link} to='teams/:id' state={ team.name }>View Projects</Button>
                    <Button component={Link} to='edit/:id' state={ team.name }>Edit Team</Button>
                </CardActions>
            </Card>
        ))
    );

    return(
        <div id='cardFlexBox'>
            { props.type === 0 ? surveyorCards(props.surveyors) : (props.type === 1 ? projectCards(props.projects) : teamCards(props.teams))}
        </div>
    );

}
export default DisplayCards;