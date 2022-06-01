import React, { useState } from 'react';
import { View, Modal, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useTheme, Text, Button, Input } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

import { styles } from './decibelEntryModal.styles.js';

export function DecibelEntryModal(props) {

    const theme = useTheme();

    const [value, setValue] = useState(-1);
    const [empty, setEmpty] = useState(false);

    const sendData = async () => {
        // if there is something in value, allow the modal to close
        if(value > -1){
            let data = {
                decibel: value,
            }
            // reset modal controls for subsequent enteries
            setValue(-1);
            setEmpty(false);
            // closes the modal (in soundTest)
            await props.closeData(data);
        }
        // if the user didn't enter any value, do not allow modal to close
        else setEmpty(true);
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <KeyboardAvoidingView behavior='position' style={styles.avoid}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                    <View style={styles.modalContainer}>
                        <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                    
                            <Text category={'h1'} style={styles.titleText}>Sound Decibel Level</Text>
                            <Text category={'s1'} style={styles.titleLine}>___________________________________________</Text>
                            <View style={styles.dataView}>
                        
                                <Input
                                    style={styles.inputBox}
                                    placeholder={"Value..."}
                                    onChangeText={(nextValue) => setValue(nextValue)}
                                    keyboardType="number-pad"
                                />
                                
                                { empty ?
                                    <View>
                                        <Text>Please enter a value</Text>
                                    </View>
                                :
                                    null
                                }

                            </View>

                            <Button style={styles.button} onPress={sendData}> Submit </Button>
                    
                        </View>
                    
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    )
}