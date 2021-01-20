import React, {Component} from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Select, SelectItem, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from '../CompareResults/compareStyles.js';

class CompareBox extends Component {

    constructor(props){
        super(props);

        this.state = {
            index: this.props.index
        }

        console.log(this.props.projectName)
    }

    render() {

        const activities = ['Stationary Activity Map', 'People Count', 'Survey']

        const RemoveIcon = (props) => {
            return (
                <Icon {...props} fill='#8F9BB3' style={styles.removeButton} name='close-circle' />
            )
        }

        return(

            <View>
                <Button style={styles.box}>
                    <View style={styles.textContainer}>
                        
                        <Text style={styles.projectText}>
                            {this.props.projectName}

                            <RemoveIcon/>
                        </Text> 

                        <Select style={styles.chooseTestButton} value={activities[this.state.index-1]} onSelect={index => this.props.setIndex(index)}  placeholder='Choose Test'>
                            <SelectItem title='Stationary Activity Map'/>
                            <SelectItem title='People Count'/>
                            <SelectItem title='Survey'/>
                        </Select>

                        <Select style={styles.chooseTestButton} placeholder='Choose Sub-Area'>
                        </Select>

                        <Select style={styles.chooseTestButton} placeholder='Choose Date/Time'>
                        </Select>
                        
                    </View>
                </Button>
            </View>
        )
    }
}

export default CompareBox