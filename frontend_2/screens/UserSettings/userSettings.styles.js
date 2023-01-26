import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        margin:20
    },

    settingsContainer: {
        margin:5, 
        marginRight:20, 
        marginLeft:20
    },

    userDetails: {
        alignSelf: 'center',
        marginBottom: 20
    },

    details:{
        fontSize: 20, 
        alignSelf: 'center'
    },

    logOutButton: {
        margin:5, 
        marginTop:50
    },

    logOutText: {
        alignSelf:'center', 
        marginBottom: 15, 
        marginTop: 5
    },

    logOutButtonPrompt:{
        width: 100
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
	},

    errorMsg:{
        color: '#FF3D71'
    },
    
    buttonRow:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginTop:30
    },

    button:{
        margin:5
    },

    submitButton:{
        marginTop: 20
    }

});

export default styles;