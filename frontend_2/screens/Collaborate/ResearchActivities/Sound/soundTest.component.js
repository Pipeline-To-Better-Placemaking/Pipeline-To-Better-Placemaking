import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//to be used as the map activity for the screen
import { SoundMap } from '../../../components/Maps/soundMap.component';

//for test styling purposes
const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'cyan'
    }

});

export function SoundTest(props){

    return(
        <View style={styles.container} >
            <Text>Hello World!</Text>
        </View>
    );
}