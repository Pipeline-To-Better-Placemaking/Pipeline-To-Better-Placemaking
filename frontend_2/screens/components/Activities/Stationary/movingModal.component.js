import React from 'react';
import { View, Modal } from 'react-native';

import { useTheme, Text, Button } from '@ui-kitten/components';

export function MovingModal(props) {

    const theme = useTheme();

    // Confirm the researcher has moved to the next spot
    const confirm = () => {
        props.confirm()
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.moving}>
            <View style={{height: '20%', marginTop: 'auto', backgroundColor:theme['background-basic-color-1'], borderTopLeftRadius: 35,borderTopRightRadius: 35,borderWidth: 1}}>
                <Text category={'h4'} style={{alignSelf: 'center', marginTop: 20}}>Move to the next position.</Text>
                <Button style={{marginTop: 30, width:200, alignSelf: 'center'}} onPress={confirm}> Confirm </Button>
            </View>
        </Modal>
    )
}
