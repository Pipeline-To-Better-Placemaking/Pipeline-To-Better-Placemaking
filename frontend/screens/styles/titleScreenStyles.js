import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    logInButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 170
    },

    logInText: {
        color: '#000000',
        fontSize: 20
    },

    signUpButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75
    },

    signUpText: {
        color: '#8F9BB3',
        fontSize: 20
    },

    signUpTextPressed: {
        color: '#FFFFFF',
        fontSize: 20
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