import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    
    stopButton:{
        marginLeft: 5, 
        height: height * .0525, 
        width: width * .2,
    },

    startButton:{
        backgroundColor: '#006FD6',
        marginLeft: 5, 
        height: height * .0525, 
        width: width * .2,
    },

    startStopText:{
        color: 'white',
        fontSize: width * .035,
        fontWeight: 'bold'
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