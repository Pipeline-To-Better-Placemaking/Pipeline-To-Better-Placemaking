import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

import { styles } from './popupMessage.styles';

export const PopupMessage = (props) =>{
    if(props.visible){
        return(
            <View style={styles.container}>
                <Text category={'s1'} style={styles.text}>Do not leave the application once the test has started</Text>
            </View>
        )
    }
    else return null
}