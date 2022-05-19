import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

import { styles } from './dataGroup.styles';

export function DataGroupActivity(props) {

    const [activityIndex, setActivityIndex] = useState(-1)
    const [activityMatrix, setActivityMatrix] = useState([0,0,0,0,0])
    const [activityCount, setActivityCount] = useState(0)

    const _setActivityIndex = async (index) => {

        let mat = setTempMatrix()
        mat[index] = +!mat[index]

        if (activityCount < 2 && mat[index] == 1) {
            await setActivityIndex(index)
            await setActivityMatrix(mat)
            await setActivityCount(activityCount+1)
            await props.setActivityData(activityCount+1, mat)
        }
        else if (activityCount <= 2 && mat[index] == 0) {
            await setActivityIndex(index)
            await setActivityMatrix(mat)
            await setActivityCount(activityCount-1)
            await props.setActivityData(activityCount-1, mat)
        }
    }

    const setTempMatrix = () => {
        let mat = [0,0,0,0,0]

        for (let i = 0; i < 5; i++) {
            mat[i] = activityMatrix[i]
        }

        return mat
    }

    return(
        <View style={styles.container}>
        <Text category={'h6'} style={styles.title}> Activity: </Text>
            <View style={styles.topRow}>
                <Button style={styles.buttonLeft} appearance={activityMatrix[0] ? 'primary' : 'outline'} onPress={() => _setActivityIndex(0)}>Socializing</Button>
                <Button style={styles.buttonRight} appearance={activityMatrix[1] ? 'primary' : 'outline'} onPress={() => _setActivityIndex(1)}>Waiting</Button>
            </View>
            <View style={styles.bottomRow}>
                <Button style={styles.buttonLeft} appearance={activityMatrix[2] ? 'primary' : 'outline'} onPress={() => _setActivityIndex(2)}>Recreation</Button>
                <Button style={styles.buttonRight} appearance={activityMatrix[3] ? 'primary' : 'outline'} onPress={() => _setActivityIndex(3)}>Eating</Button>
            </View>

            <Button style={styles.buttonBottom} appearance={activityMatrix[4] ? 'primary' : 'outline'} onPress={() => _setActivityIndex(4)}>Solitary</Button>
        </View>
    )
}
