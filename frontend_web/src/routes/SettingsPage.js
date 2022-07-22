import * as React from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom'
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
import axios from '../api/axios';

function SettingsPage() {
    const loc = useLocation();
    const nav = useNavigate();

    const [values, setValues] = React.useState({
        updateFName: loc.state ? loc.state?.userToken?.user?.firstname : '',
        updateLName: loc.state ? loc.state?.userToken?.user?.lastname : '',
        updateEmail: loc.state ? loc.state?.userToken?.user?.email : '',
        updatePassword: '',
        confirmUpdatePassword: '',
        showPassword: false,
        showConfirmPassword: false
    });
    const [message, setMessage] = React.useState('');
    const infoMess = React.useRef(null);

    const handleChange = (prop) => (event) => {
        setValues({ 
            ...values, 
            [prop]: event.target.value 
        });
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

    const handleUpdate = (e) => {
        e.preventDefault();
        //console.log(values);
        if (values.updatePassword === '' && values.confirmUpdatePassword === '') {
            updateUser(false);
        } else if ((values.updatePassword !== '' && values.updatePassword !== values.confirmUpdatePassword) || (values.updatePassword === '' && values.updatePassword !== values.confirmUpdatePassword)) {
            setMessage(`Passwords do not match`);
            infoMess.current.style.display = 'inline-block';
            return;
        } else if (values.updatePassword !== '' && values.updatePassword === values.confirmUpdatePassword ){
            if (values.updatePassword.length < 8 || /\s/g.test(values.updatePassword) || !/\d/g.test(values.updatePassword) || !/[!@#$%^&*]/g.test(values.updatePassword) || !/[A-Z]/g.test(values.updatePassword)) {  
                setMessage(`*Please provide a valid password <br/><div style={{fontSize: 'smaller'}}> *Minimum password length of 8 characters, including a number, a symbol, and an uppercase letter</div>`);
                infoMess.current.style.display = 'inline-block';
                return;
            }
            updateUser(true);
        }
    }
     
    const updateUser = async (pw) => {

        var user = {}
        if (values.updateFName !== loc.state?.userToken?.user?.firstname && values.updateFName !== ''){
            user.firstname = values.updateFName;
        }
        if (values.updateLName !== loc.state?.userToken?.user?.lastname && values.updateLName !== '') {
            user.lastname = values.updateLName;
        }
        if (values.updateEmail !== loc.state?.userToken?.user?.email && values.updateEmail !== '') {
            user.email = values.updateEmail;
        }
        if(pw){
            user.password = values.updatePassword;
        }
        //console.log(user);

        try {
            const response = await axios.put('/users', JSON.stringify(user), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${loc.state.userToken.token}`
                },
                withCredentials: true
            });

            loc.state.userToken.user.firstname = response.data.firstname;
            loc.state.userToken.user.lastname = response.data.lastname;
            loc.state.userToken.user.email = response.data.email;

            nav(loc.state?.from, { replace: true, state: loc.state });

        } catch (error) {

            setMessage(error.response.data?.message);
            infoMess.current.style.display = 'inline-block';
            infoMess.current.style.width = '30vw';
            return;
        }

    }

    const verify = () => { }
    const userLogout = () => { }

    return(
        <div id='userSettings'>
            <h1>Settings</h1>
            <Card id='settingsCard'>
                <Card.Body>
                    <span ref={infoMess} style={{ display: 'none', color: 'red' }}>{message}</span>
                    <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField 
                            className='nonFCInput' 
                            id='outlined-input' 
                            label='First Name' 
                            type='text' 
                            value={ values.updateFName } 
                            onChange={ handleChange('updateFName') } 
                        />
                        <TextField 
                            className='nonFCInput' 
                            id='outlined-input' 
                            label='Last Name' 
                            type='text'
                            value={ values.updateLName } 
                            onChange={ handleChange('updateLName') } 
                        />
                        <TextField 
                            className='nonFCInput' 
                            id='outlined-input' 
                            label='Email' 
                            type='email' 
                            value={ values.updateEmail } 
                            onChange={ handleChange('updateEmail') } 
                        />
                        <FormControl sx={{ m: 1 }} variant='outlined'>
                            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                            <OutlinedInput
                                id='outlined-adornment-password'
                                type={ values.showPassword ? 'text' : 'password' }
                                value={ values.updatePassword }
                                onChange={ handleChange('updatePassword') }
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
                            <InputLabel htmlFor='outlined-adornment-password'> Confirm Password</InputLabel>
                            <OutlinedInput
                                id='outlined-adornment-password'
                                type={ values.showConfirmPassword ? 'text' : 'password' }
                                value={ values.confirmUpdatePassword }
                                onChange={ handleChange('confirmUpdatePassword') }
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='visibility toggle'
                                            onClick={ handleClickShowConPassword }
                                            onMouseDown={ handleMouseDownPassword }
                                            edge='end'
                                        >
                                            { values.showConfirmPassword ? <VisibilityOff /> : <Visibility /> }
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label='Confirm Password'
                            />
                        </FormControl>
                        <Button 
                            className='scheme' 
                            type='submit' 
                            size='lg' 
                            id='updateUserButton' 
                            onClick={ handleUpdate }
                        >
                            Update
                        </Button>
                        <br />
                        <Button
                            component={Link}
                            to={loc.state.from}
                            state={loc.state}
                            type='submit'
                            size='lg'
                            id='deleteButton'
                        >
                            Cancel
                        </Button>
                    </Box>
                </Card.Body>
            </Card>
            <Button id='verifyButton' type='submit' size='lg' onClick={ verify }>
                Verify Email
            </Button>
            <Button id='logoutSingle' type='submit' size='lg' onClick={ userLogout }>
                Log Out
            </Button>
        </div>
    );
}
export default SettingsPage;