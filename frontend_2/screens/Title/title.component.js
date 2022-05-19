import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { BlueViewableArea } from '../components/content.component';
import { styles } from './title.styles';

const ImageCircleCity = (props) => (
  <View style={styles.circle}>
    <Image
      style={styles.image}
      source={require('../../images/city-isometric.jpg')}
    />
  </View>
);

const ImageCircleConstruction = (props) => (
  <View style={styles.circle}>
    <Image
      style={styles.image}
      source={require('../../images/construction.jpeg')}
    />
  </View>
);

export const TitleScreen = ({ navigation }) => {

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <BlueViewableArea>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={{flexDirection:'row', margin:30, marginRight:-50}}>
          <View style={{marginRight:-50}}>
            <ImageCircleCity/>
          </View>
          <View style={{marginTop:50}}>
            <ImageCircleConstruction/>
          </View>
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

      </ScrollView>
    </BlueViewableArea>
  );
};
