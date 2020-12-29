import React, { Component } from 'react';
import { View } from 'react-native';

import { Text, Button} from '@ui-kitten/components';
import styles from './myHeaderStyles.js';

class MyHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <View style={styles.header}>
                <Text category='h5'style={styles.headerText}>
                      {this.props.myHeaderText}
                </Text>
            </View>
        );
    }
}

export default MyHeader;
