import React from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTheme, Text } from '@ui-kitten/components';


import { styles } from './modal.styles';

export function ErrorMessage(props) {

    const theme = useTheme();

    return(
        <Modal transparent={true} animationType='fade' visible={props.visible}>
            <TouchableWithoutFeedback onPress={() => props.back()}>
                <View style={styles.messageContainer}>
                    <View style={[ styles.messageViewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        <Text style={styles.messageTxt} category='s1' >Error sending link, there is no account associated with the email address: {props.email}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}