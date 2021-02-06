import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button, Input, Icon } from '@ui-kitten/components';

export const Header = ({text}) => (
  <View style={{marginBottom:5, alignItems:'center'}}>
    <Text category='h5' status='control'>
      {text}
    </Text>
  </View>
);
