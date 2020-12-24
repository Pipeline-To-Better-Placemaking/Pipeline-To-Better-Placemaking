import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import HomeBottomNav from '../components/BottomNav.js';

import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './collaborateStyles.js';

class Collaborate extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <View style={styles.container}>
                <HomeBottomNav navigation={this.props.navigation} selectedIndex={0}/>
            </View>
        );
    }
}

export default Collaborate;
