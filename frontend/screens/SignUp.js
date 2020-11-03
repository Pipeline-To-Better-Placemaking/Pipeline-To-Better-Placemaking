import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './styles/signUpStyles.js';

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
    }

    onFirstNameChange(event) {

        this.setState({
            firstName: event.target.value
        });
    }

    onLastNameChange(event) {

        this.setState({
            lastName: event.target.value
        });
    }

    onEmailChange(event) {

        this.setState({
            email: event.target.value
        })
    }

    onPassChange(event) {
        this.setState({
            pass: event.target.value
        });
    }

    onConfirmPassChange(event) {

        if (this.state.pass != event.target.value)
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

    onSignUp(props) {

        if (!this.state.passMatch)
        {
            this.setState({
                visible: true
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

        

        return(
            
            <View style={[styles.background, { backgroundColor: '#006FD6' }]}>

                {/* Allows the inputs to not be blocked by the keyboard. Behavior is different on different devices*/}
                <KeyboardAvoidingView
                behavior={"position"}
                style={{marginBottom: 60}}
                >
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
                            onChange={this.onFirstNameChange}
                            style={styles.inputBox}
                            />
                        </View>

                        <View>
                            <Text category='label' style={styles.inputText}> Last Name: </Text>
                            <Input
                            placeholder='Last name...'
                            onChange={this.onLastNameChange}
                            style={styles.inputBox}
                            />
                        </View>

                        <View>
                            <Text category='label' style={styles.inputText}> Email Address: </Text>
                            <Input
                            placeholder='Email address...'
                            onChange={this.onEmailChange}
                            style={styles.inputBox}
                            />
                        </View>

                        <View>
                            <Text category='label' style={styles.inputText}> Password:</Text>
                            <Input
                            placeholder='Password...'
                            caption='Should contain at least 8 symbols'
                            captionIcon={AlertIcon}
                            accessoryRight={renderIcon}
                            secureTextEntry={this.state.securityOption}
                            onChange={this.onPassChange}
                            />
                        </View>

                        <View>
                            <Text category='label' style={styles.inputText}> Confirm Password:</Text>
                            <Input
                            placeholder='Password...'
                            accessoryRight={renderIcon}
                            secureTextEntry={this.state.securityOption}
                            onChange={this.onConfirmPassChange}
                            status={this.state.passMatch ? "basic" : "danger"}
                            />
                        </View>

                    </View>
                </KeyboardAvoidingView>

                <Button size='giant' onPress={this.onSignUp} style={[{backgroundColor: '#DEBD07'}]}>
                    <Text style={ [ { color: '#091C7A', fontWeight: '600', fontSize: 18 } ] }>
                        Sign Up   
                    </Text>
                </Button>

                <Modal
                    visible={this.state.visible}
                >
                    <Text>test</Text>
                </Modal>

            </View>
            
        );
    }


}

export default SignUp
