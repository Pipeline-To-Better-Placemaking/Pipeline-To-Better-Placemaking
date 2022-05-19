import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

import { styles } from './dataGroupMovement.styles';

export function DataGroupMovement(props) {

    const [movementIndex, setMovementIndex] = useState(-1)
    const [movementMatrix, setMovementMatrix] = useState([0,0,0,0,0])

    const _setMovementIndex = async (index) => {


        let mat = [0,0,0,0,0]
        mat[index] = 1

        await setMovementIndex(index)
        await setMovementMatrix(mat)
        await props.setMovementData(index, mat)
    }

    return(
        <View style={styles.conatainer}>
        <Text category={'h6'} style={styles.textTitle}> Movement: </Text>
            {/* <View style={{flexDirection: 'row', justifyContent:'space-around'}}> */}
                <Button style={styles.button} appearance={movementMatrix[0] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(0)}>Walking</Button>
                <Button style={styles.button} appearance={movementMatrix[1] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(1)}>Running</Button>
            {/* </View> */}
            {/* <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-around'}}> */}
                <Button style={styles.button} appearance={movementMatrix[2] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(2)}>Swimming</Button>
                <Button style={styles.button} appearance={movementMatrix[3] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(3)}>Activity on Wheels</Button>
            {/* </View> */}
            {/* <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-around'}}> */}
                <Button style={styles.button} appearance={movementMatrix[4] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(4)}>Handicap Assisted Wheels</Button>
            {/* </View> */}
        </View>
    )
}
