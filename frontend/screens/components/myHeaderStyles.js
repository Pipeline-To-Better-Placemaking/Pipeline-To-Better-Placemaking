import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    header: {
        backgroundColor: '#006FD6',
        justifyContent:'flex-end',
        flexDirection:'column',
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
        marginBottom: 5
    }

});

export default styles;
