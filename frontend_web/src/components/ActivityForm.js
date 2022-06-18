import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Form } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';

function ActivityForm(){
    const [form, setForm] = React.useState(
        {
            title: '',
            activity: 'stationaryCollections',
            date: new Date().toISOString().split('T')[0],
            timer: 15
        }
    );

    const handleChange = (key, ver) => (e) => {
        setForm({ ...form, [key]: e.target.value });
    };

    return(
        <div id='ActivityForm'>
            <div className='form-group'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' id='activityName' className='dateTimePickers' value={form.title} onChange={handleChange('title')} />
            </div>
            <div className='form-group'>
                <Form.Label>Activity Type</Form.Label>
                <Form.Select id='activitySelect' placeholder='Select an activity type' value={form.activity} aria-label='activitySelect' onChange={handleChange('activity')}>
                    {testNames.map((label) => (
                        <option
                            key={label.label}
                            value={label.type}
                        >
                            {label.label}
                        </option>
                    ))}
                </Form.Select>
            </div>
            <div className='form-group'>
                <Form.Label>Date</Form.Label>
                <Form.Control type='date' className='dateTimePickers' value={form.date} onChange={handleChange('date')} />
            </div>
            <div className='form-group'>
                <Form.Label>Time per Location</Form.Label>
                <Form.Control type='number' id='timerSelect' name='timerSelect' className='dateTimePickers' value={form.timer} min='5' max='100' onChange={handleChange('timer')} />
            </div>
            <Button className='newHoveringButtons' component={Link}
                to='/home/teams/:id/project/:id/activities/times'
                state={form}
            >
                <AddIcon />
            </Button>
        </div>
    );
}

const testNames = [
    { label: 'Humans in Place', type: 'stationaryCollections' },
    { label: 'Humans in Motion', type: 'movingCollections'},
    { label: 'Absence of Order Locator', type: 'orderCollections'},
    { label: 'Spatial and Shelter Boundaries', type: 'boundaryCollections' },
    { label: 'Lighting Profile', type: 'lightingCollections'},
    { label: 'Nature Prevalence', type: 'natureCollections'},
    { label: 'Acoustical Profile', type: 'soundCollections'},
];

const mapPoints = [
    { label: 'Click and drag to select', type: 'none' },
    { label: 'Location 1', type: 'standingPoint' },
    { label: 'Location 2', type: 'standingPoint' }, 
    { label: 'Location 3', type: 'standingPoint' }, 
    { label: 'Location 4', type: 'standingPoint' }, 
    { label: 'Location 5', type: 'standingPoint' }, 
    { label: 'Location 6', type: 'standingPoint' },
];
export default ActivityForm;