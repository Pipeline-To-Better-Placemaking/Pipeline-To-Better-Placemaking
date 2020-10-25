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
        fontSize: 16,
        color: '#FFFFFF'
    },

    inputRow: {
        flexDirection: "row"
    },

    inputBox: {
        width: 300
    }
});

export default styles;