import React, { Component } from 'react'; 
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from '../styles/homeStyles.js'; 

class HomeBottomNav extends Component {

    constructor(props){
        super(props);

        this.state = {
            index: 1
        }
        
        this.onTabSelect = this.onTabSelect.bind(this);
    }

    onTabSelect(tabIndex) {

        this.setState({
            index: tabIndex
        });
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
            <View>
                <BottomNavigation style={styles.bottoNavView} selectedIndex={this.state.index} onSelect={ (index) => this.onTabSelect(index)}>
                    <BottomNavigationTab icon={ClipBoardIcon} style={styles.bottomNavItem}/>
                    <BottomNavigationTab icon={HomeIcon} style={styles.bottomNavItem}/>
                    <BottomNavigationTab icon={PersonIcon} style={styles.bottomNavItem}/>
                </BottomNavigation>
            </View>
        );
    }

}

export default HomeBottomNav;