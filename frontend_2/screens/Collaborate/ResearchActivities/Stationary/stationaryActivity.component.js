import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';
import { ViewableArea, ContentContainer } from '../../../components/content.component'; 
import { Header } from '../../../components/headers.component';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { StationaryActivityMap } from '../../../components/Maps/stationaryActivityMap.component.js';
import { Timer } from '../../../components/timer.component.js';
import { DataEntryModal } from '../../../components/Activities/Stationary/dataEntryModal.component.js';

export function StationaryActivity(props) {


    const [location] = useState(props.route.params.activityDetails.location)
    const [area] = useState(props.route.params.activityDetails.area)
    const [position] = useState(props.route.params.position)
    const [start, setStart] = useState(false)
    const [dataModal, setDataModal] = useState(false)
    const [tempMarker, setTempMarker] = useState([])
    const [data, setData] = useState([{}])
    const [markers, setMarkers] = useState([])
    const [duration] = useState(props.route.params.activityDetails.duration)

    const openPrevPage = () => {
        props.navigation.navigate("SignUpPage");
    }

    const onPointCreate = async (marker) => {

        if (start) {
            setDataModal(true)
            setTempMarker(marker)
        }
    }

    const closeData = async (inf) => {

        console.log("Inf is: " + JSON.stringify(inf))

        if (inf.ageIndex > -1 && inf.genderIndex > -1 && inf.activityIndex > -1) {

            let pointData = {
                age: inf.age,
                gender: inf.gender,
                activity: inf.activity,
                posture: inf.posture,
                location: tempMarker
            }

            data.push(pointData)
            markers.push(tempMarker)

            setDataModal(false)
        }
    }

    const StartStopButton = () => {

        if (start) {
            return(
                <Button 
                    status={'danger'}
                    style={{height: 50, marginTop: 5, marginLeft: 5, width: 90}}
                    >
                        End 
                    </Button>
            )
        }
        else {
            return(
                <Button 
                    style={{backgroundColor: '#006FD6'}}
                    style={{height: 50, marginTop: 5, marginLeft: 5, width: 90}}
                    onPress={setStart}
                >
                    Start
                </Button>
            )
        }
    }

    const TimeBar = () => {

        return(
            <View>
                <View style={{height: 60, flexDirection: 'row'}}>

                    <StartStopButton/>

                    {/* <Text style={{fontSize:20, marginLeft: 10, marginTop: 7}}> */}
                    <Timer start={start} timer={duration}/>
                    {/* </Text> */}
                </View>
            </View>
        )
    }

    return(              
        <ViewableArea>
            <Header text={'Stationary Activity'}/>
            <ContentContainer>

                    <TimeBar/>

                    <DataEntryModal
                        visible={dataModal}
                        anchor={TimeBar}
                        closeData={closeData}
                    />

    
                    <StationaryActivityMap
                        location={location}
                        area={area}
                        position={position}
                        markers={markers}
                        addMarker={onPointCreate}
                    />

            </ContentContainer>
        </ViewableArea>
    )
};