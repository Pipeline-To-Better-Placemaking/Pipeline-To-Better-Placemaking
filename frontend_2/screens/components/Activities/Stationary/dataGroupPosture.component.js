import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

import { styles } from './dataGroup.styles';

export function DataGroupPosture(props) {

    const [postureIndex, setPostureIndex] = useState(-1)
    const [postureMatrix, setPostureMatrix] = useState([0,0,0,0])

    const _setPostureIndex = async (index) => {

        let mat = [0,0,0,0]
        mat[index] = 1

        await setPostureIndex(index)
        await setPostureMatrix(mat)
        await props.setPostureData(index, mat)
    }

    return(
        <View style={styles.container}>
        <Text category={'h6'} style={styles.title}> Posture: </Text>
            <View style={styles.topRow}>
                <Button style={styles.buttonLeft} appearance={postureMatrix[0] ? 'primary' : 'outline'} onPress={() => _setPostureIndex(0)}>Standing</Button>
                <Button style={styles.buttonRight} appearance={postureMatrix[1] ? 'primary' : 'outline'} onPress={() => _setPostureIndex(1)}>Sitting</Button>
            </View>
            <View style={styles.bottomRow}>
                <Button style={styles.buttonLeft} appearance={postureMatrix[2] ? 'primary' : 'outline'} onPress={() => _setPostureIndex(2)}>Laying Down</Button>
                <Button style={styles.buttonRight} appearance={postureMatrix[3] ? 'primary' : 'outline'} onPress={() => _setPostureIndex(3)}>Squating</Button>
            </View>
        </View>
    )
}
