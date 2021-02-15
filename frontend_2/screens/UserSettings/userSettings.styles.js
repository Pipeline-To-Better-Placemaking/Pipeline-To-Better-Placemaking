import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection:'column'
    },

    settingsContainer: {
        flexDirection: 'column',
        marginTop:20
    },

    userDetails: {
        alignSelf: 'center',
        marginBottom: 20
    },

    logOutButton: {
        width: 300,
        backgroundColor: '#DEBD07'
    },

    logOutText: {
        color: '#091C7A',
        fontSize: 20,
        fontWeight: '600',
    },

    circle: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        borderColor: '#006FD6',
        borderWidth: 1,
        backgroundColor: '#006FD6',
        alignSelf: 'center',
        marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
    },

    userIcon: {
        backgroundColor: 'transparent',
        width: 150,
        height: 150,
        borderRadius: 150/2,

    },

    iconSize: {
        width: 100,
        height: 100
    },

	userInitials: {
		fontSize: 150/2,
		textAlign: 'center',
		color: '#FFFFFF'
	}
});
