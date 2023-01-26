import * as React from 'react';
import { useLocation, useNavigate , Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import DoneIcon from '@mui/icons-material/Done';
import axios from '../api/axios';
import TimeForm from '../components/TimeForm';
import { testNames } from '../functions/HelperFunctions';
import '../components/controls.css';
import Map from '../components/Map';

export default function NewActivityTimes(props) {
    const nav = useNavigate();
    const loc = useLocation();
    const [message, setMessage] = React.useState('');
    const response = React.useRef(null);
    const [timeSlots, setTimeSlots] = React.useState([]);
    const date = new Date();
    const [activity, setActivity] = React.useState({
        title: loc.state.form.title && loc.state.form.title !== '' ? loc.state.form.title : testNames(loc.state.form.activity),
        activity: loc.state.form.activity,
        date: loc.state.form.date,
        timer: loc.state.form.timer,
        number: 0
    });

    const collections = {
        boundaries_maps: ['boundaries_collections', 'boundary'],
        light_maps: ['light_collections', 'light'],
        moving_maps: ['moving_collections', 'moving'],
        nature_maps: ['nature_collections', 'nature'],
        order_maps: ['order_collections', 'order'],
        sound_maps: ['sound_collections', 'sound'],
        stationary_maps: ['stationary_collections', 'stationary'],
        program_maps: ['program_collections', 'program']
    }

    //loading in center, areas, and subareas from information
    var center = { lat: props.projectInfo?.standingPoints[0].latitude, lng: props.projectInfo?.standingPoints[0].longitude };
    var area = props.projectInfo?.area?.points;
    var subAreas = props.projectInfo?.subareas;

    //dynamically adds removes timeSlot cards for the activity
    const timeCards = (timeSlots) => (
        timeSlots.map((value, index)=>(
            <Card key={ value.instance } className='timeSlots'>
                <Card.Body>
                    { value.points ?
                        <TimeForm 
                            type={value.type}
                            instance={value.instance}
                            index={value.index !== index ? index : value.index} 
                            time={value.time} 
                            maxResearchers={value.maxResearchers} 
                            points={value.points} 
                            deleteTime={ deleteTimeSlot } 
                            updateTime={ updateTimeSlot } 
                            standingPoints={props.projectInfo.standingPoints}
                        /> : 
                        <TimeForm
                            type={value.type}
                            instance={value.instance}
                            index={value.index !== index ? index : value.index}
                            time={value.time}
                            maxResearchers={value.maxResearchers}
                            deleteTime={deleteTimeSlot}
                            updateTime={updateTimeSlot}
                            standingPoints={props.projectInfo.standingPoints}
                        />
                     }
                </Card.Body>
            </Card>
        ))
    );

    function newTime(e) {
        var temp = timeSlots;
        if (activity.activity !== 'boundaries_maps' && activity.activity !== 'light_maps' && activity.activity !== 'nature_maps' && activity.activity !== 'order_maps'){
            temp.push({
                type: collections[activity.activity][1],
                instance: activity.number,
                index: temp.length,
                time: `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`}`,
                maxResearchers: 0,
                points: {},
                researchers: []
            });
        } else {
            temp.push({
                type: collections[activity.activity][1],
                instance: activity.number,
                index: temp.length,
                time: `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`}`,
                maxResearchers: 0,
                researchers: []
            });
        }
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
        var isoDate = new Date(`${activity.date}T00:00:00`)
        console.log(isoDate.toISOString());

        try {
            const response = await axios.post(`/projects/${props.projectInfo._id}/${collections[activity.activity][0]}`, JSON.stringify({ 
                title: activity.title,
                date: isoDate.toISOString(),
                area: props.projectInfo.subareas[0]._id,
                duration: `${activity.timer}`

            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${loc.state.userToken.token}` 
                },
                withCredentials: true
            });

            // create collection then add time slots to the collection
            let collectionDetails = await response.data;
            for(let i = 0; i < timeSlots.length; i++){
                await addNewTimeSlots(timeSlots[i], activity.title, collectionDetails._id, `${activity.activity}/`, timeSlots[i].type)
            }

            collectionDetails.test_type = collections[activity.activity][1];
            collectionDetails.date = new Date(collectionDetails.date);
            let area = props.projectInfo.subareas.findIndex((element) => element._id === collectionDetails.area);
            collectionDetails.area = props.projectInfo.subareas[area];

            nav('../', { replace: true, state: {team: loc.state.team, project: loc.state.project, userToken: loc.state.userToken} });
            
        } catch (error) {
            console.log('ERROR: ', error);
            setMessage(error.response.data?.message);
            response.current.style.display = 'inline-block';
            return;
        }
    }

    const addNewTimeSlots = async (timeSlot, title, id, timeSlotName, type) => {
        var selectedPoints = [];

        if (type !== 'boundary' && type !== 'nature' && type !== 'order' && type !== 'survey'){
            if(timeSlot.points && timeSlot.points.length !== 0){
                Object.entries(timeSlot.points).forEach(([pointInd, bool])=>(
                    bool ? selectedPoints.push(props.projectInfo.standingPoints[pointInd]) : null
                ))
            }
        } else {
            selectedPoints = props.projectInfo.standingPoints;
        }

        var adjusted = new Date(`${activity.date}T${timeSlot.time}`);
        console.log(adjusted);
        console.log(adjusted.toISOString())

        try {
            const response = await axios.post(`/${timeSlotName}`, JSON.stringify({
                title: title,
                standingPoints: selectedPoints,
                researchers: [],
                project: props.projectInfo._id, 
                collection: id,
                date: (adjusted.toISOString()),
                maxResearchers: `${timeSlot.maxResearchers}`
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${loc.state.userToken.token}`
                },
                withCredentials: true
            });

            let activityDetails = await response.data;

        } catch (error) {
            console.log('ERROR: ', error);
            setMessage(error.response.data?.message);
            response.current.style.display = 'inline-block';
            return;
        }

    }

    return(
        <div id='newActivityTimes'>
            <Card id='timeCard'>
                <Card.Header >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h1>{ activity.title }</h1>
                        <Button id='createActivityButton' className='confirm' onClick={addNewActivity}>Schedule Activity <DoneIcon /></Button>
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
                    <span ref={response} style={{ display: 'inline-block', color: 'red' }}>{message}</span>
                    <Button id='newTimeButton' onClick={ newTime } className='scheme'>New Time Slot</Button>
                    { timeCards(timeSlots) }
                </Card.Body>
                <Button component={ Link } to='../activities' state={{team: loc.state.team, project: loc.state.project, userToken: loc.state.userToken}}>Cancel</Button>

                {testNames(activity.activity) !== 'Identifying Program' ? null
                    : 
                    <Map center={center} area={area} points={subAreas} zoom={15} type={4} />}
            </Card>
        </div>
    );
}