import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import BackHeader from '../components/BackHeader.js';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import styles from './collaborateStyles.js';

class TeamPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: [{
                title: 'Project Name'
            }],
        }
        this.openPrevPage = this.openPrevPage.bind(this);
        this.openProjectPage = this.openProjectPage.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("Collaborate");
    }

    openProjectPage(item) {
        this.props.setSelectedProject(item);
        this.props.navigation.navigate("ProjectPage");
    }

    render() {

        const ForwardIcon = (props) => (
          <Icon {...props} name='arrow-ios-forward'/>
        );

        const renderItem = ({ item, index }) => (
            <ListItem
              title=<Text style={{fontSize:20}}>
                        {`${item.title}`}
                    </Text>
              accessoryRight={ForwardIcon}
              onPress={() => this.openProjectPage(item)}
            />
        );

        return(
            <View style={styles.container}>
                <BackHeader headerText={this.props.getSelectedTeam().title} prevPage={this.openPrevPage}/>

                <View style={styles.teamTextView}>
                    <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                        <Text style={styles.teamText}> Projects </Text>
                    </View>
                </View>
                <Divider style={{marginTop: 5}} />

                <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'50%', marginTop:15}}>
                    <List
                      style={{maxHeight:'100%', maxWidth:'90%'}}
                      data={this.state.data}
                      ItemSeparatorComponent={Divider}
                      renderItem={renderItem}
                    />
                </View>


            </View>
        );
    }
}

export default TeamPage;
