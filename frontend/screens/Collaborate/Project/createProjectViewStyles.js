import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent: 'flex-start',
        flexDirection:'column',
        margin:20,
        marginTop:50
    },

    projName: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },

    searchView: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },

    mapHeight: {
        ...Platform.select({
          ios: {
            height:'70%'
          },
          android: {
            height:'80%'
          },
          default: {
            // other platforms, web for example
            height:'70%'
          }
      })
    }

});

export default styles;
