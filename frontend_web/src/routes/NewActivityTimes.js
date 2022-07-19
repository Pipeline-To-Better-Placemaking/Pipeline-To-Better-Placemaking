import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import DoneIcon from '@mui/icons-material/Done';

import TimeForm from '../components/TimeForm';
import { testNames } from '../functions/HelperFunctions';
import '../components/controls.css';

function NewActivityTimes(props) {
    const loc = useLocation();
    const date = new Date();
    const [activity, setActivity] = React.useState({
        title: loc.state.form.title,
        activity: loc.state.form.activity,
        date: loc.state.form.date,
        timer: loc.state.form.timer,
        number: 0
    });

    const [timeSlots, setTimeSlots] = React.useState([]);

    const collections = {
        boundaries_maps: 'boundariesCollections',
        light_maps: 'lightCollections',
        moving_maps: 'movingCollections',
        nature_maps: 'natureCollections',
        order_maps: 'orderCollections',
        sound_maps: 'soundCollections',
        stationary_maps: 'stationaryCollections'
    }

    //dynamically adds removes timeSlot cards for the activity
    const timeCards = (timeSlots) => (
        timeSlots.map((value, index)=>(
            <Card key={ value.instance } className='timeSlots'>
                <Card.Body>
                    <TimeForm 
                        instance={value.instance}
                        index={value.index !== index ? index : value.index} 
                        time={value.time} 
                        surveyors={value.surveyors} 
                        points={value.points} 
                        deleteTime={ deleteTimeSlot } 
                        updateTime={updateTimeSlot} 
                        standingPoints={props.projectInfo.standingPoints}
                    />
                </Card.Body>
            </Card>
        ))
    );

    function newTime(e) {
        var temp = timeSlots;
        temp.push({
            instance: activity.number,
            index: temp.length,
            time: `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`}`,
            surveyors: 0,
            points: {}
        });
        setTimeSlots(temp);
        //shallow comparison for React to recognize for update
        var num = activity.number;
        num++;
        setActivity({ ...activity, number: num })
    }

    function updateTimeSlot(index, timeForm){
        var temp = [];
        timeSlots.forEach((card, ind) => ind !== index ? temp.push(card) : temp.push(timeForm));
        setTimeSlots(temp);
    }

    function deleteTimeSlot(index) {
        var temp = [];
        timeSlots.forEach((card, ind) => ind !== index ? temp.push(card) : null);
        setTimeSlots(temp);
    }

    const addNewActivity = (e) => {
        // timeSlots hold an array of objects with (index, instance) time, surveyors, and points (standingPoints)
        // props.projectInfo._id <-- gets projectId
    

        //API call to add activity, with time slots (there can be multiple)
    }

    console.log(timeSlots);

    return(
        <div id='newActivityTimes'>
            <Card id='timeCard'>
                <Card.Header >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h1>{ activity.title }</h1>
                        <Button id='createActivityButton' className='confirm'>Schedule Activity <DoneIcon /></Button>
                    </div>
                    Project: {props.projectInfo.title}
                    <br/>
                    Category: { testNames(activity.activity) }
                    <br />
                    Date: { activity.date }
                    <br />
                    Time per Location: { activity.timer }
                </Card.Header>
                <Card.Body id='timeCardContent'>
                    <Button id='newTimeButton' onClick={ newTime } className='scheme'>New Time Slot</Button>
                    { timeCards(timeSlots) }
                </Card.Body>
            </Card>
        </div>
    );
}

export default NewActivityTimes;