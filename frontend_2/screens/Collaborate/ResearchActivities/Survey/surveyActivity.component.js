import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView, Linking } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { MapViewArea } from '../../../components/Maps/mapPoints.component.js';
import { Timer } from '../../../components/timer.component.js';
import { DataEntryModal } from '../../../components/Activities/Stationary/dataEntryModal.component.js';

export function SurveyActivity(props) {

  let surveyLink = 'http://ucf.qualtrics.com/jfe/form/SV_9vozKCHxjfyAHJ3';

  const QRCode = (props) => (
      <Image
        style={{height:'100%', width:'100%'}}
        source={require('./surveyQRCode.png')}
      />
  );

  const [location] = useState(props.route.params.activityDetails.location)
  const [area] = useState(props.route.params.activityDetails.area)
  const [start, setStart] = useState(false)

  const openPrevPage = () => {
    props.navigation.navigate("SignUpPage");
  }

  return(
    <ViewableArea>
      <Header text={'Survey Activity'}/>
      <ContentContainer>
      <View style={{flex:1, flexDirection:'column'}}>
          <View style={{height:'40%'}}>
            <MapViewArea
                location={location}
                area={area}
            />
          </View>

          <View style={{flexDirection:'row', margin:10, marginRight:10}}>
            <Text>
              Survey Link:
            </Text>
            <Text> </Text>
            <Text
              style={{color: 'blue', width:'90%'}}
              onPress={() => Linking.openURL(surveyLink)}
            >
              {surveyLink}
            </Text>
          </View>

          <View style={{flex:1, alignItems:'center'}}>
            <QRCode />
          </View>
        </View>
      </ContentContainer>
    </ViewableArea>
  )
};
