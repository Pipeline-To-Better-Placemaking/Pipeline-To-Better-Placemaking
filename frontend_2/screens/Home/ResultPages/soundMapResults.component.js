import React, { useState } from 'react';
import { ViewableArea, ContentContainer } from '../../components/content.component.js'
import { HeaderBack } from '../../components/headers.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { SoundMapResults } from '../../components/Maps/soundMapResults.component.js'

export function SoundMapResultsView(props) {
    // this console log shows all the collected data for the test
    // console.log(props.selectedResult);
    
    /// Location, area, and standing points
    /// Bool indicating to the map to recenter
    // const [location] = useState(props.timeSlot.location)
    const [area] = useState(props.selectedResult.sharedData.area.points)
    const [position] = useState(props.selectedResult.standingPoints)

    // Temp marker, inputted data points, and all of their locations
    const [data, setData] = useState(props.selectedResult.data)

    let startTime = new Date(props.selectedResult.date);
    let day = new Date(props.selectedResult.sharedData.date);

    // Main render
    return(
        <ViewableArea>
            <HeaderBack {...props} text={getDayStr(day)+ " - " + getTimeStr(startTime)}/>
            <ContentContainer>

                <SoundMapResults
                    area={area}
                    position={position}
                    dataMarkers={data}
                    graph={props.selectedResult.graph}
                />

            </ContentContainer>
        </ViewableArea>
    )
}