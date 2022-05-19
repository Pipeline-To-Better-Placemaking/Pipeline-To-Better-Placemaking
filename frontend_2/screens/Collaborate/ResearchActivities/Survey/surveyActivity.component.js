import React, { useState } from 'react';
import { View, Image, Linking } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { Header } from '../../../components/headers.component';
import { useTheme, Text, Button } from '@ui-kitten/components';
import { MapAreaWrapper, ShowArea } from '../../../components/Maps/mapPoints.component.js';
import CountDown from 'react-native-countdown-component';

import { styles } from './surveyActivity.styles';

export function SurveyActivity(props) {

  const theme = useTheme();
  let surveyLink = 'http://ucf.qualtrics.com/jfe/form/SV_9vozKCHxjfyAHJ3';

  const [location] = useState(props.timeSlot.location)
  const [area] = useState(props.timeSlot.area)
  const [start, setStart] = useState(false)

  const endActivity = () => {
    setStart(false)
    props.navigation.navigate("ActivitySignUpPage");
  }

  const updateTime = (value) => {
    let temp = props.timeSlot;
    temp.timeLeft = value;
    props.setTimeSlot(temp);
  }

  const StartStopButton = () => {
    if (start) {
      return(
        <Button
          status={'danger'}
          style={styles.stopButton}
          onPress={() => endActivity()}
        >
          End
        </Button>
      )
    }
    else {
      return(
        <Button style={styles.startButton} onPress={() => setStart(true)} >
          Start
        </Button>
      )
    }
  }

  const TimeBar = () => {
    return(
      <View>
        <View style={styles.container}>

          <StartStopButton/>

          <View>
            <Text status='danger' category='h4'>
              Code: {props.timeSlot.key}
            </Text>
          </View>

          <View>
              <CountDown
                  running={start}
                  until={props.timeSlot.timeLeft}
                  onChange={(value) => updateTime(value)}
                  size={20}
                  digitStyle={{backgroundColor:theme['background-basic-color-1']}}
                  digitTxtStyle={{color:theme['text-basic-color']}}
                  separatorStyle={{color:theme['text-basic-color']}}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: '', s: ''}}
                  showSeparator
              />
          </View>
        </View>
      </View>
    )
  }

  return(
    <ViewableArea>
      <Header text={'Survey Activity'}/>
      <ContentContainer>
        <TimeBar/>
        <View style={styles.mainView}>
            <View style={styles.mapWrapper}>
              <MapAreaWrapper area={area} mapHeight={'100%'}>
                <ShowArea area={area} />
              </MapAreaWrapper>
            </View>

            <View style={styles.surveyView}>
              <Text>
                Survey Link:
              </Text>
              <Text> </Text>
              <Text
                style={styles.surveyLink}
                onPress={() => Linking.openURL(surveyLink)}
              >
                {surveyLink}
              </Text>
            </View>

            <View style={styles.qrView}>
              <Image
                style={styles.qr}
                source={require('./surveyQRCode.png')}
              />
            </View>
        </View>
      </ContentContainer>
    </ViewableArea>
  );
}