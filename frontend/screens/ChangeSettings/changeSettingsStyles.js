import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flexGrow : 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#006FD6'
    },

    title: {
        marginTop: 20,
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

    inputBox: {
        width: 300
    },

    confirmChangeButton: {
        width: 300,
        marginTop: 50,
        backgroundColor: '#DEBD07'
    },

    confirmChangeText: {
        color: '#091C7A',
        fontSize: 20,
        fontWeight: '600',
    },

    backButton: {
        marginTop: 20,
        marginBottom: 30,
    },

    backText: {
        color: '#8F9BB3',
        fontSize: 20,
    },

    backTextPressed: {
        color: '#FFFFFF',
        fontSize: 20,
    },
});

export default styles;