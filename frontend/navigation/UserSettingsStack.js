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
    }

    render() {
        return(
            <UserSettingsScreenStack.Navigator>

                <UserSettingsScreenStack.Screen
                    name="UserSettings"
                    options={{headerShown: false}}
                    >
                    {props => <UserSettings {...props} toggleTheme={this.props.toggleTheme}/>}
                </UserSettingsScreenStack.Screen>

                <UserSettingsScreenStack.Screen
                    name="ChangeName"
                    options={{headerShown: false}}
                    component={ChangeNameScreen}
                />

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