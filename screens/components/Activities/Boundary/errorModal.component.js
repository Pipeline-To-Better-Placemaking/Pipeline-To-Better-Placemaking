import React from 'react';
import { View, Modal } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './errorModal.styles';

export function ErrorModal(props){
    const theme = useTheme();

    // dismiss the error modal
    const dismiss = () => {
        props.dismiss();
    }

    return( 
        <Modal transparent={true} animationType='fade' visible={props.errorModal}>
            <View style={styles.background}>
                <View style={[ styles.modalContainer, {backgroundColor:theme['background-basic-color-1']}]}>
                    <Text category={'h5'} style={styles.title}>{props.errorMessage}</Text>
                    <Button style={styles.button} onPress={dismiss}>Ok</Button>
                </View>
            </View>
        </Modal>
    )
}
