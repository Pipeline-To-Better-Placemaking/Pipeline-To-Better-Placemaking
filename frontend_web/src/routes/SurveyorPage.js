import * as React from 'react';
import DisplayCards from '../components/DisplayCards';
import './routes.css';

function SurveyorPage(props) {
    const results = props.drawers;
    const surveyors = {}
    //default hardcoded Surveyor sample array for website
    Object.entries(results).forEach(([cat, obj])=>(
        Object.entries(obj).forEach(([date, dObj])=>(
            Object.entries(dObj).forEach(([time, tObj])=>(
                tObj.researchers.forEach((researcher)=>{
                    if(!surveyors[researcher._id]){
                        surveyors[researcher._id] = {};
                        surveyors[researcher._id].name = `${researcher.firstname} ${researcher.lastname}`;
                        surveyors[researcher._id].activities = [];
                    }
                    surveyors[researcher._id].activities.push({activity: cat, date: date, time: time});
                })
            ))
        ))
    ))

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
                <DisplayCards type={ 0 } surveyors={ surveyors }/>
            </div>
        </div>
    );
}
export default SurveyorPage;