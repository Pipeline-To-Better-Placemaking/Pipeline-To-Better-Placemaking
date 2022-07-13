import React, { useState } from 'react';
import { View, ScrollView, Modal } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';
import { DataGroupMovement } from './dataGroupMovement.component.js';

import { styles } from './dataEntryModal.styles.js';

const movement = ["Walking", "Running", "Swimming", "Activity on Wheels", "Handicap Assisted Wheels"]

export function DataEntryModal(props) {

    const theme = useTheme();

    const [movementIndex, setMovementIndex] = useState(-1)
    const [movementMatrix, setmMovementMatrix] = useState([])

    const setMovementData = async(index, matrix) => {

        await setMovementIndex(index)
        await setmMovementMatrix(matrix)
    }

    const sendData = async () => {

        let data = {
            movementIndex: movementIndex,
            movement: movement[movementIndex],
        }

        await props.closeData(data)
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
          <View style={styles.modalContainer}>
            <View style={[ styles.scrollViewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                <ScrollView>
                    <Text category={'h1'} style={styles.titleText}>Data</Text>
                    <Text category={'s1'} style={styles.titleLine}>___________</Text>
                    <View style={styles.dataView}>

                        <DataGroupMovement setMovementData={setMovementData}/>

                    </View>

                    <Button style={styles.button} onPress={sendData}> Submit </Button>

                </ScrollView>
            </View>
          </View>
        </Modal>
    )
}
