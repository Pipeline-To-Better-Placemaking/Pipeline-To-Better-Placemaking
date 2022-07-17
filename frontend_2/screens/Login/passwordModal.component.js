import React, { useState } from 'react';
import { View, Modal, Keyboard } from 'react-native';
import { useTheme, Text, Button, Input } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

import { styles } from './modal.styles';

export function PasswordModal(props) {

    const theme = useTheme();

    const [email, setEmail] = useState();
    const [empty, setEmpty] = useState(false);
    const [valid, setValid] = useState(false);

    const sendData = async () => {
        // if something was in the input box when submitted
        if(email){
                // if it goes in this if, the email is invalid
                if(!checkEmail()){
                    // set the valid error message to true, the empty error message to false, and return
                    setValid(true);
                    setEmpty(false);
                    return;
                }
                let data = {
                    email: email
                }
                // reset the useStates
                setEmail();
                setEmpty(false);
                setValid(false);
                // sends data and closes modal
                await props.closeData(data);
            }
        // if the user didn't enter anything, do not allow modal to close
        else{
            setEmpty(true);
            setValid(false);
        }
    }

    const handleBack = () =>{
        setEmail();
        setEmpty(false);
        setValid(false);
        props.back();
    }

    const checkEmail = () => {
        if (!/.+\@.+\..+/g.test(email)) return false;
        if (/\s/g.test(email)) return false;
        return true;
    }

    return(
        <Modal transparent={true} animationType='slide' visible={props.visible}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                <View style={styles.modalContainer}>
                    <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]} >
                    
                        <Text category={'h1'} style={styles.titleText}>Forgot Password</Text>
                        <Text category={'s1'} style={styles.descText}>Enter the email address associated with your account to send a reset password link</Text>
                            
                        <View style={styles.dataView}>
                        
                            { valid ?
                                <View style={styles.validSpace}>
                                    <Text style={styles.redTxt}>Enter a valid email address to submit</Text>
                                </View>
                            :
                                null
                            }
                                
                            <Input
                                style={styles.inputBox}
                                placeholder={"Email address..."}
                                onChangeText={(nextValue) => setEmail(nextValue)}
                            />
                                
                            { empty ?
                                <View style={styles.emptySpace}>
                                    <Text style={styles.redTxt}>Enter an email address to submit</Text>
                                </View>
                            :
                                null
                            }

                        </View>

                        <View style={styles.buttonRow}>
                            <Button style={styles.cancelButton} onPress={handleBack}>
                                <View>
                                    <Text style={styles.buttonTxt}>Cancel</Text>
                                </View>
                            </Button>
                            <Button style={styles.button} onPress={sendData}>
                                <View>
                                    <Text style={styles.buttonTxt}>Submit</Text>
                                </View>
                            </Button>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}