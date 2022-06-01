import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container:{
        margin:5, 
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    
    // // Debug styles ----------------------------------------------------------------------------------
    // bottomView:{
    //     flex: 1,
    //     alignItems: 'center',
    // },

    // bottomStop:{
    //     height: 50,
    //     width: 90
    // },
    // //----------------------------------------------------------------------------------
    
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