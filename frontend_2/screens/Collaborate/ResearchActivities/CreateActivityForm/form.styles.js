import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent: 'space-between',
        flexDirection:'column',
        margin:5
    },

    activityView: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:5
    },

    btnView: {
        justifyContent:'center',
        alignItems:'center',
    },

    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
    },

});
