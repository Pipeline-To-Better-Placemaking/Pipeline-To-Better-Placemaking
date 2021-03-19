import React, { useState, useEffect } from 'react';
import { ViewableArea, ContentContainer } from '../../components/content.component.js'
import { HeaderBack } from '../../components/headers.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { MovingMapResults } from '../../components/Maps/movingMapResults.component.js';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Select, Button, SelectItem, Icon } from '@ui-kitten/components';

export function MovingMapResultsView(props) {

    // console.log("Project: " + JSON.stringify(props.project))

    /// Location, area, and standing points for SM
    /// Bool indicating to the map to recenter
    // const [location] = useState(props.timeSlot.location)
    const [area] = useState(props.selectedResult.sharedData.area.points)
    const [position] = useState(props.selectedResult.standingPoints)

    // The index of the standing points
    const [standingIndex, setStandingIndex] = useState(0)
    const [viewAllLines, setViewAllLines] = useState(true)
    const [recenter, setRecenter] = useState(false)

    // Temp marker, inputted data points, and all of their locations
    const [data, setData] = useState(props.selectedResult.data)
    const [totalPaths, setTotalPaths] = useState([])

    const [markers, setMarkers] = useState([])

    let startTime = new Date(props.selectedResult.date);
    let day = new Date(props.selectedResult.sharedData.date);

    const movement = ["Walking", "Running", "Swiming", "Activity on Wheels", "Handicap Assisted Wheels"]
    const [titleIndex, setTitleIndex] = useState(-1)

    useEffect(() => {

        if (totalPaths.length == 0) {

            let tp = []

            for (let i = 0; i < props.selectedResult.data.length; i++){

                let colorIndex = getColorIndex(props.selectedResult.data[i].mode)

                let obj = {
                    path: props.selectedResult.data[i].path,
                    colorIndex: colorIndex
                }

                tp.push(obj)
            }

            setTotalPaths(tp)
        }
    }, [])

    const getColorIndex = (mode) => {
        if (mode == movement[0]){
            return 0
        }
        else if (mode == movement[1]) {
            return 1
        }
        else if (mode == movement[2]) {
            return 2
        }
        else if (mode == movement[3]) {
            return 3
        }
        else if (mode == movement[4]) {
            return 4
        }
    }

    const VisibleIcon = () => {
        return(
            <Icon {...props}  style={{width: 25, height: 25}} fill='black' name='eye-outline'/>
        )
    }

    const viewAllDrawnLines = () => {
        setTitleIndex(-1)
        setViewAllLines(!viewAllLines)
    }

    const OptionsBar = () => {

        return (

            <View style={{height: 60, flexDirection: 'row'}}>
                <Select 
                    status={'primary'}
                    style={{marginTop: 10, marginBottom: 10, marginLeft: 10,  width: 275}}
                    value={movement[titleIndex-1]}
                    onSelect={index => setTitleIndex(index)}
                    placeholder="Filter movement"
                >
                    <SelectItem title={movement[0]}/>
                    <SelectItem title={movement[1]}/>
                    <SelectItem title={movement[2]}/>
                    <SelectItem title={movement[3]}/>
                    <SelectItem title={movement[4]}/>
                </Select>

                <Button 
                    style={{ marginTop: 5, marginLeft: 25, width: 50, height: 50, backgroundColor: 'white'}}
                    accessoryLeft={VisibleIcon}
                    onPress={viewAllDrawnLines}
                />

            </View>
        )
    }

    // Main render
    return(
        <ViewableArea>
            <HeaderBack {...props} text={getDayStr(day)+ " - " + getTimeStr(startTime)}/>
            <ContentContainer>

            <OptionsBar/>

            <MovingMapResults
                area={area}
                position={position[standingIndex]}
                recenter={recenter}
                viewAllLines={viewAllLines}
                totalPaths={totalPaths}
            />

            </ContentContainer>
        </ViewableArea>
    )
};