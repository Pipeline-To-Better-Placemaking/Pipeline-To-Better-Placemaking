import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import BackHeader from '../components/BackHeader.js';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import * as Location from 'expo-location';
import styles from './activitySignUpStyles.js';

class ActivitySignUp extends Component {

    constructor(props){
        super(props);

        let activity = props.getSelectedActivity();

        this.state = {
            title: activity.title,
            type: activity.type,
            date: activity.date,
            signUpSlots: activity.signUpSlots
        }

        this.openPrevPage = this.openPrevPage.bind(this);
        this.openActivityPage = this.openActivityPage.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("ProjectPage");
    }

    openActivityPage() {
        let activity = this.props.getActivityTypes();
        switch (this.state.type) {
            case activity[0]:
                this.props.navigation.navigate("StationaryActivity");
                break;
            case activity[1]:
                this.props.navigation.navigate("PeopleActivity");
                break;
            case activity[2]:
                this.props.navigation.navigate("SurveyActivity");
                break;
            default:
                //console.log("nope");
        }
    }

    render() {

        const signUpCard = ({item, index}) => (
            <Card>
              <Text>Position: {index}</Text>
              <Text>Time: {item.timeString}</Text>
              <Button onPress={this.openActivityPage}>
                Sign Up / Begin
              </Button>
            </Card>
        );

        return(
            <View style={styles.container}>
                <BackHeader headerText={this.state.title} prevPage={this.openPrevPage}/>
                <Text style={{textAlign:'center'}}>
                    Type: {this.state.type}
                </Text>
                <Text style={{textAlign:'center'}}>
                    Date: {this.state.date.toLocaleDateString()}
                </Text>
                <List
                  style={{maxHeight:500}}
                  data={this.state.signUpSlots}
                  ItemSeparatorComponent={Divider}
                  renderItem={signUpCard}
                />
            </View>
        );
    }
}

export default ActivitySignUp;
