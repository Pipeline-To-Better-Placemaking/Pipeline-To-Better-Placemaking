import React, { useState } from 'react';
import { View, Modal, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { useTheme, Text, Button, Input } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

import { styles } from './modal.styles';

export function SoundsModal(props) {

    const theme = useTheme();
    
    const [other, setOther] = useState();
    const [empty, setEmpty] = useState(false);
    const [noneSelect, setNoneSelect] = useState(false);
    
    // multi-select useStates
    const [select1, setSelect1] = useState(false);
    const [select2, setSelect2] = useState(false);
    const [select3, setSelect3] = useState(false);
    const [select4, setSelect4] = useState(false);
    const [select5, setSelect5] = useState(false);
    const [select6, setSelect6] = useState(false);
    const [select7, setSelect7] = useState(false);
    const [select8, setSelect8] = useState(false);
    const [select9, setSelect9] = useState(false);
    
    const sendData = async () => {
        let arr = packageData();
        
        // the 'other' check failed so do not sendData
        if(arr === -1) return

        // there was nothing selected so do not sendData
        if(arr.length === 0){
            // display error
            setNoneSelect(true)
            return
        }

        let data = {
            sound_type: arr
        }
        // reset modal control for subsequent entires
        setEmpty(false);
        setNoneSelect(false);
        // closes the modal (in soundTest)
        await props.closeData(data);
    }

    const packageData = () =>{
        const arr = [];
        
        setEmpty(false);
        
        // 'other' option 1st, so the resetting states is not an issue
        if(select9){
            let cond = otherCheck();
            // theres something in other so push it, then reset it for subsequent entries
            if(cond){
                arr.push(other);
                setOther(null);
                setSelect9(false);
            }
            // there is nothing in other so display error and don't allow to submit
            else{
                setEmpty(true);
                return -1
            }
        }
        
        // if an option is selected push its contents onto the data array 
        // then reset that state for subsequent entries
        if(select1){
            arr.push('sample 1');
            setSelect1(false)
        }
        if(select2){
            arr.push('sample 2');
            setSelect2(false)
        }
        if(select3){
            arr.push('sample 3');
            setSelect3(false)
        }
        if(select4){
            arr.push('sample 4');
            setSelect4(false)
        }
        if(select5){
            arr.push('sample 5');
            setSelect5(false)
        }
        if(select6){
            arr.push('sample 6');
            setSelect6(false)
        }
        if(select7){
            arr.push('sample 7');
            setSelect7(false)
        }
        if(select8){
            arr.push('sample 8');
            setSelect8(false)
        }
        
        // return the array of data
        return arr
    }

    // check for the 'other' input box
    const otherCheck = () =>{
        // if there is something in it then return true
        if(other){
            setEmpty(false);
            return true
        }
        else return false
    }
    
    // changes apperance of buttons based on if its selected or not
    const setSelect = (ind) =>{
        // whenever a button is pushed, based on the select number, change the state to the opposite state (select/deselect)
        switch(ind){
            case 1:
                setSelect1(!select1);
                break;
            
            case 2:
                setSelect2(!select2);
                break;
            
            case 3:
                setSelect3(!select3);
                break;

            case 4:
                setSelect4(!select4);
                break;

            case 5:
                setSelect5(!select5);
                break;

            case 6:
                setSelect6(!select6);
                break;

            case 7:
                setSelect7(!select7);
                break;

            case 8:
                setSelect8(!select8);
                break;

            case 9:
                setSelect9(!select9);
                break;
            
            default:
                console.log("switch's default; ERROR should never enter here");        
        }
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <KeyboardAvoidingView behavior='position' style={styles.avoid}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                    <View style={styles.modalContainer}>
                        <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1'], height:'75%'}]} >
                        
                            <Text category={'h1'} style={styles.titleText}>Sound Types</Text>
                            <Text category={'s1'} style={styles.titleLine}>____________________________</Text>
                            <View style={styles.dataView}>
                                
                                <View style={styles.titleDesc}>
                                    <Text category={'s1'} style={styles.titleDescTxt}>Select all of the sounds you heard during the measurement</Text>
                                </View>

                                { noneSelect ?
                                    <View style={styles.selectError}>
                                        <Text>Please select at least one option to submit</Text>
                                    </View>
                                :
                                    null
                                }

                                <View>
                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} appearance={select1 ? 'primary' : 'outline'} onPress={()=> setSelect(1)} >Sample_1</Button>
                                        <Button style={styles.button} appearance={select2 ? 'primary' : 'outline'} onPress={()=> setSelect(2)}>Sample_2</Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} appearance={select3 ? 'primary' : 'outline'} onPress={()=> setSelect(3)}>Sample_3</Button>
                                        <Button style={styles.button} appearance={select4 ? 'primary' : 'outline'} onPress={()=> setSelect(4)}>Sample_4</Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} appearance={select5 ? 'primary' : 'outline'} onPress={()=> setSelect(5)}>Sample_5</Button>
                                        <Button style={styles.button} appearance={select6 ? 'primary' : 'outline'} onPress={()=> setSelect(6)}>Sample_6</Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.button} appearance={select7 ? 'primary' : 'outline'} onPress={()=> setSelect(7)}>Sample_7</Button>
                                        <Button style={styles.button} appearance={select8 ? 'primary' : 'outline'} onPress={()=> setSelect(8)}>Sample_8</Button>
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
                                        <Button style={styles.submitButton} appearance={select9 ? 'primary' : 'outline'} onPress={()=> setSelect(9)}>
                                            { select9 ?
                                                <Text>Selected</Text>
                                            :
                                                <Text>Select</Text>
                                            }
                                        </Button>
                                    </View>

                                    {empty ?
                                        <View style={styles.multiErrorView}>
                                            <Text>Please enter a sound type to submit</Text>
                                        </View>
                                    :
                                        null
                                    }
                                
                                    <View style={styles.multiView}>
                                        <Button style={styles.multiSubmit} onPress={sendData}>Submit</Button>
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