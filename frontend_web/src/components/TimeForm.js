import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

function TimeForm(props){
    const date = new Date();
    const activitySelection = useLocation();
    const [timeForm, setTimeForm] = React.useState({
        index: props.index,
        time: `${date.getHours()}:${date.getMinutes()}`,
        surveyors: [],
        points: []
    });

    const handleChange = (key, ver) => (e) => {
        setTimeForm({ ...timeForm, [key]: e.target.value });
    };

    const handleDelete = (index) => (e) => {
        props.deleteTime(index);
    }

    return(
        <div className='timeForm'>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <h5>Time Slot { timeForm.index + 1 }</h5> 
                <Button id='deleteButton' onClick={ handleDelete(timeForm.index) }><DeleteIcon /></Button> 
            </div>
            <div className='form-group'>
                <Form.Label>Start Time:</Form.Label>
                <Form.Control id='timeSelect' type='time' placeholder='Select an activity type' value={ timeForm.time } aria-label='timeSelect' onChange={ handleChange('time') }/>
            </div>
            <br/>
            <div className='form-group'>
                <Form.Label>Surveyors:</Form.Label>
                <Form.Select id='surveyorSelect' multiple={ true } value={ timeForm.surveyors } aria-label='surveyorsSelect' onChange={ handleChange('surveyors') }>
                    { timeForm.surveyors.map((surveyor, index) => (
                        <option
                            key={ surveyor }
                            value={ surveyor }
                        >
                            { surveyor }
                        </option>
                    )) }
                </Form.Select>
            </div>
            <br />
            <div className='form-group'>
                <Form.Label>Points:</Form.Label>
                <Form.Select id='pointSelect' multiple={ true } value={ timeForm.points } aria-label='pointSelect' onChange={ handleChange('points') }>
                    { timeForm.points.map((point, index) => (
                        <option
                            key={ `Point ${index}` }
                            value={ point }
                        >
                            { `Point ${index}` }
                        </option>
                    )) }
                </Form.Select>
            </div>
        </div>
    );
}
export default TimeForm;