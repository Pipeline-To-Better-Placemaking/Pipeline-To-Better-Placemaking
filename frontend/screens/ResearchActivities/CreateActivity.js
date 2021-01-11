import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { Text, Button, Input, Icon, Divider, Card, Select, SelectItem, Datepicker, Popover } from '@ui-kitten/components';
import * as Location from 'expo-location';

import styles from './createActivityStyles.js';

class CreateActivity extends Component {

    constructor(props){
        super(props);

        let activityTypes = props.getActivityTypes();

        this.state = {
            tempTitle: activityTypes.StationaryMap.name,
            tempType: activityTypes.StationaryMap,
            tempDate: new Date(),
            selectedIndex: 0,
        }

        this.onCreateNewActivity = this.onCreateActivity.bind(this, true);
        this.onDismissNewActivity = this.onCreateActivity.bind(this, false);

        this.setSelectedIndex = this.setSelectedIndex.bind(this);
        this.getDisplayValue = this.getDisplayValue.bind(this);
        this.setDate = this.setDate.bind(this);
    }

    onCreateActivity(submit) {
        if (submit) {
            this.props.setCreateActivity(false);
        } else {
            this.props.setCreateActivity(false);
        }
    }

    setSelectedIndex(index) {
        this.setState({
            selectedIndex: index
        });
    }

    getDisplayValue() {
        switch (this.state.selectedIndex.row) {
            case 0:
                return 'Stationary Map';
            case 1:
                return 'People Moving';
            case 2:
                return 'Survey';
            default:
        }
    }

    setDate(date) {
        this.setState({
            tempDate: date // date.toLocaleDateString()
        });
    }

    render() {

        const CancelIcon = (props) => (
          <Icon {...props} name='close-outline'/>
        );

        const CreateIcon = (props) => (
          <Icon {...props} name='checkmark-outline'/>
        );

        const CalendarIcon = (props) => (
          <Icon {...props} name='calendar'/>
        );

        const renderActivityOption = (title) => (
          <SelectItem title={title}/>
        );

        const today = new Date();

        return(
            <Popover
                anchor={this.props.anchor}
                visible={this.props.createActivity}
                backdropStyle={styles.backdrop}
                onBackdropPress={this.onDismissNewActivity}
                fullWidth={true}
                >
                  <View style={styles.container}>

                      <View style={styles.activityView}>
                          <Text>Select a Research Activity: </Text>
                          <Select style={{flex:1}}
                            value={this.getDisplayValue()}
                            selectedIndex={this.state.selectedIndex}
                            onSelect={index => this.setSelectedIndex(index)}
                            >
                              <SelectItem title={"Stationary Map"}/>
                              <SelectItem title={"People Moving"}/>
                              <SelectItem title={"Survey"}/>
                          </Select>
                      </View>

                      <View style={styles.activityView}>
                          <Text>Select a Date: </Text>
                          <Datepicker
                            style={{flex:1}}
                            placeholder='Pick Date'
                            min={today}
                            date={this.state.tempDate}
                            value={this.state.tempDate}
                            onSelect={nextDate => this.setDate(nextDate)}
                            accessoryRight={CalendarIcon}
                            placement={'bottom end'}
                          />
                      </View>

                    <View style={styles.activityView}>
                      <Text style={{textAlign:'center'}}>
                          Some content here about creating time slots
                          (this should change with the activityType)
                          *Note: This panel doesn't do anything yet
                      </Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
                      <Button onPress={this.onDismissNewActivity}
                              status='danger'
                              accessoryLeft={CancelIcon}>
                        Cancel
                      </Button>
                      <Button onPress={this.onCreateNewActivity}
                              status='success'
                              accessoryLeft={CreateIcon}>
                        Create
                      </Button>
                  </View>
                </View>
            </Popover>
        );
    }
}

export default CreateActivity;
