import React, {Component} from 'react';
import UserSettings from '../screens/UserSettings/UserSettings.js';
import ChangeNameScreen from '../screens/ChangeSettings/ChangeNameScreen.js'
import ChangeEmailScreen from '../screens/ChangeSettings/ChangeEmailScreen.js'
import ChangePasswordScreen from '../screens/ChangeSettings/ChangePasswordScreen.js'
import { createStackNavigator } from '@react-navigation/stack';

const UserSettingsScreenStack = createStackNavigator();

class UserSettingsStack extends Component {

    constructor(props){
        super(props);

        this.state = {
            userDetails: {
                firstName: this.props.userDetails.firstName,
                lastName: this.props.userDetails.lastName,
                email: this.props.userDetails.email
            }
        }
    }

    updateUserName = async (firstName, lastName) => {

        console.log("Updating user name")
        console.log("Current userDetails: " + JSON.stringify(this.state.userDetails))
        console.log("Passed in variables: " + firstName + " " + lastName)

        await this.setState({
            userDetails: {
                firstName: firstName,
                lastName: lastName
            }
        })

        console.log("Post update userDetails: " + JSON.stringify(this.state.userDetails))
    }

    updateUserEmail = async (email) => {

        await this.setState({
            userDetails: {
                email: email
            }
        })
    }

    render() {
        return(
            <UserSettingsScreenStack.Navigator>

                <UserSettingsScreenStack.Screen
                    name="UserSettings"
                    options={{headerShown: false}}
                    >
                    {props => <UserSettings {...props} userDetails={this.state.userDetails} toggleTheme={this.props.toggleTheme}/>}
                </UserSettingsScreenStack.Screen>

                <UserSettingsScreenStack.Screen
                    name="ChangeName"
                    options={{headerShown: false}}
                >
                    {props => <ChangeNameScreen {...props} updateUserName={this.updateUserName} userDetails={this.state.userDetails}/>}
                </UserSettingsScreenStack.Screen>

                <UserSettingsScreenStack.Screen
                    name="ChangeEmail"
                    options={{headerShown: false}}
                    component={ChangeEmailScreen}
                />

                <UserSettingsScreenStack.Screen
                    name="ChangePassword"
                    options={{headerShown: false}}
                    component={ChangePasswordScreen}
                />

            </UserSettingsScreenStack.Navigator>
        )
    }
}

export default UserSettingsStack;