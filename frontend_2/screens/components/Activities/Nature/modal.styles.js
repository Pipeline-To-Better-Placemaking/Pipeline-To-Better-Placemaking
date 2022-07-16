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

    viewContainer:{
        height: '45%',
        marginTop: 'auto',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 1
    },

    waterViewContainer:{
        height: '38%',
        marginTop: 'auto',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 1
    },

    vegeViewContainer:{
        height: '30%',
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

    otherView:{
        marginTop: height * .015,
        marginBottom: height * .01
    },

    otherRow:{
        flexDirection: 'row'
    },

    otherInputBox:{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        width: width * .60
    },

    submitButton:{
        width: width * .25,
        height: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },

    submitButtonTxt:{
        color: 'white',
        fontSize: width * .031,
        fontWeight: 'bold'
    },

    buttonRow:{
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',        
        marginTop: height * .015,
    },

    buttonSpace:{
        width: width,
        justifyContent: 'center',        
        marginTop: height * .015,
    },

    button:{
        width: width * .3,
        height: height * .065, 
        alignSelf:'center'
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .031,
        fontWeight: 'bold'
    },

    backButton:{
        width: width * .275,
        height: height * .04, 
        alignSelf:'center',
        backgroundColor: '#6690FF',
        borderColor: '#6690FF'
    },

    backButtonTxt:{
        color: 'white',
        fontSize: width * .03,
        fontWeight: 'bold'
    },

    lastButtonView:{
        marginTop: height * .03,
    },

    tempatureView:{
        height: height * .08,
        justifyContent: 'center',
    },

    tempRow:{
        flexDirection: 'row'
    },

    fixText:{
        marginTop: 10
    },

    inputBox:{
        width: width * .2,
        alignContent: 'center'
    },

    errorView:{
        alignItems: 'center',
        marginTop: 5
    },

    redTxt:{
        color: 'red'
    },

    typeView:{
        height: '100%',
        width: '90%',
        marginTop: height * .01,
    },

    dataButtonRow:{
        flexDirection: 'row',
        justifyContent: 'space-around',        
        marginTop: height * .015,
    },

    typeSpace:{
        marginTop: height * .02,
    },

    lastDataButtonView:{
        marginTop: height * .015
    },

    backButtonView:{
        marginTop: height * .015,
        paddingBottom: 30
    }

})

export default styles;