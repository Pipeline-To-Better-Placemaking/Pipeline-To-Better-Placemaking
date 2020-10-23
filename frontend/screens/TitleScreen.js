import React, { Component } from 'react';
import { View,  Pressable, Image } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import styles from './styles/titleScreenStyles.js';

// ****** TODO *******
// 1.) Add some sort of highlight when sign up is pressed (Pressable, TouchableHighlight) -- Complete
// 2.) Add circles to hold images -- Complete
// 3.) Add images to circles -- Complete (Maybe add a rim)
// 4.) Get feedback on color scheme and overall design
// 5.) Hook up redirects to login and sign up page -- 1/2 Complete
// 6.) Possibly add animation to the text and image bubbles
// 7.) Maybe add a subtitle text under the title

const ImageCircleCity = (props) => {

    return(
        <View marginLeft= {props.leftMargin} marginBottom= {props.bottomMargin} style={styles.circle}>
            <Image
                style = {styles.image}
                source = {require('./city-isometric.jpg')}
            />
        </View>
    );
}

const ImageCircleConstruction = (props) => {

    return(
        <View marginLeft= {props.leftMargin} marginBottom= {props.bottomMargin} style={styles.circle}>
            <Image
                style = {styles.image}
                source = {require('./construction.jpeg')}
            />
        </View>
    );
}

class TitleScreenClass extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            color: styles.signUpText.color
        };
    }

    onPressIn = (navigation) => {
        this.setState({
            color: styles.signUpTextPressed.color
        });

    }

    onPressOut = () => {
        this.setState({
            color: styles.signUpText.color
        });

        this.props.navigation.navigate("SignUp");
    }

    render() {

        return(
            
            <View style={[styles.background, { backgroundColor: '#006FD6' }]}>

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
                            <Text style={ [ { color: '#091C7A', fontWeight: '600', fontSize: 18 } ] }>
                                Log In   
                            </Text>
                        </Button>
                    </View>

                    <View style={[styles.signUpButton]}>
                        <Pressable onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
                            <Text style={{ color: this.state.color, fontSize: 20} } >
                                Sign Up
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }
}

export default TitleScreenClass;