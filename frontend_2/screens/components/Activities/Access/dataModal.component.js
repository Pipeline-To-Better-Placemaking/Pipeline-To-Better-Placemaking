import React from 'react';
import { View, Modal} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './modal.styles';


export function DataModal(props) {

    const theme = useTheme();
    
    const sendData = async (desc) => {
        let data = {
            access_description: desc,
            location: props.point,
        }
        
        // closes the modal (in accessTest)
        await props.closeData(data);
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        <Text category={'h1'} style={styles.titleText}>Access Type</Text>
                        <View style={styles.dataView}>
                                    
                            <View style={styles.titleDesc}>
                                <Text category={'s1'} style={styles.titleDescTxt}>Select the type of access you marked</Text>
                            </View>

                            <View style={styles.buttonRow}>
                                <Button style={styles.button} onPress={()=> sendData("Cars")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Cars</Text>
                                    </View>
                                </Button>
                                <Button style={styles.button} onPress={()=> sendData("Bikes")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>Bikes</Text>
                                    </View>
                                </Button>
                                <Button style={styles.button} onPress={()=> sendData("RVs")}>
                                    <View>
                                        <Text style={styles.buttonTxt}>RVs</Text>
                                    </View>
                                </Button>
                            </View>

                            <View style={styles.backButtonView}>
                                <Button style={styles.backButton} onPress={() => props.back()}>
                                    <View>
                                        <Text style={styles.backButtonTxt}>Back</Text>
                                    </View>
                                </Button>
                            </View>
                        </View>                 
                </View>
            </View>
        </Modal>
    )
}