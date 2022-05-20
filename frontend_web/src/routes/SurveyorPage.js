import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './routes.css';

function SurveyorPage() {

    const sampleS = [
        {
            name: 'John Smith',
            activities: [
                {
                    activity: 'Boundary',
                    date: '2/2/22'
                },
                {
                    activity: 'Lighting',
                    date: '3/1/22'
                }
            ]
        },
        {
            name: 'Anne Doe',
            activities: [
                {
                    activity: 'Boundary',
                    date: '2/2/22'
                },
                {
                    activity: 'Lighting',
                    date: '3/1/22'
                }
            ]
        }
    ];

    const surveyorCards = (surveyors) => (
        surveyors.map((surveyor, index) => (
            <Card key={'s'+index} className='projectCard'>
                <CardHeader title={surveyor.name}/>
                {surveyorActivities(surveyor.activities)}
            </Card>
        ))
    );

    const surveyorActivities = (activities) => (
        <CardContent>
       {activities.map((activity, index) =>(
            <div key={'a'+index} className='cardRow'>
                <Typography variant='text' component='div'>
                    {activity.activity}
                </Typography>
               <Typography variant='text' component='div'>
                   {activity.date}
               </Typography>
            </div>
        ))}
        </CardContent>
    );

    return(
        <div id='SurveyorPage'>
            <div id='projectCardFlexBox'>
                {surveyorCards(sampleS)}
            </div>
        </div>
    );
}
export default SurveyorPage;