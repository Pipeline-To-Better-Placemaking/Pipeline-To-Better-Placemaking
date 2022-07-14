import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    
    container:{
        marginTop: 20
    },

    containerSpacer:{
        marginTop: 25
    },

    title:{
        marginBottom: 10
    },

    topRow:{
        flexDirection: 'row', 
        justifyContent:'space-around'
    },

    bottomRow:{
        flexDirection: 'row', 
        justifyContent:'space-around',
        marginTop: 10
    },

    buttonLeft:{
        width: width * .35, 
        marginRight: 45
    },

    buttonRight:{
        width: width * .35, 
        marginRight: 10
    },

    buttonBottom:{
        width: width * .35, 
        marginTop: 10, 
        alignSelf: 'center'
    }

});

export default styles;