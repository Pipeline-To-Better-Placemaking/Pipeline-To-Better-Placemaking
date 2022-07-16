import React, { useState } from 'react';
import { View, Modal, KeyboardAvoidingView } from 'react-native';
import { useTheme, Text, Button, Input } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { stringCase } from '../../helperFunctions';

import { styles } from './modal.styles';

export function DataModal(props) {

    const theme = useTheme();

    const [other1, setOther1] = useState();
    const [other2, setOther2] = useState();
    const [empty1, setEmpty1] = useState(false);
    const [empty2, setEmpty2] = useState(false);
    
    const sendData = async (type, desc) => {
        let data = {
            kind: type,
            marker: props.point,
            description: desc
        }
        // reset modal control for subsequent entires
        setEmpty1(false);
        setEmpty2(false);
        // closes the modal (in natureTest)
        await props.closeData(data);
    }

    const handleOther = async (type) =>{
        // only if there is a value in other1 and that is the other the user is trying to submit, allow the modal to close
        if(other1 && type === "Domesticated"){
            let tempOther = stringCase(other1)
            let data = {
                kind: type,
                marker: props.point,
                description: tempOther
            }
            // reset modal controls for subsequent enteries
            setOther1(null);
            setOther2(null);
            setEmpty1(false);
            setEmpty2(false);
            // closes the modal (in natureTest)
            await props.closeData(data);
        }
        // only if there is a value in other2 and that is the other the user is trying to submit, allow the modal to close
        else if(other2 && type === "Wild"){
            let tempOther = stringCase(other2)
            let data = {
                kind: type,
                marker: props.point,
                description: tempOther
            }
            // reset modal controls for subsequent enteries
            setOther1(null);
            setOther2(null);
            setEmpty1(false);
            setEmpty2(false);
            // closes the modal (in natureTest)
            await props.closeData(data);
        }
        // if the user didn't enter any value in either other box, do not allow modal to close
        else{
            if(type === 'Domesticated') setEmpty1(true);
            else setEmpty2(true);
        }
    }
    
    // resets all modal controls and goes back
    const handleBack = () =>{
        setEmpty1(false);
        setEmpty2(false);
        setOther1(null);
        setOther2(null);
        props.back();
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <KeyboardAvoidingView behavior='position' style={styles.avoid}>
                <View style={styles.modalContainer}>
                    <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        <ScrollView>
                            <Text category={'h1'} style={styles.titleText}>Animal Data</Text>
                            <View style={styles.dataView}>
                                            
                                <View style={styles.titleDesc}>
                                    <Text category={'s1'} style={styles.titleDescTxt}>Select the best description for the marker you created</Text>
                                </View>

                                <View style={styles.typeView}>
                                    <View>
                                        <Text category={'s1'}>Domesticated</Text>
                                        <View style={styles.dataButtonRow}>
                                            <Button style={styles.button} onPress={()=> sendData("Domesticated", "Dog")}>
                                                <View>
                                                    <Text style={styles.buttonTxt}>Dog</Text>
                                                </View>
                                            </Button>
                                            <Button style={styles.button} onPress={()=> sendData("Domesticated", "Cat")}>
                                                <View>
                                                    <Text style={styles.buttonTxt}>Cat</Text>
                                                </View>
                                            </Button>
                                        </View>
                                        
                                        <View style={styles.otherView}>
                                            <Text>Other</Text>
                                            <View style={styles.otherRow}>
                                                <Input 
                                                    style={styles.otherInputBox}
                                                    placeholder={"Animal..."}
                                                    onChangeText={(nextValue) => setOther1(nextValue)}
                                                />
                                                <Button style={styles.submitButton} onPress={()=> handleOther("Domesticated")}>
                                                    <View>
                                                        <Text style={styles.submitButtonTxt}>Submit</Text>
                                                    </View>
                                                </Button>
                                            </View>
                                            {empty1 ?
                                                <View style={styles.errorView}>
                                                    <Text style={styles.redTxt}>Please enter text to submit</Text>
                                                </View>
                                            :
                                                null
                                            }
                                        </View>
                                    
                                    </View>

                                    <View>
                                        <Text category={'s1'}>Wild</Text>
                                        <View style={styles.dataButtonRow}>
                                            <Button style={styles.button} onPress={()=> sendData("Wild", "Squirrel")}>
                                                <View>
                                                    <Text style={styles.buttonTxt}>Squirrel</Text>
                                                </View>
                                            </Button>
                                            <Button style={styles.button} onPress={()=> sendData("Wild", "Bird")}>
                                                <View>
                                                    <Text style={styles.buttonTxt}>Bird</Text>
                                                </View>
                                            </Button>
                                        </View>
                                        <View style={styles.dataButtonRow}>
                                            <Button style={styles.button} onPress={()=> sendData("Wild", "Rabbit")}>
                                                <View>
                                                    <Text style={styles.buttonTxt}>Rabbit</Text>
                                                </View>
                                            </Button>
                                            <Button style={styles.button} onPress={()=> sendData("Wild", "Duck")}>
                                                <View>
                                                    <Text style={styles.buttonTxt}>Duck</Text>
                                                </View>
                                            </Button>
                                        </View>
                                        <View style={styles.lastDataButtonView}>
                                            <Button style={styles.button} onPress={()=> sendData("Wild", "Turtle")}>
                                                <View>
                                                    <Text style={styles.buttonTxt}>Turtle</Text>
                                                </View>
                                            </Button>
                                        </View>

                                        <View style={styles.otherView}>
                                            <Text>Other</Text>
                                            <View style={styles.otherRow}>
                                                <Input 
                                                    style={styles.otherInputBox}
                                                    placeholder={"Animal..."}
                                                    onChangeText={(nextValue) => setOther2(nextValue)}
                                                />
                                                <Button style={styles.submitButton} onPress={()=> handleOther("Wild")}>
                                                    <View>
                                                        <Text style={styles.submitButtonTxt}>Submit</Text>
                                                    </View>
                                                </Button>
                                            </View>

                                            {empty2 ?
                                                <View style={styles.errorView}>
                                                    <Text style={styles.redTxt}>Please enter text to submit</Text>
                                                </View>
                                            :
                                                null
                                            }
                                        </View>
                                    </View>

                                    <View style={styles.backButtonView}>
                                        <Button style={styles.backButton} onPress={handleBack}>
                                            <View>
                                                <Text style={styles.backButtonTxt}>Back</Text>
                                            </View>
                                        </Button>
                                    </View>

                                </View>
                            </View>  
                        </ScrollView>               
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}