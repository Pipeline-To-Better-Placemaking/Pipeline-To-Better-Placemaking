import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import ViewProjectMap from '../../components/Maps/ViewProjectMap.js'
import BackHeader from '../../components/Headers/BackHeader.js';
import styles from '../../CompareResults/compareStyles.js';

class StationaryActivity extends Component {

    constructor(props){
        super(props);
        console.log("route: ", props.route);
        console.log("route params: ", props.route.params);
        //console.log("activity", props.getSelectedActivity());
        this.state = {

            // idk if this worked before, sorry if I broke something
            // location: props.route.params.location,
            // area: props.route.params.area

            location: {
              "latitude": 28.60281064892976,
              "longitude": -81.20062004774809,
            },
            area: [
                  {
                    "latitude": 28.60281064892976,
                    "longitude": -81.20062004774809,
                  },
                  {
                    "latitude": 28.601854567009166,
                    "longitude": -81.2006676569581,
                  },
                  {
                    "latitude": 28.60175654457185,
                    "longitude": -81.19934029877186,
                  },
                ]
        }

        this.openPrevPage = this.openPrevPage.bind(this);
    }

    openPrevPage() {
        this.props.navigation.navigate("SignUpPage");
    }

    componentDidMount() {

        // this.props.navigation.setOptions({tabBarVisible: false})
    }

    render() {

        return(
            <View style={styles.container}>

                <BackHeader headerText={"Create Boundaries"} prevPage={this.openPrevPage}/>

                <View style={styles.mapContainer}>
                    <ViewProjectMap
                        location={this.state.location}
                        area={this.state.area}
                    />
                </View>

            </View>
        );
    }
}

export default StationaryActivity;
