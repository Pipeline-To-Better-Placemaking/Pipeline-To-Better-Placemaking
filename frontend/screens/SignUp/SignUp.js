import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './signUpStyles.js';

// **** TODO ****
//  1.) Add input boxes for first name, last name, email, and password -- Complete
//  2.) Hook up checks for email and password
//      - Check if email is "correct" and unique
//      - Check if password is secure, i.e. 8 letters, uppercase, symbol
//  3.) Set up confirmation page after sign up is successful
//  4.) Hook up sign up page to confirmation page
//  5.) Fix any sort of keyboard blockage problem that may occur -- Complete
//  6.) Ask about whether we should get rid of First / Last name parameter

class SignUp extends Component {

    constructor(props)
    {
        super(props);

        this.state ={
            firstName: ' ',
            lastName: ' ',
            email: ' ',
            pass: ' ',
            confirmPass: ' ',
            signInError: false,
            passMatch: true,
            securityOption: true,
            visible: false
        }

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onConfirmPassChange = this.onConfirmPassChange.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.signUpError = this.signUpError.bind(this);
    }

    onFirstNameChange(event) {

        this.setState({
            firstName: event
        });
    }

    onLastNameChange(event) {

        this.setState({
            lastName: event
        });
    }

    onEmailChange(event) {

        this.setState({
            email: event
        })
    }

    onPassChange(event) {
        this.setState({
            pass: event
        });
    }

    onConfirmPassChange(event) {

        if (this.state.pass != event)
        {
            this.setState({
                passMatch: false
            });
        }
        else
        {
            this.setState({
                passMatch: true
            });
        }
    }

    onPressBack = () => {
        this.setState({
            active: 1
        });
    }

    onUnPressBack = () => {
        this.setState({
            active: -1
        });

        this.props.navigation.navigate("TitleScreen");
    }

    signUpError = () => {

        if (this.state.signInError)
        {
            return (
                <Text visible={this.state.signInError} style={styles.signUpErrorMessage}> One or more of the options are incorrect. </Text>
            );
        }

        return null;
    }

    async onSignUp() {

        var err = 0

        console.log(this.state.firstName)
        console.log(this.state.lastName)
        console.log(this.state.pass)
        console.log(this.state.email)

        await fetch('http://192.168.0.27:27017/api/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                institution: "University of Central Florida",
                email: this.state.email,
                password: this.state.pass
            })
        })
        .then((response) => (response.json()))
        .then((res) => (console.log(res.msg)))
        .catch((error) => (console.log(error), err = 1))

        if (err)
        {
            console.log("Error.");
            this.setState({
                signInError: true
            })
        }
    }


    render() {

        const AlertIcon = (props) => (
            <Icon {...props} name='alert-circle-outline'/>
        );

        const renderIcon = (props) => (
            <TouchableWithoutFeedback onPress={toggleSecurity}>
              <Icon {...props} name={this.state.securityOption ? 'eye-off' : 'eye'}/>
            </TouchableWithoutFeedback>
          );

        const toggleSecurity = () => {
            this.setState({
                securityOption: !this.state.securityOption
            });
        }

        const SignUpErrorMessage = () => {
            return this.signUpError();
        }

        return(

            <View style={{backgroundColor: styles.container.backgroundColor, flex: 1}}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>

                    {/* Allows the inputs to not be blocked by the keyboard. Behavior is different on different devices*/}
                    <KeyboardAvoidingView behavior={"position"} style={{marginBottom: 60}}>
                        <View style={styles.title}>
                            <Text category='h1' status='control'>
                                Sign Up
                            </Text>
                        </View>

                        <View>

                            <View>
                                <Text category='label' style={styles.inputText}> First Name: </Text>
                                <Input
                                placeholder='First name...'
                                onChangeText={this.onFirstNameChange}
                                style={styles.inputBox}
                                />
                            </View>

                            <View>
                                <Text category='label' style={styles.inputText}> Last Name: </Text>
                                <Input
                                placeholder='Last name...'
                                onChangeText={this.onLastNameChange}
                                style={styles.inputBox}
                                />
                            </View>

                            <View>
                                <Text category='label' style={styles.inputText}> Email Address: </Text>
                                <Input
                                placeholder='Email address...'
                                autoCapitalize='none'
                                onChangeText={this.onEmailChange}
                                style={styles.inputBox}
                                />
                            </View>

                            <View>
                                <Text category='label' style={styles.inputText}> Password:</Text>
                                <Input
                                placeholder='Password...'
                                autoCapitalize='none'
                                caption='Should contain at least 8 symbols'
                                captionIcon={AlertIcon}
                                accessoryRight={renderIcon}
                                secureTextEntry={this.state.securityOption}
                                onChangeText={this.onPassChange}
                                />
                            </View>

                            <View>
                                <Text category='label' style={styles.inputText}> Confirm Password:</Text>
                                <Input
                                placeholder='Password...'
                                autoCapitalize='none'
                                accessoryRight={renderIcon}
                                secureTextEntry={this.state.securityOption}
                                onChangeText={this.onConfirmPassChange}
                                status={this.state.passMatch ? "basic" : "danger"}
                                />
                            </View>

                        </View>
                    </KeyboardAvoidingView>

                    <SignUpErrorMessage/>

                    <Button size='giant' onPress={this.onSignUp} style={styles.signUpButton}>
                        <Text style={styles.signUpText}>
                            Sign Up
                        </Text>
                    </Button>

                    <View style={styles.backButton}>
                        <Pressable onPressIn={this.onPressBack} onPressOut={this.onUnPressBack}>
                            <Text style={this.state.active === 1 ? styles.backTextPressed : styles.backText}>
                                &larr; Back
                            </Text>
                        </Pressable>
                    </View>

                </ScrollView>
            </View>

        );
    }


}

export default SignUp
