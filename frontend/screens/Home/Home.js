import React, { Component } from 'react';

import HomeResultView from './ResultView.js';
import HomeMapView from './HomeMapView.js';
import HomeBottomNav from '../components/BottomNav.js';
import DummyResult from '../components/DummyResult.js';

import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './homeStyles.js';

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
            compare: false
        }

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
                <View style={styles.header}>
                    <Text category='h5' style={styles.headerText}>
                        Home
                    </Text>
                </View>

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

                {/*The View is just the height of the bottom Nav bar*/}
                <View style={{height:50}}/>
                <HomeBottomNav navigation={this.props.navigation} selectedIndex={1}/>
            </View>
        );

    }
}

export default Home;
