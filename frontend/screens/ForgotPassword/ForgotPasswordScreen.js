import React, { Component } from 'react';
import { View, Pressable, ScrollView} from 'react-native';
import { Text, Button, Input, Icon } from '@ui-kitten/components';
import styles from './forgotPasswordStyles.js';

class ForgotPasswordScreen extends Component {

    constructor(props)
    {
        super(props);

        this.state ={
            email: ' ',
            active: -1,
        }

    }

    onPressBack = () => {
        this.setState({
            color: styles.backTextPressed.color,
            active: 1
        });

    }

    onUnPressBack = () => {
        this.setState({
            active: -1
        });

        this.props.navigation.navigate("TitleScreen");
    }


    render() {

        return(
            <View backgroundColor={styles.container.backgroundColor} flex={1}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
                    <View style={styles.title}>
                        <Text category='h1' status='control'>
                            Forgot Password
                        </Text>
                    </View>

                    <View>
                        <Text category='label' style={styles.inputText}> Enter your email address: </Text>
                        <Input
                        placeholder='Email address...'
                        onChange={this.onEmailChange}
                        style={styles.inputBox}
                        />
                    </View>

                    <Button size='giant' onPress={this.onSignUp} style={{marginTop: 50, backgroundColor: '#DEBD07'}}>
                            <Text style={{ color: '#091C7A', fontWeight: '600', fontSize: 18}}>
                                Submit
                            </Text>
                    </Button>

                    <View style={[styles.backButton]}>
                        <Pressable onPressIn={this.onPressBack} onPressOut={this.onUnPressBack}>
                            <Text style={{ color: this.state.active === 1 ? this.state.color : styles.backText.color, fontSize: 20, marginTop: 25}} >
                                &larr; Back
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

export default ForgotPasswordScreen;
