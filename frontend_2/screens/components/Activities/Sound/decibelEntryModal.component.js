import React, { useState, useEffect } from 'react';
import { View, Modal, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useTheme, Text, Button, Input } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

import { styles } from './decibelEntryModal.styles.js';
import { set } from 'react-native-reanimated';

export function DecibelEntryModal(props) {

    const theme = useTheme();

    const [value, setValue] = useState();
    const [empty, setEmpty] = useState(false);
    const [nan, setNan] = useState(false);

    const sendData = async () => {
        // if something was in the input box when submitted
        if(value){
            // parse the string (value) as a float which deals with extra decimals (only parses everything before and after 1st decimal point)
            let tempNum = parseFloat(value);
            // enters here whenever the value passed is only a decimal (or starts with 2 decimals)
            if(isNaN(tempNum)){
                setNan(true);
                setEmpty(false);
            }
            // otherwise its an actual number so package and send the data to the soundTest screen
            else{
                // 1st force it to round to the 2nd decimal place (which makes it a string)
                let tempString = tempNum.toFixed(2);
                // then convert it back to a float
                let val = parseFloat(tempString);
                let data = {
                    decibel: val
                }
                // reset the useStates for subsequent entries
                setValue();
                setEmpty(false);
                setNan(false);
                // sends data and closes modal
                await props.closeData(data);
            }
        }
        // if the user didn't enter any value, do not allow modal to close
        else{
            setEmpty(true);
            setNan(false);
        }
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <KeyboardAvoidingView behavior='position' style={styles.avoid}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                    <View style={styles.modalContainer}>
                        <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                    
                            <Text category={'h1'} style={styles.titleText}>Sound Decibel Level</Text>
                            <View style={styles.dataView}>
                        
                                { nan ?
                                    <View style={styles.nanSpace}>
                                        <Text style={styles.redTxt}>Enter a number to submit</Text>
                                    </View>
                                :
                                    null
                                }
                                
                                <Input
                                    style={styles.inputBox}
                                    placeholder={"Value..."}
                                    onChangeText={(nextValue) => setValue(nextValue)}
                                    keyboardType="numeric"
                                />
                                
                                { empty ?
                                    <View style={styles.emptySpace}>
                                        <Text style={styles.redTxt}>Please enter a value</Text>
                                    </View>
                                :
                                    null
                                }

                            </View>

                            <Button style={styles.button} onPress={sendData}>
                                <Text>Submit</Text>
                            </Button>
                    
                        </View>
                    
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    )
}