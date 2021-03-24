import React, { useState, useEffect } from 'react';
import { ViewableArea, ContentContainer } from '../../components/content.component.js'
import { HeaderBack } from '../../components/headers.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { MovingMapResults } from '../../components/Maps/movingMapResults.component.js';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { useTheme, Select, Button, SelectItem, Icon } from '@ui-kitten/components';

export function MovingMapResultsView(props) {

    const theme = useTheme();

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
    const [walkingPaths, setWalkingPaths] = useState([])
    const [runningPaths, setRunningPaths] = useState([])
    const [swimmingPaths, setSwimmingPaths] = useState([])
    const [wheelPaths,setWheelPaths] = useState([])
    const [handAssistPaths, setHandAssistPaths]  = useState([])
    const [totalPaths, setTotalPaths] = useState([])

    const [markers, setMarkers] = useState([])

    let startTime = new Date(props.selectedResult.date);
    let day = new Date(props.selectedResult.sharedData.date);

    const movement = ["Walking", "Running", "Swiming", "Activity on Wheels", "Handicap Assisted Wheels"]
    const [titleIndex, setTitleIndex] = useState(-1)

    useEffect(() => {

        if (totalPaths.length == 0) {

            setTotal()
            setWalking()
            setRunning()
            setSwimming()
            setWheels()
            setHandAssist()
        }
    }, [])

    const setTotal = () => {

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

    const setWalking = () => {

        let wp = []

        for (let i = 0; i < props.selectedResult.data.length; i++){

            if (props.selectedResult.data[i].mode == movement[0]){

                console.log("Setting walking")

                let colorIndex = getColorIndex(props.selectedResult.data[i].mode)

                let obj = {
                    path: props.selectedResult.data[i].path,
                    colorIndex: colorIndex
                }

                wp.push(obj)
            }
        }

        console.log("WP: " + JSON.stringify(wp , null, 1))

        setWalkingPaths(wp)
    }

    const setRunning = () => {

        let rp = []

        for (let i = 0; i < props.selectedResult.data.length; i++){

            if (props.selectedResult.data[i].mode === movement[1]){


                // console.log("Setting Running")
                // console.log("Data[i]: " + JSON.stringify(props.selectedResult.data[i], null, 1))
                // console.log("Mode: " + JSON.stringify(props.selectedResult.data[i].mode))
                // console.log("Movement: " + movement[1])


                let colorIndex = getColorIndex(props.selectedResult.data[i].mode)

                let obj = {
                    path: props.selectedResult.data[i].path,
                    colorIndex: colorIndex
                }

                rp.push(obj)
            }
        }

        console.log("RP: " + JSON.stringify(rp , null, 1))

        setRunningPaths(rp)
    }

    const setSwimming = () => {
        let rp = []

        for (let i = 0; i < props.selectedResult.data.length; i++){

            if (props.selectedResult.data[i].mode == movement[2]){

                let colorIndex = getColorIndex(props.selectedResult.data[i].mode)

                let obj = {
                    path: props.selectedResult.data[i].path,
                    colorIndex: colorIndex
                }

                rp.push(obj)
            }
        }

        setSwimmingPaths(rp)
    }

    const setWheels = () => {
        let whp = []

        for (let i = 0; i < props.selectedResult.data.length; i++){

            if (props.selectedResult.data[i].mode == movement[3]){

                let colorIndex = getColorIndex(props.selectedResult.data[i].mode)

                let obj = {
                    path: props.selectedResult.data[i].path,
                    colorIndex: colorIndex
                }

                whp.push(obj)
            }
        }

        setWheelPaths(whp)
    }

    const setHandAssist = () => {
        let hap = []

        for (let i = 0; i < props.selectedResult.data.length; i++){

            if (props.selectedResult.data[i].mode == movement[4]){

                let colorIndex = getColorIndex(props.selectedResult.data[i].mode)

                let obj = {
                    path: props.selectedResult.data[i].path,
                    colorIndex: colorIndex
                }

                hap.push(obj)
            }
        }

        setHandAssistPaths(hap)
    }

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

    const getFilteredPath = () => {

        console.log("TitleIndex: " + titleIndex)

        if (titleIndex == -1){
            return totalPaths
        }
        else if (titleIndex-1 == 0) {
            return walkingPaths
        }
        else if (titleIndex-1 == 1) {
            return runningPaths
        }
        else if (titleIndex-1 == 2) {
            return swimmingPaths
        }
        else if (titleIndex-1 == 3) {
            return wheelPaths
        }
        else {
            return handAssistPaths
        }
    }

    const VisibleIcon = (props) => (
      <Icon {...props} fill='#8F9BB3' name={viewAllLines ? 'eye' : 'eye-off'}/>
    )

    const viewAllDrawnLines = () => {
        setTitleIndex(-1)
        setViewAllLines(!viewAllLines)
    }

    const OptionsBar = () => {

        return (

            <View style={{margin:5, flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                <Select
                    status={'primary'}
                    style={{flex:1}}
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
                    style={{ margin: 5, backgroundColor:theme['background-basic-color-3']}}
                    appearance='ghost'
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
                totalPaths={getFilteredPath()}
            />

            </ContentContainer>
        </ViewableArea>
    )
};
