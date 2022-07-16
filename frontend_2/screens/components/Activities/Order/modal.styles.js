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
        height: '27%',
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
        alignItems: 'center'
    },

    titleDesc:{
        width: width * .65,
        marginTop: height * .01,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: height * .015,
    },

    button:{
        width: width * .35,
        height: height * .06,
        alignSelf:'center' 
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .033,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    offButtonTxt:{
        color: '#006FD6',
        fontSize: width * .033,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    multiButton:{
        width: width * .45,
        height: height * .06, 
        alignSelf:'center'
    },

    otherView:{
        marginTop: height * .015,
        alignSelf: 'center'
    },

    otherRow:{
        flexDirection: 'row'
    },

    inputBox:{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        width: width * .60
    },

    selectButton:{
        width: width * .25,
        height: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },

    selectButtonTxt:{
        color: 'white',
        fontSize: width * .031,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    offSelectButtonTxt:{
        color: '#006FD6',
        fontSize: width * .031,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    backButton:{
        width: width * .275,
        height: height * .04, 
        alignSelf:'center',
        backgroundColor: '#6690FF',
        borderColor: '#6690FF'
    },

    submitButton:{
        width: width * .275,
        height: height * .04, 
        alignSelf:'center',
    },

    submitButtonTxt:{
        color: 'white',
        fontSize: width * .03,
        fontWeight: 'bold'
    },

    backButtonView:{
        marginTop: height * .015
    },
    
    selectError:{
        alignItems: 'center',
        marginTop: height * .005,
        marginBottom: -8,
    },

    redTxt:{
        color: 'red'
    },

    errorView:{
        marginTop: 5,
        marginBottom: -20,
        alignItems: 'center'
    },

    bottomRowView:{
        marginTop: height * .04,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

})

export default styles;