import React from 'react';
import { View, Modal} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './modal.styles';


export function DataModal(props) {

    const theme = useTheme();
    
    const sendData = async (desc) => {
        let data = {
            light_description: desc,
            location: props.point,
        }
        
        // closes the modal (in lightTest)
        await props.closeData(data);
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        <Text category={'h1'} style={styles.titleText}>Light Type</Text>
                        <Text category={'s1'} style={styles.titleLine}>_______________________</Text>
                        <View style={styles.dataView}>
                                    
                            <View style={styles.titleDesc}>
                                <Text category={'s1'} style={styles.titleDescTxt}>Select the type of lighting you marked</Text>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData("Rhythmic")}>Rhythmic</Button>
                                <Button style={styles.button} onPress={()=> sendData("Building")}>Building</Button>
                                <Button style={styles.button} onPress={()=> sendData("Task")}>Task</Button>
                            </View>

                            <View style={styles.backButtonView}>
                                <Button style={styles.backButton} onPress={() => props.back()}>Back</Button>
                            </View>
                        </View>                 
                </View>
            </View>
        </Modal>
    )
}