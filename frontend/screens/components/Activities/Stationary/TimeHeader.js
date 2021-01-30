import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';

class TimeHeader extends Component {

    constructor(props){
        super(props)

        let timeString = this.formatInitialTime(props.time)

        this.state = {
            time: timeString,
            start: props.start
        }

        this.timeStart = this.timeStart.bind(this)
    }

    formatInitialTime = (time) => {

        let timeString = time
        timeString += ":"
        timeString += "00"

        return timeString
    }

    reformatTime = () => {

        let timeString = this.state.time
        let seconds_00 = timeString.substr(3,2)
        let minute = parseInt(timeString.substr(0,2))
        let seconds = parseInt(timeString.substr(3, 2))

        if (minute == 0 && seconds == 0){
            this.setState({
                time: "00:00"
            })

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

        console.log("Time: " + newTimeString)

        this.setState({
            time: newTimeString
        })
    }

    timeStart() {
    
        this.interval = setInterval(
            this.reformatTime
        , 1000)

        // console.log("IntervalID: " + this.interval)
    }

    componentWillUnmount() {

        // console.log("Unmounted IntervalID: " + this.interval)
        
        clearInterval(this.interval);
    }

    render() {

        return(
            <View>
                <View style={{height: 60, flexDirection: 'row'}}>
                    <Text style={{fontSize:20, marginLeft: 10, marginTop: 7}}>
                        <Button style={{backgroundColor: '#006FD6'}} onPress={this.timeStart}> Start </Button>
                        {'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}Time: {this.state.time}
                    </Text>
                </View>
            </View>
        )
    }
}

export default TimeHeader