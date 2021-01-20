import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView, Platform } from 'react-native';
import { Text, Button, Input, Icon, Divider, Card, Select, SelectItem, Datepicker, Popover, List } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';

import styles from './createActivityStyles.js';

class CreateActivity extends Component {

    constructor(props){
        super(props);

        let activityTypes = props.getActivityTypes();
        let time = new Date();

        this.state = {
            tempTitle: activityTypes[0],
            tempType: activityTypes[0],
            tempDate: time,
            tempTime: time,
            selectedActivity: 0,
            listOfTimes: [{
                timeVal: time,
                timeString: time.toLocaleTimeString(),
            }],
        }

        this.onCreateNewActivity = this.onCreateActivity.bind(this, true);
        this.onDismissNewActivity = this.onCreateActivity.bind(this, false);

        this.setSelectedActivity = this.setSelectedActivity.bind(this);
        this.createTime = this.createTime.bind(this);
        this.delete = this.delete.bind(this);

        this.setDate = this.setDate.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    onCreateActivity(submit) {
        let activityTypes = this.props.getActivityTypes();

        if (submit) {
             // save
             let activityDay = {
                 title: this.state.tempTitle,
                 type: this.state.tempType,
                 date: this.state.tempDate,
                 signUpSlots: this.state.listOfTimes
             };
             //console.log(activityDay);
             this.props.addActivity(activityDay);
        } else {
             //cancel
        }

        // this sets whether this screen is visible or not
       this.props.setCreateActivity(false);

        // reset values
        let time = new Date();
        this.setState({
            tempTitle: activityTypes[0],
            tempType: activityTypes[0],
            tempDate: time,
            tempTime: time,
            selectedActivity: 0,
            listOfTimes: [{
                timeVal: time,
                timeString: time.toLocaleTimeString(),
            }]
        });
    }

    setSelectedActivity(index) {
        let activityTypes = this.props.getActivityTypes();
        this.setState({
            tempTitle: activityTypes[index.row],
            tempType: activityTypes[index.row],
            selectedActivity: index
        });
    }

    setDate(date) {
        this.setState({
            tempDate: date
        });
    }

    setTime(value, timeIndex) {
        console.log(value);
        let selectedTime = value.target.value || this.state.tempTime;

        let tempList = [...this.state.listOfTimes];
        let timeSlot = {...tempList[timeIndex]};

        console.log(selectedTime);

        timeSlot.timeVal = selectedTime;
        timeSlot.timeString = selectedTime.toLocaleTimeString();
        tempList[timeIndex] = timeSlot;

        this.setState({
            listOfTimes: tempList
        });
      }

    createTime() {
        let time = new Date();
        let temp = {
            timeVal: time,
            timeString: time.toLocaleTimeString(),
        };
        this.state.listOfTimes.push(temp);
        this.setState({
            listOfTimes: this.state.listOfTimes
        });
    }

    delete(value, timeIndex) {
        this.state.listOfTimes.splice(timeIndex, 1);
        this.setState({
            listOfTimes: this.state.listOfTimes
        });
    }

    render() {

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

        const PlusIcon = (props) => (
          <Icon {...props} name='plus-outline'/>
        );

        const renderActivityOption = (title) => (
          <SelectItem title={title}/>
        );

        const TimePicker = ({item, index}) => (
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Text>Time </Text>
              <DateTimePicker
                  style={{width:300}}
                  mode={'time'}
                  value={this.state.listOfTimes[index].timeVal}
                  onChange={value => this.setTime(value, index)}
              />
            </View>
        );

        const Delete = ({item, index}) => (
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:5}}>
                <Button
                  onPress={() => this.delete(item, index)}
                  accessoryRight={DeleteIcon}
                  status='danger'
                  >
                    Remove
                </Button>
            </View>
        );

        const signUpCard = ({item, index}) => (
            <Card>
              <TimePicker {...{item, index}} />
              <Delete {...{item, index}} />
            </Card>
        );

        const today = new Date();
        let activityTypes = this.props.getActivityTypes();

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
                            value={activityTypes[this.state.selectedActivity.row]}
                            selectedIndex={this.state.selectedActivity}
                            onSelect={activity => this.setSelectedActivity(activity)}
                            >
                            {activityTypes.map((item, index) =>
                                <SelectItem key="{item}" title={item}/>
                            )}
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

                    <View style={styles.btnView}>
                      <Button
                        onPress={this.createTime}
                        accessoryLeft={PlusIcon}>
                            Create Time Slot
                      </Button>
                    </View>

                    <List
                      style={{marginRight:40, maxHeight:500}}
                      data={this.state.listOfTimes}
                      ItemSeparatorComponent={Divider}
                      renderItem={signUpCard}
                    />

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
