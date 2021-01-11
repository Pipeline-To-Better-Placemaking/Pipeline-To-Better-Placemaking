import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import BackHeader from '../components/BackHeader.js';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './activitySignUpStyles.js';

class ActivitySignUp extends Component {

    constructor(props){
        super(props);

        this.state = {
            activityName: props.getSelectedActivity().title
        }

        this.openPrevPage = this.openPrevPage.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("ProjectPage");
    }

    render() {

        return(
            <View style={styles.container}>
                <BackHeader headerText={this.state.activityName} prevPage={this.openPrevPage}/>
                <Text style={{textAlign:'center'}}>
                    Some content here displaying time slots, then let the user begin the activity
                </Text>
            </View>
        );
    }
}

export default ActivitySignUp;
