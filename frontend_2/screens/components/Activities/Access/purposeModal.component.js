import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './dataModal.styles';

export function PurposeModal(props){

    const theme = useTheme();
    
    const [noneSelect, setNoneSelect] = useState(false);
    
    // multi-select useStates
    const [select1, setSelect1] = useState(false);
    const [select2, setSelect2] = useState(false);
    const [select3, setSelect3] = useState(false);
    
    const sendData = async () => {
        let arr = packageData();

        // there was nothing selected so do not sendData
        if(arr.length === 0){
            // display error
            setNoneSelect(true)
            return
        }

        let data = {
            purpose: arr
        }
        // reset modal control for subsequent entires
        setNoneSelect(false);
        // closes the modal (in boundaryTest)
        await props.closePurpose(data);
    }

    const packageData = () =>{
        const arr = [];

        // if an option is selected push its contents onto the data array 
        // then reset that state for subsequent entries
        if(select1){
            arr.push('Points');
            setSelect1(false)
        }
        if(select2){
            arr.push('Paths');
            setSelect2(false)
        }
        if(select3){
            arr.push('Areas');
            setSelect3(false)
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
            
            default:
                console.log("switch's default; ERROR should never enter here");        
        }
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.purposeViewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        
                    <Text category={'h1'} style={styles.titleText}>Purpose</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Select the purpose(s) that the boundary serves</Text>
                        </View>

                        { noneSelect ?
                            <View style={styles.selectError}>
                                <Text style={styles.redTxt}>Please select at least one purpose to submit</Text>
                            </View>
                        :
                            null
                        }

                        <View>
                            <View style={styles.buttonRow}>
                                <Button style={styles.button} appearance={select1 ? 'primary' : 'outline'} onPress={()=> setSelect(1)}>
                                    <View>
                                        <Text style={select1 ? styles.buttonTxt : styles.offButtonTxt}>Safety</Text>
                                    </View>
                                </Button>
                                <Button style={styles.button} appearance={select2 ? 'primary' : 'outline'} onPress={()=> setSelect(2)}>
                                    <View>
                                        <Text style={select2 ? styles.buttonTxt : styles.offButtonTxt}>Prevention</Text>
                                    </View>

                                </Button>
                            </View>

                            <View style={styles.lastButtonView}>
                                <Button style={styles.button} appearance={select3 ? 'primary' : 'outline'} onPress={()=> setSelect(3)}>
                                    <View>
                                        <Text style={select3 ? styles.buttonTxt : styles.offButtonTxt}>Creating Seperation</Text>
                                    </View>
                                </Button>
                            </View>      
                        
                        </View>

                                    
                        <View style={styles.multiView}>
                            <Button style={styles.multiSubmit} onPress={sendData}>
                                <View>
                                    <Text style={styles.backButtonTxt}>Submit</Text>
                                </View>
                            </Button>
                        </View>

                    </View>
                </View>                      
            </View>
        </Modal>
    )
}