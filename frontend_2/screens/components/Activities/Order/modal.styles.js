import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    modalContainer: {
        height: '100%',
        backgroundColor:'rgba(0,0,0, 0.5)'
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

    multiButton:{
        width: width * .45,
        height: height * .06, 
        alignSelf:'center'
    },

    backButton:{
        width: width * .3,
        height: height * .04, 
        alignSelf:'center',
        backgroundColor: '#6690FF',
        borderColor: '#6690FF'
    },

    submitButton:{
        width: width * .3,
        height: height * .04, 
        alignSelf:'center',
    },

    backButtonView:{
        marginTop: height * .015
    },
    
    selectError:{
        alignItems: 'center',
        marginTop: height * .009,
        marginBottom: -8,
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