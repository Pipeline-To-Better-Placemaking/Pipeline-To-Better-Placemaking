import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    modalContainer: {
        height: '100%',
        backgroundColor:'rgba(0,0,0, 0.5)'
    },

    viewContainer: {
        height: '50%',
        marginTop: 'auto',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 1
    },

    purposeViewContainer:{
        height: '45%',
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

    lastButtonView:{
        marginTop: height * .03,
    },

    backButton:{
        width: width * .3,
        height: height * .04, 
        alignSelf:'center',
        backgroundColor: '#6690FF',
        borderColor: '#6690FF'
    },

    submitButton:{
        width: width * .25,
        height: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },

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

});

export default styles;