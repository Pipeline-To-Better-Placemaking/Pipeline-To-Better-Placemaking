import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Divider, List, ListItem, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { CompareListChecks } from '../../components/Compare/compareListChecks.component.js'
import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';

import { styles } from './compare.styles'

export function CompareFilteredView(props) {

    const [selectedCompare, setSelectedCompare] = useState([])
    const [compareCount, setCompareCount] = useState(0)
    const [titleIndex, setTitleIndex] = useState(new IndexPath(0))
    //add the new tests here
    // not index 2 is not for the survery here, index 2 is the sound test
    const activities = ['Humans in Place', 'Humans in Motion', 'Acoustical Profile']

    const selectedActivity = () => {
        if (titleIndex.row === 0) {
          return props.filterCriteria.stationary
        }
        else if (titleIndex.row  === 1) {
          return props.filterCriteria.moving
        }
        // survery is not allowed to be compared (nothing to compare)
        // else if (titleIndex.row  === 2) {
        //   return props.filterCriteria.survey
        // }
        //add the new tests here 
        else if (titleIndex.row === 2){
          return props.filterCriteria.sound
        }
        else {
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
      } 
      else if (titleIndex.row === 1) { // moving
        props.navigation.navigate("MovingCompare");
      } 
      // survery is not allowed to be compared (nothing to compare)
      // else if (titleIndex.row === 2) { // survey

      // }
      //add the new tests here
      else if (titleIndex.row === 2){ //sound
        props.navigation.navigate("SoundCompare");
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

            <View style={styles.selectView}>
              <Select
                status={'primary'}
                style={styles.selectElement}
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
