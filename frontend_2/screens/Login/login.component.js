import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableWithoutFeedback, Modal } from 'react-native';
import { Divider, Icon, Layout, Text, Button, Input, Spinner } from '@ui-kitten/components';
import { BlueViewableArea } from '../components/content.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import { styles } from './login.styles';

export const LoginScreen = ( props ) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateLogin = async () => {
    setLoading(true);

    let defaultLocation = {
      "timestamp": 0,
      "coords": {
        "accuracy": -1,
        "altitude": -1,
        "altitudeAccuracy": -1,
        "heading": -1,
        "latitude": 28.602413253152307,
        "longitude": -81.20019937739713,
        "speed": 0
      }
    };

    let success = false
    let token = ''
    let id = ''

    try {
        const response = await fetch('https://measuringplacesd.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const res = await response.json()

        console.log("Login res: " + JSON.stringify(res))
        success = res.success
        if (success){
          token = res.token
          id = res.user.id

          await AsyncStorage.setItem("@token", token)
          await AsyncStorage.setItem("@id", id)

          let { status } = await Location.requestPermissionsAsync();

          if (status === 'granted') {
            defaultLocation = await Location.getCurrentPositionAsync({})
          } else {
            console.log('Permission to access location was denied');
          }

          await props.setLocation(defaultLocation);

          props.navigation.navigate("TabNavigation")
        }
    } catch (error) {
        console.log(error)
        success = false
    }

    setLoading(false)

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
        <Modal
          animationType='fade'
          transparent={true}
          visible={loading}
        >
          <View style={styles.modalBackgroundStyle}>
            <Spinner />
          </View>
        </Modal>
        <Text category='h1' status='control'>Login</Text>
        <View>
          <Text category='label' style={styles.inputText}> Email Address: </Text>
          <Input
            placeholder='Email address...'
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
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
