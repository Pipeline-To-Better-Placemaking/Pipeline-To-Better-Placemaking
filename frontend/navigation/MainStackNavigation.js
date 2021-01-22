import React, {Component} from 'react';

import TitleScreen from '../screens/TitleScreen.js';
import SignUp from '../screens/SignUp/SignUp.js';
import HomeNav from './HomeNav.js';
import LogIn from '../screens/Login/LogIn.js';
import ForgotPasswordScreen from '../screens/ForgotPassword/ForgotPasswordScreen.js';
import StandingPointScreen from '../screens/ResearchActivities/StandingPointScreen';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class MainStackNavigation extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(

            <Stack.Navigator>
                
                <Stack.Screen
                name="TitleScreen"
                component={TitleScreen}
                options={{ headerShown: false}}
                />

                <Stack.Screen
                name="LogIn"
                options={{headerShown: false}}
                >
                {props => <LogIn {...props} getCoords={this.props.getCoords}></LogIn>}
                </Stack.Screen>

                <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
                />

                <Stack.Screen
                    name="StandingPointScreen"
                    options={{headerShown: false}}
                >
                    {props => <StandingPointScreen {...props} navigation={this.props.navigation}> </StandingPointScreen>}
            
                </Stack.Screen>

                <Stack.Screen
                name="HomeNav"
                options={{headerShown: false}}
                >
                {props => <HomeNav {...props} navigation={this.props.navigation} location = {this.props.location} toggleTheme={this.props.toggleTheme}></HomeNav>}
                </Stack.Screen>

                <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{headerShown: false}}
                />

            </Stack.Navigator>
        )
    }
}

export default MainStackNavigation;
