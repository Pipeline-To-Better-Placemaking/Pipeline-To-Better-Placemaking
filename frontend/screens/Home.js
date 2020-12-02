import React, { Component } from 'react';
import HomeMapView from './components/HomeMapView.js';
import HomeResultView from './components/HomeResultView.js';
import HomeBottomNav from './components/HomeBottomNav.js';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './styles/homeStyles.js'; 

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location
        }

    }

    render() {

        return(
            <View style={[{backgroundColor: '#FFFFFF'}]}>
                <View style={[{backgroundColor: '#006FD6'}]}>
                    <Text category='h5' style={styles.header}>
                        Home
                    </Text>
                </View>

                <View>
                    <HomeMapView location={this.state.location}/>
                    <HomeResultView/>
                </View>

                <View>
                    <HomeBottomNav/>
                </View>
            </View>
        );

    }
}

export default Home;