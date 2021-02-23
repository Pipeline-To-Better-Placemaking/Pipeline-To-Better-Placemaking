import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './dataEntryModal.styles.js';

export function MovingModal(props) {

    const confirm = () => {
        props.confirm()
    }

    return(
        <Modal transparent={true} animationType='slide'visible={props.moving}>
            <View style={{height: '20%', marginTop: 'auto',backgroundColor:'white', borderTopLeftRadius: 35,borderTopRightRadius: 35,borderWidth: 1}}>
                <Text category={'h4'} style={{alignSelf: 'center', marginTop: 20}}>Move to the next position.</Text>
                <Button style={{marginTop: 30, width:200, alignSelf: 'center'}} onPress={confirm}> Confirm </Button>
            </View>
        </Modal>
    )
}
