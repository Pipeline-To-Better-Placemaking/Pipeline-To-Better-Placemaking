import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

//dataPin style is shared between stationaryMapResults, stationaryActivityMap, and peopleMovingMap (for the datapin)
    dataPin:{
        borderRadius: 75, 
        borderWidth: 1, 
        width: 15, 
        height: 15
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
    }

});

export default styles;