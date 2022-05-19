import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    margins: {
        margin:5,
        marginLeft:20,
        marginRight:20
    },
    
    metaDataTitleSep:{
        marginTop:5, 
        marginBottom:10, 
        borderWidth:0.5
    },
    
    metaDataSep:{
        marginTop:10, 
        marginBottom:10
    },

    metaDataEndSep:{
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 0.5
    },
    
    mapButton:{
        marginBottom:10, 
        flexDirection:'row', 
        justifyContent:'center'
    },

    button:{
        flex: 1
    },

    errorMsgView:{
        margin:15, 
        borderWidth:4, 
        borderColor:'red'
    },

    errorMsgText:{
        padding:5
    },
    
});

export default styles;