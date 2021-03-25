import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, CheckBox } from '@ui-kitten/components';
import { getDayStr, getTimeStr } from '../timeStrings.component';

export function CompareListChecks(props) {

    const [checked, setChecked] = useState(0)

    useEffect(() => {

        if (props.selectedCompare.length === 0) {
            setChecked(false)
        }
    })

    onCheckBoxPress = async () => {

        let check = !checked

        if (props.compareCount < 2 && check) {
            await props.addSelected(props.result)
            await setChecked(check)
        }

        if (!check){
            await props.removeSelected(props.result)
            await setChecked(check)
        }
    }

    const TitleText = () => {

        if (props.result == null){
            return null
        }
        else {
          return (
            <View>
              <Text style={{fontSize:20}}>
                  {props.result.title}
              </Text>
              <Text appearance='hint'>
                {
                  getTimeStr(props.result.date) + ' - ' +
                  getDayStr(props.result.sharedData.date) + ' - ' +
                  props.result.sharedData.projectName + ' - ' +
                  props.result.sharedData.teamName
                }
              </Text>
            </View>
          )
        }
    }

    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', marginHorizontal:15}}>

        <TitleText />

        <CheckBox
          checked={checked}
          onChange={onCheckBoxPress}
          style={{marginRight:10}}
        />
      </View>
    )
}
