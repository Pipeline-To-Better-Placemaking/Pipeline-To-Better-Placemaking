import React, { Component } from 'react';
import { ScrollView, View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon } from '@ui-kitten/components';
import styles from './styles/logInStyles.js';
import * as Location from 'expo-location'; 

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
            securityOption: true
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
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

    onPressForgot = () => {
        this.setState({
            color: styles.forgotPressed.color,
            active: 0
        });

    }

    onUnPressForgot = () => {
        this.setState({
            active: -1
        });

        // this.props.navigation.navigate(""); // Forgot password
    }

    onPressLogIn = async () => {

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

                this.props.navigation.navigate("Home");
            }
        }
    }

    onPressBack = () => {
        this.setState({
            color: styles.backTextPressed.color,
            active: 2
        });

    }

    onUnPressBack = () => {
        this.setState({
            active: -1
        });

        this.props.navigation.navigate("TitleScreen");
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

        return(

            <View style={[styles.background, { backgroundColor: '#006FD6' }]} >
                <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent: 'center'}} keyboardShouldPersistTaps='handled'>

                    {/* Allows the inputs to not be blocked by the keyboard. Behavior is different on different devices*/}
                    <KeyboardAvoidingView
                    behavior={"position"}
                    style={{marginBottom: 30}}
                    >
                        <View style={styles.title}>
                            <Text category='h1' status='control'>
                                Log In
                            </Text>
                        </View>

                        <View>

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
                                accessoryRight={renderIcon}
                                secureTextEntry={this.state.securityOption}
                                onChange={this.onPassChange}
                                />
                            </View>

                        </View>
                    </KeyboardAvoidingView>

                    <View>
                        <Pressable onPressIn={this.onPressForgot} onPressOut={this.onUnPressForgot}>
                            <Text style={{ color: (this.state.active === 0 ? this.state.color : styles.forgotText.color), fontSize: 18, textAlign: 'center'} } >
                                Forgot Password?
                            </Text>
                        </Pressable>
                    </View>

                    <Button size='giant' onPress={this.onPressLogIn} style={[styles.logInButton]}>
                        <Text style={[{ color: styles.logInText.color, fontWeight: '600', fontSize: 18 }]}>
                            Log In
                        </Text>
                    </Button>

                    <View style={[styles.backButton]}>
                        <Pressable onPressIn={this.onPressBack} onPressOut={this.onUnPressBack}>
                            <Text style={{color: (this.state.active === 2 ? this.state.color : styles.backText.color), fontSize: 20}} >
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
