import React, { useState } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import { ConfirmCompare } from '../components/Compare/confrimCompare.component.js';
import styles from './homeResult.styles.js';

export const HomeResultView = (props) => {

    return(
        <View style={{justifyContent: 'flex-end'}}>
            <View style={styles.resultTextView}>

                <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                    <Text style={styles.resultText}> Results </Text>
                </View>

                <ConfirmCompare {...props} />

                <View style={styles.resultCompareButtonView}>
                  {(props.compare ?
                    <Button status='danger' appearance='outline' onPress={props.onComparePress}>
                        Cancel
                    </Button>
                     :
                     <Button status='primary' appearance='outline' onPress={props.onComparePress}>
                         Compare
                     </Button>
                   )}
                </View>
              </View>

            <View style={styles.resultLine}></View>
        </View>
    );
}
