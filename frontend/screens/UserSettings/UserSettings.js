import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import HomeBottomNav from '../components/BottomNav.js';

import { mapping, light, dark } from '@eva-design/eva';
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
                <View style={styles.header}>
                    <Text category='h5' style={styles.headerText}>
                        Settings
                    </Text>
                </View>

                <View style={{alignItems: 'center'}}>

                    <Button size='giant' onPress={this.onPressLogOut} style={styles.logOutButton}>
                        <Text style={styles.logOutText}>
                            Log Out
                        </Text>
                    </Button>


                    <Button style={{marginTop:50}} onPress={this.onToggleTheme}>Toggle Dark Mode</Button>

                </View>

                {/*The View is just the height of the bottom Nav bar*/}
                <View style={{height:50}}/>
                <HomeBottomNav navigation={this.props.navigation} selectedIndex={2}/>
            </View>
        );
    }
}

export default UserSettings;
