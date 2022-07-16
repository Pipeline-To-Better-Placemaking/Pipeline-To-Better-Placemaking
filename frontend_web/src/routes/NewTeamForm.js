import * as React from 'react';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios.js';
import './routes.css';

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
    let nav = useNavigate();
    let loc = useLocation();
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
    const addTeamResponse = React.useRef(null);
    const titleRef = React.useRef(null);
    const titleMess = React.useRef(null);

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    /*const handleMultiChange = (e) => {
        const { target: { value } } = e;
        setFormValues({
            // On autofill we get a stringified value.
            ...formValues, users: typeof value === 'string' ? value.split(',') : value,
        });
    };*/

    const handleChecked = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.checked });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formValues.title || formValues.title === ''){
            setMessage('Please provide a team name');
            titleMess.current.style.display = 'block';
            titleRef.current.focus();
            return;
        } else {
            titleMess.current.style.display = 'none';
            //call API function
            submitNewTeam(e);
        }
    }

    const submitNewTeam = async (e) => {
        //add new team
        try {
            const response = await axios.post('/teams', JSON.stringify({ title: formValues.title, description: formValues.description, public: formValues.public }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response.data);
            //console.log(response.accessToken);
            //console.log(JSON.stringify(response))
            //redirect user to url/home
            nav('/home', { replace: true, state: loc.state });
        } catch (error) {
            //console.log('ERROR: ', error);
            //success = false;
            setMessage(error.response.data?.message);
            addTeamResponse.current.style.display = 'inline-block';
            return;
        }
    }

    return(
        <div id='newTeamForm'>
            <Card id='newTeamCard'>
                <h1>Create a New Team</h1>
                <span>Create a team to create projects and begin surveying. </span>
                <br/>
                <Card.Body>
                    <span ref={addTeamResponse} style={{ display: 'none', color: 'red' }}>{message}</span>
                    <span ref={titleMess} style={{ display: 'none', color: 'red' }}>{message}</span>
                    <TextField
                        className='nonFCInput'
                        id='outlined-input'
                        label='Title'
                        name='title'
                        type='text'
                        value={formValues.title}
                        onChange={handleChange}
                        required
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
                    />
                    {/*<FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id='demo-multiple-name-label'>Users *</InputLabel>
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
                            </FormControl>*/}
                    <FormControl>
                        <FormControlLabel 
                            control={<Checkbox
                                name='public'
                                checked={formValues.public}
                                onChange={handleChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />} 
                            label="Public" 
                        />
                    </FormControl>
                    <br/>
                    <span style={{fontSize: 'smaller'}}>*Any team you create will have you as an admin and user by default.</span>
                    <br/>
                    <Button 
                        className='scheme' 
                        type='submit' 
                        size='large' 
                        onClick={handleSubmit} 
                        id='newTeamFormButton'
                    >
                        Create Team
                    </Button>
                </Card.Body>
                
            </Card>
        </div>
    );
}

export default NewTeamForm;