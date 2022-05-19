import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

import { styles } from './dataGroup.styles';

export function DataGroupAge(props) {

    const [ageIndex, setAgeIndex] = useState(-1)
    const [ageMatrix, setAgeMatrix] = useState([0,0,0,0,0,0])

    const _setAgeIndex = async (index) => {

        let mat = [0,0,0,0,0,0]
        mat[index] = 1

        await setAgeIndex(index)
        await setAgeMatrix(mat)
        await props.setAgeData(index, mat)
    }

    return(
        <View>
        <Text category={'h6'} style={styles.title}> Age: </Text>
            <View style={styles.topRow}>
                <Button style={styles.buttonLeft} appearance={ageMatrix[0] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(0)}>0 - 14</Button>
                <Button style={styles.buttonRight} appearance={ageMatrix[1] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(1)}>15 - 21</Button>
            </View>
            <View style={styles.bottomRow}>
                <Button style={styles.buttonLeft} appearance={ageMatrix[2] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(2)}>22 - 30</Button>
                <Button style={styles.buttonRight} appearance={ageMatrix[3] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(3)}>30 - 50</Button>
            </View>
            <View style={styles.bottomRow}>
                <Button style={styles.buttonLeft} appearance={ageMatrix[4] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(4)}>50 - 65</Button>
                <Button style={styles.buttonRight} appearance={ageMatrix[5] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(5)}>65+</Button>
            </View>
        </View>
    )
}
