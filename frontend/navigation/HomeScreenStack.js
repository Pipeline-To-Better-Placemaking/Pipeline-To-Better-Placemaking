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
        this.removeFromSelectedProjects = this.removeFromSelectedProjects.bind(this)
    }

    async getSelectedProjects(projects) {

        await this.setState({
            selectedProjects: projects
        })
    }

    async removeFromSelectedProjects(name) {

        var selectedProjectsArray = this.state.selectedProjects

        var index = selectedProjectsArray.indexOf(name)

        selectedProjectsArray.splice(index, 1)

        console.log("Array: " + JSON.stringify(selectedProjectsArray))

        await this.setState({
            selectedProjects: selectedProjectsArray
        })
    }

    render() {
        return(
            <HomeStack.Navigator>

                <HomeStack.Screen
                    name="HomeScreen"
                    options={{headerShown: false}}
                >
                    {props => <HomeScreen {...props}
                                selectedProjects={this.state.selectedProjects}
                                setProjects={this.getSelectedProjects}
                                navigation={this.props.navigation}
                                location = {this.props.location}
                                removeFromSelectedProjects ={this.removeFromSelectedProjects}>
                                </HomeScreen>}
                </HomeStack.Screen>
                
                <HomeStack.Screen
                    name="CompareScreen"
                    options={{headerShown: false}}
                >
                    {props => <CompareScreen {...props} 
                                removeFromSelectedProjects={this.removeFromSelectedProjects}
                                selectedProjects={this.state.selectedProjects}
                                navigation={this.props.navigation}
                                compareCount={this.state.selectedProjects.length}>
                                </CompareScreen>}
                </HomeStack.Screen>

            </HomeStack.Navigator>
        )
    }
}

export default HomeScreenStack;