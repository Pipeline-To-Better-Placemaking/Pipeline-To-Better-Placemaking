import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaView, View, TouchableOpacity, Modal } from 'react-native';
import { useTheme, Card, Text, Button, Input, Icon } from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import { styles } from './content.styles';

const blueColor = '#006FD6';

export const ViewableArea = ({ children }) => {

  const statusBarHeight = getStatusBarHeight();
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: blueColor}}>
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
    <View style={{flex: 1, backgroundColor:blueColor}}>
      <SafeAreaView style={{flex: 1, backgroundColor:blueColor, marginTop:statusBarHeight}}>
        {children}
      </SafeAreaView>
    </View>
 );
};

export const ContentContainer = ({ children }) => {

  const theme = useTheme();

  return (
    <View style={{flex: 1,justifyContent:'flex-start',flexDirection:'column',backgroundColor:theme['background-basic-color-1']}}>
      {children}
    </View>
 );
};

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
          style={{
            flex: 1,
            flexDirection:'column',
            justifyContent:'space-between',
            backgroundColor:theme['background-basic-color-1'],
            marginTop:statusBarHeight,margin:20
          }}
        >
          {children}
        </SafeAreaView>
      </View>
    </Modal>
 );
};

export const PopUpContainer = ({ children, ...props }) => {

  const statusBarHeight = getStatusBarHeight();
  const theme = useTheme();

  return (
    <Modal
      style={{width:'80%'}}
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
        <Card disabled={true} style={{width:'80%', margin:5}}>
          {children}
        </Card>
      </TouchableOpacity>

    </Modal>
 );
};

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
      <Button style={{marginTop:5}} onPress={props.closePopUp}>
        Confirm
      </Button>
    </PopUpContainer>
 );
};

export const ConfirmDelete = ({ children, ...props }) => {
  return(
    <Modal
      style={{width:'80%'}}
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
            <View style={{flexDirection:'row', marginBottom: 5}}>
              <View style = {styles.circle}>
                <Icon style ={{width:30, height:30}} fill='white' name='trash-2'/>
              </View>
              <View style={{width:'75%'}}>
                <Text category='h5' style={{fontSize:25}}>Delete {props.dataType}</Text>
              </View>
            </View>
            <View style={{marginBottom: 10}}>
              <Text>Are you sure you want to delete this {props.dataType}? {props.extraInfo}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Button status='info' appearance={'outline'} onPress={()=>{props.setVisible(false)}}>Cancel</Button>
              <Button status={'danger'} onPress={props.deleteFunction}>Delete</Button>
            </View>
          </Card>
      </TouchableOpacity>
    </Modal>
  );
}
