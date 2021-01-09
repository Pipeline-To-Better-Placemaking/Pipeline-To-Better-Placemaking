import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './changeSettingsStyles.js';

const config = require('../../utils/config.js')

class ChangeNameScreen extends Component {

    constructor(props){
        super(props);

        this.state ={
            firstName: this.props.userDetails.firstName,
            lastName: this.props.userDetails.lastName,
            active: -1
        }

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
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

    onPressBack = () => {
        this.setState({
            active: 1
        });
    }

    onUnPressBack = () => {
        this.setState({
            active: -1
        });

        this.props.navigation.navigate("UserSettings");
    }

    onConfirmChange = async () => {

        let token = await AsyncStorage.getItem("@token")

        console.log("Confirming change...")
        let success = false

        await fetch(config.LOCALHOST + '/api/users/profile', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                institution: "University of Central Florida"
            })
        })
        .then((response) => (response.json()))
        .then(async (res) => (
            console.log(res),

            await this.props.updateUserName(this.state.firstName, this.state.lastName),
            this.props.navigation.navigate("UserSettings")
        ))
        .catch((error) => (console.log(error), success = false))
    }

    render(){

        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text category='h1' status='control'>
                        Change Name
                    </Text>
                </View>

                <View>
                    <Text category='label' style={styles.inputText}> First Name: </Text>
                    <Input
                        defaultValue={this.state.firstName}
                        onChangeText={this.onFirstNameChange}
                        style={styles.inputBox}
                    />
                </View>

                <View>
                    <Text category='label' style={styles.inputText}> Last Name: </Text>
                    <Input
                        defaultValue={this.state.lastName}
                        onChangeText={this.onLastNameChange}
                        style={styles.inputBox}
                    />
                </View>
                
                <Button size='giant' onPress={this.onConfirmChange} style={styles.confirmChangeButton}>
                    <Text style={styles.confirmChangeText}>
                        Confirm Change
                    </Text>
                </Button>

                <View style={styles.backButton}>
                    <Pressable onPressIn={this.onPressBack} onPressOut={this.onUnPressBack}>
                        <Text style={this.state.active === 1 ? styles.backTextPressed : styles.backText}>
                            &larr; Back
                        </Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}

export default ChangeNameScreen;