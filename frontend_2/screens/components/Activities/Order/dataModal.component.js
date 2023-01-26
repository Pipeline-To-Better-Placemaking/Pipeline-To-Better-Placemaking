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
        
        // closes the modal (in orderTest)
        await props.closeData(data);
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        <Text category={'h1'} style={styles.titleText}>Type of Misconduct</Text>
                        <View style={styles.dataView}>
                                    
                            <View style={styles.titleDesc}>
                                <Text category={'s1'} style={styles.titleDescTxt}>Select the type of misconduct you marked</Text>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData("Behavior")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Behavior</Text>
                                    </View>
                                </Button>
                                <Button style={styles.button} onPress={()=> sendData("Maintenance")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Maintenance</Text>
                                    </View>
                                </Button>
                            </View>

                            <View style={styles.backButtonView}>
                                <Button style={styles.backButton} onPress={() => props.back()}>
                                    <View>
                                        <Text style={styles.submitButtonTxt}>Back</Text>
                                    </View>
                                </Button>
                            </View>
                        </View>                 
                </View>
            </View>
        </Modal>
    )
}