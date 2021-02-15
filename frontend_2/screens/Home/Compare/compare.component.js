import React, { useState } from 'react';
import { View,  ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { styles } from './compare.styles'

import { EmptyCompareBox } from '../../components/Compare/emptyCompareBox.component.js';
import { CompareBox } from '../../components/Compare/compareBox.component.js'
import { Header } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';


export function CompareScreen(props) {

    const [index, setIndex] = useState(0)
    const [compareCount, setCompareCount] = useState(props.compareCount)

    const removeCard = (name) => {

        setCompareCount(compareCount-1)

        props.removeFromSelectedProjects(name)
    }

    const EmptyBox = () => {
        if (compareCount < 2) {
            return (
                <EmptyCompareBox/>
            )
        }
        else {
            return null
        }
    }

    const CompareBoxList = () => {

        return (
            props.selectedProjects.map((name, key) => {
                return(
                <CompareBox
                    removeCard={removeCard}
                    key={key}
                    projectName={name}
                    index={index}
                    setIndex={setIndex}
                />)
            })
        )
    }

    return(
        <ViewableArea>
            <Header text={'Compare'}/>
            <ContentContainer>

            <ScrollView>

                <CompareBoxList/>

                <EmptyBox/>

                <View>
                    <Button style={styles.confirmCompare}> Confirm Compare </Button>
                </View>

            </ScrollView>
            </ContentContainer>
        </ViewableArea>
    )
}
