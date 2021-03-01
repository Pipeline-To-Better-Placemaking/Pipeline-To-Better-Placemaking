import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection:'column'
    },

    teamTextView: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20
    },

    teamText: {
        fontSize: 25,
    },

    line: {
        borderBottomWidth: 2,
        marginTop: 5
    },

    createTeamButtonView: {
        marginRight: 20,
    },

    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
    },

    modalBackgroundStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

});
