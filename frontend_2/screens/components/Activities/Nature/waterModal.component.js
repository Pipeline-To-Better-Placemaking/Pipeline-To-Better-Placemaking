import React from 'react';
import { View, Modal} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './modal.styles';

export function WaterModal(props) {

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
                <View style={[ styles.waterViewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        
                    <Text category={'h1'} style={styles.titleText}>Body of Water</Text>
                    <Text category={'s1'} style={styles.titleLine}>______________________________</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Select the best description for the body of water you marked</Text>
                        </View>

                        <View>
                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData("Ocean")}>Ocean</Button>
                                <Button style={styles.button} onPress={()=> sendData("Lake")}>Lake</Button>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData("River")}>River</Button>
                                <Button style={styles.button} onPress={()=> sendData("Swamp")}>Swamp</Button>
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