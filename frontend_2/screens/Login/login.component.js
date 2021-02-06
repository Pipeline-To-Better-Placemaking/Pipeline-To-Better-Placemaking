import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaView, View } from 'react-native';
import { Divider, Icon, Layout, Text, Button, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { styles } from './login.styles';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const LoginScreen = ({ navigation }) => {

  const statusBarHeight = getStatusBarHeight();

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
    <View style={{flex: 1, backgroundColor:'#006FD6'}}>
      <SafeAreaView style={{flex: 1, backgroundColor:'#006FD6', marginTop:statusBarHeight, alignItems:'center'}}>
        <Text category='h1' status='control'>Login</Text>
        <Button style={styles.logInButton} onPress={navigateLogin}>
          <Text style={styles.logInText}>
              Log In
          </Text>
        </Button>
      </SafeAreaView>
    </View>
  );
};
