import { StyleSheet } from 'react-native';

//style sheet is used for both viewStandingPoints and viewSubareas
export const styles = StyleSheet.create({

    titleView:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },

    titleText:{
        fontSize:25
    },

    button:{
        marginBottom:5
    },

    mapWrapper:{
        height:'50%'
    },

    container:{
        flexDirection:'row', 
        justifyContent: 'space-between', 
        margin:5
    },

    subTitleView:{
        flexDirection:'column', 
        justifyContent:'flex-end'
    }
    
});

export default styles;