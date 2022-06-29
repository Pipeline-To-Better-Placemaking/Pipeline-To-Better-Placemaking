import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Form } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';

function ActivityForm() {
    const [form, setForm] = React.useState(
        {
            title: '',
            activity: 'stationary_collections',
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
            <Button className='newHoveringButtons confirm' id='addButton' component={ Link }
                to='/home/teams/:id/projects/:id/activities/times'
                state={ form }
            >
                <AddIcon />
            </Button>
        </div>
    );
}

const testNames = [
    { label: 'Humans in Place', type: 'stationary_collections' },
    { label: 'Humans in Motion', type: 'moving_collections' },
    { label: 'Absence of Order Locator', type: 'order_collections' },
    { label: 'Spatial Boundaries', type: 'boundaries_collections' },
    { label: 'Lighting Profile', type: 'lighting_collections' },
    { label: 'Nature Prevalence', type: 'nature_collections' },
    { label: 'Acoustical Profile', type: 'sound_collections' },
];

export default ActivityForm;