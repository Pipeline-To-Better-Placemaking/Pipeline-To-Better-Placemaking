import * as React from 'react';
import Button from '@mui/material/Button';
import { Form } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';

function ActivityForm(){
    const [form, setForm] = React.useState(
        {
            activity: '',
            date: '',
            time: ''
        }
    );

    const handleChange = (key) => (event) => {
        setForm({...form, [key]: event.target.value});
    };

    const handleSubmit = (event) => {
        
    }

    return(
        <div id='ActivityForm'>
            <Form.Select id='activitySelect' aria-label="activitySelect" onChange={handleChange('activity')}>
                {testNames.map((label) => (
                    <option
                        key={label.label}
                        value={label.type}
                    >
                        {label.label}
                    </option>
                ))}
            </Form.Select>
            <input type='date' className='dateTimePickers' onChange={handleChange('date')}/>
            <input type='time' className='dateTimePickers' onChange={handleChange('time')} />
            <Button className='newHoveringButtons' onClick={handleSubmit}><AddIcon /></Button>
        </div>
    );
}

const testNames = [
    {label: 'Humans in Place', type: 'stationaryCollections' },
    {label: 'Humans in Motion', type: 'movingCollections'},
    {label: 'Absence of Order Locator', type: 'orderCollections'},
    {label: 'Lighting Profile', type: 'lightingCollections'},
    {label: 'Nature Prevalence', type: 'natureCollections'},
    {label: 'Acoustical Profile', type: 'soundCollections'},
];
export default ActivityForm;