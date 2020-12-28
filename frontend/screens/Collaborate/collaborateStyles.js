import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection:'column'
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
