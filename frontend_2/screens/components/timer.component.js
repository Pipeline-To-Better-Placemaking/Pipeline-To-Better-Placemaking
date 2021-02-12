import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import CountDown from 'react-native-countdown-component';

export function Timer(props) {

    return(
        <View style={{marginLeft: 175, marginTop: 5}}>
            <CountDown
                running={props.start}
                until={props.timer*60}
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