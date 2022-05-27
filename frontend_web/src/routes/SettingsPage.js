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

function SettingsPage(){
    const [values, setValues] = React.useState({
        updateFName: '',
        updateLName: '',
        updateEmail: '',
        updatePassword: '',
        confirmUpdatePassword: '',
        showPassword: false,
        showConfirmPassword: false
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

    const handleClickShowConPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const updateUser = () => { }
    const verify = () => { }
    const userLogout = () => { }

    return(
        <div id='userSettings'>
            <h1>Settings</h1>
            <Card id='settingsCard'>
                <Card.Body>
                    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField className='nonFCInput' id='outlined-search' label='First Name' type='text' value={values.updateFName} onChange={handleChange('updateFName')} />
                        <TextField className='nonFCInput' id='outlined-search' label='Last Name' type='text' value={values.updateLName} onChange={handleChange('updateLName')} />
                        <TextField className='nonFCInput' id='outlined-search' label='Email' type='email' value={values.updateEmail} onChange={handleChange('updateEmail')} />
                        <FormControl sx={{ m: 1 }} variant='outlined'>
                            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                            <OutlinedInput
                                id='outlined-adornment-password'
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.updatePassword}
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
                        <FormControl sx={{ m: 1 }} variant='outlined'>
                            <InputLabel htmlFor='outlined-adornment-password'> Confirm Password</InputLabel>
                            <OutlinedInput
                                id='outlined-adornment-password'
                                type={values.showConfirmPassword ? 'text' : 'password'}
                                value={values.confirmUpdatePassword}
                                onChange={handleChange('confirmPassword')}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='visibility toggle'
                                            onClick={handleClickShowConPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge='end'
                                        >
                                            {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label='Confirm Password'
                            />
                        </FormControl>
                        <br />
                        <Button className='scheme' type='submit' size='lg' id='updateUserButton' onClick={updateUser}>
                            Update
                        </Button>
                    </Box>
                </Card.Body>
            </Card>
            <br/>
            <Button id='verifyButton' type='submit' size='lg' onClick={verify}>
                Verify Email
            </Button>
            <br/>
            <Button id='logoutSingle' type='submit' size='lg' onClick={userLogout}>
                Log Out
            </Button>
        </div>
    );
}
export default SettingsPage;