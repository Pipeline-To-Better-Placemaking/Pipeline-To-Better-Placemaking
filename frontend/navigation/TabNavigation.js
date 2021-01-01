import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

import HomeBottomNav from '../screens/components/BottomNav.js';

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
            index: 1
        }
    }

    render(){

        return(
            <Tab.Navigator tabBar={props => <HomeBottomNav {...props}></HomeBottomNav>}>
                <Tab.Screen
                    name='HomeScreenStack'
                >
                    {props => <HomeScreenStack {...props} navigation={this.props.navigation} location = {this.props.location}></HomeScreenStack>}
                </Tab.Screen>
                
                <Tab.Screen
                    name='UserSettingsStack'
                >
                    {props => <UserSettingsStack {...props} toggleTheme={this.props.toggleTheme}/>}
                </Tab.Screen>

                <Tab.Screen
                    name='CollaborateStack'
                    component={CollaborateStack}
                />

            </Tab.Navigator>

        );
    }

}

export default TabNavigation;
