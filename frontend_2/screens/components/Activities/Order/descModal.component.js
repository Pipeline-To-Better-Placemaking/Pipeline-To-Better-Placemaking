import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './modal.styles';

export function DescModal(props) {

    const theme = useTheme();
    
    const [noneSelect, setNoneSelect] = useState(false);
    
    // multi-select useStates
    const [select1, setSelect1] = useState(false);
    const [select2, setSelect2] = useState(false);
    const [select3, setSelect3] = useState(false);
    const [select4, setSelect4] = useState(false);
    const [select5, setSelect5] = useState(false);
    const [select6, setSelect6] = useState(false);
    
    const sendData = async () => {
        let arr = packageData();

        // there was nothing selected so do not sendData
        if(arr.length === 0){
            // display error
            setNoneSelect(true)
            return
        }

        let data = {
            description: arr
        }
        // reset modal control for subsequent entires
        setNoneSelect(false);
        // closes the modal (in orderTest)
        await props.closeData(data);
    }
    
    const handleBack = () =>{
        // set all the useStates to false to ensure the modal is reset for the next entry
        setSelect1(false);
        setSelect2(false);
        setSelect3(false);
        setSelect4(false);
        setSelect5(false);
        setSelect6(false);
        setNoneSelect(false);
        // calls goBack (orderTest)
        props.back();
    }

    const packageData = () =>{
        const arr = [];        
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
            
            default:
                console.log("switch's default; ERROR should never enter here");        
        }
    } 

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1'], height:'45%'}]} >
                        
                    <Text category={'h1'} style={styles.titleText}>Description</Text>
                    <Text category={'s1'} style={styles.titleLine}>__________________________</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text style={styles.titleDescTxt}>
                                <Text category={'s1'} style={styles.boldTxt}>Select all</Text>
                                <Text category={'s1'}> of the following that describes the disorder you marked</Text>
                            </Text>
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
                                <Button style={styles.multiButton} appearance={select1 ? 'primary' : 'outline'} onPress={()=> setSelect(1)}>{props.prompt[0]}</Button>
                                <Button style={styles.multiButton} appearance={select2 ? 'primary' : 'outline'} onPress={()=> setSelect(2)}>{props.prompt[1]}</Button>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.multiButton} appearance={select3 ? 'primary' : 'outline'} onPress={()=> setSelect(3)}>{props.prompt[2]}</Button>
                                <Button style={styles.multiButton} appearance={select4 ? 'primary' : 'outline'} onPress={()=> setSelect(4)}>{props.prompt[3]}</Button>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.multiButton} appearance={select5 ? 'primary' : 'outline'} onPress={()=> setSelect(5)}>{props.prompt[4]}</Button>
                                <Button style={styles.multiButton} appearance={select6 ? 'primary' : 'outline'} onPress={()=> setSelect(6)}>{props.prompt[5]}</Button>
                            </View>
                        </View>
                                
                        <View style={styles.bottomRowView}>
                            <Button style={styles.backButton} onPress={handleBack}>Back</Button>
                            <Button style={styles.submitButton} onPress={sendData}>Submit</Button>
                        </View>

                    </View>
                </View>                      
            </View>
        </Modal>
    )
}