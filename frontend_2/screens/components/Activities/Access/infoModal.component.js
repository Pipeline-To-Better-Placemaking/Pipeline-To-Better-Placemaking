import React from 'react';
import { View, Modal,  TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './infoModal.styles';

export function InfoModal(props) {

    const theme = useTheme();
    
    // only render the modal if the passed in data prop is something 
    if(props.data !== undefined){
        let purposeFormat = [];
        // formats the purpose array for a cleaner display
        if(props.data.kind === "Path"){   
            props.data.purpose.forEach(element =>{ 
                // if we are not at the last element, concat with comma and a whitespace
                if(element.localeCompare(props.data.purpose[props.data.purpose.length - 1]) !== 0) purposeFormat.push(element.concat(", "));
                // when we are at the last element, concat with nothing
                else purposeFormat.push(element.concat(''));
            })
        }
        
        return(
            <Modal transparent={true} animationType='slide' visible={props.visible}>
                    <TouchableOpacity onPress={() => props.close()} activeOpacity={1}>
                        <TouchableWithoutFeedback style={styles.sizing}>
                            <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]}>   
                                <Text category={'h4'} style={styles.titleText}>{props.data.kind} Access</Text>
                                <View style={styles.dataView}>
                                    
                                    <View style={styles.spacing}>
                                        {(props.data.kind === "Path") ?                  
                                            <Text style={styles.infoText}>Distance: {props.data.value} ft</Text>
                                        :
                                            <Text style={styles.infoText}>Area: {props.data.value} ft²</Text>
                                        }   
                                    </View>

                                    <View style={styles.spacing}>
                                        <Text style={styles.infoText}>Description: {props.data.description}</Text>
                                    </View>

                                    {(props.data.kind === "Path") ?
                                        <View style={styles.spacing}>
                                            <Text style={styles.infoText}>Purpose: {purposeFormat}</Text>
                                        </View>
                                    :
                                        null
                                    }
                                    
                                    <View style={styles.buttonView}>
                                        <Button style={styles.closeButton} onPress={() => props.close()}>Close</Button>
                                    </View>
                                </View>                      
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
            </Modal>
        )
    }
    else return null
}
   