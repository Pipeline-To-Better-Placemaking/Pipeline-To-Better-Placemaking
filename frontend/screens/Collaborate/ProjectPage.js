import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import BackHeader from '../components/BackHeader.js';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import styles from './collaborateStyles.js';

class ProjectPage extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
        this.openPrevPage = this.openPrevPage.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("TeamPage");
    }

    render() {

        return(
            <View style={styles.container}>
                <BackHeader headerText={this.props.getSelectedProject().title} prevPage={this.openPrevPage}/>
            </View>
        );
    }
}

export default ProjectPage;
