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

    async onCheckBoxPress() {
        await this.setState({
            checked: !this.state.checked
        })

        if (this.state.checked)
        {
            this.props.compareIncrement();
            this.props.addProject(this.props.projectArea)
        }
        else
        {
            this.props.compareDecrement();
            this.props.removeProject(this.props.projectArea)
        }
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
                        {this.props.projectArea}
                    </Text>
                    <Text category={'s2'} style={styles.resultBoxComment}>
                        {this.props.projectComment}
                    </Text>
                </View>

            </View>
        );
    }
}

export default DummyResult;
