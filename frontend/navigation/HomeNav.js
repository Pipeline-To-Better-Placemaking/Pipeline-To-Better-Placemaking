import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigation from './TabNavigation';

const config = require('../utils/config.js')

var userDetails = {
    firstname: '',
    lastname: '',
    email: ''
}

class HomeNav extends Component {

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

    async componentDidMount() {

        console.log("Triggering componentDidMount")

        let token = await AsyncStorage.getItem("@token")
        let success = false

        await fetch(config.LOCALHOST +  '/api/users/profile', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => (response.json()))
        .then(async (res) => (
                console.log(res),

                await AsyncStorage.setItem("@firstName", res.user.firstname),
                await AsyncStorage.setItem("@lastName", res.user.lastname),
                await AsyncStorage.setItem("@email", res.user.email),

                userDetails = {
                    firstName: res.user.firstname,
                    lastName: res.user.lastname,
                    email: res.user.email
                }
            ))
        .catch((error) => (console.log(error), success = false))
    }

    render() {

        return(
            <TabNavigation
                location={this.state.location}
                toggleTheme={this.props.toggleTheme}
                navigation={this.props.navigation}
                userDetails={userDetails}
            />
        );

    }
}

export default HomeNav;
