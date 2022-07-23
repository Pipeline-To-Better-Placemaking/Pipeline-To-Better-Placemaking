import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaView, View, TouchableOpacity, Modal } from 'react-native';
import { useTheme, Card, Text, Button, Input, Icon, Spinner } from '@ui-kitten/components';

import { styles } from './content.styles';

const blueColor = '#006FD6';

export const ViewableArea = ({ children }) => {

  const statusBarHeight = getStatusBarHeight();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, marginTop:statusBarHeight}}>
        {children}
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor:theme['background-basic-color-1']}}/>
    </View>
 );
};

export const BlueViewableArea = ({ children }) => {

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={styles.container}>
      <SafeAreaView style={[ styles.container, {marginTop:statusBarHeight}]}>
        {children}
      </SafeAreaView>
    </View>
 )
}

export const ContentContainer = ({ children }) => {

  const theme = useTheme();

  return (
    <View style={[ styles.contentContainer, {backgroundColor:theme['background-basic-color-1']}]}>
      {children}
    </View>
 )
}

export const ModalContainer = ({ children, ...props }) => {

  const statusBarHeight = getStatusBarHeight();
  const theme = useTheme();

  return (
    <Modal
      animationType='slide'
      visible={props.visible}
    >
      <View style={{flex: 1, backgroundColor:theme['background-basic-color-1']}}>
        <SafeAreaView
          style={[ styles.modalSafeView, {
            backgroundColor:theme['background-basic-color-1'],
            marginTop:statusBarHeight
          }]}
        >
          {children}
        </SafeAreaView>
      </View>
    </Modal>
 )
}

export const PopUpContainer = ({ children, ...props }) => {

  return (
    <Modal
      style={styles.popupModal}
      animationType="fade"
      transparent={true}
      visible={props.visible}
      backdropStyle={styles.backdrop}
      onRequestClose={props.closePopUp}
    >
      <TouchableOpacity
          style={styles.modalBackgroundStyle}
          activeOpacity={1}
          onPressOut={props.closePopUp}
        >
        <Card disabled={true} style={styles.card}>
          {children}
        </Card>
      </TouchableOpacity>

    </Modal>
 )
}

export const EnterNumber = ({ children, ...props }) => {
  return (
    <PopUpContainer
      {...props}
      visible={props.visible}
      closePopUp={props.closePopUp}
    >
      <Text>Enter Number: </Text>
      <Input
        placeholder={''}
        value={props.value}
        onChangeText={(nextValue) => props.setValue(nextValue)}
        keyboardType="number-pad"
      />
      <Button style={styles.button} onPress={props.closePopUp}>
        Confirm
      </Button>
    </PopUpContainer>
 )
}

export const ConfirmDelete = ({ children, ...props }) => {
  return(
    <Modal
      style={styles.popupModal}
      animationType="fade"
      transparent={true}
      visible={props.visible}
      backdropStyle={styles.backdrop}
    >
      <TouchableOpacity
          style={styles.modalBackgroundStyle}
          onPressOut={()=>{props.setVisible(false)}}
        >
          <Card disabled={true} style={styles.confirmDelete}>
            <View style={styles.circleView}>
              <View style = {styles.circle}>
                <Icon style ={styles.icon} fill='white' name='trash-2'/>
              </View>
              <View style={styles.textView}>
                <Text category='h5' style={styles.deleteText}>Delete {props.dataType}</Text>
              </View>
            </View>
            <View style={styles.deleteConfirm}>
              <Text>Are you sure you want to delete this {props.dataType}? {props.extraInfo}</Text>
            </View>
            <View style={styles.buttonRow}>
              <Button status='info' appearance={'outline'} onPress={()=>{props.setVisible(false)}}>Cancel</Button>
              <Button status='danger' onPress={() =>{props.deleteFunction(); props.setVisible(false);}}>Delete</Button>
            </View>
          </Card>
      </TouchableOpacity>
    </Modal>
  )
}

export const LoadingSpinner = (props) =>{
  return(
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.loading}
    >
      <View style={styles.modalBackgroundStyle}>
        <Spinner />
      </View>
    </Modal>
  )
}
