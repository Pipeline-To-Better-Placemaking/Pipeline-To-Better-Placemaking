import * as React from 'react';
import { useState } from 'react';
import axios from '../api/axios.js';
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Link, Navigate } from 'react-router-dom';

import './routes.css';
import logo1 from '../images/PtBPLogo.png';

function Title() {
    // Access email, password like values.email, do not mutate or modify
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();
        const user = { email, password };

        try {
            const response = await axios.post('/login', JSON.stringify({ email, password }), {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });
            console.log(JSON.stringify(response));
            console.log(response.data);
            //nav issue not yet resolved (6/12) need to move logged user to home
            <Navigate to='/home'/>

        } catch(error){
            //user login error
            console.log('ERROR: ', error);
        }
    };

    const logoutUser = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };

    return (
        <div className='titlePage'>
            {/* pageTemplate -> Blue base background */}
            <div className='pageTemplate'>
                {/* tag - sizing for logo/tag (title text) */}
                <div className='tag'>
                    <div className='logo'>
                        <Image src={ logo1 } className='App-logo' alt='logo' id='logo1'/>
                    </div>
                    <div id='tagText'>Pipeline to Better Placemaking</div>
                </div>
                <div className='tagBox'>
                    <Card className='formCard'>
                        <Card.Body>
                            <Box id='titleBox' component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <TextField 
                                    className='nonFCInput' 
                                    id='outlined-search' 
                                    label='Email' 
                                    type='email' 
                                    name='email' 
                                    value={ email } 
                                    onChange={({target}) => setEmail(target.value)} 
                                />
                                {/* Form Control component to hold MUI visibility changing password field */}
                                <FormControl sx={{ m: 1 }} variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-password'
                                        type={ values.showPassword ? 'text' : 'password' }
                                        name='password'
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
                                <Button 
                                    className='scheme' 
                                    id='loginButton' 
                                    type='submit' 
                                    size='lg' 
                                    onClick={ loginUser }
                                >
                                    Log in
                                </Button>
                            </Box>
                            <div className='d-grid'>
                                <Button component={ Link } to='/new' className='scheme secondButton' size='lg'>
                                    Create Account
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Title;