import React, { Component } from 'react'; 
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from '../styles/homeStyles.js'; 

class HomeResultView extends Component {

    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    render() {
        return(
            <View>
                <Text style={styles.resultTextView}>
                
                    <Text style={styles.resultText}> Results </Text>

                    <View style={styles.resultCompareButtonView}>
                        <Button status='primary' appearance='outline' onPress={this.props.onComparePress}> 
                            Compare 
                        </Button>
                    </View>

                </Text>
                
                <View style={styles.resultLine}></View>
            </View>
        );
    }
}

export default HomeResultView;