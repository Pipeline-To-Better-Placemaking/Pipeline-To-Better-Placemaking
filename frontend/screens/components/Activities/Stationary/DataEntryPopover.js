import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';

class DataEntryPopover extends Component {

    constructor(props){
        super(props)

        this.state = {
            visible: props.visible
        }

    }

    render() {

        return(
            <View style={{backgroundColor: 'white', color: 'white', flex: 1}}>
                <Popover style={{height: 575, width: 350, marginTop: 15}} anchor={this.props.anchor} placement={'top'} visible={this.props.visible}>
                    <View>
                        <Text category={'h1'} style={{alignSelf: 'center'}}>Data</Text>
                        <Text category={'s1'} style={{alignSelf: 'center', marginTop: -20}}>___________</Text>

                        <View style={{flexDirection: 'column'}}>
                            <Text category={'h6'} style={{marginBottom: 10}}> Age: </Text>

                            <View style={{flexDirection: 'row',}}>
                                <Button appearance={'outline'} style={{marginLeft: 50, width: 100}}>0 - 14</Button>
                                <Button appearance={'outline'} style={{marginLeft: 50, width: 100}}>15 - 24</Button>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <Button appearance={'outline'} style={{marginLeft: 50, width: 100}}>25-64</Button>
                                <Button appearance={'outline'} style={{marginLeft: 50, width: 100}}>65+</Button>
                            </View>

                            <Text category={'h6'} style={{marginBottom: 10, marginTop: 25}}> Gender: </Text>

                            <View style={{flexDirection: 'row',}}>
                                <Button appearance={'outline'} style={{marginLeft: 50, width: 100}}>Male</Button>
                                <Button appearance={'outline'} style={{marginLeft: 50, width: 100}}>Female</Button>
                            </View>

                            <Text category={'h6'} style={{marginBottom: 10, marginTop: 25}}> Activity: </Text>

                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <Button appearance={'outline'} style={{marginLeft: 15, width: 150}}>Talking</Button>
                                <Button appearance={'outline'} style={{marginLeft: 15, width: 150}}>Transit Waiting</Button>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <Button appearance={'outline'} style={{marginLeft: 15, width: 150}}>Recreation</Button>
                                <Button appearance={'outline'} style={{marginLeft: 15, width: 150}}>Eating</Button>
                            </View>

                        </View>

                        <Button onPress={this.props.closeData}> please </Button>
                    </View>
                </Popover>
            </View>
        )
    }
}

export default DataEntryPopover