import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModal.styles.js';

export function DataGroupGender(props) {

    const [genderIndex, setGenderIndex] = useState(-1)
    const [genderMatrix, setGenderMatrix] = useState([0,0,0,0])

    const _setGenderIndex = async (index) => {

        let mat = [0,0,0,0]
        mat[index] = 1

        await setGenderIndex(index)
        await setGenderMatrix(mat)
        await props.setGenderData(index, mat)
    }

    return(
        <View style={{marginTop: 25}}>
        <Text category={'h6'} style={{marginBottom: 10}}> Gender: </Text>
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                <Button style={{width:150, marginRight: 45}} appearance={genderMatrix[0] ? 'primary' : 'outline'} onPress={() => _setGenderIndex(0)}>Male</Button>
                <Button style={{width:150, marginRight: 10}} appearance={genderMatrix[1] ? 'primary' : 'outline'} onPress={() => _setGenderIndex(1)}>Female</Button>
            </View>
        </View>
    )
}
