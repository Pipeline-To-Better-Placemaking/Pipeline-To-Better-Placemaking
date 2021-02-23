import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, SafeAreaView, Modal } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { MapAreaWrapper, ShowAreas, MapAdd } from '../../components/Maps/mapPoints.component';
import { ModalContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditPoints } from './editArea.component';
import * as Location from 'expo-location';

export function EditSubAreas(props) {

  const location = props.subareas[0].points[0];
  const [editAreaVisible, setEditAreaVisible] = useState(false);
  const nullableEntry = {
    points: props.subareas[0].points[0],
    newArea: true,
    index: 1,
    _id: '',
    location: location,
    title:'Area ',
};
  const [areaInfo, setAreaInfo] = useState(nullableEntry);
  const [tempArea, setTempArea] = useState([]);

  const close = () => {
    props.setVisible(false);
  }

  const editArea = async (newArea, area, index) => {
    let temp = { ...areaInfo};
    temp.points = area;
    temp.newArea = newArea;
    temp.index = index;
    temp._id = '';
    temp.location = location;
    temp.title = 'Area ' + (index + 1);

    if(!newArea) {
      temp.location = area.points[0];
      temp._id = area._id;
      temp.points = area.points;
      //temp.title = area.title; // TODO
    }

    await setAreaInfo(temp);
    await setTempArea([...temp.points]);
    setEditAreaVisible(true);
  }

  const renderAreaItem = ({ item, index }) => (
    <ListItem
      title={`Area ${index+1} `}
      accessoryRight={EditIcon}
      onPress={() => editArea(false, item, index)}
    />
  )

  return (
    <ModalContainer {...props} visible={props.visible}>
      <EditPoints
        {...props}
        areaInfo={areaInfo}
        tempArea={tempArea}
        setTempArea={setTempArea}
        visible={editAreaVisible}
        setVisible={setEditAreaVisible}
      />
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{fontSize:25}}>Edit Area(s)</Text>
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
          area={props.subareas[0].points}
          mapHeight={'100%'}
        >
          <ShowAreas areas={props.subareas}/>
        </MapAreaWrapper>
      </View>

      <View style={{flexDirection:'row', justifyContent: 'space-between', margin:5}}>
        <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
          <Text style={{fontSize:25}} >Areas </Text>
        </View>
        <Button
          status='info'
          onPress={() => editArea(true, [], props.subareas.length)}
          accessoryLeft={PlusIcon}
        >
          Create New Subarea
        </Button>
      </View>

      <List
        data={props.subareas}
        ItemSeparatorComponent={Divider}
        renderItem={renderAreaItem}
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
