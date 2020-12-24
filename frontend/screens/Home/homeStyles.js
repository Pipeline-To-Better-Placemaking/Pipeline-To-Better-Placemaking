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
    }

});

export default styles;
