import React, { Component } from 'react';

import MyHeader from '../components/MyHeader.js';
import HomeResultView from './ResultView.js';
import HomeMapView from './HomeMapView.js';
import DummyResult from '../components/DummyResult.js';
import ConfirmCompare from '../components/ConfirmCompare.js';

import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './homeStyles.js';

class HomeScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
            compare: false,
            compareCount: 0
        }

        this.onComparePress = this.onComparePress.bind(this);
        this.compareIncrement = this.compareIncrement.bind(this);
        this.compareDecrement = this.compareDecrement.bind(this);
    }

    onComparePress() {

        this.setState({
            compare: !this.state.compare
        });
    }

    compareIncrement() {

        this.setState({
            compareCount: this.state.compareCount + 1
        })

        console.log(this.state.compareCount)
    }

    compareDecrement() {
        let currentCount = this.state.compareCount

        this.setState({
            compareCount: this.state.compareCount - 1
        })

        console.log(this.state.compareCount)
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
                    <DummyResult compare={this.state.compare} compareIncrement={this.compareIncrement} compareDecrement={this.compareDecrement}/>
                    <DummyResult compare={this.state.compare} compareIncrement={this.compareIncrement} compareDecrement={this.compareDecrement}/>
                    <DummyResult compare={this.state.compare} compareIncrement={this.compareIncrement} compareDecrement={this.compareDecrement}/>
                    <DummyResult compare={this.state.compare} compareIncrement={this.compareIncrement} compareDecrement={this.compareDecrement}/>
                    <DummyResult compare={this.state.compare} compareIncrement={this.compareIncrement} compareDecrement={this.compareDecrement}/>
                </ScrollView>

                <ConfirmCompare navigation={this.props.navigation} compare={this.state.compare} selected={this.state.compareCount}/>
                
                
            </View>
        );

    }
}

export default HomeScreen;
