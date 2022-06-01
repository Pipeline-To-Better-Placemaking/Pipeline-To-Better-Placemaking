import React, { useState } from 'react';
import { View, Modal, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { useTheme, Text, Button, Input } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

import { styles } from './modal.styles';

export function MainSoundModal(props) {

    const theme = useTheme();
    
    const [other, setOther] = useState();
    const [empty, setEmpty] = useState(false);
    
    const sendData = async (desc) => {
        let data = {
            main_sound_type: desc
        }
        // reset modal control for subsequent entires
        setEmpty(false);
        // closes the modal (in soundTest)
        await props.closeData(data);
    }

    const handleOther = async () =>{
        // only if there is a value in other, allow the modal to close
        if(other){
            // how should we denote this as an 'other' description ?
            let data = {
                main_sound_type: other
            }
            // reset modal controls for subsequent enteries
            setOther(null);
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
                        
                            <Text category={'h1'} style={styles.titleText}>Sound Type</Text>
                            <Text category={'s1'} style={styles.titleLine}>__________________________</Text>
                            <View style={styles.dataView}>
                                
                                <View style={styles.titleDesc}>
                                    <Text category={'s1'} style={styles.titleDescTxt}>Select the main source of sound that you heard during the measurement</Text>
                                </View>

                                <View>
                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} onPress={()=> sendData('sample 1')} >Sample_1</Button>
                                        <Button style={styles.button} onPress={()=> sendData('sample 2')}>Sample_2</Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} onPress={()=> sendData('sample 3')}>Sample_3</Button>
                                        <Button style={styles.button} onPress={()=> sendData('sample 4')}>Sample_4</Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} onPress={()=> sendData('sample 5')}>Sample_5</Button>
                                        <Button style={styles.button} onPress={()=> sendData('sample 6')}>Sample_6</Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} onPress={()=> sendData('sample 7')}>Sample_7</Button>
                                        <Button style={styles.button} onPress={()=> sendData('sample 8')}>Sample_8</Button>
                                    </View>
                                </View>

                                <View style={styles.otherView}>
                                    <Text category={'s1'}>Other</Text>
                                    
                                    <View style={styles.otherRow}>
                                        <Input 
                                            style={styles.inputBox}
                                            placeholder={"Sound Type..."}
                                            onChangeText={(nextValue) => setOther(nextValue)}
                                        />
                                        <Button style={styles.submitButton} onPress={handleOther}> Submit </Button>
                                    </View>

                                    {empty ?
                                        <View style={styles.errorView}>
                                            <Text>Please enter a sound type to submit</Text>
                                        </View>
                                    :
                                        null
                                    }
                                </View>

                            </View>                      
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    )
}