import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, CheckBox, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from './dummyResultStyles.js';

class DummyResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }

        this.onCheckBoxPress = this.onCheckBoxPress.bind(this);
    }

    onCheckBoxPress() {
        this.setState({
            checked: !this.state.checked
        })
    }

    render(){

        const CompareCheckBox = () => {

            if (this.props.compare)
            {
                return(
                    <CheckBox checked={this.state.checked} onChange={this.onCheckBoxPress} status={'control'} style={styles.resultBoxCheckBox}/>
                );
            }
            else
            {
                return null;
            }
        }

        return(
            <View style={styles.result}>
                <View style={styles.resultTab}>
                    <CompareCheckBox/>
                </View>
                <View style={styles.resultBox}>
                    <Text category={'s1'} style={styles.resultBoxText}>
                        Dummy Result
                    </Text>
                    <Text category={'s2'} style={styles.resultBoxComment}>
                        Dummy Result Comment
                    </Text>
                </View>

            </View>
        );
    }
}

export default DummyResult;
