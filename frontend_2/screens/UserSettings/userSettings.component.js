import React, {useState} from 'react';
import { View, Modal, ScrollView } from 'react-native';
import { Icon, Input, Text, Button } from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { styles } from './userSettings.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropsService } from '@ui-kitten/components/devsupport';

export function UserSettings(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [firstNameText, setFirstNameText] = useState(props.firstName);
  const [lastNameText, setLastNameText] = useState(props.lastName);
  const [emailText, setEmailText] = useState(props.lastName);

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
    setModalVisible(!modalVisible)
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

      setModalVisible(!modalVisible)
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

  return (
    <ViewableArea>
      <Header text={'User Settings'}/>

      <ContentContainer>
        <Modal animationType="slide" visible={modalVisible}  onRequestClose={() => {setModalVisible(!modalVisible)}}>
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

          <Button style={{margin:5}} onPress={() => setModalVisible(!modalVisible)} accessoryRight = {editIcon}>
            EDIT PROFILE
          </Button>

          <Button style={{margin:5}} onPress={themeContext.toggleTheme} accessoryRight = {themeIcon}>
            TOGGLE THEME
          </Button>

          <Button style={{margin:5}}>
            CHANGE PASSWORD
          </Button>

          <Button style={{margin:5}} status='danger' onPress={() => logOut()}>
            LOG OUT
          </Button>
        </ScrollView>

      </ContentContainer>
    </ViewableArea>
    );
};
