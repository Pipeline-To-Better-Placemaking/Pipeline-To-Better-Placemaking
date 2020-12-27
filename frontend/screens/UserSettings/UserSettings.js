import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import HomeBottomNav from '../components/BottomNav.js';

import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './userSettingsStyles.js';

class UserSettings extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    onPressLogOut = () => {

        this.props.navigation.navigate("TitleScreen");
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

                </View>

                {/*The View is just the height of the bottom Nav bar*/}
                <View style={{height:50}}/>
                <HomeBottomNav navigation={this.props.navigation} selectedIndex={2}/>
            </View>
        );
    }
}

export default UserSettings;
