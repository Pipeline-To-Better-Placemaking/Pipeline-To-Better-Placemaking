import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { MapAreaWrapper, ShowAreas, ShowMarkers } from '../../components/Maps/mapPoints.component';
import { ModalContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditPoints } from './editStandingPoints.component';
import * as Location from 'expo-location';

export function EditStandingPoints(props) {

  const [editPointVisible, setEditPointVisible] = useState(false);
  const location = props.subareas[0].area[0];
  const nullableEntry = {
    newPoint: true,
    index: 1,
    _id: '',
    location: location,
    title:'Point ',
  };

  const [pointInfo, setPointInfo] = useState(nullableEntry);

  const close = () => {
    props.setVisible(false);
  }

  const editPoint = async (newPoint, point, index) => {
    let temp = { ...pointInfo};
    temp.newPoint = newPoint;
    temp.index = index;
    temp._id = '';
    temp.location = location;
    temp.title = 'Point ' + (index + 1);

    if(!newPoint) {
      temp.location = point.location;
      temp._id = point._id;
      //temp.title = point.title; // TODO
    }

    await setPointInfo(temp);
    setEditPointVisible(true);
  }

  const renderPointItem = ({ item, index }) => (
    <ListItem
      title={`Point ${index+1} `}
      accessoryRight={EditIcon}
      onPress={() => editPoint(false, item, index)}
    />
  )

  return (
    <ModalContainer {...props} visible={props.visible}>
      <EditPoints
        {...props}
        pointInfo={pointInfo}
        setPointInfo={setPointInfo}
        visible={editPointVisible}
        setVisible={setEditPointVisible}
      />
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{fontSize:25}}>Edit Standing Points</Text>
        <Button
          style={{marginBottom:5}}
          onPress={close}
          status='info'
          appearance={'outline'}
        >
          Done
        </Button>
      </View>

      <View style={{height:'50%'}}>
        <MapAreaWrapper
          area={props.subareas[0].area}
          mapHeight={'100%'}
        >
          <ShowAreas areas={props.subareas}/>
          <ShowMarkers markers={props.standingPoints}/>
        </MapAreaWrapper>
      </View>

      <View style={{flexDirection:'row', justifyContent: 'space-between', margin:5}}>
        <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
          <Text style={{fontSize:25}} >Standing Points </Text>
        </View>
        <Button
          status='info'
          onPress={() => editPoint(true, [], props.standingPoints.length)}
          accessoryLeft={PlusIcon}
        >
          Create New Point
        </Button>
      </View>

      <List
        data={props.standingPoints}
        ItemSeparatorComponent={Divider}
        renderItem={renderPointItem}
      />
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
