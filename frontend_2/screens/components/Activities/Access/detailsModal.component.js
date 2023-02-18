import React, { useState } from 'react';
import { View, Modal, TextInput } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './dataModal.styles';

export function DetailsModal(props){

    const theme = useTheme();
    
    const [noneSelect, setNoneSelect] = useState(false);
    
    // multi-select useStates
    const [select1, setSelect1] = useState(false);
    const [select2, setSelect2] = useState(false);
    const [select3, setSelect3] = useState(false);

    //Details fields
    const [spotsText, spotsOnChangeText] = React.useState('')
    
    const sendData = async () => {
        let arr = packageData();

        //ADD cancel button
        // there was nothing selected so do not sendData
        // if(arr.length === 0){
        //     // display error
        //     setNoneSelect(true)
        //     return
        // }

        let data = {
            purpose: arr
        }
        // reset modal control for subsequent entires
        setNoneSelect(false);
        // closes the modal (in boundaryTest)
        await props.closeDetails(data);
    }

    const ShowOptions = () => {
        console.log("🚀 ~ file: detailsModal.component.js:41 ~ ShowOptions ~ props.data", props.data);

        // Show options for point, path, or area
        if(props.accessType === "Point") {
            // Show options for bike rack
            if(props.data.description === "Bike Rack") {
                return(
                    <View style={styles.buttonRow}>
                        <Text
                            style={styles.inputLabel}
                        > Spots </Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={spotsOnChangeText}
                            value={spotsText}
                            placeholder="0"
                            keyboardType='numeric'
                        />
                    </View>    
                )
            } else if(props.data.description === "Public Transport Stop") {
                return(
                    <View>
                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.inputLabel}
                            >Line Number</Text>
                            <TextInput
                                style={styles.inputField}
                                onChangeText={spotsOnChangeText}
                                value={spotsText}
                                placeholder="0"
                                keyboardType='numeric'
                            />
                        </View>    
                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.inputLabel}
                            >Daily Loops</Text>
                            <TextInput
                                style={styles.inputField}
                                onChangeText={spotsOnChangeText}
                                value={spotsText}
                                placeholder="0"
                                keyboardType='numeric'
                            />
                        </View>   
                    </View>

                )
            } else {
                sendData();
                return null
            }
        }
        if(props.accessType === "Path") {
            // Show options for roads
            if(props.data === "Main Road" | props.data === "Side Road") {
                return(
                    <View style={styles.buttonRow}>
                        <Button style={styles.button} appearance={select1 ? 'primary' : 'outline'} onPress={()=> setSelect(1)}>
                            <View>
                                <Text style={select1 ? styles.buttonTxt : styles.offButtonTxt}>Two Lane</Text>
                            </View>
                        </Button>
                        <Button style={styles.button} appearance={select2 ? 'primary' : 'outline'} onPress={()=> setSelect(2)}>
                            <View>
                                <Text style={select2 ? styles.buttonTxt : styles.offButtonTxt}>Paved</Text>
                            </View>
                        </Button>
                    </View>    
                )
            } else {
                return null
            }
        }
        if(props.accessType === "Area") {
            return(
                <View style={styles.buttonRow}>
                    <Button style={styles.button} appearance={select1 ? 'primary' : 'outline'} onPress={()=> setSelect(1)}>
                        <View>
                            <Text style={select1 ? styles.buttonTxt : styles.offButtonTxt}>Spots</Text>
                        </View>
                    </Button>
                    <Button style={styles.button} appearance={select2 ? 'primary' : 'outline'} onPress={()=> setSelect(2)}>
                        <View>
                            <Text style={select2 ? styles.buttonTxt : styles.offButtonTxt}>Prevention</Text>
                        </View>

                    </Button>
                </View>    
            )
        } 
        else return null;
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
                        
                    <Text category={'h1'} style={styles.titleText}>Details</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Enter the Access {props.accessType} details</Text>
                        </View>

                        { noneSelect ?
                            <View style={styles.selectError}>
                                <Text style={styles.redTxt}>Please fill in the details</Text>
                            </View>
                        :
                            null
                        }

                        <ShowOptions/>
                                    
                        <View style={styles.buttonRow}>
                            <Button style={styles.multiSubmit} onPress={sendData}>
                                <View>
                                    <Text style={styles.backButtonTxt}>Submit</Text>
                                </View>
                            </Button>
                            <Button style={styles.multiSubmit} onPress={sendData}>
                                <View>
                                    <Text style={styles.backButtonTxt}>Cancel</Text>
                                </View>
                            </Button>
                        </View>

                    </View>
                </View>                      
            </View>
        </Modal>
    )
}