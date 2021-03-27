import React, { useEffect, useState } from 'react';
import { View,  ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Divider, List, ListItem, BottomNavigation, Icon, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { CompareListChecks } from '../../components/Compare/compareListChecks.component.js'
import { styles } from './compare.styles'

import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';

export function CompareFilteredView(props) {

    const [selectedCompare, setSelectedCompare] = useState([])
    const [compareCount, setCompareCount] = useState(0)
    const [titleIndex, setTitleIndex] = useState(new IndexPath(0))
    const activities = ['Stationary Activity Map', 'People Moving']

    const selectedActivity = () => {
        if (titleIndex.row === 0) {
            return props.filterCriteria.stationary
        }
        else if (titleIndex.row  === 1) {
            return props.filterCriteria.moving
        }
        else if (titleIndex.row  === 2) {
            return props.filterCriteria.survey
        } else {
          return props.filterCriteria.all;
        }
    }

    const addSelected = (item) => {

        let tmp = selectedCompare
        tmp.push(item)

        setSelectedCompare(tmp)
        setCompareCount(compareCount+1)
    }

    const removeSelected = (item) => {

        let tmp = selectedCompare
        let index = tmp.indexOf(item)

        tmp.splice(index, 1)

        setSelectedCompare(tmp)
        setCompareCount(compareCount-1)
    }

    const setTitle = (index) => {
        setTitleIndex(index)

        let empty = []
        setSelectedCompare(empty)
        setCompareCount(0)
    }

    const onConfirmCompare = async () => {
      if (compareCount !== 2) {
        return;
      }

      await props.setCompareResults(selectedCompare);

      if (titleIndex.row === 0) { // staionary
        props.navigation.navigate("StationaryCompare");
      } else if (titleIndex.row === 1) { // moving
        props.navigation.navigate("MovingCompare");
      } else if (titleIndex.row === 2) { // survey

      }

    }

    const activityItem = (item, index) => (
        <ListItem>
            <CompareListChecks
                {...props}
                key={index}
                result={item.item}
                compareCount={compareCount}
                addSelected={addSelected}
                removeSelected={removeSelected}
                selectedCompare={selectedCompare}
            />
        </ListItem>
    )

    return(
      <ViewableArea>
          <HeaderBack {...props} text={'Select 2 to Compare'}/>
          <ContentContainer>

            <View style={{margin:10, flexDirection: 'row'}}>
              <Select
                status={'primary'}
                style={{flex:1}}
                value={activities[titleIndex.row]}
                onSelect={index => setTitle(index)}
              >
                {activities.map((value, index) => {
                  return (<SelectItem key={index} title={value}/>);
                })}
              </Select>

            </View>

            <List
              data={selectedActivity()}
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
