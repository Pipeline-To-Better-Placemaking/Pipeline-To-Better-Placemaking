import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import MyHeader from '../components/MyHeader.js';
import HomeBottomNav from '../components/BottomNav.js';
import TeamView from './TeamView.js';

import { Text, Button, Input, Icon, Modal, Divider, List, ListItem, Card } from '@ui-kitten/components';
import styles from './collaborateStyles.js';

class Collaborate extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: [{
                title: 'Team Name'
            }],
            createTeam: false,
            tempTeamName: ' '
        }
        this.onCreateTeam = this.onCreateTeam.bind(this);
        this.addNewTeam = this.addNewTeam.bind(this);
        this.setTempTeamName = this.setTempTeamName.bind(this);
    }

    setTempTeamName(event) {
        this.setState({
            tempTeamName: event
        })
    }

    onCreateTeam = (visible, submit) => {
        if (visible) {
            this.setState({
                createTeam: true
            });
        } else {
            if (submit && this.state.tempTeamName.trim().length !== 0) {
                this.addNewTeam(this.state.tempTeamName.trim());
            }
            this.setState({
                createTeam: false,
                tempTeamName: ' '
            });
        }
    }

    addNewTeam = (teamName) => {
        let temp = {
            title: teamName
        };
        this.state.data.push(temp);
        this.setState({
            data:this.state.data
        });
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
            />
        );

        return(
            <View style={styles.container}>

                <MyHeader myHeaderText={"Collaborate"}/>

                <TeamView onCreateTeam={this.onCreateTeam}/>

                <View style={{flexDirection:'row', justifyContent:'center', marginTop:15}}>
                    <List
                      style={{maxHeight:'80%', maxWidth:'90%'}}
                      data={this.state.data}
                      ItemSeparatorComponent={Divider}
                      renderItem={renderItem}
                    />
                </View>

                <Modal
                    style={{width:'50%', marginBottom:200}}
                    visible={this.state.createTeam}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => this.onCreateTeam(false, false)}>
                    <Card disabled={true} style={{marginBottom:200}}>
                      <Text>Enter a Team Name</Text>
                      <Input
                          placeholder='Type Here...'
                          onChangeText={this.setTempTeamName}
                      />
                      <Button onPress={() => this.onCreateTeam(false, true)}>
                        Create
                      </Button>
                    </Card>
                </Modal>

                <View style={styles.teamTextView}>
                    <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
                        <Text style={styles.teamText}> Invites </Text>
                    </View>
                </View>
                <Divider style={{marginTop: 5}} />

                <HomeBottomNav navigation={this.props.navigation} selectedIndex={0}/>
            </View>
        );
    }
}

export default Collaborate;
