import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    modalContainer: {
        height: '100%',
        backgroundColor:'rgba(0,0,0, 0.5)'
    },

    messageContainer:{
        height: '100%'
    },

    viewContainer: {
        height: '27.5%',
        marginTop: height * .325,
        borderRadius: 35,
        borderWidth: 1
    },

    messageViewContainer:{
        height: height * .07,
        marginTop: height * .075,
        borderRadius: 35,
        borderWidth: 1,
        justifyContent: 'center'
    },

    titleText:{
        marginTop: height * .01,
        alignSelf: 'center',
        textDecorationLine: 'underline'
    },

    descText:{
        marginTop: height * .01,
        alignSelf: 'center',
        textAlign: 'center'
    },

    messageTxt:{
        margin: 10,
        alignSelf: 'center',
        textAlign: 'center'
    },

    dataView:{
        alignItems: 'center',
        marginTop: height * .015
    },

    validSpace:{
        marginTop: -10,
        marginBottom: 5
    },

    emptySpace:{
        marginTop: 5,
        marginBottom: -10
    },

    redTxt:{
        color: 'red'
    },

    inputBox:{
        width: width * .7
    },

    buttonRow:{
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: height * .03
    },

    button:{
        width: width * .275,
        height: height * .05, 
        alignSelf:'center'
    },

    cancelButton:{
        width: width * .275,
        height: height * .05, 
        alignSelf:'center',
        backgroundColor: '#6690FF',
        borderColor: '#6690FF'
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .03,
        fontWeight: 'bold'
    }

})

export default styles;