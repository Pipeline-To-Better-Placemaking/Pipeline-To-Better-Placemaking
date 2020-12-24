import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flexGrow : 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#006FD6'
    },

    logInButton: {
        marginTop: 100,
        width: 300,
        backgroundColor: '#DEBD07'
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

    circle: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        backgroundColor: 'white'
    },

    image: {
        width: 150,
        height: 150,
        borderRadius: 150/2
    }
});

export default styles;
