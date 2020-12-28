import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection:'column'
    },

    logOutButton: {
        marginTop: 30,
        width: 300,
        backgroundColor: '#DEBD07'
    },

    logOutText: {
        color: '#091C7A',
        fontSize: 20,
        fontWeight: '600',
    }

});

export default styles;
