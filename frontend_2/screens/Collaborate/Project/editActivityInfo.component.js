import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { ModalContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export function EditActivityInfo(props) {

  const close = () => {
    props.setVisible(false);
  }

  return (
    <ModalContainer {...props} visible={props.visible}>
      <View>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text category='h5' style={{fontSize:25}}>Activity Information</Text>
          <Button
            style={{marginBottom:5}}
            onPress={close}
            status='info'
            appearance={'outline'}
          >
            Done
          </Button>
        </View>

        <View style={{marginTop:10, marginBottom:30}}>
          <Text category='s1'>Survey </Text>
          <Divider />
          <Text>Defaults: </Text>
          <Text>        Time at Site: {props.project.surveyDuration} (min)</Text>
        </View>

        <View style={{marginBottom:30}}>
          <Text category='s1'>Stationary Map Activity </Text>
          <Divider />
          <Text status='danger'>This activity requires Standing Points to be set.</Text>
          <Text>Defaults: </Text>
          <Text>        Time per Standing Point: {props.project.stationaryDuration} (min)</Text>
        </View>

        <View style={{marginBottom:30}}>
          <Text category='s1'>People Moving Activity </Text>
          <Divider />
          <Text status='danger'>This activity requires Standing Points to be set.</Text>
          <Text>Defaults: </Text>
          <Text>        Time per Standing Point: {props.project.movingDuration} (min)</Text>
        </View>
      </View>
    </ModalContainer>
  );
};

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

const CancelIcon = (props) => (
  <Icon {...props} name='close-outline'/>
);

const CreateIcon = (props) => (
  <Icon {...props} name='checkmark-outline'/>
);

const EditIcon = (props) => (
  <Icon {...props} name='edit-outline'/>
);

const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);

const DeleteIcon = (props) => (
  <Icon {...props} name='trash-2-outline'/>
);
