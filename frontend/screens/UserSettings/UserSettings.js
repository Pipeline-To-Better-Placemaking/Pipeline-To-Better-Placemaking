import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import MyHeader from '../components/MyHeader.js';

import { Text, Button, Input, Icon, Modal, Toggle } from '@ui-kitten/components';
import styles from './userSettingsStyles.js';

class UserSettings extends Component {

    constructor(props){
        super(props);

        this.state = {

        }

        this.onToggleTheme = this.onToggleTheme.bind(this);
    }

    onPressLogOut = () => {

        this.props.navigation.navigate("TitleScreen");
    }

    onToggleTheme = () => {
        this.props.toggleTheme();
    }

    render() {
        return(
            <View style={styles.container}>

                <MyHeader myHeaderText={"Settings"}/>

                <View style={{ alignItems: 'center', marginTop:30}}>

                    <Button size='giant' onPress={this.onPressLogOut} style={styles.logOutButton}>
                        <Text style={styles.logOutText}>
                            Log Out
                        </Text>
                    </Button>


                    <Button style={{marginTop:50}} onPress={this.onToggleTheme}>Toggle Dark Mode</Button>

                </View>

            </View>
        );
    }
}

export default UserSettings;
