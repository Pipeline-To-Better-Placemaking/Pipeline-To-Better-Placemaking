import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    result: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 8,
    },

    resultBox: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        height: 100,
    },

    resultTab: {
        flexDirection: 'row',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        backgroundColor: '#006FD6',
        borderColor: 'black',
        borderWidth: 0,
        width: 50,
        height: 100,
    },

    resultBoxText: {
        marginLeft: 15,
        marginTop: 10,
        color: 'black',
        fontSize: 20
    },

    resultBoxComment: {
        marginTop: 25,
        marginLeft: 15,
        color: 'black',
        fontSize: 12
    },

    resultBoxCheckBox: {
       marginTop: 5,
       marginLeft: 15,
       marginRight: -35
    }
});

export default styles;
