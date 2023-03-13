import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent: 'space-between',
        flexDirection:'column',
        margin:5
    },

    activityView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:5
    },

    buttonView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    buttonBorder:{
        borderRadius: 5
    },

    promptText:{
        textAlign:'center', 
        marginBottom:5, 
        fontSize:20
    },

    selectAreaView:{
        height:'90%'
    }

});

export default styles;