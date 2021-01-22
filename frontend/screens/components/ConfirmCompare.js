import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from '../Home/homeStyles.js';

class ConfirmCompare extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    onCompareConfirm = () => {
        this.props.navigation.navigate("CompareScreen");
    }

    render(){

        const CompareButton = () => {

            if (this.props.compare)
            {
                return (
                    <Button onPress={this.onCompareConfirm} style={styles.confirmCompareCount}>
                        <Text style={styles.confirmCompareTextCount}>
                            Confirm Compare
                        </Text>
                    </Button>
                );
            }
            else if (this.props.compare)
            {
                return (
                    <Button disabled={true} style={styles.confirmCompareNoCount}>
                        <Text style={styles.confirmCompareTextNoCount}>
                            Confirm Compare
                        </Text>
                    </Button>
                );
            }
            else
            {
                return null;
            }
        }

        return(
            <View>
                <CompareButton/>
            </View>
        )
    }

}

export default ConfirmCompare;