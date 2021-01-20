import React, {Component} from 'react';
import HomeScreen from '../screens/Home/HomeScreen.js';
import CompareScreen from '../screens/CompareResults/CompareScreen.js';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

class HomeScreenStack extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedProjects: []
        }

        this.getSelectedProjects = this.getSelectedProjects.bind(this)
    }

    async getSelectedProjects(projects) {

        await this.setState({
            selectedProjects: projects
        })
    }

    render() {
        return(
            <HomeStack.Navigator>

                <HomeStack.Screen
                    name="HomeScreen"
                    options={{headerShown: false}}
                >
                    {props => <HomeScreen {...props} setProjects={this.getSelectedProjects} navigation={this.props.navigation} location = {this.props.location}></HomeScreen>}
                </HomeStack.Screen>
                
                <HomeStack.Screen
                    name="CompareScreen"
                    options={{headerShown: false}}
                >
                    {props => <CompareScreen {...props} selectedProjects={this.state.selectedProjects} navigation={this.props.navigation}></CompareScreen>}
                </HomeStack.Screen>

            </HomeStack.Navigator>
        )
    }
}

export default HomeScreenStack;