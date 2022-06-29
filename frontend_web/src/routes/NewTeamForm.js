import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function NewTeamForm() {
    //Load users to add in names
    const [names, setNames] = React.useState([
        'James Man', 'Lilly Flowers', 'Some Guy'
    ]);

    const [formValues, setFormValues] = React.useState({
        title: '',
        description: '',
        users:[],
        public: false
    });

    const [message, setMessage] = React.useState('');
    const titleRef = React.useRef(null);
    const descRef = React.useRef(null);

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleMultiChange = (event) => {
        const { target: { value } } = event;
        setFormValues({
            // On autofill we get a stringified value.
            ...formValues, users: typeof value === 'string' ? value.split(',') : value,
        });
    };

    return(
        <div id='newTeamForm'>
            <Card id='newTeamCard'>
                <h1>Create a New Team</h1>
                <TextField
                    className='nonFCInput'
                    id='outlined-input'
                    label='Title'
                    name='title'
                    type='text'
                    value={formValues.title}
                    onChange={handleChange}
                    ref={titleRef}
                />
                <TextField
                    className='nonFCInput'
                    id='outlined-input'
                    label='Description'
                    name='description'
                    multiline
                    rows={2}
                    value={formValues.description}
                    onChange={handleChange}
                    ref={descRef}
                />
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id='demo-multiple-name-label'>Users</InputLabel>
                    <Select
                        labelId='multiSelectUsers'
                        id='multiSelectUsers'
                        multiple
                        value={formValues.users}
                        onChange={handleMultiChange}
                        input={<OutlinedInput label='Users' />}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Card>
        </div>
    );
}

export default NewTeamForm;