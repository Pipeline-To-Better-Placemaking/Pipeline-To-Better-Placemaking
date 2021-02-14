import React from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { styles } from '../../Home/home.styles.js';

export function ConfirmCompare(props) {

    const onCompareConfirm = () => {
        console.log("Props: " + JSON.stringify(props));

        props.navigation.navigate("CompareScreen");
    }

    const CompareButton = () => {

        if (props.compare)
        {
            return (
                <Button onPress={onCompareConfirm} style={styles.confirmCompareCount}>
                    <Text style={styles.confirmCompareTextCount}>
                        Confirm Compare
                    </Text>
                </Button>
            );
        }
        else if (props.compare)
        {
            return (
                <Button disabled={true} style={styles.confirmCompareNoCount}>
                    <Text style={styles.confirmCompareTextNoCount}>
                        Confirm Compare
                    </Text>
                </Button>
            );
        }
        else
        {
            return null;
        }
    }

    return(
        <View>
            <CompareButton/>
        </View>
    )
}