import React, { useState } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Select, SelectItem, Button, Datepicker, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { styles } from '../../Home/Compare/compare.styles.js'

export function CompareBox(props) {

    const today = new Date();

    const [index] = useState(props.index)

    const RemoveIcon = (props) => {
        return (
            <Icon {...props} fill='#8F9BB3' style={styles.removeIcon} name='close-circle'/>
        )
    }

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar'/>
    );

    const setStartDateData = async (startDate) => {

        await props.setStartDate(startDate)

        let data = {
            id: props.project._id,
            startData: startDate,
            endDate: props.endDate
        }

        await props.setData(index, data)
    }

    const setEndDateData = (endDate) => {

        let data = {
            id: props.project._id,
            startData: props.startDate,
            endDate: endDate
        }

        props.setEndDate(endDate)
        props.setData(index, data)
    }

    return(

        <View>
            <Button style={styles.box}>

                <View style={styles.textContainer}>

                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.projectText}>
                            {props.project.title}
                        </Text>

                        <Button
                            appearance={"ghost"}
                            onPress={() => props.removeCard(props.project, index)}
                            accessoryLeft={RemoveIcon}
                            style={styles.removeButton}
                        />
                    </View>
                    

                    <Select 
                        status={'primary'}
                        style={styles.chooseTestButton}
                        value={props.activities[props.titleIndex-1]}
                        onSelect={index => props.setTitleIndex(index)}
                        placeholder='Choose Test'
                    >
                        <SelectItem title='Stationary Activity Map'/>
                        <SelectItem title='People Moving'/>
                        <SelectItem title='Survey'/>
                    </Select>

                    <Datepicker
                        style={{marginTop: 30}}
                        placeholder={'Start Date'}
                        max={props.endDate}
                        date={props.startDate}
                        value={props.startDate}
                        onSelect={nextDate => setStartDateData(nextDate)}
                        status={'primary'}
                        accessoryRight={CalendarIcon}
                        placement={'bottom end'}
                    />

                    <Datepicker
                        style={{marginTop: 30}}
                        placeholder={'End Date'}
                        min={props.startDate}
                        date={props.endDate}
                        value={props.endDate}
                        onSelect={nextDate => setEndDateData(nextDate)}
                        status={'primary'}
                        accessoryRight={CalendarIcon}
                        placement={'bottom end'}
                    />

                </View>
            </Button>
        </View>
    )
}
