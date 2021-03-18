import React, { useEffect, useState } from 'react';
import { View,  ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Divider, List, ListItem, BottomNavigation, CheckBox, BottomNavigationTab, Icon } from '@ui-kitten/components';

export function CompareListChecks(props) {

    const [checked, setChecked] = useState(0)

    useEffect(() => {

        if (props.selectedCompare.length == 0) {
            setChecked(false)
        }
    })

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

    const TitleText = () => {

        if (props.result == null){
            return null
        }
        else {
            return (
                <Text style={{fontSize:20}}>
                    {props.result.title}
                </Text>
            )
        }
    }

    return (
        
        <View style={{flexDirection: 'row'}}>

            <TitleText/>

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