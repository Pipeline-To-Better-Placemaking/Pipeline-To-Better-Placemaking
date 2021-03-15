import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection:'column',
    },

    confirmCompareCount: {
        backgroundColor: '#DEBD07',
    },

    resultTextView: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-end',
        marginLeft: 5,
    },

    resultText: {
        fontSize: 25,
    },

    resultLine: {
        borderBottomWidth: 2,
        marginTop:5
    },

    resultCompareButtonView: {
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

});
