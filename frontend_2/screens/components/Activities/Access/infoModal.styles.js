import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    viewContainer: {
        width: '80%',
        marginTop: height * .25,
        borderRadius: 35,
        borderWidth: 1,
        alignSelf: 'center',
    },

    titleText:{
        marginTop: 5,
        alignSelf: 'center',
        textDecorationLine: 'underline'
    },

    dataView:{
        alignItems: 'center',
    },

    spacing:{
        marginTop: height * .002
    },

    infoText:{
        textAlign:'center',
        fontSize: 18,
    },

    buttonView:{
        marginTop: height * .01,
        marginBottom: 10
    },

    closeButton:{
        width: width * .25,
        height: height * .04, 
        alignSelf:'center',
    }

});

export default styles;