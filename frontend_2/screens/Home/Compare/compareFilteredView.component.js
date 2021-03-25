import React, { useEffect, useState } from 'react';
import { View,  ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Divider, List, ListItem, BottomNavigation, Icon } from '@ui-kitten/components';
import { CompareListChecks } from '../../components/Compare/compareListChecks.component.js'
import { styles } from './compare.styles'

import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { CompareFilterHeader } from '../../components/Compare/compareFilterHeader.component.js'

export function CompareFilteredView(props) {

    const [selectedCompare, setSelectedCompare] = useState([])
    const [stationaryResults, setStationaryResults] = useState([])
    const [peopleMovingResults, setPeopleMovingResults] = useState([])
    const [surveyResults, setSurveyResults] = useState([])
    const [compareCount, setCompareCount] = useState(0)
    const [titleIndex, setTitleIndex] = useState(1)
    const activities = ['Stationary Activity Map', 'People Moving', 'Survey']

    useEffect(() => {
        setResults();
    });

    const setResults = async () => {
      if (stationaryResults.length == 0 && peopleMovingResults.length == 0 && surveyResults == 0) {
          let sm = []
          let pm = []
          let survey = []

          for (let i = 0; i < props.filterCriteria.length; i++){

              if (props.filterCriteria[i].test_type === "stationary"){
                  sm.push(props.filterCriteria[i])
              }
              else if (props.filterCriteria[i].test_type === "moving"){
                  pm.push(props.filterCriteria[i])
              }
              else if (props.filterCriteria[i].test_type === "survey"){
                  survey.push(props.filterCriteria[i])
              }
          }

          await setStationaryResults(sm)
          await setPeopleMovingResults(pm)
          await setSurveyResults(survey)
      }
    }

    const selectedActivity = () => {

        if (titleIndex == 1) {
            return stationaryResults
        }
        else if (titleIndex == 2) {
            return peopleMovingResults
        }
        else {
            return surveyResults
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

      if (titleIndex == 1) { // staionary
        props.navigation.navigate("StationaryCompare");
      } else if (titleIndex == 2) { // moving
        props.navigation.navigate("MovingCompare");
      } else if (titleIndex == 3) { // survey

      }

    }

    return(
        <ViewableArea>
            <HeaderBack {...props} text={'Select 2 to Compare'}/>
            <ContentContainer>

                <CompareFilterHeader
                    titleIndex={titleIndex}
                    setTitle={setTitle}
                />

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
