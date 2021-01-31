import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import Timer from './Timer';

class TimeHeader extends Component {

    constructor(props){
        super(props)

        this.state = {
            start: props.start
        }

        this.timeStart = this.timeStart.bind(this)
    }

    async timeStart() {

        this.props.setStart()

        console.log("Start in header: " + this.props.start)
    }

    render() {

        const StartStopButton = () => {
            if (this.state.start) {
                return(
                    <Button status={'danger'} style={{height: 50, marginTop: 5, marginLeft: 5, width: 90}}> End </Button>
                )
            }
            else {
                return(
                    <Button style={{backgroundColor: '#006FD6'}} style={{height: 50, marginTop: 5, marginLeft: 5, width: 90}} onPress={this.timeStart}> Start </Button>
                )
            }
        }

        return(
            <View>
                <View style={{height: 60, flexDirection: 'row'}}>

                    <StartStopButton/>

                    {/* <Text style={{fontSize:20, marginLeft: 10, marginTop: 7}}> */}

                        <Timer 
                            start={this.props.start}
                            time={this.props.time}
                            initialTimeStart={this.props.initialTimeStart}
                            setTime={this.props.setTime}
                        />
                    {/* </Text> */}
                </View>
            </View>
        )
    }
}

export default TimeHeader