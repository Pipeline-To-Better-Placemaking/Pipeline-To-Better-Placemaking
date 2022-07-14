import { StyleSheet } from 'react-native';

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
        width: 100, 
        alignSelf:'center'
    }

})

export default styles;