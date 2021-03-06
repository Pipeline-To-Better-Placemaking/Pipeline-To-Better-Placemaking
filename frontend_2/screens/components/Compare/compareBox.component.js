import React, { useState } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Select, SelectItem, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { styles } from '../../Home/Compare/compare.styles.js'

export function CompareBox(props) {

    const [index] = useState(props.index)
    const activities = ['Stationary Activity Map', 'People Count', 'Survey']


    const RemoveIcon = (props) => {
        return (
            <Icon {...props} fill='#8F9BB3' style={styles.removeIcon} name='close-circle'/>
        )
    }

    return(

        <View>
            <Button style={styles.box}>

                <View style={styles.textContainer}>

                    <Text style={styles.projectText}>
                        {props.project.title}

                        <Button
                            appearance={"ghost"}
                            onPress={() => props.removeCard(props.project)}
                            accessoryLeft={RemoveIcon}
                            style={styles.removeButton}
                        />
                    </Text>

                    <Select style={styles.chooseTestButton} value={activities[index-1]} onSelect={index => props.setIndex(index)}  placeholder='Choose Test'>
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
