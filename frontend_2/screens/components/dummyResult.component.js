import React, { useState } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, CheckBox, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from './dummyResultStyles.js';

export const DummyResult = ( props ) => {

    const [checked, setChecked] = useState(false)
    const [added, setAdded] = useState(false)

    onCheckBoxPress = async () => {

        setChecked(!checked)

        if (checked){
            props.addProject(props.projectArea)
            setAdded(!added)
        }
        else {
            props.removeProject(props.projectArea)
            setAdded(!added)
        }
    }
    
    componentDidUpdate = async () => {

        if (!props.inList(props.projectArea) && added && checked){
            setAdded(false)
            setChecked(false)
        }
    }

    const CompareCheckBox = (props) => {

        if (props.compare)
        {
            return(
                <CheckBox checked={props.checked} onChange={onCheckBoxPress} status={'control'} style={styles.resultBoxCheckBox}/>
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