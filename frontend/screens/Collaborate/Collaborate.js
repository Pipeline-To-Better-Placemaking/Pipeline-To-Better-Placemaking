import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import HomeBottomNav from '../components/BottomNav.js';
import TeamView from './TeamView.js';

import { Text, Button, Input, Icon, Modal, Divider, List, ListItem } from '@ui-kitten/components';
import styles from './collaborateStyles.js';

class Collaborate extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: [{
                title: 'Team',
                description: 'Description for Team'
            }],
            numTeams: 1
        }
        this.onCreateTeam = this.onCreateTeam.bind(this);
    }

    onCreateTeam() {
        let temp = {
            title: 'Team',
            description: 'Description for Team'
        };
        this.state.data.push(temp);
        this.setState({
            data:this.state.data,
            numTeams: this.state.numTeams + 1
        });
    }

    render() {

        const ForwardIcon = (props) => (
          <Icon {...props} name='arrow-ios-forward'/>
        );

        const renderItem = ({ item, index }) => (
            <ListItem
              title=<Text style={{fontSize:20}}>
                        {`${item.title} ${index + 1}`}
                    </Text>
              description={`${item.description} ${index + 1}`}
              accessoryRight={ForwardIcon}
            />
        );

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text category='h5' style={styles.headerText}>
                        Collaborate
                    </Text>
                </View>

                <TeamView onCreateTeam={this.onCreateTeam}/>

                <View style={{flexDirection:'row', justifyContent:'center', marginTop:15}}>
                    <List
                      style={{maxHeight:'80%', maxWidth:'90%'}}
                      data={this.state.data}
                      ItemSeparatorComponent={Divider}
                      renderItem={renderItem}
                    />
                </View>

                <HomeBottomNav navigation={this.props.navigation} selectedIndex={0}/>
            </View>
        );
    }
}

export default Collaborate;
