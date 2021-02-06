import React, { useState } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { Divider, Icon, Layout, Text, Button, Input } from '@ui-kitten/components';
import { BlueViewableArea } from '../components/content.component';
import { styles } from './login.styles';

export const LoginScreen = ({ navigation }) => {

  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateLogin = () => {
    console.log("email: ", email);
    navigation.navigate('TabNavigation');
  };

  const LoginButton = () => (
    <Button style={styles.logInButton} onPress={navigateLogin}>
      <Text style={styles.logInText}>
          Log In
      </Text>
    </Button>
  );

  const BackButton = () => (
    <Button appearance={'ghost'} onPress={navigateBack} style={{marginTop:15}}>
      <Text status={'control'} category='h5'>
           &larr; Back
      </Text>
    </Button>
  );

  const eyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <BlueViewableArea>
      <ScrollView contentContainerStyle={styles.container}>
        <Text category='h1' status='control'>Login</Text>
        <View>
          <Text category='label' style={styles.inputText}> Email Address: </Text>
          <Input
            placeholder='Email address...'
            value={email}
            onChangeText={(nextValue) => setEamil(nextValue)}
            style={styles.inputBox}
            autoCapitalize='none'
            keyboardType="email-address"
          />
        </View>
        <View>
          <Text category='label' style={styles.inputText}> Password:</Text>
          <Input
            value={password}
            placeholder='Password...'
            autoCapitalize='none'
            style={styles.inputBox}
            accessoryRight={eyeIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={nextValue => setPassword(nextValue)}
          />
        </View>
        <LoginButton />
        <BackButton />
      </ScrollView>
    </BlueViewableArea>
  );
};
