import * as React from 'react';

import DisplayCards from '../components/DisplayCards';
import './routes.css';

function SurveyorPage() {

    //default hardcoded Surveyor sample array for website
    const sampleS = [
        {
            name: 'John Smith',
            activities: [
                {
                    activity: 'Boundary',
                    date: '2/2/22',
                    time: '2pm'
                },
                {
                    activity: 'Lighting',
                    date: '3/1/22',
                    time: '4pm'
                }
            ]
        },
        {
            name: 'Anne Doe',
            activities: [
                {
                    activity: 'Boundary',
                    date: '2/2/22',
                    time: '12pm'
                },
                {
                    activity: 'Lighting',
                    date: '3/1/22',
                    time: '10am'
                }
            ]
        }
    ];

    return(
        <div id='SurveyorPage'>
            <div id='projectCardFlexBox'>
                {/* type = 0 implies Surveyor style cards */}
                <DisplayCards type={ 0 } surveyors={ sampleS }/>
            </div>
        </div>
    );
}
export default SurveyorPage;