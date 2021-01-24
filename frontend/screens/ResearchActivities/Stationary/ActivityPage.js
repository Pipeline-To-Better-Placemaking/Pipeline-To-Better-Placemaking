import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import ViewProjectMap from '../../components/Maps/ViewProjectMap.js'
import MyHeader from '../../components/Headers/MyHeader.js';
import styles from '../../CompareResults/compareStyles.js';

class StationaryActivity extends Component {

    constructor(props){
        super(props);

        this.state = {

            // location: props.route.params.location,
            // area: props.route.params.area
        }
    }

    componentDidMount() {

        // this.props.navigation.setOptions({tabBarVisible: false})
    }

    render() {

        return(
            <View style={styles.container}>

                <MyHeader myHeaderText={"Create Boundaries"}/>
                
                {/* <View style={styles.mapContainer}>
                    <ViewProjectMap
                        location={this.state.location}
                        area={this.state.area}
                    />
                </View> */}

            </View>
        );
    }
}

export default StationaryActivity;
