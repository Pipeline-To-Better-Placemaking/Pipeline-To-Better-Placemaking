import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from './bottomNavStyles.js';

class BottomNav extends Component {

    constructor(props){
        super(props);

        this.state = {
            index: 1
        }

        this.onTabSelect = this.onTabSelect.bind(this);
    }

    onTabSelect(tabIndex) {

        if (tabIndex == 0) {
            this.setState({index: 0});
            this.props.navigation.navigate("CollaborateStack");
        } else if (tabIndex == 1) {
            this.setState({index: 1})
            this.props.navigation.navigate("HomeScreenStack");
        } else if (tabIndex == 2) {
            this.setState({index: 2})
            this.props.navigation.navigate("UserSettingsStack");
        }

    }

    render(){

        const PersonIcon = (props) => (
            <Icon {...props} name='person-outline'/>
        );

        const ClipBoardIcon = (props) => (
            <Icon {...props} name='clipboard-outline'/>
        );

        const HomeIcon = (props) => (
            <Icon {...props} name='home-outline'/>
        );

        return(
            <View style={styles.navigationWrapper}>
                <BottomNavigation style={styles.bottoNavView} selectedIndex={this.state.index} onSelect={(index) => this.onTabSelect(index)}>
                    <BottomNavigationTab icon={ClipBoardIcon}/>
                    <BottomNavigationTab icon={HomeIcon}/>
                    <BottomNavigationTab icon={PersonIcon}/>
                </BottomNavigation>
            </View>
        );
    }

}

export default BottomNav;
