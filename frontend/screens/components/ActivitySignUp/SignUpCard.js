import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';

class SignUpCard extends Component {

    constructor(props){
        super(props)

        this.state = {
            index: -1,
            positionNameArray: props.names,
            item: props.item
        }
    }

    setIndex = (index) => {
        this.setState({
            index: index-1
        })
    }


    render(){

        const PositionSelector = () => {
            console.log(this.state.index)
            console.log(this.state.positionNameArray)
            return(
                <Select style={{width: 100}} placeholder={' '}value={this.state.positionNameArray[this.state.index]} onSelect={index => this.setIndex(index)}>
                    {this.state.positionNameArray.map((name, key) => {
                        return(
                            <SelectItem title={name} key={key}/>
                        )
                    })}
                </Select>
            );
        }

        return(
            <Card>
                <View>
                    <Text style={{fontSize: 18, marginBottom: 10}}>
                        Position: {'\t'} 
                        <PositionSelector/>
                    </Text>
                </View>

                <Text style={{fontSize:18, marginBottom: 10}}>Time: {this.state.item.timeString}</Text>
                <Button>
                    Sign Up / Begin
                </Button>
            </Card>
        )
    }

}

export default SignUpCard