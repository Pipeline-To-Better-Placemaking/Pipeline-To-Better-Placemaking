import React, { Component } from 'react';

import MyHeader from '../components/MyHeader.js';
import HomeResultView from './ResultView.js';
import HomeMapView from './HomeMapView.js';
import DummyResult from '../components/DummyResult.js';

import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './homeStyles.js';

class HomeScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
            compare: false
        }

        console.log("Loading Home Screen...")

        this.onComparePress = this.onComparePress.bind(this);
    }

    onComparePress() {

        this.setState({
            compare: !this.state.compare
        });
    }

    render() {

        return(
            
            <View style={styles.container}>

                <MyHeader myHeaderText={"Home"}/>

                <View style={{height:'45%'}}>
                    <HomeMapView location={this.state.location}/>
                </View>

                <HomeResultView onComparePress={this.onComparePress}/>

                <ScrollView>
                    <DummyResult compare={this.state.compare}/>
                    <DummyResult compare={this.state.compare}/>
                    <DummyResult compare={this.state.compare}/>
                    <DummyResult compare={this.state.compare}/>
                    <DummyResult compare={this.state.compare}/>
                </ScrollView>

            </View>
        );

    }
}

export default HomeScreen;
