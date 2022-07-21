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

    descriptionView:{
        alignItems: 'center',
        backgroundColor: 'white'
    }
    
});

export default styles;