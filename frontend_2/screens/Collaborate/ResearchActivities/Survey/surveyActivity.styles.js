import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    stopButton:{
        height: 50, 
        marginLeft: 5, 
        width: 90
    },

    startButton:{
        backgroundColor: '#006FD6',
        height: 50, 
        marginLeft: 5, 
        width: 90
    },

    container:{
        margin:5, 
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },

    mainView:{
        flex:1, 
        flexDirection:'column'
    },

    mapWrapper:{
        height:'40%'
    },
    
    surveyView:{
        flexDirection:'row', 
        margin:10, 
        marginRight:10
    },

    surveyLink:{
        color:'#006FD6', 
        width:'90%'
    },

    qrView:{
        flex:1, 
        alignItems:'center'
    },

    qr:{
        height:'100%', 
        width:'100%'
    }

});

export default styles;