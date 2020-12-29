import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal, Divider } from '@ui-kitten/components';
import styles from './collaborateStyles.js';

class TeamView extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <View style={{justifyContent: 'flex-end'}}>
                <View style={styles.teamTextView}>
                    <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                        <Text style={styles.teamText}> Teams </Text>
                    </View>

                    <View style={styles.createTeamButtonView}>
                        <Button status='primary' appearance='outline' onPress={() => this.props.onCreateTeam(true, false)}>
                            Create New
                        </Button>
                    </View>

                </View>

                <Divider style={{marginTop: 5}} />
            </View>
        );
    }
}

export default TeamView;
