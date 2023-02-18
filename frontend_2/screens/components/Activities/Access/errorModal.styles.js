import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    background:{
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    
    modalContainer:{
        height: '20%',
        justifyContent: 'center',
        marginTop: height * .325,
        borderRadius: 35,
        borderWidth: 1
    },

    title:{
        justifyContent:'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 5
    },

    button:{
        marginTop: 30, 
        width:200, 
        alignSelf: 'center'
    }

});

export default styles;