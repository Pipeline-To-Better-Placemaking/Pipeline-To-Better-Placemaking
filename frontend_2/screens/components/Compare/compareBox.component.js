import React, { useState } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Select, SelectItem, Button, Datepicker, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { styles } from '../../Home/Compare/compare.styles.js'

export function CompareBox(props) {

    const today = new Date();

    const [index] = useState(props.index)

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [titleIndex, setTitleIndex] = useState(0)
    const activities = ['Stationary Activity Map', 'People Moving', 'Survey']

    const RemoveIcon = (props) => {
        return (
            <Icon {...props} fill='#8F9BB3' style={styles.removeIcon} name='close-circle'/>
        )
    }

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar'/>
    );

    const setStartDateData = async (startDate) => {

        await setStartDate(startDate)

        let data = {
            id: props.project._id,
            testType: props.testType,
            startDate: startDate,
            endDate: endDate
        }

        await props.setData(index, data)
    }

    const setEndDateData = (endDate) => {

        let data = {
            id: props.project._id,
            testType: props.testType,
            startDate: startDate,
            endDate: endDate
        }

        setEndDate(endDate)
        props.setData(index, data)
    }

    const setTitle = (index) => {
        setTitleIndex(index)
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
                        value={activities[titleIndex-1]}
                        onSelect={index => setTitle(index)}
                        placeholder='Choose Test'
                    >
                        <SelectItem title='Stationary Activity Map'/>
                        <SelectItem title='People Moving'/>
                        <SelectItem title='Survey'/>
                    </Select>

                    <Datepicker
                        style={{marginTop: 30}}
                        placeholder={'Start Date'}
                        max={endDate}
                        date={startDate}
                        value={startDate}
                        onSelect={nextDate => setStartDateData(nextDate)}
                        status={'primary'}
                        accessoryRight={CalendarIcon}
                        placement={'bottom end'}
                    />

                    <Datepicker
                        style={{marginTop: 30}}
                        placeholder={'End Date'}
                        min={startDate}
                        date={endDate}
                        value={endDate}
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
