import * as React from 'react';
import { useLocation, useNavigate , Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import DoneIcon from '@mui/icons-material/Done';
import axios from '../api/axios';

import TimeForm from '../components/TimeForm';
import { testNames } from '../functions/HelperFunctions';
import '../components/controls.css';

function NewActivityTimes(props) {
    const nav = useNavigate();
    const loc = useLocation();
    const [message, setMessage] = React.useState('');
    const response = React.useRef(null);

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
        boundaries_maps: ['boundaries_collections', 'boundary'],
        light_maps: ['light_collections', 'light'],
        moving_maps: ['moving_collections', 'moving'],
        nature_maps: ['nature_collections', 'nature'],
        order_maps: ['order_collections', 'order'],
        sound_maps: ['sound_collections', 'sound'],
        stationary_maps: ['stationary_collections', 'stationary']
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
                        surveyors={value.maxResearchers} 
                        points={value.points} 
                        deleteTime={ deleteTimeSlot } 
                        updateTime={ updateTimeSlot } 
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
            maxResearchers: 0,
            points: {},
            researchers: []
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

    const addNewActivity = async (e) => {
        try {
            const response = await axios.post(`/projects/${props.projectInfo._id}/${collections[activity.activity][0]}`, JSON.stringify({ 
                title: activity.title,
                date: activity.date
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${loc.state.userToken.token}` 
                },
                withCredentials: true
            });
            //console.log(JSON.stringify(response));
            let user = response.data;
            // user login confirmation and navigation handling in App.js
            // retrieve user's name or name and token to verify status
            props.onLogin(true, user);

            //redirect user to url/home
            nav('/home', { state: { userToken: user } });

        } catch (error) {
            //user login error
            //console.log('ERROR: ', error);
            setMessage(error.response.data?.message);
            response.current.style.display = 'inline-block';
            return;
        }
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
                    <span ref={response} style={{ display: 'none', color: 'red' }}>{message}</span>
                    <Button id='newTimeButton' onClick={ newTime } className='scheme'>New Time Slot</Button>
                    { timeCards(timeSlots) }
                </Card.Body>
                <Button component={Link} to='../activities' state={{team: loc.state.team, project: loc.state.project, userToken: loc.state.userToken}}>Cancel</Button>
            </Card>
        </div>
    );
}

export default NewActivityTimes;