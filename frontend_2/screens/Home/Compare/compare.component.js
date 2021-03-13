import React, { useState } from 'react';
import { View,  ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { styles } from './compare.styles'

import { EmptyCompareBox } from '../../components/Compare/emptyCompareBox.component.js';
import { CompareBox } from '../../components/Compare/compareBox.component.js'
import { Header } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';


export function CompareScreen(props) {

    const [compareCount, setCompareCount] = useState(props.compareCount)
    const [compareCardData, setCompareCardData] = useState([])
    const [results, setResults] = useState([])

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [titleIndex, setTitleIndex] = useState(0)
    const activities = ['Stationary Activity Map', 'People Moving', 'Survey']

    var seen = [];
    
    console.log("Selected Projects: " + 

    JSON.stringify(props.selectedProjects, function(key, val) {
       if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    }, 1))

    const removeCard = (name, index) => {

        setCompareCount(compareCount-1)

        let tmp = compareCardData
        tmp.splice(index, 1)

        setCompareCardData(tmp)
        props.removeFromSelectedProjects(name)
    }

    const confirmCompare = async () => {

        compareCardData.forEach(async compareCard => {

            let id = compareCard.id
            let result = null
            let success = false

            console.log("ID: " + id)

            try {

                console.log("Trying...")

                const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + id, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + props.token
                    }
                })

                result = await response.json();
                success = true

                console.log("Result: " + JSON.stringify(result, 1))
            } catch (error) {
                console.log("error", error)
            }

            if (result === null) {
              success = false;
            }
            else{
                setResults(results.concat(result))

                console.log("Results: " + JSON.stringify(results, 1))
            }

        });
    }

    const setData = (index, data) => {

        if (compareCardData.length > index) {
            
            let tmp = compareCardData
            tmp[index] = data

            setCompareCardData(tmp)

        } 
        else{
            setCompareCardData(compareCardData.concat(data))
        }

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

        console.log("Results: " + JSON.stringify(props.results))

        return (
            props.selectedProjects.map( (project, index) => {
                
                return(
                <CompareBox
                    {...props}
                    key={index}
                    project={project}
                    removeCard={removeCard}
                    index={index}
                    results={props.results}
                    setData={setData}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    activities={activities}
                    titleIndex={titleIndex}
                    setTitleIndex={setTitleIndex}
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
                    <Button style={styles.confirmCompare} onPress={confirmCompare}> Confirm Compare </Button>
                </View>

            </ScrollView>
            </ContentContainer>
        </ViewableArea>
    )
}
