import React, { Component } from 'react';

import HomeMapView from './components/HomeMapView.js';
import HomeResultView from './components/HomeResultView.js';
import HomeBottomNav from './components/HomeBottomNav.js';
import DummyResult from './components/DummyResult.js';

import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './styles/homeStyles.js'; 

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
            compare: false
        }

        this.goToUserSettings = this.goToUserSettings.bind(this);
        this.onComparePress = this.onComparePress.bind(this);
    }

    goToUserSettings = () => {
        this.props.navigation.navigate("UserSettings");
    }

    onComparePress() {

        this.setState({
            compare: !this.state.compare
        });
    }

    render() {

        return(
            <View style={styles.container}>
                <View style={[{backgroundColor: '#006FD6'}]}>
                    <Text category='h5' style={styles.header}>
                        Home
                    </Text>
                </View>

                <View>
                    <HomeMapView location={this.state.location}/>
                    <HomeResultView onComparePress={this.onComparePress}/>
                </View>

                <ScrollView>
                    <DummyResult compare={this.state.compare}/>
                    <DummyResult compare={this.state.compare}/>
                    <DummyResult compare={this.state.compare}/>
                    <DummyResult compare={this.state.compare}/>
                    <DummyResult compare={this.state.compare}/>
                </ScrollView>
    
                <HomeBottomNav goToUserSettings={this.goToUserSettings}/>
            </View>
        );

    }
}

export default Home;