import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    leftShift:{
        marginLeft:-20
    },
    
    rowView:{
        flexDirection:'row'
    },

    modal:{
        width:'80%'
    },

    confirmButton:{
        marginTop: 5
    },

    confirmButton1:{
        marginTop: 10
    },

    deleteButtonView:{
        marginRight:-20, 
        marginTop:-10
    },

    cardView:{
        flexDirection:'row', 
        justifyContent:'flex-start'
    },
    
    columnView:{
        flex:1, 
        flexDirection:'column', 
        alignItems:'flex-start'
    },

    endView:{
        alignItems: 'flex-end'
    },

    container:{
        flex:1,
        justifyContent: 'space-between',
        flexDirection:'column',
        margin:5
    },

    activityView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:5
    },

    btnView:{
        justifyContent:'center',
        alignItems:'center',
    },

    backdrop:{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
    },

    listView:{
        marginTop: 15,
        marginBottom: 15
    }

});

export default styles;