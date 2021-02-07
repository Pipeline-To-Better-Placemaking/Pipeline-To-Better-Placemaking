import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card, Datepicker } from '@ui-kitten/components';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './form.styles';

export function SelectLocation(props) {

  return (
    <ViewableArea>
      <ContentContainer>
        <View style={styles.container}>

          <View style={styles.activityView}>
            <Text>Create New Research Activity</Text>
            <Button
              onPress={() => props.navigation.navigate('ProjectPage')}
              status={'danger'}
              appearance={'ghost'}
              accessoryLeft={CancelIcon}
            >
            </Button>
          </View>

          <View style={styles.activityView}>
            <Text>Set sub location</Text>
          </View>

          <View style={styles.activityView}>
            <Button
              onPress={() => props.navigation.navigate('IntialForm')}
              status='info'
              accessoryLeft={BackIcon}
            >
              Back
            </Button>
            <Button
              onPress={() => props.navigation.navigate('CreateStandingPoints')}
              status='info'
              accessoryRight={ForwardIcon}
            >
              Next
            </Button>
          </View>

        </View>
      </ContentContainer>
    </ViewableArea>
  );
};

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-forward-outline'/>
);

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);

const CancelIcon = (props) => (
  <Icon {...props} name='close-outline'/>
);

const DeleteIcon = (props) => (
  <Icon {...props} name='trash-2-outline'/>
);

const CreateIcon = (props) => (
  <Icon {...props} name='checkmark-outline'/>
);

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

const ClockIcon = (props) => (
  <Icon {...props} name='clock-outline'/>
);

const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);
