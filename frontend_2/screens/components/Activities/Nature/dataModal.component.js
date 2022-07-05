import React from 'react';
import { View, Modal} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from './modal.styles';

export function DataModal(props) {

    const theme = useTheme();
    
    const sendData = async (type, desc) => {
        let data = {
            kind: type,
            marker: props.point,
            description: desc
        }
        
        // closes the modal (in natureTest)
        await props.closeData(data);
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                    <ScrollView>
                        <Text category={'h1'} style={styles.titleText}>Animal Data</Text>
                        <Text category={'s1'} style={styles.titleLine}>__________________________</Text>
                        <View style={styles.dataView}>
                                    
                            <View style={styles.titleDesc}>
                                <Text category={'s1'} style={styles.titleDescTxt}>Select the best description for the marker you created</Text>
                            </View>

                            <View style={styles.typeView}>
                                <View>
                                    <Text category={'s1'}>Domesticated</Text>
                                    <View style={styles.dataButtonRow}>
                                        <Button style={styles.button} onPress={()=> sendData("Domesticated", "Dog")}>Dog</Button>
                                        <Button style={styles.button} onPress={()=> sendData("Domesticated", "Cat")}>Cat</Button>
                                    </View>
                                    <View style={styles.lastDataButtonView}>
                                        <Button style={styles.button} onPress={()=> sendData("Domesticated", "Other")}>Other</Button>
                                    </View>
                                </View>

                                <View>
                                    <Text category={'s1'}>Wild</Text>
                                    <View style={styles.dataButtonRow}>
                                        <Button style={styles.button} onPress={()=> sendData("Wild", "Squirrel")}>Squirrel</Button>
                                        <Button style={styles.button} onPress={()=> sendData("Wild", "Bird")}>Bird</Button>
                                    </View>
                                    <View style={styles.dataButtonRow}>
                                        <Button style={styles.button} onPress={()=> sendData("Wild", "Rabbit")}>Rabbit</Button>
                                        <Button style={styles.button} onPress={()=> sendData("Wild", "Duck")}>Duck</Button>
                                    </View>
                                    <View style={styles.dataButtonRow}>
                                        <Button style={styles.button} onPress={()=> sendData("Wild", "Turtle")}>Turtle</Button>
                                        <Button style={styles.button} onPress={()=> sendData("Wild", "Other")}>Other</Button>
                                    </View>
                                </View>

                                <View style={styles.backButtonView}>
                                    <Button style={styles.backButton} onPress={() => props.back()}>Back</Button>
                                </View>

                            </View>
                        </View>  
                    </ScrollView>               
                </View>
            </View>
        </Modal>
    )
}