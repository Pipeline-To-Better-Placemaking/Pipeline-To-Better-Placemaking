import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
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

    teamTextView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 30
    },

    teamText: {
        fontSize: 25,
    },

    line: {
        borderBottomWidth: 2,
        marginTop: 5
    },

    createTeamButtonView: {
        marginRight: 30,
    }

});

export default styles;
