import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    result: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    resultBox: {
        width: '80%',
        borderWidth: 1,
        height: 100,
    },

    resultTab: {
        flexDirection: 'row',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        backgroundColor: '#006FD6',
        width: 50,
        height: 100,
    },

    resultBoxText: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20
    },

    resultBoxComment: {
        marginTop: 10,
        marginLeft: 25,
        fontSize: 12
    },

    resultBoxCheckBox: {
       marginTop: 5,
       marginLeft: 15,
       marginRight: -35
    }
});

export default styles;
