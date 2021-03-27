import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button, Input, Icon, MenuItem, OverflowMenu } from '@ui-kitten/components';
import styles from './headers.styles';

export function Header(props) {
  return (
    <View style={styles.header}>
      <View style={styles.leftContent} />
      <View style={{maxWidth:'80%'}}>
        <Text category='h5' status='control'>
          {props.text}
        </Text>
      </View>
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
      <View style={{maxWidth:'80%', marginLeft:15}}>
        <Text category='h5' status='control'>
          {props.text}
        </Text>
      </View>
      <View style={styles.rightContent} />
    </View>
  );
};

export function HeaderExit(props) {
  return (
    <View style={styles.header}>
    <View style={{maxWidth:'80%'}}>
      <Text style={{marginLeft:25}} category='h5' status='control'>
        {props.text}
      </Text>
    </View>
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

export function HeaderBackEdit({children, ...props}) {
  const EditMenu = () => (
    <OverflowMenu
      anchor={editButton}
      visible={props.editMenuVisible}
      onBackdropPress={() => props.setEditMenuVisible(false)}
      placement={'bottom end'}
      style={styles.menu}
    >
      {children}
    </OverflowMenu>
  );

  const editButton = () => (
    <Button
      accessoryLeft={MenuIcon}
      onPress={() => props.setEditMenuVisible(!props.editMenuVisible)}
      appearance={'ghost'}
      status={'control'}
      size='small'
    />
  )

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
      <View style={{maxWidth:'80%', marginLeft:15}}>
        <Text category='h5' status='control'>
          {props.text}
        </Text>
      </View>
      <View style={styles.rightContent}>
        <EditMenu />
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
