import React, { useEffect, useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Divider, SelectItem, Select, List, ListItem, BottomNavigation, Icon } from '@ui-kitten/components';

export function CompareFilterHeader(props) {

    const activities = ['Stationary Activity Map', 'People Moving', 'Survey']

    return (

        <View style={{flexDirection: 'row'}}>

            <Select 
                status={'primary'}
                style={{marginTop: 10, marginBottom: 10, marginLeft: 10,  width: 350}}
                value={activities[props.titleIndex-1]}
                onSelect={index => props.setTitle(index)}
            >
                <SelectItem title='Stationary Activity Map'/>
                <SelectItem title='People Moving'/>
                <SelectItem title='Survey'/>
            </Select>

        </View>

    )

}