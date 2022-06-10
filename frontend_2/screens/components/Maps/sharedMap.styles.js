import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    // dataPin style is shared between stationaryMapResults, stationaryActivityMap, and peopleMovingMap (for the datapin)
    dataPin:{
        borderRadius: 75, 
        borderWidth: 1, 
        width: 15, 
        height: 15
    },
    
    // used for the other tests that require drawing boundaries (boundary test and nature test)
    redDataPin:{
        borderRadius: 75, 
        borderWidth: 1, 
        width: 15, 
        height: 15,
        backgroundColor: 'red'
    },

    soundDataPin:{
        borderRadius: 75, 
        borderWidth: 2.5,
        borderColor: 'rgba(198, 101, 233, 1)',
        backgroundColor: 'rgba(198, 101, 233, 0.5)'
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

});

export default styles;