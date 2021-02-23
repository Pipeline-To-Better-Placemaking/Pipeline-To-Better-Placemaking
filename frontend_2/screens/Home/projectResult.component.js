import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBack } from '../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './projectResult.styles';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export function ProjectResultPage(props) {

  let fakeData =[{title:'Result Info'}];


  const openActivityPage = async (item) => {
    //console.log("selected activity: ", item);
  };

  const activityItem = ({ item, index }) => (
      <ListItem
        title={
              <Text style={{fontSize:20}}>
                  {`${item.title}`}
              </Text>}
        accessoryRight={ForwardIcon}
        onPress={() => openActivityPage(item)}
      />
  );

  return (
    <ViewableArea>
      <HeaderBack {...props} text={props.project.title}/>
      <ContentContainer>

        <View style={{height:'45%'}}>
          <MapAreaWrapper area={props.project.subareas[0].points} mapHeight={'100%'}>
            <ShowArea area={props.project.subareas[0].points} />
          </MapAreaWrapper>
        </View>

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text>Location: {props.project.description}</Text>
                <Text>Admin: {props.team.users[0].firstname} {props.team.users[0].lastname}</Text>
            </View>
        </View>

        <View style={styles.teamTextView}>
            <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                <Text style={styles.teamText}>Research Results</Text>
            </View>
        </View>
        <Divider style={{marginTop: 5}} />

        <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'50%', marginTop:15}}>
          <List
            style={{maxHeight:'100%', maxWidth:'90%'}}
            data={fakeData}
            ItemSeparatorComponent={Divider}
            renderItem={activityItem}
          />
        </View>

      </ContentContainer>
    </ViewableArea>
  );
};
