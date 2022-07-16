import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Back from '@mui/icons-material/ArrowBackRounded';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';

import './routes.css';
const registerURL = '/password_reset'

function ForgotPassword(props) {
    let nav = useNavigate();
    // to access fname lname...etc values.fname, do not access show(Confirm)Password
    const [values, setValues] = React.useState({
        email: '',
    });

    const [message, setMessage] = React.useState('');

    const em = React.useRef(null);
    const pw = React.useRef(null);
    const cpw = React.useRef(null);
    const registerResponse = React.useRef(null);
    const fnameMess = React.useRef(null);
    const lnameMess = React.useRef(null);
    const emMess = React.useRef(null);
    const pwMess = React.useRef(null);
    
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    // Handles visibility toggle for password fields

    const handleSubmit = (e) => {
        e.preventDefault();

        if (values.email === '' || values.email.length <= 7) {
            setMessage('Please provide an email (minimum length 7)');
            emMess.current.style.display = 'inline-block';
            em.current.focus();
            return;
        } else {
            emMess.current.style.display = 'none';
            submitNewUser(e);
        }
        
    }

    const submitNewUser = async (e) => {
        //register new user instead of login, not saving data
        try{
            const response = await axios.post(registerURL, JSON.stringify({email: values.email}), {
                headers: { 'Content-Type': 'application/json' },
            });
            //console.log(response.data);
            //console.log(response.accessToken);
            //console.log(JSON.stringify(response))
            let user = response.data;
            props.onLogin(true, user);
            //redirect user to url/home
            nav('/', { replace: true });
        } catch (error) {
            //user login error
            //console.log('ERROR: ', error);
            //success = false;
            setMessage(error.response.data?.message);
            registerResponse.current.style.display = 'inline-block';
            return;
        }
    }

    return(
        <div id='newUser'>
            <div className='pageTemplate'>
                <Link className='backButton' to='/'><Back className='iconShadow' /></Link>
                {/* tagBox - sizing for form card, on Title.js as well */}
                <div className='tagBox'>
                    <Card id='pageCard'>
                        <Card.Body>
                            <h3>Forgot Password?</h3>
                            <br/>
                            <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <span ref={ emMess } style={{ display: 'none', color: 'red' }}>{ message }</span>
                                <TextField 
                                    className='nonFCInput' 
                                    id='outlined-input' 
                                    label='Email' 
                                    type='email' 
                                    name='email'
                                    value={ values.email } 
                                    onChange={ handleChange }
                                    required
                                    ref={ em }
                                />
                                <br/>
                                <Button 
                                    className='scheme' 
                                    type='submit' 
                                    size='lg' 
                                    id='newUserButton' 
                                    onClick={ handleSubmit }
                                >
                                    Send Email
                                </Button>
                            </Box>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;