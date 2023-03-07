import React from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from '@ui-kitten/components';

import { styles } from './lineTools.styles.js';

export function LineTools(props) {

    const ConfirmIcon = (props) => {
        return(
            <View style={styles.columnView}>
                <Icon {...props} style={styles.iconSize} fill='green' name='checkmark'/>
            </View>
        )
    }

    const CancelIcon = (props) => {
        return(
            <View style={styles.columnView}>
                <Icon {...props} style={styles.iconSize} fill='red' name='close'/>
            </View>
        )
    }

    const RemoveIcon = (props) => {
        return(
            <View style={styles.columnView}>
                <Icon {...props} style={styles.iconSize} fill='red' name='trash-2-outline'/>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Button style={styles.button} appearance='ghost' onPress={props.confirm}>
                <View style={styles.buttonView}>
                    <Text category='s1' style={styles.columnView}> Confirm</Text>
                    <ConfirmIcon/>
                </View>
            </Button>

            <Button style={styles.button} appearance='ghost' onPress={props.cancel}>
                <View style={styles.buttonView}>
                    <Text category='s1' style={styles.columnView}> Cancel </Text>
                    <CancelIcon/>
                </View>
            </Button>

            <Button style={styles.button} appearance='ghost' onPress={props.removeLastPoint}>
                <View style={styles.buttonView}>
                    <Text category='s1' style={styles.columnView}> Delete </Text>
                    <RemoveIcon/>
                </View>
            </Button>

        </View>
    )
}
