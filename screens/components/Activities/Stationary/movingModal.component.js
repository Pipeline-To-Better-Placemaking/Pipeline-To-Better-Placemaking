import React from 'react';
import { View, Modal } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './movingModal.styles';

export function MovingModal(props) {

    const theme = useTheme();

    // Confirm the researcher has moved to the next spot
    const confirm = () => {
        props.confirm()
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.moving}>
            <View style={[ styles.modalContainer, {backgroundColor:theme['background-basic-color-1']}]}>
                <Text category={'h4'} style={styles.title}>Move to the next position.</Text>
                <Button style={styles.button} onPress={confirm}> 
                    <View>
                        <Text style={styles.buttonTxt}>Confirm</Text> 
                    </View>
                </Button>
            </View>
        </Modal>
    )
}
