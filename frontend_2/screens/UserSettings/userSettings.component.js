import React, { useState, useEffect } from 'react';
import { View, Modal, ScrollView } from 'react-native';
import { Icon, Input, Text, Button } from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { styles } from './userSettings.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropsService } from '@ui-kitten/components/devsupport';

export function UserSettings(props) {

  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [firstNameText, setFirstNameText] = useState(props.firstName);
  const [lastNameText, setLastNameText] = useState(props.lastName);
  const [emailText, setEmailText] = useState(props.lastName);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(false);
  const [codeChanged, setCodeChanged] = useState(false);

  useEffect(() => {
      async function fetchData() {
          setIsVerified(await AsyncStorage.getItem('@isVerified') === 'true')
      }
      fetchData()
  })

  const themeContext = React.useContext(ThemeContext);

  const UserIcon = (props) => (
    <Icon {...props} fill='grey' style={styles.iconSize} name='person'/>
  );

  const editIcon = (props) => (
    <Icon {...props} fill='white' name='edit'/>
  );

  const closeIcon = (props) => (
    <Icon {...props} fill='white' name='close'/>
  );

  const confirmIcon = (props) => (
    <Icon {...props} fill='white' name='checkmark'/>
  );

  const mailIcon = (props) => (
    <Icon {...props} fill='white' name='email'/>
  );

  const themeIcon = (props) => {
    if(themeContext.theme == 'light') {
      return(
        <Icon {...props} fill='white' name='moon'/>
      );
    }

    return(
      <Icon {...props} fill='white' name='sun'/>
    );
  }

  const cancelEditProfile = () => {
    setFirstNameText(props.firstName)
    setLastNameText(props.lastName)
    setEmailText(props.email)
    setSettingsModalVisible(!settingsModalVisible)
  }

  const confirmEditProfile = async () => {
    let editedFirstName = firstNameText
    let editedLastName = lastNameText

    // if any profile data input is empty do not update that data
    if(editedFirstName == "" || editedFirstName == null)
      editedFirstName = props.firstName

    if(lastNameText == "" || lastNameText == null)
      editedLastName = props.lastName

    updateUser(editedFirstName, editedLastName)
  }

  // backend call
  const updateUser = async (editedFirstName, editedLastName) => {
    let success = false
    let result = null

    try {
      console.log("Trying to update a user")

      const response = await fetch('https://measuringplacesd.herokuapp.com/api/users/', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + props.token
        },

        body: JSON.stringify({
          firstname: editedFirstName,
          lastname: editedLastName
        })
      })

      result = await response.text()
      console.log(result)
      success = true
    } catch (error) {
        console.log("ERROR: " + error)
    }

    // if user details were properly updated in the backend change them locally
    if(success) {
      props.setFirstName(editedFirstName)
      await AsyncStorage.setItem('@firstName', props.firstName)

      props.setLastName(editedLastName)
      await AsyncStorage.setItem('@lastName', props.lastName)

      //props.setEmail(emailText)
      //await AsyncStorage.setItem('@email', props.email)

      setSettingsModalVisible(!settingsModalVisible)
    } else {
      cancelEditProfile()
    }
  }

  const logOut = async () => {
    // Possible improvements
    // 1) Clean the async storaged
    // 2) Delete the user token (log out a user from a session)
    await AsyncStorage.clear();
    await props.setSignedIn(false);
    await props.navigation.navigate('Title');
  }

  const verifyEmail = async () => {
        const email = await AsyncStorage.getItem('@email');

        let success = false;
        let result = null;

        try {
            const response = await fetch(`https://measuringplacesd.herokuapp.com/api/verify/?email=${email}&code=${verificationCode}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            result = await response.text();
            console.log(result);
            success = response.status === 200;

        } catch (error) {
            console.log('ERROR: ' + error);
        }

        if(success) {
            setIsVerified(true);
            await AsyncStorage.setItem('@isVerified', 'true');
            setVerifyModalVisible(false);
        } else {
            setVerificationError(true);
        }
  }

  const resendCode = async () => {
        let success = false;
        let result = null;

        try {
            const response = await fetch('https://measuringplacesd.herokuapp.com/api/verify/newcode', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                }
            });

            result = await response.text();
            console.log(result);
            success = response.status === 200;

        } catch (error) {
            console.log('ERROR: ' + error);
        }

        if (success) {
            setCodeChanged(true);
        }
  }

  return (
    <ViewableArea>
      <Header text={'User Settings'}/>

      <ContentContainer>
        <Modal animationType="slide" visible={settingsModalVisible}  onRequestClose={() => {setSettingsModalVisible(!settingsModalVisible)}}>
          <ViewableArea>
            <Header text={'Edit Profile'}/>
            <ContentContainer>
              <View style={{margin:20}}>

                <Text category='s1'>First Name:</Text>
                <Input
                  placeholder = 'First Name'
                  value={firstNameText}
                  onChangeText={nextValue => setFirstNameText(nextValue)}
                />

                <Text category='s1'>Last Name:</Text>
                <Input
                  placeholder = 'Last Name'
                  value={lastNameText}
                  onChangeText={nextValue => setLastNameText(nextValue)}
                />

                {/* Email can't be changed with API yet
                <Input
                  label = 'Email'
                  placeholder = 'Email'
                  value={emailText}
                  onChangeText={nextValue => setEmailText(nextValue)}
                />
                */}

                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Button
                    status={'danger'}
                    style={{margin:5}}
                    onPress={() => cancelEditProfile()}
                    accessoryLeft = {closeIcon}
                  >
                    CANCEL
                  </Button>
                  <Button
                    status={'success'}
                    style={{margin:5}}
                    onPress={() => confirmEditProfile()}
                    accessoryRight = {confirmIcon}
                  >
                    CONFIRM
                  </Button>
                </View>
              </View>
            </ContentContainer>
          </ViewableArea>
        </Modal>

        <Modal animationType="slide" visible={verifyModalVisible}  onRequestClose={() => {setVerifyModalVisible(!verifyModalVisible)}}>
            <ViewableArea>
                <Header text='Verify Email'/>
                <ContentContainer>
                    <View style={{margin:20}}>
                        <Text category='s1'>Enter verification code:</Text>
                        <Input
                            placeholder = 'Code'
                            value={verificationCode}
                            onChangeText={nextValue => setVerificationCode(nextValue)}
                            caption={
                                verificationError &&
                                <Text style={{color: '#FF3D71'}}>
                                    Failed to verify email. Code may be incorrect or expired.
                                </Text>
                            }
                        />

                        <Button
                            status={'success'}
                            style={{margin:5}}
                            onPress={() => verifyEmail()}
                            accessoryRight = {confirmIcon}
                        >
                            SUBMIT
                        </Button>

                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Button
                                status={'danger'}
                                style={{margin:5}}
                                onPress={() => {
                                    setVerificationCode('')
                                    setVerificationError(false)
                                    setVerifyModalVisible(!verifyModalVisible)
                                }}
                                accessoryLeft = {closeIcon}
                            >
                                CANCEL
                            </Button>
                            <Button
                                style={{margin:5}}
                                onPress={() => resendCode()}
                            >
                                RESEND CODE
                            </Button>
                        </View>

                        {
                            codeChanged &&
                            <Text>
                                Sent a new verification code to your email. Please check your inbox and spam folder.
                            </Text>
                        }
                    </View>
                </ContentContainer>
            </ViewableArea>
        </Modal>

        <ScrollView style={{margin:5, marginRight:20, marginLeft:20}}>

          <View style={styles.circle}>
            <Text style={styles.userInitials}>
              {props.firstName && props.firstName[0]}{props.lastName && props.lastName[0]}
            </Text>
          </View>

          <View style={styles.userDetails}>
            <Text style={{fontSize: 20, alignSelf: 'center'}}> {props.firstName} {props.lastName} </Text>
            <Text style={{fontSize: 20, alignSelf: 'center'}}> {props.email} </Text>
          </View>

          <Button style={{margin:5}} onPress={() => setSettingsModalVisible(!settingsModalVisible)} accessoryRight = {editIcon}>
            EDIT PROFILE
          </Button>

          <Button style={{margin:5}} onPress={themeContext.toggleTheme} accessoryRight = {themeIcon}>
            TOGGLE THEME
          </Button>

          <Button style={{margin:5}}>
            CHANGE PASSWORD
          </Button>

          {
              !isVerified &&
              <Button style={{margin:5}} onPress={() => setVerifyModalVisible(!verifyModalVisible)}>
                VERIFY EMAIL
              </Button>
          }

          <Button style={{margin:5}} status='danger' onPress={() => logOut()}>
            LOG OUT
          </Button>
        </ScrollView>

      </ContentContainer>
    </ViewableArea>
    );
};
