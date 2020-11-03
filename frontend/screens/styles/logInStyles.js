import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    background: {
        flex: 1,
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

    logInButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#DEBD07'
    },

    logInText: {
        color: '#091C7A',
        fontSize: 20
    },

    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    backText: {
        color: '#8F9BB3',
    },

    backTextPressed: {
        color: '#FFFFFF',
    },

    forgotText: {
        color: '#FFFFFF',
    },

    forgotPressed: {
        color: '#000000',
    },

});

export default styles;
