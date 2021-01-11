import React, { Component } from 'react';
import { ScrollView, View,  Pressable, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Spinner } from '@ui-kitten/components';
import styles from './logInStyles.js';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = require('../../utils/config.js')

// **** TODO ****
//  1.) Forgot password
//  2.) Log into app

class LogIn extends Component {

    constructor(props)
    {
        super(props);

        this.state ={
            email: ' ',
            pass: ' ',
            active: -1,
            securityOption: true,
            loading: false,
            invalid: false
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
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

    onPressForgot = () => {
        this.setState({
            active: 0
        });
    }

    onUnPressForgot = () => {
        this.setState({
            active: -1
        });

        this.props.navigation.navigate("ForgotPasswordScreen"); // Forgot password
    }

    setLoading = (visible) => {
      this.setState({
          loading: visible
      });
    }

    onPressLogIn = async () => {
        this.setLoading(true);

        let defaultLocation = {
              "timestamp": 0,
              "coords": {
                "accuracy": -1,
                "altitude": -1,
                "altitudeAccuracy": -1,
                "heading": -1,
                "latitude": 28.602413253152307,
                "longitude": -81.20019937739713,
                "speed": 0
              }
            };

        let success = false
        let token = ''

        await fetch(config.LOCALHOST + '/api/users/authenticate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.pass
            })
        })
        .then((response) => (response.json()))
        .then((res) => (console.log(res), success = res.success, token=res.token))
        .catch((error) => (console.log(error), success = false))


        if (!success){
            this.setState({
                invalid: true
            })
        }
        else {
            console.log("Authentication successful")

            await AsyncStorage.setItem('@token', token);

            this.props.getCoords(defaultLocation);

            let enabled = await Location.hasServicesEnabledAsync();

            console.log(enabled);

            if (enabled)
            {
                let status = await Location.requestPermissionsAsync();

                console.log(status);

                if (status.granted)
                {
                    console.log("Gathering location...");

                    let location = await Location.getCurrentPositionAsync({});

                    this.props.getCoords(location);
                }
            }

            this.props.navigation.navigate("HomeNav")
        }

        this.setLoading(false);
    }

    onPressBack = () => {
        this.setState({
            active: 2
        });

    }

    onUnPressBack = () => {
        this.setState({
            active: -1
        });
    }

    render() {

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

        const InvalidWarning = () => {

            if (this.state.invalid){
                return (
                    <Text style={styles.invalidText}>
                        Invalid email or password.
                    </Text>
                )
            }
            else {
                return null
            }
        }

        return(

            <View backgroundColor={styles.container.backgroundColor} flex={1}>
                <Modal
                      animationType='fade'
                      transparent={true}
                      visible={this.state.loading}
                      >
                      <View style={styles.modalBackgroundStyle}>
                        <Spinner />
                      </View>
                </Modal>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>

                    {/* Allows the inputs to not be blocked by the keyboard. Behavior is different on different devices*/}
                    <KeyboardAvoidingView behavior={"position"} style={{marginBottom:30}}>
                        <View style={styles.title}>
                            <Text category='h1' status='control' style={{textAlign:'center'}}>
                                Log In
                            </Text>
                        </View>

                        <View>
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
                                accessoryRight={renderIcon}
                                secureTextEntry={this.state.securityOption}
                                onChangeText={this.onPassChange}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <InvalidWarning/>

                    <View>
                        <Pressable onPressIn={this.onPressForgot} onPressOut={this.onUnPressForgot}>
                            <Text style={this.state.active === 0 ? styles.forgotTextPressed : styles.forgotText}>
                                Forgot Password?
                            </Text>
                        </Pressable>
                    </View>

                    <Button size='giant' onPress={this.onPressLogIn} style={styles.logInButton}>
                        <Text style={styles.logInText}>
                            Log In
                        </Text>
                    </Button>

                    <View style={styles.backButton}>
                        <Pressable onPressIn={this.onPressBack} onPressOut={this.onUnPressBack}>
                            <Text style={this.state.active === 2 ? styles.backTextPressed : styles.backText}>
                                &larr; Back
                            </Text>
                        </Pressable>
                    </View>

                </ScrollView>

            </View>

        );
    }


}

export default LogIn
