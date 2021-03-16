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

        setSelectedCompare(tmp)
        setCompareCount(compareCount+1)
    }

    const removeSelected = (item) => {

        let tmp = selectedCompare
        tmp.splice(-1, 1)

        setSelectedCompare(tmp)
        setCompareCount(compareCount-1)
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
                    <Button style={styles.confirmCompare}> Confirm Compare </Button>
                </View>

            </ContentContainer>
        </ViewableArea>
    )
}
