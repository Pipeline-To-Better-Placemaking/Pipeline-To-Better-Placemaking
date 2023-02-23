import React, { useState } from 'react';
import { View, Modal, KeyboardAvoidingView} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './dataModal.styles';

export function DataModal(props) {

    const theme = useTheme();

    const [buttonHeight, setButtonHeight] = useState(0);

    const handleButtonLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setButtonHeight(height);
    };
    
    const sendData = async (desc) => {
        let data = {
            description: desc
        }
        
        // closes the modal (in accessTest)
        await props.closeData(data);
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        
                    <Text category={'h1'} style={styles.titleText}>Access Description</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Select the best description for the access you marked</Text>
                        </View>
                        {/* CHECK THESE BUTTONS FOR ALL (3) MODALS TO MAKE SURE THEY WORK WELL */}
                        <View>
                            <View style={styles.buttonRow}>
                                <Button style={styles.buttonTxt} onPress={()=> sendData(props.desc[0])}>
                                    <View>
                                        <Text style={styles.buttonTxt}>{props.desc[0]}</Text>
                                    </View>
                                </Button>

                                <Button style={[styles.button, { height: buttonHeight + 5 }]} onPress={()=> sendData(props.desc[1])}>
                                    <View>
                                        <Text style={styles.buttonTxt}>{props.desc[1]}</Text>
                                    </View>
                                </Button>

                                <Button style={styles.button} onPress={()=> sendData(props.desc[2])}>
                                    <View>
                                        <Text style={styles.buttonTxt}>{props.desc[2]}</Text>
                                    </View>

                                </Button>

                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData(props.desc[3])}>
                                    <View>
                                        <Text style={styles.buttonTxt}>{props.desc[3]}</Text>
                                    </View>
                                </Button>

                                <Button style={styles.button} onPress={()=> sendData(props.desc[4])}>
                                    <View>
                                        <Text style={styles.buttonTxt}>{props.desc[4]}</Text>
                                    </View>
                                </Button>
                            </View>

                            <View style={styles.multiView}>
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
        </KeyboardAvoidingView>
    )
}