import React, {Component} from 'react';
import Collaborate from '../screens/Collaborate/Collaborate.js';
import TeamPage from '../screens/Collaborate/TeamPage.js';
import { createStackNavigator } from '@react-navigation/stack';

const CollaborateScreenStack = createStackNavigator();

class CollaborateStack extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <CollaborateScreenStack.Navigator>
                <CollaborateScreenStack.Screen
                    name="Collaborate"
                    component={Collaborate}
                    options={{headerShown: false}}
                />
                <CollaborateScreenStack.Screen
                    name="TeamPage"
                    component={TeamPage}
                    options={{headerShown: false}}
                    initialParams={{selectedTeam:null}}
                />
            </CollaborateScreenStack.Navigator>
        )
    }
}

export default CollaborateStack;
