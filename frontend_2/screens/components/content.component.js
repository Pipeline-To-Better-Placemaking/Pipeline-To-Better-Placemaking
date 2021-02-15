import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaView, View, ScrollView, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';

export const ViewableArea = ({ children }) => {

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={{ flex: 1, backgroundColor: '#006FD6'}}>
      <SafeAreaView style={{flex: 1, marginTop:statusBarHeight}}>
        {children}
      </SafeAreaView>
    </View>
 );
};

export const BlueViewableArea = ({ children }) => {

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={{flex: 1, backgroundColor:'#006FD6'}}>
      <SafeAreaView style={{flex: 1, backgroundColor:'#006FD6', marginTop:statusBarHeight}}>
        {children}
      </SafeAreaView>
    </View>
 );
};

export const ContentContainer = ({ children }) => {

  const theme = useTheme();

  return (
    <View style={{flex: 1,justifyContent:'flex-start',flexDirection:'column',backgroundColor:theme['background-basic-color-1']}}>
      {children}
    </View>
 );
};
