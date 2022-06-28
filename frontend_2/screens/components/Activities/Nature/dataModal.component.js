import React from 'react';
import { View, Modal} from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './modal.styles';
import { ScrollView } from 'react-native-gesture-handler';

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
                <View style={[ styles.dataViewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                    <ScrollView>
                    <Text category={'h1'} style={styles.titleText}>Nature Data</Text>
                    <Text category={'s1'} style={styles.titleLine}>__________________________</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Select the best description from the appropriate type for the marker you created</Text>
                        </View>

                        <View style={styles.typeView}>
                            <Text category={'h4'}>Animal</Text>
                            <View>
                                <Text category={'s1'} style={styles.titleDescTxt}>Domesticated</Text>
                                <View style={styles.dataButtonRow}>
                                    <Button style={styles.button} onPress={()=> sendData("Domesticated", "Dog")}>Dog</Button>
                                    <Button style={styles.button} onPress={()=> sendData("Domesticated", "Cat")}>Cat</Button>
                                </View>
                                <View style={styles.lastDataButtonView}>
                                    <Button style={styles.button} onPress={()=> sendData("Domesticated", "Other")}>Other</Button>
                                </View>
                            </View>

                            <View>
                                <Text category={'s1'} style={styles.titleDescTxt}>Wild</Text>
                                <View style={styles.dataButtonRow}>
                                    <Button style={styles.button} onPress={()=> sendData("Wild", "Squirrel")}>Squirrel</Button>
                                    <Button style={styles.button} onPress={()=> sendData("Wild", "Bird")}>Bird</Button>
                                </View>
                                <View style={styles.dataButtonRow}>
                                    <Button style={styles.button} onPress={()=> sendData("Wild", "Rabbit")}>Rabbit</Button>
                                    <Button style={styles.button} onPress={()=> sendData("Wild", "Otter")}>Otter</Button>
                                </View>
                                <View style={styles.dataButtonRow}>
                                    <Button style={styles.button} onPress={()=> sendData("Wild", "Turtle")}>Turtle</Button>
                                    <Button style={styles.button} onPress={()=> sendData("Wild", "Other")}>Other</Button>
                                </View>
                            </View>
                            

                            <Text category={'h4'} style={styles.typeSpace}>Landscape</Text>
                            <View>
                                <View style={styles.dataButtonRow}>
                                    <Button style={styles.button} onPress={()=> sendData("Landscape", "Native")}>Native</Button>
                                    <Button style={styles.button} onPress={()=> sendData("Landscape", "Design")}>Design</Button>
                                </View>
                                <View style={styles.lastDataButtonView}>
                                    <Button style={styles.button} onPress={()=> sendData("Landscape", "Open Field")}>Open Field</Button>
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