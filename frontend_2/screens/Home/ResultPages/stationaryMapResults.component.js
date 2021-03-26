import React, { useState } from 'react';
import { ViewableArea, ContentContainer } from '../../components/content.component.js'
import { HeaderBack } from '../../components/headers.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { StationaryMapResults } from '../../components/Maps/stationaryMapResults.component.js'

export function StationaryActivityResultView(props) {

    // console.log("Project: " + JSON.stringify(props.project))

    /// Location, area, and standing points for SM
    /// Bool indicating to the map to recenter
    // const [location] = useState(props.timeSlot.location)
    const [area] = useState(props.selectedResult.sharedData.area.points)
    const [position] = useState(props.selectedResult.standingPoints)

    // The index of the standing points
    const [standingIndex, setStandingIndex] = useState(0)

    // Temp marker, inputted data points, and all of their locations
    const [data, setData] = useState(props.selectedResult.data)
    const [markers, setMarkers] = useState([])

    let startTime = new Date(props.selectedResult.date);
    let day = new Date(props.selectedResult.sharedData.date);

    // Main render
    return(
        <ViewableArea>
            <HeaderBack {...props} text={getDayStr(day)+ " - " + getTimeStr(startTime)}/>
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
