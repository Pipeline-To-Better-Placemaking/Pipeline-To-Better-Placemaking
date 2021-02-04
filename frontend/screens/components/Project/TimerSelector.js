import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';

const times = ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"]

class TimerSelector extends Component {

    constructor(props){
        super(props)

        this.state = {
            timeIndex: -1
        }
    }

    setTimerIndex = (index) => {

        console.log("Props index: " + this.props.index)

        this.props.addTimerList(this.props.index, times[index-1])

        this.setState({
            timeIndex: index-1
        })
    }

    render() {

        return(
            <Select
                style={{width:110}}
                placeholder={times[0]}
                value={times[this.state.timeIndex]}
                onSelect={index => this.setTimerIndex(index)}
            >
                {times.map((time, key) => {
                    return(
                        <SelectItem title={time} key={key}/>
                    )})
                }
            </Select>
        )
    }
}

export default TimerSelector
