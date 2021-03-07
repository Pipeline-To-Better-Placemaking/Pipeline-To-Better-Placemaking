import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, Card, useTheme} from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import { BarChart } from 'react-native-chart-kit';

/* This needs:
title={}
rotation={}
dataLabels={}
dataValues={}
barColor={}
width={}
height={}
*/
export function MyBarChart({children, ...props}) {

  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);

  const data = {
    labels: props.dataLabels,
    datasets: [
      {
        data: props.dataValues,
        color: (opacity = 0.5) => `rgba(255, 0, 0, ${opacity})`,
      }
    ]
  };

  let segments = Math.max.apply(Math, props.dataValues)%5;

  const chartConfig = {
    backgroundGradientFrom: theme['background-basic-color-1'],
    backgroundGradientTo: theme['background-basic-color-1'],
    decimalPlaces: 0,
    // this is the text color basically
    color: (opacity = 1) => (themeContext.theme === "light" ? `rgba(0, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity})`),
    style: {
      borderRadius: 15,
    },
    fillShadowGradient: props.barColor,
    fillShadowGradientOpacity: 1,
    barPercentage: 0.8,
  };

  return (
    <View>
      <Text category={'h4'}> {props.title} </Text>
      <Divider />
      <BarChart
        data={data}
        width={props.width}
        height={props.height}
        yAxisInterval={1}
        verticalLabelRotation={props.rotation}
        showValuesOnTopOfBars={true}
        withCustomBarColorFromData={false}
        flatColor={true}
        showBarTops={true}
        chartConfig={chartConfig}
        style={styles.chart}
        fromZero
        segments={segments}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    marginLeft:-50,
    borderRadius: 5,
    flex:1,
    flexDirection:'row',
    justifyContent:'center'
  }
});
