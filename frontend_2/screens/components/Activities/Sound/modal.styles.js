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
        alignSelf: 'center'
    },

    titleLine:{
        alignSelf: 'center', 
        marginTop: -18
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
        marginTop: height * .03,
    },

    button:{
        width: width * .35,
        height: height * .065, 
        alignSelf:'center'
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
        width: width * .60
    },

    submitButton:{
        width: width * .25,
        height: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },

    errorView:{
        alignItems: 'center',
        marginTop: 5
    },

    buttonText:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // styles used only on soundsModal
    multiView:{
        marginTop: height * .04,
        alignItems: 'center'
    },

    multiSubmit:{
        width: width * .3,
        height: height * .065
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