import React, {Component} from 'react';
import HomeScreen from '../screens/Home/HomeScreen.js';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

class HomeScreenStack extends Component {

    constructor(props){
        super(props);

        console.log("Loading Home Screen Stack");
    }

    render() {
        return(
            <HomeStack.Navigator>
                <HomeStack.Screen
                    name="HomeScreen"
                    options={{headerShown: false}}
                >
                    {props => <HomeScreen {...props} location = {this.props.location}></HomeScreen>}
                </HomeStack.Screen>
            </HomeStack.Navigator>
        )
    }
}

export default HomeScreenStack;