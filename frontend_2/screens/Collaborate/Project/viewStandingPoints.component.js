import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { MapAreaWrapper, ShowAreas, ShowMarkers, getRegionForCoordinates } from '../../components/Maps/mapPoints.component';
import { ModalContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditPoints } from './editStandingPoints.component';
import * as Location from 'expo-location';

export function EditStandingPoints(props) {

  const [editPointVisible, setEditPointVisible] = useState(false);
  let location = getRegionForCoordinates(props.project.subareas[0].points);
  const nullableEntry = {
    newPoint: true,
    _id: '',
    latitude: location.latitude,
    longitude: location.longitude,
    title:'Point ',
    index: 0
  };

  const [pointInfo, setPointInfo] = useState({...nullableEntry});

  const close = () => {
    props.setVisible(false);
  }

  const editPoint = async (newPoint, point, index) => {
    let temp = { ...pointInfo};
    temp.newPoint = newPoint;
    temp._id = nullableEntry._id;
    temp.latitude = nullableEntry.latitude;
    temp.longitude = nullableEntry.longitude;
    temp.title = 'Point ';
    temp.index = index;

    if(!newPoint) {
      temp.latitude = point.latitude;
      temp.longitude = point.longitude;
      temp._id = point._id;
      temp.title = point.title;
    }

    await setPointInfo(temp);
    setEditPointVisible(true);
  }

  const renderPointItem = ({ item, index }) => (
    <ListItem
      title={item.title}
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
          area={props.project.subareas[0].points}
          mapHeight={'100%'}
        >
          <ShowAreas areas={props.project.subareas}/>
          <ShowMarkers markers={props.project.standingPoints}/>
        </MapAreaWrapper>
      </View>

      <View style={{flexDirection:'row', justifyContent: 'space-between', margin:5}}>
        <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
          <Text style={{fontSize:25}} >Standing Points </Text>
        </View>
        <Button
          status='info'
          onPress={() => editPoint(true, [], props.project.standingPoints.length)}
          accessoryLeft={PlusIcon}
        >
          Create New Point
        </Button>
      </View>

      <List
        data={props.project.standingPoints}
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
