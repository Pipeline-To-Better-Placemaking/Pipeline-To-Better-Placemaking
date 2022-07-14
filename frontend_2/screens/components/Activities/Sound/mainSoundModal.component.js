import React, { useState } from 'react';
import { View, Modal, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useTheme, Text, Button, Input } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { stringCase } from '../../helperFunctions';

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
            let tempString = stringCase(other)
            let data = {
                main_sound_type: tempString
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
                        
                            <Text category={'h1'} style={styles.titleText}>Main Sound Type</Text>
                            <View style={styles.dataView}>
                                
                                <View style={styles.titleDesc}>
                                    <Text category={'s1'} style={styles.titleDescTxt}>Select the main source of sound that you heard during the measurement</Text>
                                </View>

                                <View>
                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} onPress={()=> sendData('Water Feature')}>
                                            <Text>Water Feature</Text>
                                        </Button>
                                        <Button style={styles.button} onPress={()=> sendData('Traffic')}>
                                            <Text>Traffic</Text>
                                        </Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} onPress={()=> sendData('People Sounds')}>
                                            <Text>People Sounds</Text>
                                        </Button>
                                        <Button style={styles.button} onPress={()=> sendData('Animals')}>
                                            <Text>Animals</Text>
                                        </Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} onPress={()=> sendData('Wind')}>
                                            <Text>Wind</Text>
                                        </Button>
                                        <Button style={styles.button} onPress={()=> sendData('Music')}>
                                            <Text>Music</Text>
                                        </Button>
                                    </View>
                                </View>

                                <View style={styles.otherView}>
                                    <Text>Other</Text>
                                    
                                    <View style={styles.otherRow}>
                                        <Input 
                                            style={styles.inputBox}
                                            placeholder={"Sound Type..."}
                                            onChangeText={(nextValue) => setOther(nextValue)}
                                        />
                                        <Button style={styles.submitButton} onPress={handleOther}>Submit</Button>
                                    </View>

                                    {empty ?
                                        <View style={styles.errorView}>
                                            <Text style={styles.redTxt}>Please enter a sound type to submit</Text>
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