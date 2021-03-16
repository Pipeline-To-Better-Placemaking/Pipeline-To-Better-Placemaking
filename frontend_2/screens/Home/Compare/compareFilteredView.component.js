import React, { useEffect, useState } from 'react';
import { View,  ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Divider, List, ListItem, BottomNavigation, Icon } from '@ui-kitten/components';
import { CompareListChecks } from '../../components/Compare/compareListChecks.component.js'
import { styles } from './compare.styles'

import { Header } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';

export function CompareFilteredView(props) {

    const [selectedCompare, setSelectedCompare] = useState([])
    const [compareCount, setCompareCount] = useState(0)

    console.log("FE: " + JSON.stringify(props.filterCriteria))

    const activityItem = (item, index) => (
        <ListItem>
            <CompareListChecks
                result={item.item}
                compareCount={compareCount}
                addSelected={addSelected}
                removeSelected={removeSelected}
            />

        </ListItem>
    )

    const addSelected = (item) => {
        
        let tmp = selectedCompare
        tmp.push(item)

        console.log("Item: " + JSON.stringify(item))

        setSelectedCompare(tmp)
        setCompareCount(compareCount+1)
    }

    const removeSelected = (item) => {

        let tmp = selectedCompare
        tmp.splice(-1, 1)

        setSelectedCompare(tmp)
        setCompareCount(compareCount-1)
    }

    const onConfirmCompare = async () => {

        let success = false
        let result = null

        if (compareCount == 2) {

            let results = []

            for (let i = 0; i < selectedCompare.length; i++) {

                let id = selectedCompare[i].maps[0]

                try {
                    const response = await fetch('https://measuringplacesd.herokuapp.com/api/stationary_maps/' + id, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + props.token
                        }
                    })
                    result = await response.json();

                    console.log("Result: " + JSON.stringify(result))

                } catch (error) {
                    console.log("error", error)
                }

                if (result === null) {
                    success = false;
                }
                else {
                    results.push(result)
                }
            }

            await props.setCompareResults(results)

            console.log("Results: " + JSON.stringify(results))

            // props.navigation.navigate('CompareResults')
        }
    }

    return(
        <ViewableArea>
            <Header text={'Select 2 to Compare'}/>
            <ContentContainer>

                <List
                    data={props.filterCriteria}
                    ItemSeparatorComponent={Divider}
                    renderItem={activityItem}
                />

                <View>
                    <Button style={styles.confirmCompare} onPress={onConfirmCompare}> Confirm Compare </Button>
                </View>

            </ContentContainer>
        </ViewableArea>
    )
}
