import React from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';

export function LineTools(props) {

    const ConfirmIcon = (props) => {
        return(
            <Icon {...props} style={{width: 50, height: 50, }} fill='green' name='checkmark'/>
        )
    }

    const CancelIcon = (props) => {
        return(
            <Icon {...props} style={{width: 50, height: 50, }} fill='red' name='close'/>
        )
    }

    const RemoveIcon = (props) => {
        return(
            <Icon {...props} style={{width: 50, height: 50, }} fill='black' name='trash'/>
        )
    }

    return (
        <View style={{flex: 1, flexDirection: 'row', marginTop: -85}}>

                <Button style={{backgroundColor: 'white', borderWidth: 0, height: 80, width: 125}} accessoryLeft={ConfirmIcon} onPress={props.confirm}/>

                <Button style={{backgroundColor: 'white', borderWidth: 0, height: 80, width: 125}} accessoryLeft={CancelIcon} onPress={props.cancel}/>

                <Button style={{backgroundColor: 'white', borderWidth: 0, height: 80, width: 125}} accessoryLeft={RemoveIcon} onPress={props.removeLastPoint}/>
        </View>
    )
}