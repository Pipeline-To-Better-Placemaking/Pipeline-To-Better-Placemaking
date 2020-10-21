import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Pressable, Image } from 'react-native';
import { Text, Button, useTheme } from '@ui-kitten/components';

// ****** TODO *******
// 1.) Add some sort of highlight when sign up is pressed (Pressable, TouchableHighlight)
//     NOTE: I think in order to get this done, we have to change this from a function to a component.
//           That would require a rewrite / restructure of the file. Would have to create a CSS file to
//           hold the styles.
// 2.) Add circles to hold images -- Complete
// 3.) Add images to circles -- Complete (Maybe add a rim)
//     NOTE: Cannot do this dynamically because of a bug with React. Need to be string literals.
//           Need to implement two different Image Circles. Also, images must be in the same folder,
//           so not allowed to have a sub folder of images.
//     PS:   Check if the images used are copyright free. When I chose them, I'm pretty sure they were.
//           Have to double check.
// 4.) Get feedback on color scheme and overall design
// 5.) Hook up redirects to login and sign up page
// 6.) Possibly add animation to the text and image bubbles
// 7.) Maybe add a subtitle text under the title


export const TitleScreen = () => {

    const theme = useTheme();


    function ImageCircleCity(props) {

        return(
            <View marginLeft= {props.leftMargin} marginBottom= {props.bottomMargin} style={imgCricle.circle}>
                <Image
                    style = {imgCricle.image}
                    source = {require('./city-isometric.jpg')}
                />
            </View>
        );
    }

    function ImageCircleConstruction(props) {

        return(
            <View marginLeft= {props.leftMargin} marginBottom= {props.bottomMargin} style={imgCricle.circle}>
                <Image
                    style = {imgCricle.image}
                    source = {require('./construction.jpeg')}
                />
            </View>
        );
    }

    var signUpPressed = false;
    
    const onPress = () => {
        
        signUpPressed = true;
    }

    return (

        <View style={[styles.background, { backgroundColor: theme['color-info-focus'] }]}>

            <View marginTop={10} marginLeft={30}>
                <ImageCircleCity leftMargin={100} bottomMargin={-80}/>
                <ImageCircleConstruction leftMargin={180} bottomMargin={20}/>
            </View>

            <View>
                <Text category='h1' status='control'>
                    2+ Community
                </Text>
            </View>

            <View>
                <View style={[styles.logInButton]}>
                    <Button size='giant' style={[{backgroundColor: '#DEBD07'}]}>
                        <Text style={ [ { color: theme['color-primary-900'], fontWeight: '600', fontSize: 18 } ] }>
                            Log In   
                        </Text>
                    </Button>
                </View>

                
                    <View style={[styles.signUpButton]}>
                        <Text onPress={onPress} style={signUpPressed ? styles.signUpTextPressed : styles.signUpText} suppressHighlighting={true}>
                            Sign Up
                        </Text>
                    </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    logInButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 170
    },

    logInText: {
        color: '#000000',
        fontSize: 20
    },

    signUpButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75
    },

    signUpText: {
        color: '#8F9BB3',
        fontSize: 20
    },

    signUpTextPressed: {
        color: '#FFFFFF'
    }

});

const imgCricle = StyleSheet.create({
    
    circle: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        backgroundColor: 'white'
    },

    image: {
        width: 150,
        height: 150,
        borderRadius: 150/2
    }
})
