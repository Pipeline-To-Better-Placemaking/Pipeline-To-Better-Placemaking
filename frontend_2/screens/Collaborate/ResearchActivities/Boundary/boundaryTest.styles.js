import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
    
    buttons:{
        backgroundColor: '#006FD6',
        height: height * .05, 
        width: width * .3,
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .0315,
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
    }
    
});

export default styles;