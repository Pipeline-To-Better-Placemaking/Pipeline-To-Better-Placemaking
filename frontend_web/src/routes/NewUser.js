import * as React from 'react';
import { useState } from 'react';
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
import { Link, Navigate } from 'react-router-dom';
import axios from '../api/axios.js';

import './routes.css';

const registerURL = '/users'

function NewUser(){
    // to access fname lname...etc values.fname, do not access show(Confirm)Password
    const [values, setValues] = React.useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false
    });

    //declaring reg vars
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // Handles visibility toggle for password fields
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const submitNewUser = async (e) => {
        e.preventDefault();
        let res = null;
        let success = false;
        const user = { email, password };
        if(firstname !== '') user.firstname = firstname;
        if(lastname !== '') user.lastname = lastname;

        try{
            const response = await axios.post(registerURL, JSON.stringify({ email, password }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response))
            success = true;
            <Navigate to='/'/>
        } catch (error){
            //user login error
            console.log('ERROR: ', error);
            success = false;
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
                            <h3>Create an account</h3>
                            <br/>
                            <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <TextField  
                                    className='nonFCInput' 
                                    id='outlined-search' 
                                    label='First Name' 
                                    type='text' 
                                    value={ firstname } 
                                    onChange={ ({target}) => setFirstname(target.value) }
                                />
                                <TextField 
                                    className='nonFCInput' 
                                    id='outlined-search' 
                                    label='Last Name' 
                                    type='text' 
                                    value={ lastname } 
                                    onChange={ ({target}) => setLastname(target.value) }
                                />
                                <TextField 
                                    className='nonFCInput' 
                                    id='outlined-search' 
                                    label='Email' 
                                    type='email' 
                                    value={ email } 
                                    onChange={ ({target}) => setEmail(target.value) }
                                />
                                <FormControl sx={{ m: 1}} variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-password'
                                        type={values.showPassword ? 'text' : 'password' }
                                        value={ password }
                                        onChange={ ({target}) => setPassword(target.value) }
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='visibility toggle'
                                                    onClick={ handleClickShowPassword }
                                                    onMouseDown={ handleMouseDownPassword }
                                                    edge='end'
                                                >
                                                    { values.showPassword ? <VisibilityOff /> : <Visibility /> }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label='Password'
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1 }} variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-password'>
                                        Confirm Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-password'
                                        type={ values.showConfirmPassword ? 'text' : 'password' }
                                        value={ confirmPassword }
                                        onChange={ ({target}) => setConfirmPassword(target.value) }
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='visibility toggle'
                                                    onClick={ handleClickShowConPassword }
                                                    onMouseDown={ handleMouseDownPassword }
                                                    edge='end'
                                                >
                                                    {
                                                        values.showConfirmPassword ? 
                                                        <VisibilityOff /> : <Visibility />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label='Confirm Password'
                                    />
                                </FormControl>
                                <br/>
                                <Button 
                                    className='scheme' 
                                    type='submit' 
                                    size='lg' 
                                    id='newUserButton' 
                                    onClick={ submitNewUser }
                                >
                                    Create
                                </Button>
                            </Box>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default NewUser;