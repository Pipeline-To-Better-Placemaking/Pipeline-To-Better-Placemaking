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
        
        // closes the modal (in natureTest)
        await props.closeData(data);
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.waterViewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        
                    <Text category={'h1'} style={styles.titleText}>Body of Water</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Select the best description for the body of water you marked</Text>
                        </View>

                        <View>
                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData("Ocean")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Ocean</Text>
                                    </View>
                                </Button>
                                <Button style={styles.button} onPress={()=> sendData("Lake")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Lake</Text>
                                    </View>
                                </Button>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData("River")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>River</Text>
                                    </View>
                                </Button>
                                <Button style={styles.button} onPress={()=> sendData("Swamp")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Swamp</Text>
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