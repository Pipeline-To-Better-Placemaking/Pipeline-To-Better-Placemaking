import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column'
    },

    emptyBox: {
        height: 150,
        width: '80%',
        marginTop: 50,
        backgroundColor: 'transparent',
        justifyContent:'flex-end',
        alignSelf: 'center',
        borderStyle: 'dashed'
    },

    box: {
        height: 150,
        width: '80%',
        marginTop: 50,
        backgroundColor: 'transparent',
        justifyContent:'flex-end',
        alignSelf: 'center'
    },

    plusIcon: {
        width: '50',
        height: '50',
        marginRight: 110
    }
});

export default styles;
