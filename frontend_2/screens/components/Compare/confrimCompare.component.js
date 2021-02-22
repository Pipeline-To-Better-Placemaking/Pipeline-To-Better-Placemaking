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
                <Button
                  disabled={false}
                  appearance={'outline'}
                  onPress={onCompareConfirm}
                >
                  Confirm Compare
                </Button>
            );
        }
        else
        {
            return null;
        }
    }

    return(
        <CompareButton/>
    )
}
