import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const soundStyles = StyleSheet.create({
    
    dataView:{
        marginTop: height * .01,
        marginBottom: height * .01
    },
    
    bottomSpacing:{
        marginBottom: height * .02
    },

    separator:{
        borderWidth: 1
    },
    
    topSpacing:{
        marginTop: height * .02
    }

});

export default soundStyles;