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

  const openActivityPage = async (item) => {
    let success = false
    let result = null

    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/' + item._id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        result = await response.json();
        success = true
    } catch (error) {
        console.log("error", error)
    }

    if (result === null) {
      result = {
        success: false,
      }
    }

    if(success) {
      result.test_type = 'stationary';
      props.setSelectedResult(result);
      console.log("Selected result: ", result);
      // open results page
      props.navigation.navigate("ActivityResultPage");
    }
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

        <View style={{height:'35%'}}>
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
            data={props.results}
            ItemSeparatorComponent={Divider}
            renderItem={activityItem}
          />
        </View>

      </ContentContainer>
    </ViewableArea>
  );
};
