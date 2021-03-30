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
  const [accessDenied, setAccessDenied] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateLogin = async () => {
    setLoading(true);

    let defaultLocation = {
      "latitude": 28.602413253152307,
      "longitude": -81.20019937739713,
    };

    let success = false;
    let res = null;

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
        });
        res = await response.json();
        success = res.success;
    } catch (error) {
        console.log("ERROR: ", error);
        success = false;
    }

    if (success) {
      setAccessDenied(false);

      await AsyncStorage.setItem("@token", res.token)
      await AsyncStorage.setItem("@id", res.user._id)
      await AsyncStorage.setItem("@isVerified", JSON.stringify(res.user.is_verified))
      await AsyncStorage.setItem("@email", res.user.email)
      await AsyncStorage.setItem("@firstName", res.user.firstname)
      await AsyncStorage.setItem("@lastName", res.user.lastname)
      await AsyncStorage.setItem("@teams", JSON.stringify(res.user.teams))
      await AsyncStorage.setItem("@invites", JSON.stringify(res.user.invites))
      await AsyncStorage.setItem("@mapConfig", "standard")

      let { status } = await Location.requestPermissionsAsync();

      if (status === 'granted') {
        defaultLocation = await Location.getCurrentPositionAsync({});
        defaultLocation = defaultLocation.coords
      } else {
        console.log('Permission to access location was denied');
      }

      await props.setLocation(defaultLocation);
      await props.setSignedIn(true);
      await setLoading(false);

      props.navigation.navigate("TabNavigation")
    } else {
      console.log("login failed: ", res.message);
      setAccessDenied(true);
    }

    setLoading(false);
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
        <View>
            {
                accessDenied &&
                <Text style={{color: '#FF3D71'}}>
                    Could not login. Email or password may be incorrect.
                </Text>
            }
        </View>
        <LoginButton />
        <BackButton />
      </ScrollView>
    </BlueViewableArea>
  );
};
