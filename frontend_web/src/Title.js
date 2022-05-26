import * as React from 'react';
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

import { Link } from 'react-router-dom';

import './Title.css';
import logo1 from './images/city-isometric.jpg';
import logo2 from './images/construction.jpeg';

function Title() {

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginUser = async () => {

   }

  return (
    <div className='titlePage'>
      <div className='Title'>
        <div className='tag'>
          <div className='logo'>
            <Image src={logo1} className='App-logo' alt='logo' id='logo1'/>
            <Image src={logo2} className='App-logo' alt='logo' id='logo2' roundedCircle/>
          </div>
          <div id='tagText'>Pipeline to Better Placemaking</div>
        </div>
        <div className='tagBox'>
          <Card className='formCard'>
            <Card.Body>
              <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField className='nonFCInput' id='outlined-search' label='Email' type='email' value={values.email} onChange={handleChange('email')} />
                <FormControl sx={{ m: 1 }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='visibility toggle'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
                <Button className='scheme' id='loginButton' type='submit' size='lg' onClick={loginUser}>
                  Log in
                </Button>
              </Box>
              <div className='d-grid'>
                <Button component={Link} to='/new' className='scheme secondButton' size='lg'>
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
/*<header className='App-header'>
  <img src={logo} className='App-logo' alt='logo' />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className='App-link'
    href='https://reactjs.org'
    target='_blank'
    rel='noopener noreferrer'
  >
    Learn React
  </a>
</header>*/