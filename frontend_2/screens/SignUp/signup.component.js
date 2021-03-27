import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, View, Platform, TouchableWithoutFeedback, Modal } from 'react-native';
import { Icon, Text, Button, Input, Spinner } from '@ui-kitten/components';
import { BlueViewableArea } from '../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

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

        let defaultLocation = {
            "latitude": 28.602413253152307,
            "longitude": -81.20019937739713,
        };

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
                // Store user information
                await AsyncStorage.setItem("@token", res.token)
                await AsyncStorage.setItem("@id", res.user._id)
                await AsyncStorage.setItem("@isVerified", JSON.stringify(res.user.is_verified))
                await AsyncStorage.setItem("@email", res.user.email)
                await AsyncStorage.setItem("@firstName", res.user.firstname)
                await AsyncStorage.setItem("@lastName", res.user.lastname)
                await AsyncStorage.setItem("@teams", JSON.stringify(res.user.teams))
                await AsyncStorage.setItem("@invites", JSON.stringify(res.user.invites))

                // Request permission to use location
                let { status } = await Location.requestPermissionsAsync();

                if (status === 'granted') {
                    defaultLocation = await Location.getCurrentPositionAsync({});
                    defaultLocation = defaultLocation.coords
                } else {
                    console.log('Permission to access location was denied');
                }

                await props.setLocation(defaultLocation);
                await props.setSignedIn(true);
                await setLoading(false);

                // Navigate to home page
                props.navigation.navigate("TabNavigation")
            }
            // else display error message
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
