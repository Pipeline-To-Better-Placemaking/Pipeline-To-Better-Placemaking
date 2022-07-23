import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles =  StyleSheet.create({
    
    container:{
        width: width,
        height: height * .05,
        borderRadius: 35,
        borderWidth: 1,
        justifyContent: 'center',
        marginBottom: 5
    },

    text:{
        textAlign: 'center'
    }

})

export default styles;