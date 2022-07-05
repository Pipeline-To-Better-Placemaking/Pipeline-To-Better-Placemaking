import React from 'react';
import { View, Modal} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './modal.styles';


export function DataModal(props) {

    const theme = useTheme();
    
    const sendData = async (desc) => {
        let data = {
            kind: desc,
        }
        
        // closes the modal (in lightTest)
        await props.closeData(data);
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        <Text category={'h1'} style={styles.titleText}>Absence of Order Type</Text>
                        <Text category={'s1'} style={styles.titleLine}>_____________________________</Text>
                        <View style={styles.dataView}>
                                    
                            <View style={styles.titleDesc}>
                                <Text category={'s1'} style={styles.titleDescTxt}>Select the type of disorder you marked</Text>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData("Behavior")}>Behavior</Button>
                                <Button style={styles.button} onPress={()=> sendData("Maintenance")}>Maintenance</Button>
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