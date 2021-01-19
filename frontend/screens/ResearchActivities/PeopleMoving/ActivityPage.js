import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';

class PeopleActivity extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {

        return(
            <View>
                <Text>People Activity</Text>
            </View>
        );
    }
}

export default PeopleActivity;
