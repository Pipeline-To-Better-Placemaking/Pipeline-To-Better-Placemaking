import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    modalContainer: {
        height: '100%',
        backgroundColor:'rgba(0,0,0, 0.5)'
    },

    avoid:{
        flex: 1
    },

    viewContainer: {
        height: '60%',
        marginTop: 'auto',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 1
    },

    titleText:{
        marginTop: 10,
        alignSelf: 'center',
        textDecorationLine: 'underline'
    },

    dataView:{
        alignItems: 'center', 
    },

    titleDesc:{
        width: width * .65,
        marginTop: height * .01
    },

    boldTxt:{
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: 'red'
    },

    titleDescTxt:{
        textAlign:'center',
    },

    buttonRow:{
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',        
        marginTop: height * .03,
    },

    button:{
        width: width * .45,
        height: height * .06, 
        alignSelf:'center',
    },

    offButtonTxt:{
        color: '#006FD6',
        fontSize: width * .033,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .033,
        fontWeight: 'bold'
    },

    otherView:{
        marginTop: height * .05,
    },

    otherRow:{
        flexDirection: 'row'
    },

    inputBox:{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        width: width * .6
    },

    submitButton:{
        width: width * .25,
        height: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },

    offSubmitButtonTxt:{
        color: '#006FD6',
        fontSize: width * .031,
        fontWeight: 'bold'
    },

    submitButtonTxt:{
        color: 'white',
        fontSize: width * .031,
        fontWeight: 'bold'
    },

    errorView:{
        alignItems: 'center',
        marginTop: 5
    },

    redTxt:{
        color: 'red'
    },

    multiView:{
        marginTop: height * .04,
        alignItems: 'center'
    },

    multiSubmit:{
        width: width * .27,
        height: height * .05
    },

    selectError:{
        alignItems: 'center',
        marginTop: height * .009,
        marginBottom: -20,
    },

    multiErrorView:{
        marginTop: 5,
        marginBottom: -23,
        alignItems: 'center'
    }


})

export default styles;