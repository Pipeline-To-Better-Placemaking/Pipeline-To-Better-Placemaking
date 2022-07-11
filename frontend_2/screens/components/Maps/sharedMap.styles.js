import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    dataPin:{
        borderRadius: 75, 
        borderWidth: 1, 
        width: 15, 
        height: 15
    },

    soundDataPin:{
        borderRadius: 75, 
        borderWidth: 2.5,
        borderColor: 'rgba(198, 101, 233, 1)',
        backgroundColor: 'rgba(198, 101, 233, 0.5)'
    },

    natureDataPin:{
        borderRadius: 75, 
        borderWidth: 1.5, 
        width: 15, 
        height: 15,
        borderColor: 'red',
        backgroundColor: '#B06A24'
    },

    lightDataPinCircle:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 150, 
        borderWidth: 1.5, 
        width: 40, 
        height: 40,
    },

    lightDataPin:{
        borderRadius: 75, 
        width: 10, 
        height: 10,
    },
    
    orderTriangle:{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
    },

    orderArrowUp:{
        borderTopWidth: 0,
        borderRightWidth: 13,
        borderBottomWidth: 25,
        borderLeftWidth: 13,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },

    dataCallOutView:{
        flexDirection: 'column', 
        margin:10
    },

    dataText:{
        color: 'black'
    },

    callout:{
        position: 'relative'
    },
    
    // used only for the soundMapResults component
    soundDataCallOutView:{
        maxWidth: width * .85,
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },

    restrict:{
        width: width * .65,
        alignItems: 'center'
    },

    spacing:{
        marginBottom: height * .01
    },

    filterView:{ 
        flexDirection: 'row', 
        justifyContent:'center', 
        alignSelf:'center',
        margin: 3
    },
    
    filterSelect:{
        width: 250,
        borderWidth: 1,
        borderColor: '#edf1f7',
        borderRadius: 6,
        backgroundColor: '#edf1f7',
    },

});

export default styles;