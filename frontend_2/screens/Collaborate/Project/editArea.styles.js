import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container:{
        justifyContent: 'flex-start'
    },

    inputView:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        marginBottom: 5
    },

    input:{
        flex:1, 
        marginRight: 5, 
        fontSize:25
    },

    mapWrapper:{
        height:'80%'
    },

    buttonRow:{
        flexDirection:'row', 
        justifyContent: 'space-between', 
        margin:5
    }

});

export default styles;