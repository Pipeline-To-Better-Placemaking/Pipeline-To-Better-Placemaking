import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent: 'flex-start',
        flexDirection:'column',
        margin:10
    },

    activityView: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:5,
        marginRight:40
    },

    btnView: {
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        marginRight:40
    },

    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
    },

});
