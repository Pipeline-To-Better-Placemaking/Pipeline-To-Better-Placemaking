import React, { useState } from 'react';
import { View, Modal, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useTheme, Text, Button, Input } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { stringCase } from '../../helperFunctions';

import { styles } from './modal.styles';

export function DescModal(props) {

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
    
    const sendData = async () => {
        let arr = packageData();

        // the 'other' check failed so do not sendData
        if(arr === -1) return

        // there was nothing selected so do not sendData
        if(arr.length === 0){
            // display error
            setNoneSelect(true)
            setEmpty(false);
            return
        }

        let data = {
            description: arr
        }
        // reset modal control for subsequent entires
        setNoneSelect(false);
        setEmpty(false);
        // closes the modal (in orderTest)
        await props.closeData(data);
    }
    
    const handleBack = () =>{
        // reset all useStates to ensure the modal is ready for the next entry
        setSelect1(false);
        setSelect2(false);
        setSelect3(false);
        setSelect4(false);
        setSelect5(false);
        setSelect6(false);
        setSelect7(false);
        setNoneSelect(false);
        setOther(null);
        setEmpty(false);
        // calls goBack (orderTest)
        props.back();
    }

    const packageData = () =>{
        const arr = [];
        // checks the 'other' option 1st, so the resetting other states is not an issue
        if(select7){
            let cond = otherCheck();
            // theres something in other so push it, then reset it for subsequent entries
            if(cond){
                let tempOther = stringCase(other);
                arr.push(tempOther);
                setOther(null);
                setSelect7(false);
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
            arr.push(props.prompt[0]);
            setSelect1(false)
        }
        if(select2){
            arr.push(props.prompt[1]);
            setSelect2(false)
        }
        if(select3){
            arr.push(props.prompt[2]);
            setSelect3(false)
        }
        if(select4){
            arr.push(props.prompt[3]);
            setSelect4(false)
        }
        if(select5){
            arr.push(props.prompt[4]);
            setSelect5(false)
        }
        if(select6){
            arr.push(props.prompt[5]);
            setSelect6(false)
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
            
            default:
                console.log("switch's default; ERROR should never enter here");        
        }
    } 

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <KeyboardAvoidingView behavior='position' style={styles.avoid}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.modalContainer}>
                        <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1'], height:'58%'}]} >
                            <Text category={'h1'} style={styles.titleText}>Description</Text>
                            <View style={styles.dataView}>
                                        
                                <View style={styles.titleDesc}>
                                    <Text style={styles.titleDescTxt}>
                                        <Text category={'s1'} style={styles.boldTxt}>Select all</Text>
                                        <Text category={'s1'}> of the following that describes the misconduct you marked</Text>
                                    </Text>
                                </View>

                                { noneSelect ?
                                    <View style={styles.selectError}>
                                        <Text style={styles.redTxt}>Please select at least one option to submit</Text>
                                    </View>
                                :
                                    null
                                }

                                <View>
                                    <View style={styles.buttonRow}>
                                        <Button style={styles.multiButton} appearance={select1 ? 'primary' : 'outline'} onPress={()=> setSelect(1)}>
                                            <View>
                                                <Text style={select1 ? styles.buttonTxt : styles.offButtonTxt}>{props.prompt[0]}</Text>
                                            </View>
                                        </Button>
                                        <Button style={styles.multiButton} appearance={select2 ? 'primary' : 'outline'} onPress={()=> setSelect(2)}>
                                            <View>
                                                <Text style={select2 ? styles.buttonTxt : styles.offButtonTxt}>{props.prompt[1]}</Text>
                                            </View>
                                        </Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.multiButton} appearance={select3 ? 'primary' : 'outline'} onPress={()=> setSelect(3)}>
                                            <View>
                                                <Text style={select3 ? styles.buttonTxt : styles.offButtonTxt}>{props.prompt[2]}</Text>
                                            </View>
                                        </Button>
                                        <Button style={styles.multiButton} appearance={select4 ? 'primary' : 'outline'} onPress={()=> setSelect(4)}>
                                            <View>
                                                <Text style={select4 ? styles.buttonTxt : styles.offButtonTxt}>{props.prompt[3]}</Text>
                                            </View>
                                        </Button>
                                    </View>

                                    <View style={styles.buttonRow}>
                                        <Button style={styles.multiButton} appearance={select5 ? 'primary' : 'outline'} onPress={()=> setSelect(5)}>
                                            <View>
                                                <Text style={select5 ? styles.buttonTxt : styles.offButtonTxt}>{props.prompt[4]}</Text>
                                            </View>
                                        </Button>
                                        <Button style={styles.multiButton} appearance={select6 ? 'primary' : 'outline'} onPress={()=> setSelect(6)}>
                                            <View>
                                                <Text style={select6 ? styles.buttonTxt : styles.offButtonTxt}>{props.prompt[5]}</Text>
                                            </View>
                                        </Button>
                                    </View>
                                    
                                    <View style={styles.otherView}>
                                            <Text>Other</Text>
                                            <View style={styles.otherRow}>
                                                <Input 
                                                    style={styles.inputBox}
                                                    placeholder={"Other..."}
                                                    onChangeText={(nextValue) => setOther(nextValue)}
                                                />
                                                <Button style={styles.selectButton} appearance={select7 ? 'primary' : 'outline'} onPress={()=> setSelect(7)}>
                                                    { select7 ?
                                                        <View>
                                                            <Text style={styles.selectButtonTxt}>Selected</Text>
                                                        </View>
                                                    :
                                                        <View>
                                                            <Text style={styles.offSelectButtonTxt}>Select</Text>
                                                        </View>
                                                    }
                                                </Button>
                                            </View>

                                            {empty ?
                                                <View style={styles.errorView}>
                                                    <Text style={styles.redTxt}>Please enter a description to submit</Text>
                                                </View>
                                            :
                                                null
                                            }
                                    </View>

                                </View>
                                        
                                <View style={styles.bottomRowView}>
                                    <Button style={styles.backButton} onPress={handleBack}>
                                        <View>
                                            <Text style={styles.submitButtonTxt}>Back</Text>
                                        </View>
                                    </Button>
                                    <Button style={styles.submitButton} onPress={sendData}>
                                        <View>
                                            <Text style={styles.submitButtonTxt}>Submit</Text>
                                        </View>
                                    </Button>
                                </View>

                            </View>
                        </View>                      
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    )
}