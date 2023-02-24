import React, { useState } from 'react';
import { View, Modal, KeyboardAvoidingView} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './dataModal.styles';

export function DataModal(props) {

    const theme = useTheme();

    const [buttonHeight, setButtonHeight] = useState(0);

    const handleButtonLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setButtonHeight(height);
    };
    
    const sendData = async (desc) => {
        let data = {
            description: desc
        }
        
        // closes the modal (in accessTest)
        await props.closeData(data);
    }

    const renderButtonRows = () => {
        const buttonRows = [];
        const buttons = props.desc.map((desc, index) => (
            <Button
                style={[styles.button, { height: buttonHeight + 65 }]}
                key={index}
                onLayout={(event) => {setButtonHeight(event)}}
                onPress={() => sendData(desc)}
            >
                <View>
                    <Text style={styles.buttonTxt}>{desc}</Text>
                </View>
            </Button>
        ));

        while (buttons.length) {
            buttonRows.push(buttons.splice(0, 3));
        }

        return buttonRows.map((row, index) => (
            <View style={styles.buttonRow} key={index}>
                {row}
            </View>
        ));
    };

    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                        
                    <Text category={'h1'} style={styles.titleText}>Access Description</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Select the best description for the access you marked</Text>
                        </View>
                        
                        <View>
                            {renderButtonRows()}
                        </View>
                        
                        <View style={styles.multiView}>
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
        </KeyboardAvoidingView>
    )
} 