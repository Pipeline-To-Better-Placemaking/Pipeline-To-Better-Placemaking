import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, View, Platform, TouchableWithoutFeedback, Modal } from 'react-native';
import { Icon, Text, Button, Input, Spinner } from '@ui-kitten/components';
import { BlueViewableArea } from '../components/content.component';

import { styles } from './signup.styles';

export const SignUpScreen = ( props ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [secureTextEntry, setSecureTextEntry] = useState(true);   // Display dots instead of text in password field
    const [loading, setLoading] = useState(false);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const navigateBack = () => {
        props.navigation.goBack();
    };

    const handleSignup = async () => {

        if (password != confirmPassword) {
            return
        }

        if (passwordProblems === true && isValidEmail == false){
            setPasswordTouched(true)
            setEmailTouched(true)
            return
        }
        else if (passwordProblems === true) {
            setPasswordTouched(true)
            return
        }
        else if (isValidEmail == false) {
            setEmailTouched(true)
            return
        }

        setLoading(true);

        // Assemble the request body
        const userBody = {
            email: email,
            password: password
        };
        if (firstname !== '') userBody.firstname = firstname;
        if (lastname !== '') userBody.lastname = lastname;

        try {
            // Make an HTTP request to create a new user
            const response = await fetch('https://measuringplacesd.herokuapp.com/api/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userBody)
            });
            const res = await response.json();

            console.log('OK: ' + response.ok, 'Signup response: ' + JSON.stringify(res));

            if (response.ok) {
                // Redirect to the login page
                props.navigation.navigate('Login');
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const checkEmail = () => {
        if (!/.+\@.+\..+/g.test(email)) return false;
        if (/\s/g.test(email)) return false;
        return true;
    }

    const checkPassword = () => {

        if (password.length < 8 || 
            /\s/g.test(password) ||
            !/\d/g.test(password) ||
            !/[!@#$%^&*]/g.test(password) ||
            !/[A-Z]/g.test(password)) {

            return true
            
        }
        else {
            return false
        }
    }

    const nonMatchingPasswords = () => {

        if (password == confirmPassword) {

            return null
        }
        else {

            return (
                <Text style={{color: '#FF3D71'}}>
                    Passwords do not match.
                </Text>
            )
        }

    }

    const passwordRequirement = () => {

        if (passwordProblems == false) {
            return null
        }
        else if (passwordTouched && passwordProblems) {
            return (
                <Text style={{color: '#FF3D71'}}>
                    Must contain at least 8 characters, one digit, one symbol, and one uppercase letter.
                </Text>
            )
        }
        else {
            return null
        }
    }

    const SignUpButton = () => (
        <Button style={styles.signUpButton} onPress={handleSignup}>
            <Text style={styles.signUpText}>
                Sign Up
            </Text>
        </Button>
    );

    const BackButton = () => (
        <Button appearance={'ghost'} onPress={navigateBack} style={{marginTop:15}}>
            <Text status={'control'} category='h5'>
               &larr; Back
            </Text>
        </Button>
    );

    const eyeIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const isValidEmail = checkEmail();
    const passwordProblems = checkPassword();

    return (
        <View style={{flex: 1, color:'#006FD6', backgroundColor:'#006FD6'}}>
            <View style={styles.container}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={loading}
                >
                    <View style={styles.modalBackgroundStyle}>
                        <Spinner />
                    </View>
                </Modal>
                <KeyboardAvoidingView behavior={"position"}>
                <Text style={{alignSelf: 'center'}} category='h1' status='control'>Sign Up</Text>
                <View>
                    
                    <Text category='label' style={styles.inputText}> Email Address: </Text>
                    <Input
                        value={email}
                        placeholder='Email address...'
                        style={styles.inputBox}
                        autoCapitalize='none'
                        keyboardType="email-address"
                        onFocus={() => setEmailTouched(true)}
                        onChangeText={nextValue => setEmail(nextValue)}
                        caption={
                            emailTouched && !isValidEmail &&
                            <Text style={{color: '#FF3D71'}}>
                                Email address is not valid
                            </Text>
                        }
                    />
                </View>
                <View>
                    <Text category='label' style={styles.inputText}> Password:</Text>
                    <Input
                        value={password}
                        placeholder='Password...'
                        style={styles.inputBox}
                        autoCapitalize='none'
                        accessoryRight={eyeIcon}
                        secureTextEntry={secureTextEntry}
                        onFocus={() => setPasswordTouched(true)}
                        onChangeText={nextValue => setPassword(nextValue)}
                        caption={passwordRequirement()}
                    />
                </View>
                <View>
                    <Text category='label' style={styles.inputText}> Confirm Password:</Text>
                    <Input
                        value={confirmPassword}
                        placeholder='Confirm Password...'
                        style={styles.inputBox}
                        autoCapitalize='none'
                        accessoryRight={eyeIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setConfirmPassword(nextValue)}
                        caption={nonMatchingPasswords()}
                    />
                </View>
                <View>
                    <Text category='label' style={styles.inputText}> First Name: </Text>
                    <Input
                        value={firstname}
                        placeholder='First name...'
                        style={styles.inputBox}
                        onChangeText={(nextValue) => setFirstname(nextValue)}
                    />
                </View>
                    <Text category='label' style={styles.inputText}> Last Name: </Text>
                    <Input
                        value={lastname}
                        placeholder='Last name...'
                        style={styles.inputBox}
                        onChangeText={(nextValue) => setLastname(nextValue)}
                    />
                </KeyboardAvoidingView>
                
                <SignUpButton/>
                <BackButton />
            </View>
            </View>
    );
};
