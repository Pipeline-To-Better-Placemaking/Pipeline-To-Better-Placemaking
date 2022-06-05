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
        height: '30%',
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
        marginTop: -20,
        marginBottom: height * .03
    },

    dataView:{
        alignItems: 'center',
    },

    nanSpace:{
        marginBottom: height * .009,
        marginTop: -3
    },

    inputBox:{
        width: width * .75
    },

    button:{
        marginTop: height * .03, 
        marginBottom: 20, 
        width: 100, 
        alignSelf:'center'
    }

})

export default styles;