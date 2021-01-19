import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { Text, Button, Input, Icon, Divider, Card, Select, SelectItem, Datepicker, Popover, List } from '@ui-kitten/components';
import * as Location from 'expo-location';

import styles from './createActivityStyles.js';

class CreateActivity extends Component {

    constructor(props){
        super(props);

        let activityTypes = props.getActivityTypes();

        this.state = {
            tempTitle: activityTypes[0],
            tempType: activityTypes[0],
            tempDate: new Date(),
            selectedActivity: 0,
            listOfTimes: [{
                selectedHour: 0,
                selectedMin: 0,
                selectedTime: 0
            }],
        }

        this.onCreateNewActivity = this.onCreateActivity.bind(this, true);
        this.onDismissNewActivity = this.onCreateActivity.bind(this, false);

        this.setSelectedActivity = this.setSelectedActivity.bind(this);
        this.createTime = this.createTime.bind(this);
        this.delete = this.delete.bind(this);
        this.setSelectedHour = this.setSelectedHour.bind(this);
        this.setSelectedMin = this.setSelectedMin.bind(this);
        this.setSelectedTime = this.setSelectedTime.bind(this);
        this.setDate = this.setDate.bind(this);
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
             this.props.addActivity(activityDay);
        } else {
             //cancel
        }

        // this sets whether this screen is visible or not
       this.props.setCreateActivity(false);

        // reset values
        this.setState({
            tempTitle: activityTypes[0],
            tempType: activityTypes[0],
            tempDate: new Date(),
            selectedActivity: 0,
            listOfTimes: [{
                selectedHour: 0,
                selectedMin: 0,
                selectedTime: 0
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

    setSelectedHour(value, timeIndex) {

        let tempList = [...this.state.listOfTimes];
        let timeSlot = {...tempList[timeIndex]};

        timeSlot.selectedHour = value;
        tempList[timeIndex] = timeSlot;

        this.setState({
            listOfTimes: tempList
        });
    }

    setSelectedMin(value, timeIndex) {

        let tempList = [...this.state.listOfTimes];
        let timeSlot = {...tempList[timeIndex]};

        timeSlot.selectedMin = value;
        tempList[timeIndex] = timeSlot;

        this.setState({
            listOfTimes: tempList
        });
    }

    setSelectedTime(value, timeIndex) {

        let tempList = [...this.state.listOfTimes];
        let timeSlot = {...tempList[timeIndex]};

        timeSlot.selectedTime = value;
        tempList[timeIndex] = timeSlot;

        this.setState({
            listOfTimes: tempList
        });
    }

    createTime() {
        let temp = {
            selectedHour: 0,
            selectedMin: 0,
            selectedTime: 0
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

        const hour = ["1", "2", "3", "4", "5", "6",
                      "7", "8", "9", "10", "11", "12"];
        const min = ["00", "05", "10", "15", "20", "25",
                     "30", "35", "40", "45", "50", "55"];
        const time = ["am", "pm"];

        const timeItem = (item) => (
            <SelectItem key="{item}" title={item} />
        );

        const TimePicker = ({item, index}) => (
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Text>Time </Text>
              <Select
                style={{width:91}}
                placeholder=' '
                value={hour[item.selectedHour.row]}
                selectedIndex={item.selectedHour}
                onSelect={value => this.setSelectedHour(value, index)}
                >
                    {hour.map(timeItem)}
              </Select>
              <Text> : </Text>
              <Select
                style={{width:95}}
                placeholder=' '
                value={min[item.selectedMin.row]}
                selectedIndex={item.selectedMin}
                onSelect={value => this.setSelectedMin(value, index)}
                >
                    {min.map(timeItem)}
              </Select>
              <Text> </Text>
              <Select
                style={{width:100}}
                placeholder=' '
                value={time[item.selectedTime.row]}
                selectedIndex={item.selectedTime}
                onSelect={value => this.setSelectedTime(value, index)}
                >
                    {time.map(timeItem)}
              </Select>
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
