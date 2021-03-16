import React, { useEffect, useState } from 'react';
import { View,  ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Divider, List, ListItem, BottomNavigation, CheckBox, BottomNavigationTab, Icon } from '@ui-kitten/components';

export function CompareListChecks(props) {

    const [checked, setChecked] = useState(0)

    onCheckBoxPress = async () => {

        let check = !checked

        if (props.compareCount < 2 && check) {
            await props.addSelected(props.result)
            await setChecked(check)
        }

        if (!check){
            await props.removeSelected(props.result)
            await setChecked(check)
        }
    }

    return (
        
        <View style={{flexDirection: 'row'}}>

            <Text style={{fontSize:20}}>
                {props.result.title}
            </Text>

            <CheckBox 
                checked={checked} 
                onChange={onCheckBoxPress} 
                status={'control'} 
                style={{    marginLeft: 300,
                            marginTop: 3,
                            borderWidth: 0.5,
                            position:'absolute'
                        }}
            />
        </View>
    )
}