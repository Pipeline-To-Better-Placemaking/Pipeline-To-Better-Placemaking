import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container:{
        margin:5, 
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    
    startButton:{
        backgroundColor: '#006FD6',
        height: 50, 
        marginLeft: 5, 
        width: 90
    },

    trackerText:{
        fontWeight: 'bold',
        fontSize: 19,
        marginLeft: 10
    }

});

export default styles;