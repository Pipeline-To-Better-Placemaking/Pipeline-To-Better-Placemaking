import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Timer(props) {

    const [time] = useState(startTimerSetup)

    // useEffect(() => 
    //     { startTimerSetup();}
    // )

    const startTimerSetup = async () => {
        let timeLimit = await AsyncStorage.getItem("@time")
        console.log("Time is: " + time)
        return parseInt(timeLimit) * 60
    }

    
    return(
        <View style={{marginLeft: 175, marginTop: 5}}>
            <CountDown
                running={props.start}
                until={time}
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