import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { Text, Button, Input, Icon, Divider, Card } from '@ui-kitten/components';

import CreateNewProjectMap from '../../components/Maps/CreateNewProjectMap.js';

import styles from './createProjectViewStyles.js';

class CreateProjectView extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
        }
    }

    render() {

        const CancelIcon = (props) => (
          <Icon {...props} name='close-outline'/>
        );

        const CreateIcon = (props) => (
          <Icon {...props} name='checkmark-outline'/>
        );

        const SearchIcon = (props) => (
          <Icon {...props} name='search-outline'/>
        );

        return(
            <Modal
                animationType='slide'
                visible={this.props.createProject}
                >
                  <View style={styles.container}>

                      <View style={styles.projName}>
                          <Text>Enter a Project Name: </Text>
                          <Input
                              style={{flex:1}}
                              placeholder='Type Here...'
                              onChangeText={this.props.setTempProjectName}
                          />
                      </View>

                      <Text style={{marginTop:20}}>Search: </Text>

                      <View style={styles.searchView}>
                          <Input
                              style={{flex:1}}
                              placeholder='Enter a Location...'

                          />
                          <Button
                                  status='info'
                                  accessoryLeft={SearchIcon}
                                  style={{marginLeft:10}}/>
                      </View>

                      <View style={styles.mapHeight}>
                        <CreateNewProjectMap
                            location={this.state.location}
                            markers={this.props.markers}
                            addMarker={this.props.addMarker}
                            removeMarker={this.props.removeMarker}
                        />
                      </View>

                      <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:40}}>
                          <Button onPress={this.props.onDismissCreateProject}
                                  status='danger'
                                  accessoryLeft={CancelIcon}>
                            Cancel
                          </Button>
                          <Button onPress={this.props.onCreateNewProject}
                                  status='success'
                                  accessoryLeft={CreateIcon}>
                            Create
                          </Button>
                      </View>
                </View>
            </Modal>
        );
    }
}

export default CreateProjectView;
