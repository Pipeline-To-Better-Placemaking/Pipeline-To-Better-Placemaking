import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    background: {
        justifyContent: 'center',
        alignItems: 'center',
      },

    title: {
        marginTop: -10,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputText: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        color: '#FFFFFF'
    },

    inputRow: {
        flexDirection: "row"
    },

    inputBox: {
        width: 300
    },

    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    backText: {
        color: '#8F9BB3',
    },

    backPressed: {
        color: '#FFFFFF',
    },

    signUpErrorMessage: {
        color: '#FF3D71',
        marginTop: -25,
        marginBottom: 20
    },

});

export default styles;
