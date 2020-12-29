import React, {Component} from 'react';
import Collaborate from '../screens/Collaborate/Collaborate.js';
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
            </CollaborateScreenStack.Navigator>
        )
    }
}

export default CollaborateStack;