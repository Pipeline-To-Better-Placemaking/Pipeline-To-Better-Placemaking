import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

import { styles } from './dataGroup.styles';

export function DataGroupGender(props) {

    const [genderIndex, setGenderIndex] = useState(-1)
    const [genderMatrix, setGenderMatrix] = useState([0,0,0,0])

    const _setGenderIndex = async (index) => {

        let mat = [0,0,0,0]
        mat[index] = 1

        await setGenderIndex(index)
        await setGenderMatrix(mat)
        await props.setGenderData(index, mat)
    }

    return(
        <View style={styles.containerSpacer}>
        <Text category={'h6'} style={styles.title}> Gender: </Text>
            <View style={styles.topRow}>
                <Button style={styles.buttonLeft} appearance={genderMatrix[0] ? 'primary' : 'outline'} onPress={() => _setGenderIndex(0)}>
                    <Text>Male</Text>
                </Button>
                <Button style={styles.buttonRight} appearance={genderMatrix[1] ? 'primary' : 'outline'} onPress={() => _setGenderIndex(1)}>
                    <Text>Female</Text>
                </Button>
            </View>
        </View>
    )
}
