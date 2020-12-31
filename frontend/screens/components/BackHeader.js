import React, { Component } from 'react';
import { View} from 'react-native';

import { Text, Button, Icon} from '@ui-kitten/components';
import styles from './backHeaderStyles.js';

class BackHeader extends Component {

    constructor(props){
        super(props);

        this.state = {
        }

    }

    render() {

        const BackIcon = (props) => (
          <Icon {...props} name='arrow-back'/>
        );

        return(
            <View style={styles.header}>
                <View style={styles.leftContent}>
                    <Button accessoryLeft={BackIcon} onPress={this.props.prevPage} style={styles.button}/>
                </View>
                    <Text category='h5' style={styles.headerText}>
                          {this.props.headerText}
                    </Text>
                <View style={styles.rightContent} />
            </View>
        );
    }
}

export default BackHeader;
