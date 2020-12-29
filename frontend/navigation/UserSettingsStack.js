import React, {Component} from 'react';
import UserSettings from '../screens/UserSettings/UserSettings.js';
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
            </UserSettingsScreenStack.Navigator>
        )
    }
}

export default UserSettingsStack;