import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Modal, TouchableOpacity } from 'react-native';
import { Icon, Text, Button, Input, Spinner } from '@ui-kitten/components';
import { BlueViewableArea, LoadingSpinner } from '../components/content.component';
import { PasswordModal } from './passwordModal.component';
import { ResetMessage } from './resetMessage.component';
import { ErrorMessage } from './errorMessage.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { HEROKU_SERVER } from '@env';

import { styles } from './login.styles';

export const LoginScreen = ( props ) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateLogin = async () => {
    console.log("Praise Jesus!");
    setLoading(true);

    let defaultLocation = {
      "latitude": 28.602413253152307,
      "longitude": -81.20019937739713,
    };

    let success = false;
    let res = null;

    console.log(HEROKU_SERVER + "Hi mom");

    try {

        const response = await fetch(HEROKU_SERVER+'/login', {
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

    console.log("line 68");
    console.log(success);
    if (!success) {
      console.log("login failed: ", res.message);
      setAccessDenied(true);
      await setLoading(false);
      return;
    }
    setAccessDenied(false);
    console.log("before awaits");
    await AsyncStorage.setItem("@token", res.token)
    await AsyncStorage.setItem("@id", res.user._id)
    await AsyncStorage.setItem("@isVerified", JSON.stringify(res.user.is_verified))
    await AsyncStorage.setItem("@email", res.user.email)
    await AsyncStorage.setItem("@firstName", res.user.firstname)
    await AsyncStorage.setItem("@lastName", res.user.lastname)
    await AsyncStorage.setItem("@teams", JSON.stringify(res.user.teams))
    await AsyncStorage.setItem("@invites", JSON.stringify(res.user.invites))
    await AsyncStorage.setItem("@mapConfig", "satellite")
    console.log("before status");
    // let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("after awaits");

    /*if (status === 'granted') {
      console.log("after get Current Pos");
      const gotLocation = await Location.getCurrentPositionAsync({});
      defaultLocation = gotLocation.coords;
    } else {
      console.log('Permission to access location was denied');
    }*/

    await props.setLocation(defaultLocation);
    await props.setSignedIn(true);
    console.log("before set loading " + loading);
    await setLoading(false);
    console.log("After set loading " + loading);
    props.navigation.navigate("TabNavigation");
    console.log("After nav " + loading);
  };

  const resetPassword = async (inf) =>{
    let address = inf.email;
    setResetEmail(address);
    try {
      const response = await fetch(HEROKU_SERVER+'/password_reset/', {
          method: 'POST',
          headers: {
            Accept: 
              'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: address
          })
      })
      let info = await response.json()
      // console.log('Reset password response: ' + info)
      // pulls up the success popup
      setResetMsg(true);
    } catch (error) {
      // console.log('ERROR: ' + error)
      // pulls up the error popup
      setErrorMsg(true);
    }
    // close the modal
    setPasswordModal(false);
  }
  
  // closes the modals
  const goBack = () =>{
    if(passwordModal) setPasswordModal(false);
    else if(resetMsg) setResetMsg(false);
    else setErrorMsg(false);
  };
  
  // used to close modals after 7.5 s (if user didn't close it manually)
  useEffect(() =>{
    if(resetMsg){
      // after 5 seconds, close the popup and reset the interval (so the interval doesn't keep running)
      let id = setInterval(()=>{
        setResetMsg(false);
        clearInterval(id);
      // 7500 ms -> 7.5 s
      }, 7500)
    }
    if(errorMsg){
      // after 5 seconds, close the popup and reset the interval (so the interval doesn't keep running)
      let id = setInterval(()=>{
        setErrorMsg(false);
        clearInterval(id)
      // 7500 ms -> 7.5 s
      }, 7500)
    }
  }, [resetMsg, errorMsg])

  const LoginButton = () => (
    <Button style={styles.logInButton} onPress={navigateLogin}>
      <Text>Log In</Text>
    </Button>
  );

  const BackButton = () => (
    <Button onPress={navigateBack} style={styles.backButton}>
      <Text>&larr; Back</Text>
    </Button>
  );

  const eyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <BlueViewableArea>
      <View style={styles.container}>
        
        <PasswordModal
          visible={passwordModal}
          closeData={resetPassword}
          back={goBack}
        />

        <ResetMessage
          visible={resetMsg}
          email={resetEmail}
          back={goBack}
        />

        <ErrorMessage
          visible={errorMsg}
          email={resetEmail}
          back={goBack}
        />

        <LoadingSpinner loading={loading} />
        
        <Text style={styles.title} category='h1' status='control'>Login</Text>
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
                <Text style={styles.errorMsg}>
                    Could not login. Email or password may be incorrect.
                </Text>
            }
        </View>
        
        <View style={styles.forgotView}>
          <TouchableOpacity onPress={() =>{ setPasswordModal(true); setAccessDenied(false)}}>
            <Text style={styles.forgotTxt}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <LoginButton />
        <BackButton />
      </View>
    </BlueViewableArea>
  );
};
