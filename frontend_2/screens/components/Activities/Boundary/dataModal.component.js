import React from 'react';
import { View, Modal} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './dataModal.styles';

export function DataModal(props) {

    const theme = useTheme();
    
    const sendData = async (desc) => {
        let data = {
            description: desc
        }
        
        // closes the modal (in soundTest)
        await props.closeData(data);
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        
                    <Text category={'h1'} style={styles.titleText}>Boundary Description</Text>
                    <Text category={'s1'} style={styles.titleLine}>_______________________________________________</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Select the best description for the boundary you marked</Text>
                        </View>

                        <View>
                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData(props.desc[0])} >{props.desc[0]}</Button>
                                <Button style={styles.button} onPress={()=> sendData(props.desc[1])}>{props.desc[1]}</Button>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData(props.desc[2])}>{props.desc[2]}</Button>
                                <Button style={styles.button} onPress={()=> sendData(props.desc[3])}>{props.desc[3]}</Button>
                            </View>

                            <View style={styles.lastButtonView}>
                                <Button style={styles.button} onPress={()=> sendData(props.desc[4])}>{props.desc[4]}</Button>
                            </View>

                            <View style={styles.lastButtonView}>
                                <Button style={styles.backButton} onPress={() => props.back()}>Back</Button>
                            </View>

                        </View>
                    </View>                      
                </View>
            </View>
        </Modal>
    )
}