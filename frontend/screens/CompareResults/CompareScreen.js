import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from './compareStyles'

import EmptyCompareBox from '../components/EmptyCompareBox.js'
import CompareBox from '../components/CompareBox.js';
import MyHeader from '../components/MyHeader.js';


class CompareScreen extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return(
            <View style={styles.container}>

                <MyHeader myHeaderText={"Compare"}/>

                <CompareBox/>
                <CompareBox/>
                <EmptyCompareBox/>
            </View>
        )
    }
}

export default CompareScreen;