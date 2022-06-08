import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

import './routes.css';
import logo1 from '../images/PtBPLogo.png';

function Title(props) {
    let nav = useNavigate();
    const email = React.useRef(null);
    const password = React.useRef(null);
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

    const handleLogin = (event) => {
        event.preventDefault();
        
        if(values.email === ''){
            email.current.focus();
            return;
        } else if (values.password === ''){
            password.current.focus();
            return;
        }
        
        loginUser();
    };

    const loginUser = async () => {
        let success = false;
        let res = null;

        try {

            const response = await fetch('https://measuringplacesd.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                },
                body: {
                    email: values.email,
                    password: values.password
                }
            });

            res = JSON.parse(await response.text());
            success = res.success;

            //user login confirmation and navigation handling in App.js
            props.onLogin(true);

            //redirect use to url/home
            nav('/home/', { replace: true });
        } catch ( error ) {
            console.log('ERROR: ', error);
            success = false;
            //create error component
        }
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
                                    ref={email}
                                    value={ values.email } 
                                    onChange={ handleChange } 
                                />
                                {/* Form Control component to hold MUI visibility changing password field */}
                                <FormControl sx={{ m: 1 }} variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-password'
                                        type={ values.showPassword ? 'text' : 'password' }
                                        name='password'
                                        ref={ password }
                                        value={ values.password }
                                        onChange={ handleChange }
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
                                    onClick={ handleLogin }
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