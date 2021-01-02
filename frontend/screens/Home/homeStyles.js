import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection:'column',
    },

    confirmCompareNoCount: {
        alignSelf: 'center',
        marginBottom: 10,

    },

    confirmCompareCount: {
        backgroundColor: '#DEBD07',
        alignSelf: 'center',
        marginBottom: 10,

    },

    confirmCompareTextNoCount: {
        color: 'grey',
        fontSize: 20,
        fontWeight: '600',
    },

    confirmCompareTextCount: {
        color: '#091C7A',
        fontSize: 20,
        fontWeight: '600',
    },
});

export default styles;
