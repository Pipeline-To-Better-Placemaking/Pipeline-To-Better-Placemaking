import React, { useState } from 'react';
import { ScrollView, View, TouchableWithoutFeedback, Modal } from 'react-native';
import { Icon, Text, Button, Input, Spinner } from '@ui-kitten/components';
import { BlueViewableArea } from '../components/content.component';

import { styles } from './signup.styles';

export const SignUpScreen = ( props ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [institution, setInstitution] = useState('');

    const [secureTextEntry, setSecureTextEntry] = useState(true);   // Display dots instead of text in password field
    const [loading, setLoading] = useState(false);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    
    const navigateBack = () => {
        props.navigation.goBack();
    };

    const handleSignup = async () => {
        setLoading(true);

        // Assemble the request body
        const userBody = {
            email: email,
            password: password
        };
        if (firstname !== '') userBody.firstname = firstname;
        if (lastname !== '') userBody.lastname = lastname;
        if (institution !== '') userBody.institution = institution;

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

    return (
        <BlueViewableArea>
            <ScrollView contentContainerStyle={styles.container}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={loading}
                >
                    <View style={styles.modalBackgroundStyle}>
                        <Spinner />
                    </View>
                </Modal>
                <Text category='h1' status='control'>Sign Up</Text>
                <View>
                    <Text category='label' style={styles.inputText}> Email Address: </Text>
                    <Input
                        placeholder='Email address...'
                        value={email}
                        onChangeText={(nextValue) => setEmail(nextValue)}
                        style={styles.inputBox}
                        autoCapitalize='none'
                        keyboardType="email-address"
                    />
                </View>
                <View>
                    <Text category='label' style={styles.inputText}> Password:</Text>
                    <Input
                        value={password}
                        placeholder='Password...'
                        autoCapitalize='none'
                        style={styles.inputBox}
                        accessoryRight={eyeIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setPassword(nextValue)}
                    />
                </View>
                <View>
                    <Text category='label' style={styles.inputText}> First Name: </Text>
                    <Input
                        placeholder='First name...'
                        value={firstname}
                        onChangeText={(nextValue) => setFirstname(nextValue)}
                        style={styles.inputBox}
                        autoCapitalize='none'
                    />
                </View>
                <View>
                    <Text category='label' style={styles.inputText}> Last Name: </Text>
                    <Input
                        placeholder='Last name...'
                        value={lastname}
                        onChangeText={(nextValue) => setLastname(nextValue)}
                        style={styles.inputBox}
                        autoCapitalize='none'
                    />
                </View>
                <View>
                    <Text category='label' style={styles.inputText}> Institution: </Text>
                    <Input
                        placeholder='Institution...'
                        value={institution}
                        onChangeText={(nextValue) => setInstitution(nextValue)}
                        style={styles.inputBox}
                        autoCapitalize='none'
                    />
                </View>
                <SignUpButton />
                <BackButton />
            </ScrollView>
        </BlueViewableArea>
    );
};