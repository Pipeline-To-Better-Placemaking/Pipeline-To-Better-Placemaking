import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal, Divider, Card } from '@ui-kitten/components';
import styles from './collaborateStyles.js';

class CreateTeamCard extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <Card>
              <Text>Enter a Team Name                          </Text>
              <Input
                  placeholder='Type Here...'
                  onChangeText={this.props.setTempTeamName}
              />
              <Button onPress={this.props.onCreateNewTeam}>
                Create
              </Button>
            </Card>
        );
    }
}

export default CreateTeamCard;
