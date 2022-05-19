import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    header: {
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:5
    },

    leftContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    
    textHeader:{
        maxWidth:'80%'
    },

    textHeaderBack:{
        maxWidth:'80%', 
        marginLeft:15        
    },

    text:{
        marginLeft:25
    },

    rightContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    button: {
        marginLeft: 25,
      },

    buttonHeaderExit:{
        width:1, 
        height:1, 
        marginRight:25
    },

    menu:{
        marginRight: 15 
    }

});

export default styles;