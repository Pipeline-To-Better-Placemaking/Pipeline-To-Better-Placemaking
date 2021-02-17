import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button, Input, Icon } from '@ui-kitten/components';
import styles from './headers.styles';

export function Header(props) {
  return (
    <View style={styles.header}>
      <View style={styles.leftContent} />
      <Text category='h5' status='control'>
        {props.text}
      </Text>
      <View style={styles.rightContent} />
    </View>
  );
};

export function HeaderBack(props) {
  return (
    <View style={styles.header}>
      <View style={styles.leftContent}>
        <Button
          accessoryLeft={BackIcon}
          onPress={() => props.navigation.goBack()}
          appearance={'ghost'}
          status={'control'}
          style={styles.button}
          size='small'
        />
      </View>
      <Text category='h5' status='control'>
        {props.text}
      </Text>
      <View style={styles.rightContent} />
    </View>
  );
};

export function HeaderExit(props) {
  return (
    <View style={styles.header}>
      <Text style={{marginLeft:25}} category='h5' status='control'>
        {props.text}
      </Text>
      <View style={styles.rightContent}>
        <Button
          accessoryRight={CancelIcon}
          onPress={() => props.exit()}
          status={'danger'}
          size='small'
          style={{width:1, height:1, marginRight:25}}
        />
      </View>
    </View>
  );
};

export function HeaderBackEdit(props) {
  return (
    <View style={styles.header}>
      <View style={styles.leftContent}>
        <Button
          accessoryLeft={BackIcon}
          onPress={() => props.navigation.goBack()}
          appearance={'ghost'}
          status={'control'}
          style={styles.button}
          size='small'
        />
      </View>
      <Text category='h5' status='control'>
        {props.text}
      </Text>
      <View style={styles.rightContent}>
        <Button
          accessoryLeft={MenuIcon}
          onPress={() => props.setEditMenuVisible()}
          appearance={'ghost'}
          status={'control'}
          size='small'
        />
      </View>
    </View>
  );
};

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical-outline'/>
);

const CancelIcon = (props) => (
  <Icon {...props} name='close-outline'/>
);
