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
                <Button style={styles.button} appearance={movementMatrix[0] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(0)}>
                    <View>
                        <Text style={movementMatrix[0] ? styles.buttonTxt : styles.offButtonTxt}>Walking</Text>
                    </View>
                </Button>
                <Button style={styles.button} appearance={movementMatrix[1] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(1)}>
                    <View>
                        <Text style={movementMatrix[1] ? styles.buttonTxt : styles.offButtonTxt}>Running</Text>
                    </View>
                </Button>
            {/* </View> */}
            {/* <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-around'}}> */}
                <Button style={styles.button} appearance={movementMatrix[2] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(2)}>
                    <View>
                        <Text style={movementMatrix[2] ? styles.buttonTxt : styles.offButtonTxt}>Swimming</Text>
                    </View>
                </Button>
                <Button style={styles.button} appearance={movementMatrix[3] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(3)}>
                    <View>
                        <Text style={movementMatrix[3] ? styles.buttonTxt : styles.offButtonTxt}>Activity on Wheels</Text>
                    </View>
                </Button>
            {/* </View> */}
            {/* <View style={{flexDirection: 'row', marginTop: 10, justifyContent:'space-around'}}> */}
                <Button style={styles.button} appearance={movementMatrix[4] ? 'primary' : 'outline'} onPress={() => _setMovementIndex(4)}>
                    <View>
                        <Text style={movementMatrix[4] ? styles.buttonTxt : styles.offButtonTxt}>Handicap Assisted Wheels</Text>
                    </View>
                </Button>
            {/* </View> */}
        </View>
    )
}
