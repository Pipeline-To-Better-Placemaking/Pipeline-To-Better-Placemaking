import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModalStyles.js';

class DataOptionButton extends Component {

    constructor(props){
        super(props)

        this.state = {
            text: props.text,
            selected: false,
            buttonStlye: 'outline'
        }
    }

    setIndex = async () => {
        await this.props.setIndex(this.props.index)

        await this.setState({
            selected: true
        })

        this.setSelectedAppearance()
    }

    setSelectedAppearance = () => {

        if (this.props.selectionMatrix[this.props.index]){
            this.setState({
                buttonStlye: 'primary'
            })
        }
    }

    setDefaultAppearance = () => {
        
        if (!this.props.selectionMatrix[this.props.index] && this.state.selected == true){
            this.setState({
                buttonStlye: 'outline',
                selected: false
            })
        }
    }

    componentDidUpdate() {

        this.setDefaultAppearance()
    }

    render() {
        return(
            <Button 
                appearance={this.state.buttonStlye}
                onPress={this.setIndex}
                style={{marginLeft: 15, width: 150}}>
                    {this.state.text}
            </Button>
        )
    }

}

export default DataOptionButton