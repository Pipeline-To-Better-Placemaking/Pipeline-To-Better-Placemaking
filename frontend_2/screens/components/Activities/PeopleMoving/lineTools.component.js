import React from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import styles from './lineTools.styles.js';

export function LineTools(props) {

    const ConfirmIcon = (props) => {
        return(
            <View style={{alignSelf: 'center'}}>
                <Icon {...props} style={styles.iconSize} fill='green' name='checkmark'/>
            </View>
        )
    }

    const CancelIcon = (props) => {
        return(
            <View style={{alignSelf: 'center'}}>
                <Icon {...props} style={styles.iconSize} fill='red' name='close'/>
            </View>
        )
    }

    const RemoveIcon = (props) => {
        return(
            <View style={{alignSelf: 'center'}}>
                <Icon {...props} style={styles.iconSize} fill='red' name='trash-2-outline'/>
            </View>
        )
    }

    return (
        <View style={{flex: 1, flexDirection: 'row', marginTop: -90, justifyContent:'space-between'}}>

            <Button style={{flex:1}} appearance='ghost' onPress={props.confirm}>
                <View style={{flexDirection:'column'}}>
                    <Text category='s1' style={{alignSelf: 'center'}}> Confirm</Text>
                    <ConfirmIcon/>
                </View>
            </Button>

            <Button style={{flex:1}} appearance='ghost' onPress={props.cancel}>
                <View style={{flexDirection:'column'}}>
                    <Text category='s1' style={{alignSelf: 'center'}}> Cancel </Text>
                    <CancelIcon/>
                </View>
            </Button>

            <Button style={{flex:1}} appearance='ghost' onPress={props.removeLastPoint}>
                <View style={{flexDirection:'column'}}>
                    <Text category='s1' style={{alignSelf: 'center'}}> Delete </Text>
                    <RemoveIcon/>
                </View>
            </Button>

        </View>
    )
}
