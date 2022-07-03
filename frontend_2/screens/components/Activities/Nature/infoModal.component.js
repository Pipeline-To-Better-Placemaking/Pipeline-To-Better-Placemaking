import React from 'react';
import { View, Modal,  TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './infoModal.styles';

export function InfoModal(props) {

    const theme = useTheme();
    
    // only render the modal if the passed in data prop is something 
    if(props.data !== undefined){
        return(
            <Modal transparent={true} animationType='slide' visible={props.visible}>
                    <TouchableOpacity onPress={() => props.close()} activeOpacity={1}>
                        <TouchableWithoutFeedback style={styles.sizing}>
                            <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]}>   
                                <Text category={'h4'} style={styles.titleText}>Body of Water</Text>
                                <View style={styles.dataView}>
                                    
                                    <View style={styles.spacing}>
                                        <Text style={styles.infoText}>Area: {props.data.area} ft²</Text>  
                                    </View>

                                    <View style={styles.spacing}>
                                        <Text style={styles.infoText}>Description: {props.data.description}</Text>
                                    </View>
                                    
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