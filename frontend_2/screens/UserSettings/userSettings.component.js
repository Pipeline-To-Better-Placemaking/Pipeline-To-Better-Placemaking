import React, {useState} from 'react';
import { View, Modal } from 'react-native';
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
		props.setFirstName(firstNameText)
		await AsyncStorage.setItem('@firstName', props.firstName)

		props.setLastName(lastNameText)
		await AsyncStorage.setItem('@lastName', props.lastName)

		props.setEmail(emailText)
		await AsyncStorage.setItem('@email', props.email)

		setModalVisible(!modalVisible)
		// call backend and update values
	}

  return (
    <ViewableArea>
      <Header text={'User Settings'}/>

      <ContentContainer>
				<Modal animationType="slide" visible={modalVisible}	onRequestClose={() => {setModalVisible(!modalVisible)}}>
					<ViewableArea>
							<Header text={'Edit Profile'}/>
							<ContentContainer>
								<Input
									label = 'First Name'
									placeholder = 'First Name'
									value={firstNameText}
									onChangeText={nextValue => setFirstNameText(nextValue)}
								/>

								<Input
									label = 'Last Name'
									placeholder = 'Last Name'
									value={lastNameText}
									onChangeText={nextValue => setLastNameText(nextValue)}
								/>

								<Input
									label = 'Email'
									placeholder = 'Email'
									value={emailText}
									onChangeText={nextValue => setEmailText(nextValue)}
								/>

								<Button style={{margin:5}} onPress={() => confirmEditProfile()} accessoryRight = {confirmIcon}>
									CONFIRM
								</Button>
								<Button style={{margin:5}} onPress={() => cancelEditProfile()} accessoryRight = {closeIcon}>
									CANCEL
								</Button>
							</ContentContainer>
					</ViewableArea>
				</Modal>

				<View style={styles.circle}>
						<Text style = {styles.userInitials}>
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

				<Button style={{margin:5}} onPress={themeContext.toggleTheme}>
          CHANGE PASSWORD
        </Button>

				<Button style={{margin:5}} onPress={() => setModalVisible(!modalVisible)} accessoryRight = {mailIcon}>
          VERIFY EMAIL
        </Button>

			</ContentContainer>
    </ViewableArea>
  );
};
