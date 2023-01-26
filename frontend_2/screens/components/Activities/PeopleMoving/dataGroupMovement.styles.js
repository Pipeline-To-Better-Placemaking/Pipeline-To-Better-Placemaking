import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    
    conatainer:{
        marginTop: 20
    },

    textTitle:{
        marginBottom: 10
    },

    button:{
        width: width * .7, 
        marginTop: 10, 
        alignSelf: 'center'
    },

    offButtonTxt:{
        color: '#006FD6',
        fontSize: width * .035,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    buttonTxt:{
        color: 'white',
        fontSize: width * .035,
        fontWeight: 'bold',
        textAlign: 'center',
    }

});

export default styles;