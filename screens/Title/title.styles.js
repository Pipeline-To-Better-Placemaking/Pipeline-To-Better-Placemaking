import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    logoView:{
        margin: 40
    },
    
    container: {
        flexGrow : 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
    },

    titleText:{
        margin:5, 
        textAlign: 'center'
    },

    logInButton: {
        margin:20,
        backgroundColor: '#DEBD07',
    },

    logInText: {
        color: '#091C7A',
        fontSize: 20,
        fontWeight: '600',
    },

    signUpButton: {
        marginTop: 75,
        marginBottom: 75,
    },

    signUpText: {
        color: '#8F9BB3',
        fontSize: 20,
        textAlign: 'center'
    },

    signUpTextPressed: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    },

    image: {
        width: 175,
        height: 175,
    }

});

export default styles;