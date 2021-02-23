import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Timer(props) {

    const updateTime = (value) => {
        console.log("timer: ", value-1);
        let temp = props.timeSlot;
        temp.timeLeft = value-1;
        props.setTimeSlot(temp);

        if (value-1 == 0){
            props.restart()
        }
    }

    
    return(
        <View style={{marginLeft: 175, marginTop: 5}}>
            <CountDown
                running={props.start}
                until={props.timeSlot.timeLeft}
                onChange={(value) => updateTime(value)}
                size={20}
                digitStyle={{backgroundColor: 'white'}}
                digitTxtStyle={{color: 'black'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: '', s: ''}}
                showSeparator
            />
        </View>
    )
}

export default Timer