import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, MenuItem, OverflowMenu } from '@ui-kitten/components';
import { HeaderBack } from '../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './projectResult.styles';

export function ActivityResultPage(props) {

  return (
    <ViewableArea>
      <HeaderBack {...props} text={props.project.title}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Result Information</Text>
          <Divider style={{marginTop:5, marginBottom:10, borderWidth:0.5}} />

          <Text>Team: {props.team.title}</Text>
          <Text>Admin: {props.team.users[0].firstname} {props.team.users[0].lastname}</Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Location: {props.project.description}</Text>
          <Text>Area: </Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Activity Type: </Text>
          <Text>Start Time: </Text>
          <Text>End Time: </Text>

          <Divider style={{marginTop:10, marginBottom:10}} />

          <Text>Researcher: </Text>

          <Divider style={{marginTop:10, marginBottom:20, borderWidth:0.5}} />

          <Button
            style={styles.margins}
            accessoryRight={MapIcon}
          >
            View Map Results
          </Button>
          <Button
            style={styles.margins}
            accessoryRight={ChartIcon}
          >
            View Graphical Report
          </Button>
          <Button
            style={styles.margins}
            accessoryRight={MailIcon}
          >
            Email Me Results
          </Button>

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
};

// compass-outline
// pin-outline
const MapIcon = (props) => (
  <Icon {...props} name='compass-outline'/>
);

// file-text-outline
// pie-chart-outline
const ChartIcon = (props) => (
  <Icon {...props} name='file-text-outline'/>
);

const MailIcon = (props) => (
  <Icon {...props} name='email-outline'/>
);
