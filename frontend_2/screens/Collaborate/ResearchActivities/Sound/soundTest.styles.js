import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    container:{
        margin:5, 
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    
    startButton:{
        backgroundColor: '#006FD6',
        marginLeft: 5, 
        height: height * .0525, 
        width: width * .2,
    },

    startButtonText:{
        color: 'white',
        fontSize: width * .035,
        fontWeight: 'bold'
    },

    trackerText:{
        fontWeight: 'bold',
        fontSize: width * .045,
        marginLeft: 10
    }

});

export default styles;