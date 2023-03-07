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
                <Button style={styles.buttonLeft} appearance={ageMatrix[0] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(0)}>
                    <View>
                        <Text style={ageMatrix[0] ? styles.buttonTxt : styles.offButtonTxt}>0 - 14</Text>
                    </View>
                </Button>
                <Button style={styles.buttonRight} appearance={ageMatrix[1] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(1)}>
                    <View>
                        <Text style={ageMatrix[1] ? styles.buttonTxt : styles.offButtonTxt}>15 - 21</Text>
                    </View>
                </Button>
            </View>
            <View style={styles.bottomRow}>
                <Button style={styles.buttonLeft} appearance={ageMatrix[2] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(2)}>
                    <View>
                        <Text style={ageMatrix[2] ? styles.buttonTxt : styles.offButtonTxt}>22 - 30</Text>
                    </View>
                </Button>
                <Button style={styles.buttonRight} appearance={ageMatrix[3] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(3)}>
                    <View>
                        <Text style={ageMatrix[3] ? styles.buttonTxt : styles.offButtonTxt}>30 - 50</Text>
                    </View>
                </Button>
            </View>
            <View style={styles.bottomRow}>
                <Button style={styles.buttonLeft} appearance={ageMatrix[4] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(4)}>
                    <View>
                        <Text style={ageMatrix[4] ? styles.buttonTxt : styles.offButtonTxt}>50 - 65</Text>
                    </View>
                </Button>
                <Button style={styles.buttonRight} appearance={ageMatrix[5] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(5)}>
                    <View>
                        <Text style={ageMatrix[5] ? styles.buttonTxt : styles.offButtonTxt}>65+</Text>
                    </View>
                </Button>
            </View>
        </View>
    )
}
