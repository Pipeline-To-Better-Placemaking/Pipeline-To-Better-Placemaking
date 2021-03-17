import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserSettings } from '../screens/UserSettings/userSettings.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';

const { Navigator, Screen } = createStackNavigator();

export function UserSettingsStack(props) {

  let setSignedIn = props.setSignedIn;

	// These are used for api calls
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');

	// user info
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		async function getTokens() {
			// used for api calls
			let token = await AsyncStorage.getItem("@token");
			setToken(token);

			let id = await AsyncStorage.getItem("@id");
			setUserId(id);

			let firstName = await AsyncStorage.getItem('@firstName');
			setFirstName(firstName);

			let lastName = await AsyncStorage.getItem("@lastName");
			setLastName(lastName);

			let email = await AsyncStorage.getItem("@email");
			setEmail(email);
		}

		getTokens()


	}, []);

	return (
    <Navigator headerMode='none'>
      <Screen name='UserSettings'>
        {props =>
          <UserSettings
            {...props}
            firstName={firstName}
            lastName={lastName}
            email={email}
  					token={token}
  					userId={userId}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setSignedIn={setSignedIn}
          >
          </UserSettings>
        }
      </Screen>
    </Navigator>
    );
};
