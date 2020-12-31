import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import MyHeader from '../components/MyHeader.js';
import BackHeader from '../components/BackHeader.js';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import styles from './collaborateStyles.js';

class TeamPage extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
        this.openPrevPage = this.openPrevPage.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("Collaborate");
    }

    render() {

        return(
            <View style={styles.container}>
                <BackHeader headerText={this.props.route.params.selectedTeam.title} prevPage={this.openPrevPage}/>
            </View>
        );
    }
}

export default TeamPage;
