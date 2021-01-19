import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';

class StationaryActivity extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {

        return(
            <View>
                <Text>Stationary Activity</Text>
            </View>
        );
    }
}

export default StationaryActivity;
