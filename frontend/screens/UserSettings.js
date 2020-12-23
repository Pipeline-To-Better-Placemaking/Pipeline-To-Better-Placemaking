import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import HomeBottomNav from './components/HomeBottomNav.js';

import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './styles/homeStyles.js';

class UserSettings extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <View style={styles.container}>
                <HomeBottomNav navigation={this.props.navigation} selectedIndex={2}/>
            </View>
        );
    }
}

export default UserSettings;
