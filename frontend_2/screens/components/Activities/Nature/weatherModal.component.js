import React, { useState } from 'react';
import { View, Modal, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { useTheme, Text, Button, Input } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

import { styles } from './modal.styles';

export function WeatherModal(props) {

    const theme = useTheme();
    
    const [temp, setTemp] = useState();
    const [empty, setEmpty] = useState(false);

    const handleSubmit = async (cond) =>{
        // only if there is a tempature value, allow the modal to close
        if(temp){
            // how should we denote this as an 'other' description ?
            let data = {
                tempature: temp,
                description: cond
            }
            // reset modal controls for subsequent enteries
            setTemp(null);
            setEmpty(false);
            // sends data and closes the modal (in natureTest)
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
                        
                            <Text category={'h1'} style={styles.titleText}>Weather Data</Text>
                            <Text category={'s1'} style={styles.titleLine}>_____________________________</Text>
                            <View style={styles.dataView}>
                                
                                <View style={styles.titleDesc}>
                                    <Text category={'s1'} style={styles.titleDescTxt}>Enter the current tempature and then select the current weather condtion</Text>
                                </View>

                                <View style={styles.tempatureView}>
                                    
                                    <View style={styles.tempRow}>
                                        <View style={styles.fixText}>
                                            <Text category={'s1'}>Tempature: </Text>
                                        </View>
                                        <Input 
                                            style={styles.inputBox}
                                            placeholder={"Tempature..."}
                                            onChangeText={(nextValue) => setTemp(nextValue)}
                                            keyboardType={'number-pad'}
                                        />
                                        <View style={styles.fixText}>
                                            <Text category={'s1'}> °F</Text>
                                        </View>
                                    </View>
                                    

                                    {empty ?
                                        <View style={styles.errorView}>
                                            <Text>Please enter a tempature to submit</Text>
                                        </View>
                                    :
                                        null
                                    }
                                </View>  

                                <View>
                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} onPress={()=> handleSubmit("Sunny")} >Sunny</Button>
                                        <Button style={styles.button} onPress={()=> handleSubmit("Cloudy")}>Cloudy</Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} onPress={()=> handleSubmit("Rainy")}>Rainy</Button>
                                        <Button style={styles.button} onPress={()=> handleSubmit("Windy")}>Windy</Button>
                                    </View>

                                    <View style={styles.buttonSpace}>
                                        <Button style={styles.button} onPress={()=> handleSubmit("Stormy")}>Stormy</Button>
                                    </View>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    )
}