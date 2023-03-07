import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    modalContainer: {
        height: '100%',
        backgroundColor:'rgba(0,0,0, 0.5)'
    },

    scrollViewContainer: {
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
        flexDirection: 'column', 
        marginLeft: 15
    },

    button:{
        marginTop: 15, 
        marginBottom: 20, 
        backgroundColor: '#006FD6',
        height: height * .05, 
        width: width * .3, 
        alignSelf:'center'
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .031,
        fontWeight: 'bold'
    },

})

export default styles;