import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection:'column',
        // margin:20,
        ...Platform.select({
          ios: {
            // marginTop:50
          },
          android: {
            marginTop:20
          },
          default: {
            // other platforms, web for example
            marginTop:50
          }
      })
    },

    pointList: {
        height:'40%',
        marginTop:20,
    },

    buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-around',
    },

    list: {
        marginBottom: -100
    }

});

export default styles;