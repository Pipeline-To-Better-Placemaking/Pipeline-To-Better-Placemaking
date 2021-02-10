import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModalStyles.js';

export function DataOptionButton(props) {

    const [selected, setSelected] = useState(false)
    const [selectionMatrix] = useState(props.selectionMatrix)
    const [buttonStyle, setButtonStyle] = useState('outline')

    setIndex = async () => {

        await props.setIndex(props.index)
        setSelected(true)

        setSelectedAppearance()
    }

    setSelectedAppearance = async () => {

        console.log("Selection matrix in set apearance: " + props.selectionMatrix)

        if (selectionMatrix[props.index]){
            console.log("Setting button style...")

            setButtonStyle('primary')
        }
    }

    setDefaultAppearance = () => {
        
        if (!selectionMatrix[props.index] && selected == true){
            setButtonStyle('outline')
            setSelected(false)
        }
    }

    useEffect(() => {
        setDefaultAppearance()
    })

    return(
        <Button 
            appearance={buttonStyle}
            onPress={setIndex}
            style={{marginLeft: 15, width: 150}}>
                {props.text}
        </Button>
    )
}