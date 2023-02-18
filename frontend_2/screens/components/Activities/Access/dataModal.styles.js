import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    modalContainer: {
        height: '100%',
        backgroundColor:'rgba(0,0,0, 0.5)'
    },

    viewContainer: {
        height: '45%',
        marginTop: 'auto',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 1
    },

    purposeViewContainer:{
        height: '50%',
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

    titleDescTxt:{
        textAlign:'center',
    },

    buttonRow:{
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',        
        marginTop: height * .015,
    },

    button:{
        width: width * .35,
        height: height * .07
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .033,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    offButtonTxt:{
        color: '#006FD6',
        fontSize: width * .033,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    inputLabel:{
        color: '#006FD6',
        fontSize: width * .033,
        height: height * .04, 
        fontWeight: 'bold',
        textAlign: 'center',
    },

    inputField:{
        color: '#006FD6',
        height: height * .04, 
        width: width * .53, 
        fontSize: width * .033,
        fontWeight: 'bold',
        textAlign: 'right',
    },

    lastButtonView:{
        marginTop: height * .015,
        alignItems: 'center'
    },

    backButton:{
        width: width * .3,
        height: height * .04, 
        alignSelf:'center',
        backgroundColor: '#6690FF',
        borderColor: '#6690FF'
    },

    backButtonTxt:{
        color: 'white',
        fontSize: width * .031,
        fontWeight: 'bold'
    },

    submitButton:{
        width: width * .25,
        height: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },

    multiView:{
        marginTop: height * .02,
        alignItems: 'center'
    },

    multiSubmit:{
        width: width * .3,
        height: height * .065
    },

    selectError:{
        alignItems: 'center',
        marginTop: height * .005,
        marginBottom: -8,
    },

    redTxt:{
        color: 'red'
    }

});

export default styles;