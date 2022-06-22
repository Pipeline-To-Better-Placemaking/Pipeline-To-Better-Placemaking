import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { HeaderBack } from '../../components/headers.component';
import { ViewableArea, ContentContainer } from '../../components/content.component';
import { getDayStr, getTimeStr } from '../../components/timeStrings.component.js';
import { CompareBarChart } from '../../components/charts.component';

import { styles } from './compare.styles';

export function NatureCompare(props) {
  if (props.results === null) {
    return (
      <ViewableArea>
        <HeaderBack {...props} text={"No results"}/>
        <ContentContainer>
          <ScrollView style={styles.margins}>

            <Text category={'h5'}>No result information to compare</Text>

          </ScrollView>
        </ContentContainer>
      </ViewableArea>
    );
  }

  let results = props.results;

  const color = '#006FD6';
  results.map((result, index) => {
    result.graph = {}
    result.resultName = getTimeStr(result.date) + ' - ' + getDayStr(result.sharedData.date) + ' - ' + result.sharedData.projectName + ' - ' + result.sharedData.teamName;
    if (index%2 === 0) {
      result.color = 'rgb(0, 111, 214)';
    } else {
      result.color = 'rgb(0, 214, 111)';
    }
    result.information = result.title + '\n' + result.resultName + '\nLocation: ' + result.sharedData.location;
  });

  const chartWidth = Dimensions.get('window').width*0.95;
  const chartHeight = 210;

  return (
    <ViewableArea>
      <HeaderBack {...props} text={"Compare"}/>
      <ContentContainer>
        <ScrollView style={styles.margins}>

          <Text category={'h5'}>Nature Prevalence Results</Text>
          <Divider style={styles.metaDataTitleSep} />

          {
            results.map((result, index) => {
              if (index === results.length - 1) {
                return (
                  <Text key={index}>
                    {result.information}
                  </Text>
                )
              }
              return (
                <View key={index}>
                  <Text>
                    {result.information}
                  </Text>
                  <Divider style={styles.metaDataSep} />
                </View>
              )
            })
          }

          <Divider style={styles.metaDataEndSep} />
          
          {/* { materialData[0].data ?
            <CompareBarChart
              {...props}
              title={"Material Areas\n(percent of project area)"}
              rotation={'0deg'}
              dataValues={materialData}
              dataLabels={labels.materialLabel}
              barColor={color}
              width={chartWidth}
              height={chartHeight}
            />
          :
            null
          }
          { shelterData[0].data ?
            <CompareBarChart
              {...props}
              title={"Shelter Areas\n(percent of project area)"}
              rotation={'0deg'}
              dataValues={shelterData}
              dataLabels={labels.shelterLabel}
              barColor={color}
              width={chartWidth}
              height={chartHeight}
            />
          :
            null
          }
          
          <CompareBarChart
            {...props}
            title={"Constructed Distances\n(linear feet)"}
            rotation={'0deg'}
            dataValues={constructedData}
            dataLabels={labels.constructedLabel}
            barColor={color}
            width={chartWidth}
            height={chartHeight}
          /> */}

        </ScrollView>
      </ContentContainer>
    </ViewableArea>
  );
}