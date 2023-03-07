import React from 'react';
import { View, Modal} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './modal.styles';

export function VegeModal(props) {

    const theme = useTheme();
    
    const sendData = async (desc) => {
        let data = {
            description: desc
        }
        
        // closes the modal (in natureTest)
        await props.closeData(data);
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.vegeViewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        
                    <Text category={'h1'} style={styles.titleText}>Vegetation Data</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Select the best description for the vegetation you marked</Text>
                        </View>

                        <View>
                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData("Native")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Native</Text>
                                    </View>
                                </Button>
                                <Button style={styles.button} onPress={()=> sendData("Design")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Design</Text>
                                    </View>
                                </Button>
                                <Button style={styles.button} onPress={()=> sendData("Open Field")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Open Field</Text>
                                    </View>
                                </Button>
                            </View>
                            

                            <View style={styles.lastButtonView}>
                                <Button style={styles.backButton} onPress={() => props.back()}>
                                    <View>
                                        <Text style={styles.backButtonTxt}>Back</Text>
                                    </View>
                                </Button>
                            </View>

                        </View>
                    </View>                      
                </View>
            </View>
        </Modal>
    )
}