import React, { useState } from 'react';
import { ViewableArea, ContentContainer } from '../../components/content.component.js'
import { HeaderBack } from '../../components/headers.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { LightMapResults } from '../../components/Maps/lightMapResults.component.js';

export function LightMapResultsView(props) {
    // this console log shows all the collected data for the test
    // console.log(props.selectedResult);
    
    const [area] = useState(props.selectedResult.sharedData.area.points)
    const [position] = useState(props.selectedResult.standingPoints)

    // Temp marker, inputted data points, and all of their locations
    const [data] = useState(props.selectedResult.data)

    let startTime = new Date(props.selectedResult.date);
    let day = new Date(props.selectedResult.sharedData.date);

    // Main render
    return(
        <ViewableArea>
            <HeaderBack {...props} text={getDayStr(day)+ " - " + getTimeStr(startTime)}/>
            <ContentContainer>

                <LightMapResults
                    area={area}
                    position={position}
                    dataMarkers={data}
                />

            </ContentContainer>
        </ViewableArea>
    )
}