import React, { useState } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './resultViewStyles.js';

export const HomeResultView = (props) => {

    return(
        <View style={{justifyContent: 'flex-end'}}>
            <View style={styles.resultTextView}>

                <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                    <Text style={styles.resultText}> Results </Text>
                </View>

                <View style={styles.resultCompareButtonView}>
                    <Button status='primary' appearance='outline' onPress={props.onComparePress}>
                        Compare
                    </Button>
                </View>

            </View>

            <View style={styles.resultLine}></View>
        </View>
    );
}