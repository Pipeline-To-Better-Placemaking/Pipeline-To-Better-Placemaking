import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

import HomeBottomNav from '../screens/components//Tab/BottomNav.js';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenStack from './HomeScreenStack.js';
import UserSettingsStack from './UserSettingsStack.js';
import CollaborateStack from './CollaborateStack.js';


const Tab = createBottomTabNavigator();


class TabNavigation extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
            index: 1,
            showTab: true
        }
    }

    hideTab = async () => {

        console.log("Hiding tab bar")

        await this.setState({
            showTab: false
        })
    }

    render(){

        return(
            <Tab.Navigator tabBar={props => <HomeBottomNav {...props}></HomeBottomNav>}>
                <Tab.Screen
                    name='HomeScreenStack'
                >
                    {props => <HomeScreenStack {...props} location = {this.props.location}></HomeScreenStack>}
                </Tab.Screen>
                
                <Tab.Screen
                    name='UserSettingsStack'
                >
                    {props => <UserSettingsStack {...props} userDetails={this.props.userDetails} toggleTheme={this.props.toggleTheme}/>}
                </Tab.Screen>

                <Tab.Screen
                    name='CollaborateStack'
                    options={{tabBarVisible: this.state.showTab}}
                >
                    {props => <CollaborateStack {...props}/> }
                </Tab.Screen>

            </Tab.Navigator>

        );
    }

}

export default TabNavigation;
