import React, { useEffect } from 'react';
import { View, Animated, Easing, Image } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { BlueViewableArea } from '../components/content.component';

import { styles } from './title.styles';

export const TitleScreen = ({ navigation }) => {
  
  let spinValue = new Animated.Value(0);
  
  // main control of rotating animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 60000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, []);
  
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <BlueViewableArea>
      <View style={styles.container}>

        <View style={styles.logoView}>
          <Animated.Image
            style={[styles.image, {transform:[{rotate: spin}]}]} 
            source={require('../../images/Logo-Coin.png')}
          />
        </View>


        <Text style={styles.titleText} category='h1' status='control'>
            Pipeline to Better Placemaking
        </Text>

        <Button style={styles.logInButton} onPress={navigateLogin}>
          <Text style={styles.logInText}>
              Log In
          </Text>
        </Button>

        <Button style={styles.logInButton} onPress={navigateSignUp}>
          <Text style={styles.logInText}>
              Sign Up
          </Text>
        </Button>

      </View>
    </BlueViewableArea>
  );
};
