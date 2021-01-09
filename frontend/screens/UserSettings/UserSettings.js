import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Divider, List, Icon, ListItem, Toggle } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MyHeader from '../components/MyHeader.js';

import styles from './userSettingsStyles.js';

const config = require('../../utils/config.js')

const settingsData = [
    {
        title: 'Change Name',
    },

    {
        title: 'Change Email'
    },

    {
        title: 'Change Password'
    },

    {
        title: 'Log Out'
    },

    {
        title: 'Toggle Dark Mode'
    }
]

class UserSettings extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: this.props.userDetails.firstName,
            lastName: this.props.userDetails.lastName,
            email: this.props.userDetails.email
        }
        console.log("Loading User Settings...")

        this.onToggleTheme = this.onToggleTheme.bind(this);
    }

    onPressLogOut = () => {

        this.props.navigation.navigate("TitleScreen");
    }

    onToggleTheme = () => {
        this.props.toggleTheme();
    }

    openSetting = (index) => {

        console.log(index)

        if (index == 0){
            this.props.navigation.navigate("ChangeName");
        }
        else if (index == 1){
            this.props.navigation.navigate("ChangeEmail");
        }
        else if (index == 2){
            this.props.navigation.navigate("ChangePassword");
        }
        else if (index == 3){
            this.props.navigation.navigate("TitleScreen");
        }
        else if (index == 4){
            this.onToggleTheme()
        }
    }

    render() {        

        const UserIcon = (props) => (
            <Icon {...props} fill='grey' style={styles.iconSize} name='person'/>
        )

        const UserCircle = (props) => {
            return (
                <View style={styles.circle}>
                    <Button style={styles.userIcon} accessoryLeft={UserIcon}/>
                </View>
            )
        }

        const renderItem = ({ item, index }) => (
            <ListItem
                title={<Text style={{color:'black', fontSize: 20}}>{`${item.title}`}</Text>}
                onPress={() => this.openSetting(index)}
            />
        );

        const SettingsList = () => {
            return(
                <List
                    style={{maxHeight: 1000}}
                    data={settingsData}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
            );
        }

        const UserDetails = () => {
            return(
                <View style={styles.userDetails}>
                    <Text style={{fontSize: 20, alignSelf: 'center'}}> {this.props.userDetails.firstName} {this.props.userDetails.lastName} </Text>
                    <Text style={{fontSize: 20, alignSelf: 'center'}}> {this.state.email} </Text>
                </View>
            )
        }

        return(
            <View style={styles.container}>

                <MyHeader myHeaderText={"Settings"}/>

                <View style={styles.settingsContainer}>

                    <UserCircle/>

                    <UserDetails/>

                    <SettingsList/>

                </View>

            </View>
        );
    }
}

export default UserSettings;
