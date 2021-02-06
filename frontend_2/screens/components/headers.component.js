import React from 'react';
import { SafeAreaView, View, Image} from 'react-native';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';

export const Header = ({text}) => (
  <View style={{marginBottom:5, alignItems:'center'}}>
    <Text category='h5' status='control'>
      {text}
    </Text>
  </View>
);
