import React, { useState } from 'react';
import { ViewableArea, ContentContainer } from '../../components/content.component.js'
import { Header } from '../../components/headers.component';
import { StationaryMapResults } from '../../components/Maps/stationaryMapResults.component.js'

export function StationaryActivityResultView(props) {

    // console.log("Project: " + JSON.stringify(props.project))

    /// Location, area, and standing points for SM
    /// Bool indicating to the map to recenter
    // const [location] = useState(props.timeSlot.location)
    const [area] = useState(props.project.subareas[0].points)
    const [position] = useState(props.project.standingPoints)

    // The index of the standing points
    const [standingIndex, setStandingIndex] = useState(0)

    // Temp marker, inputted data points, and all of their locations
    const [data, setData] = useState(props.selectedResult.data)
    const [markers, setMarkers] = useState([])

    // Main render
    return(
        <ViewableArea>
            <Header text={'Stationary Activity'}/>
            <ContentContainer>

                <StationaryMapResults 
                    area={area}
                    position={position[standingIndex]}
                    dataMarkers={data}
                />

            </ContentContainer>
        </ViewableArea>
    )
};
