import React from 'react';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
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


        <Text style={{margin:5}} category='h1' status='control'>
            2+ Community
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
