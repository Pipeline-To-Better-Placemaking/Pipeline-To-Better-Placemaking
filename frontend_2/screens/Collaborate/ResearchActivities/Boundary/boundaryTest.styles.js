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
    
    buttons:{
        backgroundColor: '#006FD6',
        height: height * .05, 
        width: width * .3,
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .031,
        fontWeight: 'bold'
    },

    buttonRow:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -90
    },

    filterView:{ 
        flexDirection: 'row', 
        justifyContent:'center', 
        alignItems:'center',
    },

    filterSelect:{
        width: 140,
        borderWidth: 1,
        borderColor: '#edf1f7',
        borderRadius: 6,
        backgroundColor: '#edf1f7',
    },

    container:{
        margin:5, 
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },

    playPauseIcon:{
        width: width * .065,
        height: height * .03,
    },

    playPauseButton:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#006FD6',
    },
    
    timerRow:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    descriptionView:{
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: -90
    }
    
});

export default styles;