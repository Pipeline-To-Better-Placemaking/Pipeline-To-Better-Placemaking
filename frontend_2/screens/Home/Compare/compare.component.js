import React, { useEffect, useState } from 'react';
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

    useEffect(() => {

        if (compareCardData.length == 0) {

            for(let i = 0; i < props.selectedProjects.length; i++) {
                console.log("Project: " + JSON.stringify(props.selectedProjects[i]))

                let data = {
                    id: props.selectedProjects[i]._id,
                    startDate: startDate,
                    endDate: endDate
                }
    
                setData(i, data)
            }
        }
    })

    const removeCard = (name, index) => {

        setCompareCount(compareCount-1)

        let tmp = compareCardData
        tmp.splice(index, 1)

        setCompareCardData(tmp)
        props.removeFromSelectedProjects(name)
    }

    async function filterList(filterCriteria) {

        var filterData = new Array()

        for (let i = 0; i < results.length; i++) {

            let date = null

            console.log("Result: " + JSON.stringify(results[i]))

            filterCriteria.forEach(card => {

                if (card.id == results[i]._id) {
                    date = card
                }
            })

            console.log("Date: " + JSON.stringify(date))

            for(let j = 0; j < results[i].stationaryCollections.length; j++) {

                console.log("Collection: " + JSON.stringify(results[i].stationaryCollections[j]))

                let collection = results[i].stationaryCollections[j]
                let collectionDate = new Date(collection.date)

                console.log("Collection Date: " + collectionDate)
                
                if (collectionDate <= date.endDate && 
                    collectionDate >= date.startDate) {

                    console.log("Pushing: " + JSON.stringify(collection))

                    filterData.push(collection)
                }
            }
        }

        console.log("FilterData: " + JSON.stringify(filterData))

        return filterData
    }

    const confirmCompare = async () => {

        for (let i = 0; i < compareCardData.length; i++) {

            let id = compareCardData[i].id
            let result = null
            let success = false

            try {

                console.log("Trying")

                const response = await fetch('https://measuringplacesd.herokuapp.com/api/projects/' + id, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + props.token
                    }
                })

                console.log("Fuck you.")

                result = await response.json();
                success = true

            } catch (error) {
                console.log("error", error)
            }

            if (result === null) {
              success = false;
            }
            else{

                let tmp = results
                tmp.push(result)

                await setResults(tmp)
            }
        }

        console.log("Results: " + JSON.stringify(results))
        console.log("compareCardData: " + JSON.stringify(compareCardData))

        await props.setCompareResults(results)

        filterList(compareCardData).then(async res =>{
            await props.setFilterCriteria(res)
        })

        console.log("Navigating")

        props.navigation.navigate('CompareFilteredView')
    }

    const setData = (index, data) => {

        if (compareCardData.length > index) {
            
            let tmp = compareCardData
            tmp[index] = data

            setCompareCardData(tmp)

        } 
        else{

            let tmp = compareCardData
            tmp.push(data)

            setCompareCardData(tmp)
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

        return (
            props.selectedProjects.map( (project, index) => {
                
                return(
                <CompareBox
                    {...props}
                    key={index}
                    project={project}
                    removeCard={removeCard}
                    index={index}
                    setData={setData}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setTitle={setTitleIndex}
                    title={titleIndex}
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
