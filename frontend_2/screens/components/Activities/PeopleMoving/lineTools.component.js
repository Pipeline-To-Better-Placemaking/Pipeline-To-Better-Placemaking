import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';

export function LineTools(props) {

    const ConfirmIcon = (props) => {
        return(
            <Icon {...props} style={{width: 100, height: 100, }} fill='green' name='checkmark'/>
        )
    }

    const CancelIcon = (props) => {
        return(
            <Icon {...props} style={{width: 100, height: 100, }} fill='red' name='close'/>
        )
    }

    const RemoveIcon = (props) => {
        return(
            <Icon {...props} style={{width: 100, height: 100, }} fill='black' name='trash'/>
        )
    }

    return (
        <View>

            <Button accessoryLeft={ConfirmIcon} onPress={props.confirm}/>

            <Button accessoryLeft={CancelIcon} onPress={props.cancel}/>

            <Button accessoryLeft={RemoveIcon} onPress={props.removeLastPoint}/>

        </View>
    )
}