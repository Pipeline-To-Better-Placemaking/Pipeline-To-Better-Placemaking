import React, { useState, useEffect } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, CheckBox, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from './dummyResult.styles.js';

export const DummyResult = ( props ) => {

    const [checked, setChecked] = useState(false)
    const [added, setAdded] = useState(false)

    onCheckBoxPress = async () => {

        let check = !checked

        await setChecked(check)

        if (check){
            await props.addProject(props.projectArea)
            await setAdded(!added)
        }
        else {
            await props.removeProject(props.projectArea)
            await setAdded(!added)
        }
    }

    useEffect(() => {

        if (!props.inList(props.projectArea) && added && checked){
            setAdded(false)
            setChecked(false)
        }
    })

    const CompareCheckBox = () => {

        if (props.compare)
        {
            return(
                <CheckBox checked={checked} onChange={onCheckBoxPress} status={'control'} style={styles.resultBoxCheckBox}/>
            );
        }
        else
        {
            return null;
        }
    }

    return(
        <View style={styles.result}>

            <View style={styles.resultTab}>
                <CompareCheckBox/>
            </View>

            <View style={styles.resultBox}>
                <Text category={'s1'} style={styles.resultBoxText}>
                    {props.projectArea}
                </Text>
                <Text category={'s2'} style={styles.resultBoxComment}>
                    {props.projectComment}
                </Text>
            </View>

        </View>
    );
}
