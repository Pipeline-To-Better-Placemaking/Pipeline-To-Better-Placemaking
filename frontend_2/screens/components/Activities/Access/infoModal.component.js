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
                                <Text category={'h4'} style={styles.titleText}>{props.data.accessType}</Text>
                                <View style={styles.dataView}>

                                    <View style={styles.spacing}>
                                        <Text style={styles.infoText}>Description: {props.data.description}</Text>
                                    </View>
                                    
                                    <View style={styles.spacing}>
                                        {(props.data.accessType === "Access Point") ?                  
                                            <Text style={styles.infoText}>Spots: {props.data.spots}</Text>
                                        :
                                            (props.data.accessType === "Access Path") ?                  
                                            <Text style={styles.infoText}>Distance: {props.data.area} ft</Text>
                                            :
                                            //else its a path
                                            <Text style={styles.infoText}>Area: {props.data.area} ft²</Text>
                                        }   
                                    </View>

                                    {/* Extra data for specific types */}
                                    {(props.data.accessType === "Access Point") ?
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
   