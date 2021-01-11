import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
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
    },

    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
    },

    modalBackgroundStyle: {
      flex: 1,
      justifyContent: 'center',
    },

    menu: {
        ...Platform.select({
          ios: {
              marginRight:15
          },
          android: {
            margin:20
          },
          default: {
            // other platforms, web for example
          }
        })
    },

    header: {
        backgroundColor: '#006FD6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        ...Platform.select({
          ios: {
            height: '10%'
          },
          android: {
            height: '5%'
          },
          default: {
            // other platforms, web for example
            height: '10%'
          }
        })
    },

    headerText: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 5,
    },

    leftContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    rightContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    button: {
        marginLeft: 5,
        backgroundColor: '#006FD6',
        borderColor: '#006FD6',
      },

});

export default styles;
