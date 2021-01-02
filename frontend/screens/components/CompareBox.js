import React, {Component} from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from '../CompareResults/compareStyles.js';

class CompareBox extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <View>
                <Button style={styles.box}/>
            </View>
        )
    }
}

export default CompareBox