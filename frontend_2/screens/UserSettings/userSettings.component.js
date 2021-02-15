import React, {useState} from 'react';
import { SafeAreaView, View, ScrollView, Pressable, Image, Modal } from 'react-native';
import { Divider, Icon, Layout, Input, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { ThemeContext } from '../../theme-context';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { styles } from './userSettings.styles';

export function UserSettings(props) {

	const [modalVisible, setModalVisible] = useState(false);

  const themeContext = React.useContext(ThemeContext);

	const UserIcon = (props) => (
		<Icon {...props} fill='grey' style={styles.iconSize} name='person'/>
	);

	const editIcon = (props) => (
		<Icon {...props} fill='white' name='edit'/>
	)

  return (
    <ViewableArea>
      <Header text={'User Settings'}/>

      <ContentContainer>
				<Modal animationType="slide" visible={modalVisible}	onRequestClose={() => {setModalVisible(!modalVisible)}}>
					<ViewableArea>
							<Header text={'Edit Profile'}/>

							<Input
								label = 'Edit First Name'
								placeholder = 'First Name'
								//value={value}
								//onChangeText={nextValue => setValue(nextValue)}
							/>

							<Input
								label = 'Edit Last Name'
								placeholder = 'Last Name'
								//value={value}
								//onChangeText={nextValue => setValue(nextValue)}
							/>

							<Button style={{margin:5}} onPress={() => setModalVisible(!modalVisible)}>
								Cancel
							</Button>
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

        <Button style={{margin:5}} onPress={themeContext.toggleTheme}>
          TOGGLE THEME
        </Button>

				<Button style={{margin:5}} onPress={() => setModalVisible(!modalVisible)} accessoryRight = {editIcon}>
          EDIT
        </Button>

			</ContentContainer>
    </ViewableArea>
  );
};
