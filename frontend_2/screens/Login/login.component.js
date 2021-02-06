import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, Icon, Layout, Text, Button, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { BlueViewableArea } from '../components/content.component';
import { styles } from './login.styles';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const LoginScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateLogin = () => {
    navigation.navigate('TabNavigation');
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <BlueViewableArea>
      <ScrollView contentContainerStyle={styles.container}>
        <Text category='h1' status='control'>Login</Text>
        <Button style={styles.logInButton} onPress={navigateLogin}>
          <Text style={styles.logInText}>
              Log In
          </Text>
        </Button>
      </ScrollView>
    </BlueViewableArea>
  );
};
