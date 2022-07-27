import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { Card, Text, Button, Icon } from '@ui-kitten/components';

import { styles } from './deleteModal.styles'

// this component is almost the same as the confirmDelete component in content.component
// main difference is its positioning on the screen and the background so that it interacts with the tests better
export const DeleteModal = (props) => {
    return(
      <Modal
        style={styles.popupModal}
        animationType="fade"
        transparent={true}
        visible={props.visible}
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
                <Text style={styles.textCentered}>Are you sure you want to delete this {props.dataType}?</Text>
                
                {props.extraInfo === undefined ?
                    null
                :
                    <Text style={styles.textCentered}>Description(s): {props.extraInfo}</Text>
                }

              </View>
              <View style={styles.buttonRow}>
                <Button status='info' appearance={'outline'} onPress={()=>{props.setVisible(false)}}>Cancel</Button>
                <Button status='danger' onPress={props.deleteFunction}>Delete</Button>
              </View>
            </Card>
        </TouchableOpacity>
      </Modal>
    )
  }