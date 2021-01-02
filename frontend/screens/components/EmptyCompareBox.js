import React, {Component} from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from '../CompareResults/compareStyles.js';

class EmptyCompareBox extends Component {
    render(){

        const PlusIcon = (props) => (
            <Icon {...props} style={styles.plusIcon} fill='#8F9BB3' name='plus-outline'/>
        )

        return(
            <View>
                <Button style={styles.emptyBox} accessoryLeft={PlusIcon}/>
            </View>
        )
    }
}

export default EmptyCompareBox