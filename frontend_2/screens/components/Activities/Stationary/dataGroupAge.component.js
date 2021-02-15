import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModal.styles.js';

export function DataGroupAge(props) {

    const [ageIndex, setAgeIndex] = useState(-1)
    const [ageMatrix, setAgeMatrix] = useState([0,0,0,0])

    const _setAgeIndex = async (index) => {


        let mat = [0,0,0,0]
        mat[index] = 1

        await setAgeIndex(index)
        await setAgeMatrix(mat)
        await props.setAgeData(index, mat)
    }

    return(
        <View>
        <Text category={'h6'} style={{marginBottom: 10}}> Age: </Text>
            <View style={{flexDirection: 'row',}}>
                <Button style={{width:150, marginRight: 45}} appearance={ageMatrix[0] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(0)}>0 - 14</Button>
                <Button style={{width:150}} appearance={ageMatrix[1] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(1)}>15 - 24</Button>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
                <Button style={{width:150, marginRight: 45}} appearance={ageMatrix[2] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(2)}>25 - 64</Button>
                <Button style={{width:150}} appearance={ageMatrix[3] ? 'primary' : 'outline'} onPress={() => _setAgeIndex(3)}>65+</Button>
            </View>
        </View>
    )
}
