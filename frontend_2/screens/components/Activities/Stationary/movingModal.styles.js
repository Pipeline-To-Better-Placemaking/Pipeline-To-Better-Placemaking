import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    
    modalContainer:{
        height: '18%', 
        marginTop: 'auto', 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 1
    },

    title:{
        alignSelf: 'center', 
        marginTop: 20
    },

    button:{
        marginTop:  height * .03, 
        width: width * .3,
        height: height * .055,
        alignSelf: 'center'
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .035,
        fontWeight: 'bold'
    }

});

export default styles;