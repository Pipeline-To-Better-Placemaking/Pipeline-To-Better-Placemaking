import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './changeSettingsStyles.js';

class ChangeEmail extends Component {

    constructor(props){
        super(props);

        this.state ={
            email: '',
            active: -1
        }

        this.onEmailChange = this.onEmailChange.bind(this);
    }

    onEmailChange(event) {

        this.setState({
            email: event
        })
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
            
    }

    render(){

        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text category='h1' status='control'>
                        Change Email
                    </Text>
                </View>

                <View>
                    <Text category='label' style={styles.inputText}> Email: </Text>
                    <Input
                    placeholder='Email...'
                    onChangeText={this.onEmailChange}
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

export default ChangeEmail;