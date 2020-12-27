import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        flexDirection:'column'
    },

    header: {
        backgroundColor: '#006FD6',
        justifyContent:'flex-end',
        flexDirection:'column',
        height: '8%'
    },

    headerText: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 5
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
