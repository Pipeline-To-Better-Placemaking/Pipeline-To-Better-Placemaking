import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    modalContainer: {
        height: '100%',
        backgroundColor:'rgba(0,0,0, 0.5)'
    },

    avoid:{
        flex: 1,
    },

    viewContainer: {
        height: '22.5%',
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
        marginTop: height * .01
    },

    nanSpace:{
        marginTop: -3,
        marginBottom: 3
    },

    emptySpace:{
        marginBottom: -10
    },

    redTxt:{
        color: 'red'
    },

    inputBox:{
        width: width * .75
    },

    button:{
        marginBottom: height * .6,
        marginTop: height * .03,
        width: width * .27,
        height: height * .045, 
        alignSelf:'center'
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .031,
        fontWeight: 'bold'
    }

})

export default styles;