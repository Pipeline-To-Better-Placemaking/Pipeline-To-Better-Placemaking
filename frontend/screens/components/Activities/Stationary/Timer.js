import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';

var time = ""

class Timer extends Component {

    constructor(props){
        super(props)

        this.state = {
            time: props.time,
            start: props.start,
            initial: props.initialTimeStart
        }
    }

    reformatTime = () => {

        let timeString = this.state.time
        let seconds_00 = timeString.substr(3,2)
        let minute = parseInt(timeString.substr(0,2))
        let seconds = parseInt(timeString.substr(3, 2))

        if (minute == 0 && seconds == 0){
            // this.props.setTime("00:00")

            clearInterval(this.interval)

            return;
        }

        if (seconds_00 == "0" || seconds_00 =="00"){
            minute -= 1
            seconds = 60
        }

        seconds = (seconds-1) % 60

        let minuteString = ""

        if (minute < 10) {
            minuteString = "0"
            minuteString += minute.toString()
        }
        else {
            minuteString = minute.toString()
        }

        let secondsString = ""

        if (seconds < 10) {
            secondsString = "0"
            let secondString2 = seconds.toString()

            secondsString += secondString2
        }
        else {
            secondsString += seconds.toString()
        }

        let colon = ":"

        let newTimeString = minuteString + colon + secondsString

        this.props.setTime(newTimeString)
    }

    componentDidMount() {

        if (this.state.start && this.state.initial) {

            this.interval = setInterval(
                this.reformatTime
            , 1000)
        }
    }

    componentDidUpdate() {

        if (this.state.start && this.state.initial) {

            this.setState({
                initial: 0
            })
        }

    }

    componentWillUnmount() {
        
        clearInterval(this.interval);
    }

    render() {

        return(
            <View>
                <Text style={{fontSize:20, marginLeft: 15, marginTop: 35}}>
                    {'\t'}{'\t'}{'\t'}{'\t'}{'\t'}Time: {this.props.time}
                </Text>
            </View>
        )
    }
}

export default Timer