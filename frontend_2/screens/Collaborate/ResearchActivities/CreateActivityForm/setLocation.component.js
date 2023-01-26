import React from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from '@ui-kitten/components';
import { ViewableArea, ContentContainer } from '../../../components/content.component';
import { SelectArea } from '../../../components/Maps/mapPoints.component';
import { HeaderExit } from '../../../components/headers.component';

import { styles } from './setLocation.styles';

export function SelectLocation(props) {

  const next = () => {
    props.setArea(props.subareas[props.selectedAreaIndex]);
    props.navigation.navigate('CreateTimeSlots');
  }

  const back = () => {
    props.setArea(props.subareas[props.selectedAreaIndex]);
    props.navigation.goBack();
  }

  return (
    <ViewableArea>
      <HeaderExit text={props.headerText} exit={props.exit}/>
      <ContentContainer>
        <View style={styles.container}>

          <View style={styles.activityView}>
            <Text style={styles.promptText} category='s1'>Set sub location</Text>
          </View>

          <View style={styles.selectAreaView}>
            <SelectArea areas={props.subareas} selectedIndex={props.selectedAreaIndex} setSelectedIndex={props.setSelectedAreaIndex}/>
          </View>

          <View style={styles.buttonView}>
            <Button
              onPress={back}
              status='info'
              accessoryLeft={BackIcon}
              style={[styles.buttonBorder, {marginLeft: 5}]}
            >
              Back
            </Button>
            <Button
              onPress={next}
              status='info'
              accessoryRight={ForwardIcon}
              style={[styles.buttonBorder, {marginRight: 5}]}
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
