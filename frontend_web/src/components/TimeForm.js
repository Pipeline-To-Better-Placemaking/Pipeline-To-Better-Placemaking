import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

function TimeForm(props) {
    const date = new Date();
    const activitySelection = useLocation();
    const index = props.index;
    const standingPoints = props.standingPoints;
    const [timeForm, setTimeForm] = React.useState({
        instance: props.instance,
        index: props.index,
        time: props.time,
        surveyors: props.surveyors,
        points: props.points
    });

    const handleChange = (key) => (e) => {
        setTimeForm({ ...timeForm, [key]: e.target.value });
    };

    const handleChecked = (event) => {
        // updating an object instead of a Map
        setTimeForm({ ...timeForm, points: { ...timeForm.points, [event.target.name]: event.target.checked } });
    }

    const handleDelete = (index) => (e) => {
        props.deleteTime(index);
    }

    React.useEffect(() => {
        props.updateTime(index, timeForm)
    }, [timeForm]);

    React.useEffect(() => {
        setTimeForm({
            ...timeForm, index: props.index})
    }, [props.index]);

    console.log(index);

    return(
        <div className='timeForm'>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <h5>Time Slot</h5> 
                <Button id='deleteButton' onClick={ handleDelete(timeForm.index) }><DeleteIcon /></Button> 
            </div>
            <div className='form-group'>
                <Form.Label>Start Time:</Form.Label>
                <Form.Control id='timeSelect' type='time' placeholder='Select an activity type' value={ timeForm.time } aria-label='timeSelect' onChange={ handleChange('time') }/>
            </div>
            <br/>
            <div className='form-group'>
                <Form.Label>Maximum Number of Researchers:</Form.Label>
                <Form.Control id='surveyorSelect' type='number' value={ timeForm.surveyors } aria-label='surveyorsSelect' onChange={ handleChange('surveyors') }/>
            </div>
            <br />
            <div className='form-group'>
                <Form.Label>Points:</Form.Label>
                <div className="mb-3">
                    { standingPoints.map((point, index) => (
                        <Form.Check
                            inline
                            key={point._id}
                            label={`${point.title}`}
                            name={`${point._id}`}
                            type='checkbox'
                            id={`inline-checkbox-${index}`}
                            onChange={handleChecked}
                        />
                    )) }
                </div>
            </div>
        </div>
    );
}
export default TimeForm;